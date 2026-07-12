/* =========================================================
   Stockage des versions directement dans le repo GitHub.
   - LECTURE : API publique GitHub, aucun réglage nécessaire.
     N'importe quel ordinateur qui ouvre le site voit les versions.
   - ÉCRITURE : jeton GitHub « fine-grained » limité à ce seul repo,
     collé une fois par ordinateur (bouton ⚙️), stocké en localStorage.
   ========================================================= */

const GH = {
  owner: 'Viktor-Guignard',
  repo: 'la-coursive-carte',
  branch: 'main',
  dir: 'versions',
  tokenKey: 'carte_gh_token',
};

const API = `https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${GH.dir}`;

function getToken(){ return localStorage.getItem(GH.tokenKey) || ''; }
function hasToken(){ return !!getToken(); }

function utf8ToB64(str){
  return btoa(String.fromCharCode(...new TextEncoder().encode(str)));
}
function b64ToUtf8(b64){
  const bin = atob(b64.replace(/\n/g,''));
  return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}

function pad(n){ return n<10 ? '0'+n : ''+n; }
function timestampName(){
  const d = new Date();
  return `carte_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}h${pad(d.getMinutes())}`;
}

/* Liste les versions (public, sans jeton). Renvoie [{name, path}] trié récent → ancien. */
async function listVersions(){
  const res = await fetch(`${API}?ref=${GH.branch}&t=${Date.now()}`, {
    headers: { 'Accept': 'application/vnd.github+json' }
  });
  if(res.status === 404) return [];          // dossier pas encore créé
  if(!res.ok) throw new Error('GitHub API ' + res.status);
  const items = await res.json();
  return items
    .filter(it => it.type === 'file' && it.name.endsWith('.json'))
    .map(it => ({ name: it.name.replace(/\.json$/,''), path: it.path }))
    .sort((a,b) => b.name.localeCompare(a.name));  // noms horodatés zéro-paddés → tri chrono
}

/* Charge le contenu d'une version (public, sans jeton). */
async function loadVersion(path){
  const res = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${path}?ref=${GH.branch}&t=${Date.now()}`, {
    headers: { 'Accept': 'application/vnd.github+json' }
  });
  if(!res.ok) throw new Error('GitHub API ' + res.status);
  const json = await res.json();
  return JSON.parse(b64ToUtf8(json.content));
}

/* Enregistre une nouvelle version (jeton requis). Renvoie le nom créé. */
async function saveVersion(doc){
  const token = getToken();
  if(!token) throw new Error('NO_TOKEN');
  const name = timestampName();
  const res = await fetch(`${API}/${name}.json`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Version ' + name,
      content: utf8ToB64(JSON.stringify(doc, null, 1)),
      branch: GH.branch,
    })
  });
  if(res.status === 401 || res.status === 403) throw new Error('BAD_TOKEN');
  if(res.status === 422){
    // fichier déjà existant (2 sauvegardes dans la même minute) → suffixe secondes
    const name2 = name + 's' + pad(new Date().getSeconds());
    const res2 = await fetch(`${API}/${name2}.json`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Version ' + name2,
        content: utf8ToB64(JSON.stringify(doc, null, 1)),
        branch: GH.branch,
      })
    });
    if(!res2.ok) throw new Error('GitHub API ' + res2.status);
    return name2;
  }
  if(!res.ok) throw new Error('GitHub API ' + res.status);
  return name;
}

window.CarteStorage = { hasToken, getToken, listVersions, loadVersion, saveVersion };

/* ===================== Branchement UI ===================== */

const S = () => window.__CARTE_STATE__;
const H = () => window.__CARTE_HELPERS__;

const saveBtn = document.getElementById('saveVersionBtn');
const versionsBtn = document.getElementById('versionsBtn');
const settingsBtn = document.getElementById('settingsBtn');
const settingsBackdrop = document.getElementById('settingsBackdrop');
const versionsBackdrop = document.getElementById('versionsBackdrop');
const versionList = document.getElementById('versionList');

/* ---------- Réglages (jeton) ---------- */

settingsBtn.addEventListener('click', () => {
  document.getElementById('tokenInput').value = getToken();
  settingsBackdrop.classList.add('open');
});
document.getElementById('settingsClose').addEventListener('click', ()=> settingsBackdrop.classList.remove('open'));
settingsBackdrop.addEventListener('click', (e)=>{ if(e.target===settingsBackdrop) settingsBackdrop.classList.remove('open'); });

document.getElementById('tokenForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const val = document.getElementById('tokenInput').value.trim();
  if(val) localStorage.setItem(GH.tokenKey, val);
  else localStorage.removeItem(GH.tokenKey);
  settingsBackdrop.classList.remove('open');
  H().updateSyncStatus();
  H().toast(val ? 'Jeton enregistré sur cet ordinateur.' : 'Jeton effacé.');
});

/* ---------- Enregistrer une version ---------- */

saveBtn.addEventListener('click', async () => {
  if(!hasToken()){
    settingsBackdrop.classList.add('open');
    H().toast('Collez d\'abord votre jeton GitHub (une fois par ordinateur).');
    return;
  }
  saveBtn.disabled = true;
  const original = saveBtn.textContent;
  saveBtn.textContent = 'Enregistrement…';
  try{
    const name = await saveVersion(S().doc);
    H().clearDraft();
    H().toast('Version enregistrée : ' + name);
  } catch(err){
    console.error(err);
    if(err.message === 'BAD_TOKEN'){
      H().toast('Jeton refusé par GitHub — vérifiez-le dans ⚙️ Réglages.');
      settingsBackdrop.classList.add('open');
    } else {
      H().toast('Erreur d\'enregistrement — réessayez.');
    }
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = original;
  }
});

/* ---------- Liste des versions ---------- */

versionsBtn.addEventListener('click', async () => {
  versionsBackdrop.classList.add('open');
  versionList.innerHTML = '<div class="empty-state">Chargement…</div>';
  try{
    const versions = await listVersions();
    if(versions.length === 0){
      versionList.innerHTML = '<div class="empty-state">Aucune version enregistrée pour l\'instant.</div>';
      return;
    }
    versionList.innerHTML = '';
    versions.forEach((v, i) => {
      const row = document.createElement('div');
      row.className = 'version-row';
      const m = v.name.match(/^carte_(\d{4})-(\d{2})-(\d{2})_(\d{2})h(\d{2})/);
      const dateStr = m ? `${m[3]}/${m[2]}/${m[1]} à ${m[4]}h${m[5]}` : '';
      row.innerHTML = `
        <div>
          <div class="vname">${v.name}${i===0 ? '<span class="tag">plus récente</span>' : ''}</div>
          <div class="vmeta">${dateStr}</div>
        </div>
        <div class="vactions">
          <button class="load">Charger</button>
        </div>`;
      row.querySelector('.load').addEventListener('click', async () => {
        if(S().dirty && !confirm('Des modifications non enregistrées seront remplacées par « ' + v.name + ' ». Continuer ?')) return;
        try{
          const doc = await loadVersion(v.path);
          S().doc = doc;
          S().selectedId = null;
          H().clearDraft();
          window.__CARTE_RENDER__();
          versionsBackdrop.classList.remove('open');
          H().toast('Version « ' + v.name + ' » chargée.');
        }catch(err){
          console.error(err);
          H().toast('Erreur de chargement de cette version.');
        }
      });
      versionList.appendChild(row);
    });
  } catch(err){
    console.error(err);
    versionList.innerHTML = '<div class="empty-state">Erreur de chargement (connexion internet ?).</div>';
  }
});
document.getElementById('versionsClose').addEventListener('click', ()=> versionsBackdrop.classList.remove('open'));
versionsBackdrop.addEventListener('click', (e)=>{ if(e.target===versionsBackdrop) versionsBackdrop.classList.remove('open'); });

/* ---------- Au démarrage : reprendre où on s'était arrêté ---------- */

(async function boot(){
  H().updateSyncStatus();

  const draft = H().getDraft();

  // 1) S'il y a un brouillon local non enregistré → proposer de le reprendre
  if(draft && Array.isArray(draft.doc) && draft.doc.length){
    const banner = document.getElementById('draftBanner');
    const when = new Date(draft.ts).toLocaleString('fr-FR');
    banner.querySelector('.msg').textContent =
      `Un brouillon non enregistré du ${when} existe sur cet ordinateur.`;
    banner.classList.add('show');
    document.getElementById('draftResume').onclick = () => {
      S().doc = draft.doc;
      S().dirty = true;
      window.__CARTE_RENDER__();
      H().updateSyncStatus();
      banner.classList.remove('show');
      H().toast('Brouillon repris — pensez à Enregistrer une version.');
    };
    document.getElementById('draftDiscard').onclick = () => {
      H().clearDraft();
      banner.classList.remove('show');
    };
  }

  // 2) Charger la dernière version cloud (si elle existe et pas de brouillon repris)
  try{
    const versions = await listVersions();
    if(versions.length > 0 && !(draft && draft.doc)){
      const doc = await loadVersion(versions[0].path);
      S().doc = doc;
      S().selectedId = null;
      window.__CARTE_RENDER__();
      H().toast('Dernière version chargée : ' + versions[0].name);
    }
  }catch(err){
    console.warn('Chargement initial impossible (hors-ligne ?)', err);
  }
})();
