import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let app, auth, db, ready = false;

function configReady(){
  return window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey && window.FIREBASE_CONFIG.apiKey !== "COLLEZ_ICI";
}

if(configReady()){
  app = initializeApp(window.FIREBASE_CONFIG);
  auth = getAuth(app);
  db = getFirestore(app);
  ready = true;
}

const authStatusEl = document.getElementById('authStatus');
const loginBtn = document.getElementById('loginBtn');
const saveBtn = document.getElementById('saveVersionBtn');
const versionsBtn = document.getElementById('versionsBtn');
const loginBackdrop = document.getElementById('loginBackdrop');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

function setUiConnected(user){
  const dot = authStatusEl.querySelector('.dot');
  if(user){
    authStatusEl.classList.add('connected');
    dot.classList.add('on');
    authStatusEl.lastChild.textContent = ' ' + user.email;
    loginBtn.textContent = 'Déconnexion';
    saveBtn.disabled = false;
    versionsBtn.disabled = false;
  } else {
    authStatusEl.classList.remove('connected');
    dot.classList.remove('on');
    authStatusEl.lastChild.textContent = ' non connecté';
    loginBtn.textContent = 'Connexion';
    saveBtn.disabled = true;
    versionsBtn.disabled = true;
  }
}

if(!ready){
  authStatusEl.lastChild.textContent = ' Firebase non configuré';
  loginBtn.disabled = true;
  saveBtn.disabled = true;
  versionsBtn.disabled = true;
} else {
  onAuthStateChanged(auth, (user) => setUiConnected(user));

  loginBtn.addEventListener('click', () => {
    if(auth.currentUser){
      signOut(auth);
      toast('Déconnecté.');
    } else {
      loginError.textContent = '';
      loginBackdrop.classList.add('open');
    }
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        loginBackdrop.classList.remove('open');
        loginForm.reset();
        toast('Connecté.');
      })
      .catch(err => { loginError.textContent = 'Identifiants invalides.'; });
  });
}

document.getElementById('loginClose').addEventListener('click', ()=> loginBackdrop.classList.remove('open'));
loginBackdrop.addEventListener('click', (e)=>{ if(e.target===loginBackdrop) loginBackdrop.classList.remove('open'); });

/* ---------- Sauvegarde de version ---------- */

function pad(n){ return n<10 ? '0'+n : ''+n; }
function timestampName(){
  const d = new Date();
  return `carte_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}h${pad(d.getMinutes())}`;
}

saveBtn.addEventListener('click', async () => {
  if(!auth.currentUser) return;
  const name = timestampName();
  saveBtn.disabled = true;
  saveBtn.textContent = 'Enregistrement…';
  try{
    await addDoc(collection(db,'versions'), {
      name,
      data: JSON.stringify(window.__CARTE_STATE__.doc),
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.email
    });
    window.__CARTE_STATE__.currentVersionName = name;
    toast('Version enregistrée : ' + name);
  } catch(err){
    console.error(err);
    toast('Erreur d\'enregistrement.');
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 Enregistrer une version';
  }
});

/* ---------- Liste des versions ---------- */

const versionsBackdrop = document.getElementById('versionsBackdrop');
const versionList = document.getElementById('versionList');

versionsBtn.addEventListener('click', async () => {
  versionsBackdrop.classList.add('open');
  versionList.innerHTML = '<div class="empty-state">Chargement…</div>';
  try{
    const q = query(collection(db,'versions'), orderBy('createdAt','desc'));
    const snap = await getDocs(q);
    if(snap.empty){
      versionList.innerHTML = '<div class="empty-state">Aucune version enregistrée pour l\'instant.</div>';
      return;
    }
    versionList.innerHTML = '';
    snap.forEach(docSnap => {
      const v = docSnap.data();
      const row = document.createElement('div');
      row.className = 'version-row';
      const dateStr = v.createdAt && v.createdAt.toDate ? v.createdAt.toDate().toLocaleString('fr-FR') : '';
      row.innerHTML = `
        <div>
          <div class="vname">${v.name}</div>
          <div class="vmeta">${dateStr}${v.createdBy ? ' · '+v.createdBy : ''}</div>
        </div>
        <div class="vactions">
          <button class="load">Charger</button>
        </div>`;
      row.querySelector('.load').addEventListener('click', () => {
        if(confirm('Charger « ' + v.name + ' » ? Les modifications non enregistrées seront perdues.')){
          window.__CARTE_STATE__.doc = JSON.parse(v.data);
          window.__CARTE_STATE__.selectedId = null;
          window.__CARTE_RENDER__();
          versionsBackdrop.classList.remove('open');
          toast('Version « ' + v.name + ' » chargée.');
        }
      });
      versionList.appendChild(row);
    });
  } catch(err){
    console.error(err);
    versionList.innerHTML = '<div class="empty-state">Erreur de chargement.</div>';
  }
});
document.getElementById('versionsClose').addEventListener('click', ()=> versionsBackdrop.classList.remove('open'));
versionsBackdrop.addEventListener('click', (e)=>{ if(e.target===versionsBackdrop) versionsBackdrop.classList.remove('open'); });
