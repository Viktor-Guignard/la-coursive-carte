/* Export PDF : chaque .pdf-page = une page au format choisi dans 🎨 Apparence
   (A4, carte 14×34, A5…), sans fond perdu ni traits de coupe. */

async function exportPdf(){
  const btn = document.getElementById('exportPdfBtn');
  const pages = document.querySelectorAll('.pdf-page');
  if(pages.length === 0) return;

  document.querySelectorAll('[contenteditable="true"]').forEach(el => el.blur());

  const overflowing = document.querySelectorAll('.pdf-page.overflowing').length;
  if(overflowing > 0 && !confirm('⚠️ ' + overflowing + ' page(s) débordent du format A4 : le contenu en trop sera coupé dans le PDF. Exporter quand même ?')){
    return;
  }

  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = '⏳ Génération…';
  document.body.classList.add('exporting');

  try{
    const { jsPDF } = window.jspdf;
    const st = window.__CARTE_STATE__.style || {};
    const FORMATS = window.__CARTE_HELPERS__.PAGE_FORMATS;
    const fmt = FORMATS[st.format] || FORMATS.a4;
    const [wMm, hMm] = fmt.mm;
    const orientation = wMm > hMm ? 'landscape' : 'portrait';
    const pdf = new jsPDF({ orientation, unit:'mm', format:[wMm, hMm] });

    /* La classe « exporting » rétablit les dimensions exactes de la page
       (la vue responsive les écrase en fenêtre étroite). On laisse le
       navigateur recalculer la mise en page avant de capturer.
       setTimeout et non requestAnimationFrame : rAF est suspendu quand
       l'onglet passe en arrière-plan, ce qui bloquerait l'export. */
    document.body.offsetHeight;                       // force le recalcul immédiat
    await new Promise(r => setTimeout(r, 80));

    for(let i=0;i<pages.length;i++){
      const canvas = await html2canvas(pages[i], {
        scale: 2.5,
        /* fond de la carte : évite toute zone transparente ou grise
           dans les parties situées hors de la fenêtre visible */
        backgroundColor: st.pageBg || '#ffffff',
        useCORS: true,
        /* dimensions du format choisi, jamais celles de l'écran */
        width: fmt.w,
        height: fmt.h,
        /* viewport virtuel du rendu : au moins la taille de la page,
           sinon html2canvas ne peint pas ce qui dépasse de la fenêtre
           (bande grise à droite quand la fenêtre est étroite) */
        windowWidth: Math.max(document.documentElement.clientWidth, fmt.w + 40),
        windowHeight: Math.max(document.documentElement.clientHeight, fmt.h + 40),
        scrollX: 0,
        scrollY: 0,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.93);
      if(i > 0) pdf.addPage([wMm, hMm], orientation);
      pdf.addImage(imgData, 'JPEG', 0, 0, wMm, hMm);
    }

    const d = new Date();
    const pad = n => n<10 ? '0'+n : ''+n;
    const filename = `carte_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}h${pad(d.getMinutes())}.pdf`;
    pdf.save(filename);
    window.__CARTE_HELPERS__.toast('PDF exporté : ' + filename);
  } catch(err){
    console.error(err);
    window.__CARTE_HELPERS__.toast('Erreur export PDF.');
  } finally {
    btn.disabled = false;
    btn.textContent = originalLabel;
    document.body.classList.remove('exporting');
  }
}

document.getElementById('exportPdfBtn').addEventListener('click', exportPdf);
