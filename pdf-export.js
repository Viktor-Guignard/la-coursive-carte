/* Export PDF.

   CHEMIN PRINCIPAL — impression native du navigateur (window.print).
   Le PDF est produit par le navigateur lui-même : texte VECTORIEL,
   polices exactes, rendu identique à l'écran, dans TOUS les
   navigateurs (Safari compris) et pour un fichier 6× plus léger.

   Pourquoi ce changement : html2canvas re-mesure et repositionne
   chaque morceau de texte lui-même. Dans Safari ces mesures sont
   faussées (protections anti-pistage sur le canvas) — mots collés,
   puis interlettrage irrégulier malgré les correctifs. Aucun réglage
   côté page ne peut le corriger de façon fiable.

   CHEMIN DE SECOURS — l'ancienne capture image reste disponible via
   window.__exportPdfImage() (console) si un cas particulier l'exige. */

const EXPORT_VERSION = 'v21';

const XP_S = () => window.__CARTE_STATE__;
const XP_H = () => window.__CARTE_HELPERS__;

/* Mode « pages seules » (?print=1) : utile pour vérifier le rendu
   d'impression sans l'interface de l'éditeur. */
if (new URLSearchParams(location.search).has('print')) {
  document.body.classList.add('exporting', 'print-mode');
}

/* ---------- Règle @page au format exact de la carte ---------- */

function applyPageRule() {
  const st = XP_S().style || {};
  const fmt = XP_H().PAGE_FORMATS[st.format] || XP_H().PAGE_FORMATS.a4;
  const [wMm, hMm] = fmt.mm;
  let tag = document.getElementById('printPageRule');
  if (!tag) {
    tag = document.createElement('style');
    tag.id = 'printPageRule';
    document.head.appendChild(tag);
  }
  /* size : le format réel de la carte, marge nulle (les marges de la
     carte sont déjà dans la mise en page). */
  tag.textContent = `@page{size:${wMm}mm ${hMm}mm; margin:0;}`;
  return { wMm, hMm };
}

/* ---------- Fenêtre d'explication avant impression ---------- */

function printHelpModal(dims, onConfirm) {
  let back = document.getElementById('printBackdrop');
  if (back) back.remove();
  back = document.createElement('div');
  back.id = 'printBackdrop';
  back.className = 'modal-backdrop open';
  back.innerHTML = `
    <div class="modal">
      <button class="modal-close" id="printClose">×</button>
      <h3>Télécharger le PDF</h3>
      <p class="sub">La fenêtre d'impression de votre navigateur va s'ouvrir. C'est elle qui fabrique le PDF — le résultat est <b>exactement</b> ce que vous voyez à l'écran.</p>
      <ol class="steps">
        <li><b>Destination</b> (ou « Imprimante ») : choisissez <b>Enregistrer au format PDF</b> — dans Safari, c'est le menu <b>PDF</b> en bas à gauche → <i>Enregistrer au format PDF</i>.</li>
        <li><b>Marges</b> : <b>Aucune</b>.</li>
        <li>Décochez <b>En-têtes et pieds de page</b>.</li>
        <li>Vérifiez que l'échelle est à <b>100 %</b> (pas « ajuster à la page »).</li>
      </ol>
      <p class="sub">Format de cette carte : <b>${dims.wMm} × ${dims.hMm} mm</b> — il est déjà appliqué, vous n'avez rien à régler.</p>
      <div class="modal-actions">
        <button type="button" class="tbtn secondary" id="printCancel">Annuler</button>
        <button type="button" class="tbtn teal" id="printGo">Ouvrir l'impression</button>
      </div>
    </div>`;
  document.body.appendChild(back);
  const close = () => back.remove();
  back.querySelector('#printClose').onclick = close;
  back.querySelector('#printCancel').onclick = close;
  back.onclick = (e) => { if (e.target === back) close(); };
  back.querySelector('#printGo').onclick = () => { close(); onConfirm(); };
}

/* ---------- Export principal ---------- */

function exportPdf() {
  if (document.querySelectorAll('.pdf-page').length === 0) return;
  document.querySelectorAll('[contenteditable="true"]').forEach(el => el.blur());

  const overflowing = document.querySelectorAll('.pdf-page.overflowing').length;
  if (overflowing > 0 && !confirm('⚠️ ' + overflowing + ' page(s) débordent du format : le contenu en trop sera coupé. Continuer ?')) {
    return;
  }

  const dims = applyPageRule();
  printHelpModal(dims, () => {
    /* « exporting » rétablit les dimensions et marges exactes : à
       l'impression la largeur de page (794 px en A4) est inférieure au
       seuil de la vue mobile, qui écraserait sinon les marges. */
    document.body.classList.add('exporting');
    const cleanup = () => {
      document.body.classList.remove('exporting');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    /* Filet de sécurité : certains navigateurs n'émettent pas
       « afterprint » si l'utilisateur annule. */
    setTimeout(cleanup, 120000);
    /* Laisser le temps à la modale de disparaître et à la mise en page
       de se recalculer avant d'ouvrir le dialogue système. */
    setTimeout(() => window.print(), 250);
  });
}

/* ---------- Secours : ancienne capture image (non utilisée) ---------- */

window.__exportPdfImage = async function () {
  const pages = document.querySelectorAll('.pdf-page');
  const { jsPDF } = window.jspdf;
  const st = XP_S().style || {};
  const fmt = XP_H().PAGE_FORMATS[st.format] || XP_H().PAGE_FORMATS.a4;
  const [wMm, hMm] = fmt.mm;
  const orientation = wMm > hMm ? 'landscape' : 'portrait';
  const pdf = new jsPDF({ orientation, unit: 'mm', format: [wMm, hMm] });
  document.body.classList.add('exporting');
  try {
    try { await document.fonts.ready; } catch (_) { }
    document.body.offsetHeight;
    await new Promise(r => setTimeout(r, 300));
    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 2.5, backgroundColor: st.pageBg || '#ffffff', useCORS: true,
        width: fmt.w, height: fmt.h,
        windowWidth: Math.max(document.documentElement.clientWidth, fmt.w + 40),
        windowHeight: Math.max(document.documentElement.clientHeight, fmt.h + 40),
        scrollX: 0, scrollY: 0,
      });
      if (i > 0) pdf.addPage([wMm, hMm], orientation);
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.93), 'JPEG', 0, 0, wMm, hMm);
    }
    const slug = window.currentMenuSlug ? window.currentMenuSlug() : 'carte';
    pdf.save(`${slug}_image_${GHUB.timestampSuffix()}.pdf`);
  } finally {
    document.body.classList.remove('exporting');
  }
};

document.getElementById('exportPdfBtn').addEventListener('click', exportPdf);
