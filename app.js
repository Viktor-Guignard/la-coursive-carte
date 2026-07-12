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
    b('formule', {text:'MENUS', italic:false, heading:true}),
    b('formule', {text:'ENTRÉE + PLAT ou/or PLAT + DESSERT 35€', italic:false}),
    b('formule', {text:'ENTRÉE + PLAT + DESSERT 39€', italic:false}),
    b('note', {text:'*Plats possibles dans les menus / Dishes included in the menu'}),
    b('section', {fr:'À PARTAGER', en:'To share'}),
    b('item', {fr:'CROQUE JAMBON À LA TRUFFE ET BEAUFORT', en:'Truffle ham and Beaufort cheese bread', price:'20€'}),
    b('item', {fr:'FOIE GRAS MAISON EN BALLOTTINE', en:'Home made foie gras terrine', price:'25€'}),
    b('item', {fr:'PÂTÉ EN CROÛTE MAISON DE FOIE GRAS, VOLAILLE ET PORC, CHUTNEY DE MANGUES', en:'Home made poultry, pork and foie gras pie, mango chutney', price:'20€'}),
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
    b('section', {fr:'PIZZAS CHICS!', en:''}),
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
  {type:'formule', ttl:'Ligne formule', desc:'Texte en couleur (ex. prix menu)', make:()=>({text:'NOUVELLE FORMULE', italic:false})},
  {type:'note', ttl:'Note / mention', desc:'Petit texte italique gris', make:()=>({text:'Note...'})},
  {type:'divider', ttl:'Séparateur', desc:'Ligne fine de séparation', make:()=>({})},
  {type:'pagebreak', ttl:'Saut de page', desc:'Démarre une nouvelle page PDF', make:()=>({})},
];

/* ===================== État ===================== */

const state = {
  doc: defaultDoc(),
  selectedId: null,
  currentVersionName: null,
};

/* ===================== Rendu ===================== */

const canvasWrap = document.getElementById('canvasWrap');

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
        <div class="badgeRow logoSlot" data-id="${blk.id}" data-field="logoImg">
          ${blk.logoImg ? `<img src="${blk.logoImg}" class="logo-badge" style="border-radius:50%;object-fit:cover;">` : logoPlaceholderSvg()}
        </div>
        <div class="side">
          <div class="chef">${ed(blk.id,'chef',esc(blk.chef))}</div>
          <div class="insta">${ed(blk.id,'insta',blk.insta)}</div>
          <div class="qr-box qrSlot" data-id="${blk.id}" data-field="qrImg">
            ${blk.qrImg ? `<img src="${blk.qrImg}">` : `<span style="font-size:9px;color:#999;text-align:center;">QR<br>code</span>`}
          </div>
          <div class="wifi" style="margin-top:8px;">${ed(blk.id,'wifi',blk.wifi)}</div>
        </div>`;
    case 'section':
      return `<h2>${ed(blk.id,'fr',esc(blk.fr))} ${blk.en!==undefined ? '<span class="en">/ '+ed(blk.id,'en',esc(blk.en))+'</span>' : ''}</h2>`;
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
  return c;
}

function logoPlaceholderSvg(){
  return `<svg class="logo-badge" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="96" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
    <path id="circlePathTop" d="M 20,100 A 80,80 0 0 1 180,100" fill="none"/>
    <path id="circlePathBottom" d="M 180,105 A 80,80 0 0 1 20,105" fill="none"/>
    <text font-family="Poppins, sans-serif" font-size="12.5" font-weight="700" letter-spacing="2" fill="#1a1a1a">
      <textPath href="#circlePathTop" startOffset="50%" text-anchor="middle">LE VRAI FAIT MAISON</textPath>
    </text>
    <text font-family="Poppins, sans-serif" font-size="11" font-weight="600" letter-spacing="1.5" fill="#1a1a1a">
      <textPath href="#circlePathBottom" startOffset="50%" text-anchor="middle">REAL HOME COOKING</textPath>
    </text>
    <g transform="translate(100,102)" stroke="#1a1a1a" stroke-width="3.5" fill="none" stroke-linejoin="round">
      <path d="M -22,10 L 0,-22 L 22,10"/>
      <path d="M -12,10 L -12,-4"/>
      <path d="M 12,10 L 12,-4"/>
      <path d="M -30,14 L 30,14"/>
    </g>
  </svg>`;
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
    pageBlocks.forEach((blk, idxInPage) => {
      pageEl.appendChild(buildInsertBar(state.doc.indexOf(blk)));
      pageEl.appendChild(buildBlockEl(blk));
    });
    pageEl.appendChild(buildInsertBar(state.doc.indexOf(pageBlocks[pageBlocks.length-1] || null), true, pageNum));
    canvasWrap.appendChild(pageEl);
    pageNum++;
    pageBlocks = [];
  };

  state.doc.forEach(blk => {
    if(blk.type === 'pagebreak'){
      pageBlocks.push(blk);
      flushPage();
    } else {
      pageBlocks.push(blk);
    }
  });
  flushPage();
}

function buildInsertBar(afterIndex, isEnd, pageNum){
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
  controls.className = 'block-controls';
  controls.innerHTML = `
    <button class="bctrl" data-act="up" title="Monter">↑</button>
    <button class="bctrl" data-act="down" title="Descendre">↓</button>
    <button class="bctrl danger" data-act="del" title="Supprimer">✕</button>`;
  wrap.appendChild(controls);

  wrap.addEventListener('click', (e) => {
    if(e.target.closest('.bctrl')) return;
    if(e.target.closest('.logoSlot') || e.target.closest('.qrSlot')) return;
    state.selectedId = blk.id;
  });

  controls.addEventListener('click', (e) => {
    const act = e.target.dataset.act;
    if(!act) return;
    const idx = state.doc.findIndex(x=>x.id===blk.id);
    if(act==='up' && idx>0){ [state.doc[idx-1],state.doc[idx]]=[state.doc[idx],state.doc[idx-1]]; render(); }
    if(act==='down' && idx<state.doc.length-1){ [state.doc[idx+1],state.doc[idx]]=[state.doc[idx],state.doc[idx+1]]; render(); }
    if(act==='del'){
      if(confirm('Supprimer ce bloc ?')){
        state.doc.splice(idx,1);
        render();
      }
    }
  });

  wrap.querySelectorAll('.logoSlot,.qrSlot').forEach(slot=>{
    slot.style.cursor = 'pointer';
    slot.title = 'Cliquer pour changer l\'image';
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
      blk[field] = reader.result;
      render();
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

/* Edition inline: on blur, écrire la valeur dans state.doc */
canvasWrap.addEventListener('blur', (e) => {
  const el = e.target;
  if(!el.matches || !el.matches('[contenteditable="true"]')) return;
  const id = el.dataset.id, field = el.dataset.field;
  const blk = state.doc.find(b=>b.id===id);
  if(!blk) return;
  if(field==='insta' || field==='wifi'){
    blk[field] = el.innerHTML.replace(/<div>|<\/div>/g,'<br>');
  } else {
    blk[field] = el.textContent;
  }
}, true);

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
    render();
  };
  blockGrid.appendChild(el);
});

/* ===================== Toast ===================== */
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> t.classList.remove('show'), 2600);
}

/* ===================== Boot ===================== */
render();

/* Exposé pour firebase.js et pdf-export.js (modules séparés) */
window.__CARTE_STATE__ = state;
window.__CARTE_RENDER__ = render;
