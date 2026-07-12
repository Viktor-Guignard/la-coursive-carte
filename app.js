/* ===================== Modèle de données ===================== */

let uidCounter = 1;
function newId(){ return 'b' + (uidCounter++) + '_' + Math.random().toString(36).slice(2,7); }

function defaultDoc(){
  const b = (type, fields) => ({ id: newId(), type, ...fields });
  return [
    b('header', {
      line1:'La Coursive', line2:'des Alpes',
      chef:'Par le chef Laurent Hillairet',
      insta:'Suivez-nous sur instagram<br>@lacoursivemeribel',
      wifi:'Wifi: LiveboxCdb0<br>mdp: lacoursive73',
      logoImg:null, qrImg:null
    }),
    b('formule', {text:'MENUS', heading:true}),
    b('formule', {text:'ENTRÉE + PLAT ou/or PLAT + DESSERT 35€'}),
    b('formule', {text:'ENTRÉE + PLAT + DESSERT 39€'}),
    b('note', {text:'*Plats possibles dans les menus / Dishes included in the menu'}),
    b('section', {fr:'À PARTAGER', en:'To share'}),
    b('item', {fr:'CROQUE JAMBON À LA TRUFFE ET BEAUFORT', en:'Truffle ham and Beaufort cheese bread', price:'20€'}),
    b('item', {fr:'FOIE GRAS MAISON EN BALLOTTINE', en:'Home made foie gras terrine', price:'25€'}),
    b('item', {fr:'PÂTÉ EN CROÛTE MAISON DE FOIE GRAS ET VOLAILLE ET PORC, CHUTNEY DE MANGUES', en:'Home made poultry, pork and foie gras pie, mango chutney', price:'20€'}),
    b('item', {fr:'PLANCHE DE FROMAGES DES ALPES', en:'Selection of cheeses from Alps', price:'19€'}),
    b('item', {fr:'SAUMON LABEL ROUGE MARINÉ FAÇON GRAVLAX', en:"Marinated red label salmon as gravlax' style", price:'23€'}),
    b('item', {fr:'JAMBON BLANC À LA TRUFFE ET CHORIZO IBÉRIQUE', en:'Truffle white ham and iberian chorizo', price:'20€'}),
    b('item', {fr:'PLANCHE MIXTE', en:'Truffle white ham and chorizo/cheeses', price:'23€'}),
    b('item', {fr:'CORNET DE FRITES MAISON', en:'Home made French fries', price:'8€'}),
    b('section', {fr:'ENTRÉES', en:'Starters'}),
    b('item', {fr:'VELOUTÉ DE COURGE, NOIX CARAMÉLISÉES', en:'Pumpkin soup, and nuts candied', price:'17€*/22€*'}),
    b('item', {fr:'OEUF PARFAIT AUX CHAMPIGNONS ET CHÂTAIGNES', en:'Poched egg with mushrooms and chestnuts', price:'18€*/26€'}),
    b('item', {fr:"SAUMON LABEL ROUGE MARINÉ FAÇON GRAVLAX", en:"Marinated Red Label salmon as Gravlax' style (+4€ dans le menu)", price:'23€*'}),
    b('item', {fr:'HOUMOUS POIS CHICHES, CRÈME DE FÉTA ET POIVRONS CONFITS, GRENADE', en:'Houmous, feta cream and candied peppers, pomegranate', price:'17€ / 26€'}),
    b('item', {fr:'PÂTÉ EN CROÛTE DE VOLAILLE, PORC ET FOIE GRAS, CHUTNEY DE MANGUES', en:'Home made poultry, pork and foie gras pie, mango chutney', price:'20€'}),
    b('item', {fr:'VITELLO TONNATO (Viande de veau et sauce au thon et câpres)', en:'Home made Vitello tonnato, veal slices with tuna sauce and capers', price:'21€'}),
    b('note', {text:'Prix nets, service compris'}),

    b('pagebreak', {}),

    b('formule', {text:'NOUVEAU !!!', italic:true}),
    b('section', {fr:'PIZZAS CHICS!', en:null}),
    b('item', {fr:'SPIANATA: base tomate, mozzarella fior di latte, oignons cuisinés, chorizo ibérique', en:'Tomato, mozzarella Fior di latte, onions cooked, iberico chorizo', price:'20€'}),
    b('item', {fr:'TARTUFO: base crème, mozzarella ricotta, fior di latte, jambon blanc à la truffe, huile de truffe, roquette et noix caramélisées', en:'Cream, ricotta, mozzarella fior di latte, truffle ham, truffle oil, arugula salad and candied nuts', price:'25€'}),
    b('item', {fr:'CLASSICO MARGARITA: Base tomate, mozzarella fior di latte, basilic', en:'Tomato, mozzarella Fior di latte, basil', price:'18€*'}),
    b('item', {fr:'MOZZA LOVER: Base tomate, mozzarella fior di latte, burrata, scarmozza fumée, basilic', en:'Tomato, mozzarella Fior di latte, burrata, scarmozza fumée, basilic', price:'22€'}),
    b('section', {fr:'PLATS', en:'Dishes'}),
    b('item', {fr:'« LA » SALADE CAESAR, BACON', en:'Caesar salad with roasted chicken, with bacon', price:'23€*'}),
    b('item', {fr:'CABILLAUD RÔTI FAÇON THAI, RAVIOLES À LA RICOTTA ET POIREAUX, CRUMBLE DE NOIX DE CAJOU', en:'Cod fish cooked as « thai » style, confit leeks and ricotta ravioli, cashew nut crumble', price:'32€'}),
    b('item', {fr:'POULPE SNACKÉ, AVOCAT GRILLÉ, CHORIZO ET RISOTTO D’ÉPEAUTRE', en:'Octopus grilled, grilled avocado, chorizo and spelled risotto', price:'37€'}),
    b('item', {fr:'RACLETTE AÉRIENNE, BRIOCHE PERDUE ET JAMBON BLANC À LA TRUFFE', en:'Espuma of Raclette, French toast brioch bread and truffle ham', price:'24€'}),
    b('item', {fr:'CRÈME DE POMMES DE TERRE, COMME UNE TARTIFLETTE', en:'Potatoes soup cooked as Tartiflette style', price:'23€*'}),
    b('item', {fr:'« MÉRIBURGER » AU BEAUFORT, FRITES TOUT MAISON (SUPPL. FOIE GRAS +6€)', en:'Special Home made Burger bun with Beaufort cheese, French fries (extra Foie gras roasted +6€)', price:'27€'}),
    b('item', {fr:'BOEUF CONFIT DE « 7 HEURES » À LA ROYALE (foie gras poêlé), POMME PURÉE BIEN BEURRÉE', en:'Confit beef « 7 hours » with foie gras roasted, mashed potatoes (+6€ dans le menu)', price:'33€*'}),
    b('item', {fr:'RIS DE VEAU ET SARRASIN, HARISSA DE CAROTTES, SPAETZLE', en:'Sweetbread and buckwheat, carrot harissa and spaetzle', price:'39€'}),
    b('section', {fr:'PLAT POUR DEUX', en:'For two people'}),
    b('item', {fr:'MORCEAUX CHOISIS DE VIANDE METZGER À PARTAGER (SELON ARRIVAGE), PURÉE BIEN BEURRÉE', en:'Selection of piece of meat served for two people, depending on availability, mashed potatoes', price:'95€'}),
    b('section', {fr:'DESSERTS', en:'Deserts'}),
    b('item', {fr:'CRAQUANT TOUT CHOCOLAT, GLACE VANILLE ET CACAHUÈTES', en:'Chocolate cake, vanilla ice cream and peanuts', price:'14€*'}),
    b('item', {fr:'POIRE DE SAVOIE, RIZ AU LAIT ET CARAMEL AU BEURRE SALÉ, AMANDES ET NOISETTES', en:'Pear from Savoie, milk rice and caramel with salted butter, almonds and hazelnuts', price:'13€*'}),
    b('item', {fr:'BABA AU RHUM, CONFIT D’ORANGES, CRÈME LÉGÈRE VANILLÉE', en:'Famous rhum baba cake, homemade orange jam and vanilla chantilly cream', price:'14€*'}),
    b('item', {fr:'PAVLOVA MANGUE, COCO, PASSION', en:'Passion fruit, mango and coconut pavlova', price:'15€'}),
    b('section', {fr:'MENU KIDS', en:"Kid's menu"}),
    b('item', {fr:'VOLAILLE JAUNE RÔTIE ET FRITES OU PURÉE MAISON, FONDANT CHOCOLAT', en:'Roasted chicken and mashed potatoes or French fries, chocolate cake', price:'19€'}),
  ];
}

const BLOCK_LIBRARY = [
  {type:'section', ttl:'Titre de section', desc:'Ex : « ENTRÉES / Starters »', make:()=>({fr:'NOUVELLE SECTION', en:'New section'})},
  {type:'item', ttl:'Plat', desc:'Nom FR, nom EN, prix', make:()=>({fr:'NOUVEAU PLAT', en:'New dish', price:'0€'})},
  {type:'formule', ttl:'Ligne formule', desc:'Texte en couleur (ex. prix menu)', make:()=>({text:'NOUVELLE FORMULE'})},
  {type:'note', ttl:'Note / mention', desc:'Petit texte italique gris', make:()=>({text:'Note...'})},
  {type:'divider', ttl:'Séparateur', desc:'Ligne fine de séparation', make:()=>({})},
  {type:'pagebreak', ttl:'Saut de page', desc:'Démarre une nouvelle page PDF', make:()=>({})},
];

/* Champs mono-lignes : Entrée = valider, pas de retour à la ligne */
const MULTILINE_FIELDS = new Set(['insta','wifi']);

/* ===================== État ===================== */

const state = {
  doc: defaultDoc(),
  selectedId: null,
  dirty: false,           // modifications non enregistrées dans le cloud
};

let lastDeleted = null;   // {block, index} pour « Annuler »

/* ===================== Brouillon local (sécurité) ===================== */

const DRAFT_KEY = 'carte_draft_v1';

function saveDraft(){
  try{
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ts: new Date().toISOString(), doc: state.doc}));
  }catch(e){ /* stockage plein : tant pis, le brouillon est un filet de sécurité */ }
}
function clearDraft(){ localStorage.removeItem(DRAFT_KEY); state.dirty = false; updateSyncStatus(); }
function getDraft(){
  try{
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}

let draftTimer = null;
function markDirty(){
  state.dirty = true;
  updateSyncStatus();
  clearTimeout(draftTimer);
  draftTimer = setTimeout(saveDraft, 800);
}

function updateSyncStatus(){
  const el = document.getElementById('syncStatus');
  const txt = el.querySelector('.txt');
  const hasToken = !!window.CarteStorage && window.CarteStorage.hasToken();
  el.classList.remove('ok','warn');
  if(state.dirty){
    el.classList.add('warn');
    txt.textContent = 'Modifications non enregistrées';
  } else if(hasToken){
    el.classList.add('ok');
    txt.textContent = 'Sauvegarde cloud activée';
  } else {
    txt.textContent = 'Lecture seule — jeton requis pour enregistrer (⚙️)';
  }
}

/* ===================== Rendu ===================== */

const canvasWrap = document.getElementById('canvasWrap');
const PAGE_H = 1123; // hauteur A4 en px (96 dpi)

function esc(s){
  const d = document.createElement('div');
  d.textContent = s == null ? '' : s;
  return d.innerHTML;
}

function ed(id, field, value, extraClass, tag){
  tag = tag || 'span';
  return `<${tag} class="${extraClass||''}" contenteditable="true" data-id="${id}" data-field="${field}">${value||''}</${tag}>`;
}

function renderBlockInner(blk){
  switch(blk.type){
    case 'header':
      return `
        <div class="titles">
          <h1>${ed(blk.id,'line1',esc(blk.line1))}<br>${ed(blk.id,'line2',esc(blk.line2))}</h1>
        </div>
        <div class="badgeRow img-slot" data-id="${blk.id}" data-field="logoImg" title="Cliquer pour remplacer le logo">
          <img src="${blk.logoImg || 'assets/logo.png'}" class="logo-badge" alt="logo">
        </div>
        <div class="side">
          <div class="chef">${ed(blk.id,'chef',esc(blk.chef))}</div>
          <div class="insta">${ed(blk.id,'insta',blk.insta)}</div>
          <div class="qr-box img-slot" data-id="${blk.id}" data-field="qrImg" title="Cliquer pour remplacer le QR code">
            <img src="${blk.qrImg || 'assets/qr.png'}" alt="QR code">
          </div>
          <div class="wifi" style="margin-top:8px;">${ed(blk.id,'wifi',blk.wifi)}</div>
        </div>`;
    case 'section':
      return `<h2>${ed(blk.id,'fr',esc(blk.fr))}${blk.en != null ? ' <span class="en">/ '+ed(blk.id,'en',esc(blk.en))+'</span>' : ''}</h2>`;
    case 'item':
      return `
        <div class="txt">
          <div class="fr">${ed(blk.id,'fr',esc(blk.fr))}</div>
          <div class="en">${ed(blk.id,'en',esc(blk.en))}</div>
        </div>
        <div class="price">${ed(blk.id,'price',esc(blk.price))}</div>`;
    case 'formule':
      return ed(blk.id,'text',esc(blk.text),'', 'div');
    case 'note':
      return ed(blk.id,'text',esc(blk.text),'', 'div');
    case 'divider':
      return '';
    case 'pagebreak':
      return '↴ Nouvelle page (PDF)';
    default:
      return '';
  }
}

function blockClass(blk){
  const map = {header:'blk-header', section:'blk-section', item:'blk-item', formule:'blk-formule', note:'blk-note', divider:'blk-divider', pagebreak:'blk-pagebreak'};
  let c = map[blk.type] || '';
  if(blk.type==='formule' && blk.italic) c += ' italic';
  if(blk.type==='formule' && blk.heading) c += ' heading';
  return c;
}

function render(){
  canvasWrap.innerHTML = '';
  let pageBlocks = [];
  let pageNum = 1;

  const flushPage = () => {
    const pageEl = document.createElement('div');
    pageEl.className = 'pdf-page';
    const label = document.createElement('div');
    label.className = 'page-label';
    label.textContent = 'Page ' + pageNum;
    pageEl.appendChild(label);
    if(pageBlocks.length === 0){
      const hint = document.createElement('div');
      hint.className = 'page-empty-hint';
      hint.textContent = 'Page vide — ajoutez un bloc';
      pageEl.appendChild(hint);
    }
    pageBlocks.forEach(blk => {
      pageEl.appendChild(buildInsertBar(state.doc.indexOf(blk) - 1));
      pageEl.appendChild(buildBlockEl(blk));
    });
    if(pageBlocks.length > 0){
      pageEl.appendChild(buildInsertBar(state.doc.indexOf(pageBlocks[pageBlocks.length-1])));
    }
    const warn = document.createElement('div');
    warn.className = 'page-overflow-warning';
    warn.textContent = '⚠️ Le contenu dépasse la page A4 — déplacez des blocs ou ajoutez un saut de page';
    pageEl.appendChild(warn);
    canvasWrap.appendChild(pageEl);
    pageNum++;
    pageBlocks = [];
  };

  state.doc.forEach(blk => {
    pageBlocks.push(blk);
    if(blk.type === 'pagebreak') flushPage();
  });
  flushPage();

  requestAnimationFrame(checkOverflow);
}

function checkOverflow(){
  // Mesure valable uniquement en mise en page A4 (pas en vue mobile,
  // ni quand la fenêtre n'est pas encore dimensionnée)
  if(!window.innerWidth || matchMedia('(max-width:900px)').matches){
    document.querySelectorAll('.pdf-page').forEach(p => p.classList.remove('overflowing'));
    return;
  }
  document.querySelectorAll('.pdf-page').forEach(page => {
    // retirer d'abord la classe : le bandeau d'avertissement (30px sous la page)
    // gonflerait scrollHeight et rendrait l'état collant
    page.classList.remove('overflowing');
    page.classList.toggle('overflowing', page.scrollHeight > PAGE_H + 2);
  });
}

function buildInsertBar(afterIndex){
  const bar = document.createElement('div');
  bar.className = 'insert-bar';
  const btn = document.createElement('button');
  btn.textContent = '+ ajouter ici';
  btn.onclick = () => openBlockPicker(afterIndex);
  bar.appendChild(btn);
  return bar;
}

function buildBlockEl(blk){
  const wrap = document.createElement('div');
  wrap.className = 'block ' + blockClass(blk) + (state.selectedId===blk.id ? ' selected' : '');
  wrap.dataset.blockId = blk.id;
  wrap.innerHTML = renderBlockInner(blk);

  const controls = document.createElement('div');
  controls.className = 'row-controls';
  controls.innerHTML = `
    <button class="rctrl del" data-act="del" title="Supprimer">✕</button>
    <button class="rctrl" data-act="dup" title="Dupliquer">⧉</button>
    <button class="rctrl" data-act="up" title="Monter">↑</button>
    <button class="rctrl" data-act="down" title="Descendre">↓</button>`;
  wrap.appendChild(controls);

  wrap.addEventListener('click', (e) => {
    if(e.target.closest('.rctrl')) return;
    if(e.target.closest('.img-slot')) return;
    state.selectedId = blk.id;
  });

  controls.addEventListener('click', (e) => {
    const act = e.target.dataset.act;
    if(!act) return;
    const idx = state.doc.findIndex(x=>x.id===blk.id);
    if(idx < 0) return;
    if(act==='up' && idx>0){
      [state.doc[idx-1],state.doc[idx]]=[state.doc[idx],state.doc[idx-1]];
      markDirty(); render();
    }
    if(act==='down' && idx<state.doc.length-1){
      [state.doc[idx+1],state.doc[idx]]=[state.doc[idx],state.doc[idx+1]];
      markDirty(); render();
    }
    if(act==='dup'){
      const copy = JSON.parse(JSON.stringify(state.doc[idx]));
      copy.id = newId();
      state.doc.splice(idx+1, 0, copy);
      state.selectedId = copy.id;
      markDirty(); render();
    }
    if(act==='del'){
      lastDeleted = { block: state.doc[idx], index: idx };
      state.doc.splice(idx,1);
      markDirty(); render();
      toast('Bloc supprimé', 'Annuler', () => {
        if(!lastDeleted) return;
        state.doc.splice(Math.min(lastDeleted.index, state.doc.length), 0, lastDeleted.block);
        lastDeleted = null;
        markDirty(); render();
      });
    }
  });

  wrap.querySelectorAll('.img-slot').forEach(slot=>{
    slot.addEventListener('click', ()=> triggerImageUpload(slot.dataset.id, slot.dataset.field));
  });

  return wrap;
}

function triggerImageUpload(blockId, field){
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    const file = input.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const blk = state.doc.find(b=>b.id===blockId);
      if(!blk) return;
      blk[field] = reader.result;
      markDirty(); render();
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

/* ===================== Édition inline ===================== */

/* Validation à la sortie du champ */
canvasWrap.addEventListener('blur', (e) => {
  const el = e.target;
  if(!el.matches || !el.matches('[contenteditable="true"]')) return;
  const id = el.dataset.id, field = el.dataset.field;
  const blk = state.doc.find(b=>b.id===id);
  if(!blk) return;
  const newVal = MULTILINE_FIELDS.has(field)
    ? el.innerHTML.replace(/<div><br><\/div>/g,'<br>').replace(/<div>/g,'<br>').replace(/<\/div>/g,'')
    : el.textContent;
  if(blk[field] !== newVal){
    blk[field] = newVal;
    markDirty();
  }
}, true);

/* Entrée = valider (sauf champs multilignes) ; Échap = valider aussi */
canvasWrap.addEventListener('keydown', (e) => {
  const el = e.target;
  if(!el.matches || !el.matches('[contenteditable="true"]')) return;
  if(e.key === 'Escape'){ e.preventDefault(); el.blur(); return; }
  if(e.key === 'Enter' && !MULTILINE_FIELDS.has(el.dataset.field)){
    e.preventDefault();
    el.blur();
  }
});

/* Coller en texte brut (évite d'importer du gras/couleurs de Word etc.) */
canvasWrap.addEventListener('paste', (e) => {
  const el = e.target;
  if(!el.matches || !el.closest('[contenteditable="true"]')) return;
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData('text/plain');
  document.execCommand('insertText', false, text);
});

/* ===================== Ajout de bloc ===================== */

const pickerBackdrop = document.getElementById('pickerBackdrop');
const blockGrid = document.getElementById('blockGrid');
let pendingInsertIndex = null;

function openBlockPicker(afterIndex){
  pendingInsertIndex = afterIndex;
  pickerBackdrop.classList.add('open');
}
document.getElementById('addBlockBtn').addEventListener('click', ()=>{
  const idx = state.selectedId ? state.doc.findIndex(b=>b.id===state.selectedId) : state.doc.length-1;
  openBlockPicker(idx);
});
document.getElementById('pickerClose').addEventListener('click', ()=> pickerBackdrop.classList.remove('open'));
pickerBackdrop.addEventListener('click', (e)=>{ if(e.target===pickerBackdrop) pickerBackdrop.classList.remove('open'); });

BLOCK_LIBRARY.forEach(opt=>{
  const el = document.createElement('button');
  el.className = 'block-opt';
  el.innerHTML = `<div class="ttl">${opt.ttl}</div><div class="desc">${opt.desc}</div>`;
  el.onclick = () => {
    const newBlk = { id:newId(), type:opt.type, ...opt.make() };
    const insertAt = (pendingInsertIndex==null ? state.doc.length-1 : pendingInsertIndex) + 1;
    state.doc.splice(insertAt, 0, newBlk);
    state.selectedId = newBlk.id;
    pickerBackdrop.classList.remove('open');
    markDirty(); render();
  };
  blockGrid.appendChild(el);
});

/* ===================== Toast (avec action optionnelle) ===================== */

function toast(msg, actionLabel, actionFn){
  const t = document.getElementById('toast');
  t.innerHTML = '';
  t.appendChild(document.createTextNode(msg));
  if(actionLabel && actionFn){
    const btn = document.createElement('button');
    btn.textContent = actionLabel;
    btn.onclick = () => { actionFn(); t.classList.remove('show'); };
    t.appendChild(btn);
  }
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> t.classList.remove('show'), actionLabel ? 6000 : 2600);
}

/* ===================== Boot ===================== */

render();

/* La mesure de débordement n'est fiable qu'une fois styles + polices chargés */
window.addEventListener('load', checkOverflow);
if(document.fonts && document.fonts.ready) document.fonts.ready.then(checkOverflow);
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(checkOverflow, 200);
});

/* Exposé pour storage.js et pdf-export.js */
window.__CARTE_STATE__ = state;
window.__CARTE_RENDER__ = render;
window.__CARTE_HELPERS__ = { toast, markDirty, clearDraft, getDraft, updateSyncStatus };
