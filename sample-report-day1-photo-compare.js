function enhanceSampleReportDay1PhotoCompareStandalone(){
  if(!location.pathname.endsWith('sample-report.html')) return;
  const run=()=>{
    const day1Card=Array.from(document.querySelectorAll('.action-day-card')).find(card=>card.textContent.includes('1日目')&&card.textContent.includes('メイン写真を差し替える'));
    if(!day1Card||day1Card.dataset.photoCompareEnhanced==='true') return;
    const body=day1Card.querySelector('.action-day-body');
    if(!body) return;
    day1Card.dataset.photoCompareEnhanced='true';
    body.insertAdjacentHTML('afterbegin',`<div class="action-photo-compare" aria-label="1日目のメイン写真ビフォーアフター比較"><figure class="action-photo-item"><span class="action-photo-label action-photo-label--before">Before</span><img src="assets/samples/before-main-sub-sample.jpg" alt="改善前のメイン写真サンプル" loading="lazy"><figcaption>暗さ・自撮り感があり、第一印象で少し損しやすい</figcaption></figure><figure class="action-photo-item"><span class="action-photo-label action-photo-label--after">After</span><img src="assets/samples/profile-photo-after-sample.jpg" alt="改善後のメイン写真サンプル" loading="lazy"><figcaption>自然光・軽い笑顔で、清潔感と親しみやすさが伝わる</figcaption></figure></div>`);
  };
  const style=document.createElement('style');
  style.textContent='.action-photo-compare{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:8px}.action-photo-item{margin:0;padding:10px;border:1px solid rgba(21,42,77,.12);border-radius:18px;background:#fff}.action-photo-item img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;border-radius:14px}.action-photo-item figcaption{margin-top:8px;font-size:.78rem;line-height:1.55;color:#52607a}.action-photo-label{display:inline-flex;align-items:center;justify-content:center;padding:4px 10px;border-radius:999px;font-size:.72rem;font-weight:800;margin-bottom:8px}.action-photo-label--before{background:#e2e8f0;color:#0f172a}.action-photo-label--after{background:#dbeafe;color:#1e3a8a}@media(max-width:768px){.action-photo-compare{gap:10px}.action-photo-item{padding:8px}.action-photo-item figcaption{font-size:.74rem}}';
  document.head.appendChild(style);
  run();
  setTimeout(run,100);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhanceSampleReportDay1PhotoCompareStandalone);else enhanceSampleReportDay1PhotoCompareStandalone();
