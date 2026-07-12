async function exportPdf(){
  const btn = document.getElementById('exportPdfBtn');
  const pages = document.querySelectorAll('.pdf-page');
  if(pages.length === 0) return;

  document.querySelectorAll('[contenteditable="true"]').forEach(el => el.blur());

  btn.disabled = true;
  const originalLabel = btn.textContent;
  btn.textContent = '⏳ Génération…';

  document.body.classList.add('exporting');

  try{
    const { jsPDF } = window.jspdf;
    let pdf = null;

    for(let i=0;i<pages.length;i++){
      const page = pages[i];
      const canvas = await html2canvas(page, { scale: 2, backgroundColor:'#ffffff', useCORS:true });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const wMm = page.offsetWidth * 25.4 / 96;
      const hMm = page.offsetHeight * 25.4 / 96;
      if(!pdf){
        pdf = new jsPDF({ orientation: wMm>hMm?'landscape':'portrait', unit:'mm', format:[wMm,hMm] });
      } else {
        pdf.addPage([wMm,hMm], wMm>hMm?'landscape':'portrait');
      }
      pdf.addImage(imgData,'JPEG',0,0,wMm,hMm);
    }

    const d = new Date();
    const pad = n => n<10 ? '0'+n : ''+n;
    const filename = `carte_${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}h${pad(d.getMinutes())}.pdf`;
    pdf.save(filename);
    toast('PDF exporté : ' + filename);
  } catch(err){
    console.error(err);
    toast('Erreur export PDF.');
  } finally {
    btn.disabled = false;
    btn.textContent = originalLabel;
    document.body.classList.remove('exporting');
  }
}

document.getElementById('exportPdfBtn').addEventListener('click', exportPdf);
