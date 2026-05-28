function enhanceSampleReportPhotoCompareStandalone(){
  if(!location.pathname.endsWith('sample-report.html')) return;

  const ensureStyle=()=>{
    if(document.getElementById('action-photo-compare-style')) return;
    const style=document.createElement('style');
    style.id='action-photo-compare-style';
    style.textContent='.action-photo-compare{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:8px}.action-photo-item{margin:0;padding:10px;border:1px solid rgba(21,42,77,.12);border-radius:18px;background:#fff}.action-photo-item img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;border-radius:14px}.action-photo-item figcaption{margin-top:8px;font-size:.78rem;line-height:1.55;color:#52607a}.action-photo-label{display:inline-flex;align-items:center;justify-content:center;padding:4px 10px;border-radius:999px;font-size:.72rem;font-weight:800;margin-bottom:8px}.action-photo-label--before{background:#e2e8f0;color:#0f172a}.action-photo-label--after{background:#dbeafe;color:#1e3a8a}@media(max-width:768px){.action-photo-compare{gap:10px}.action-photo-item{padding:8px}.action-photo-item figcaption{font-size:.74rem}}';
    document.head.appendChild(style);
  };

  const addCompare=({day,title,beforeSrc,beforeAlt,beforeCaption,afterSrc,afterAlt,afterCaption,ariaLabel})=>{
    const card=Array.from(document.querySelectorAll('.action-day-card')).find((item)=>item.textContent.includes(day)&&item.textContent.includes(title));
    if(!card||card.dataset.photoCompareEnhanced==='true') return;
    const body=card.querySelector('.action-day-body');
    if(!body) return;
    card.dataset.photoCompareEnhanced='true';
    body.insertAdjacentHTML('afterbegin',`<div class="action-photo-compare" aria-label="${ariaLabel}"><figure class="action-photo-item"><span class="action-photo-label action-photo-label--before">Before</span><img src="${beforeSrc}" alt="${beforeAlt}" loading="lazy"><figcaption>${beforeCaption}</figcaption></figure><figure class="action-photo-item"><span class="action-photo-label action-photo-label--after">After</span><img src="${afterSrc}" alt="${afterAlt}" loading="lazy"><figcaption>${afterCaption}</figcaption></figure></div>`);
  };

  const run=()=>{
    ensureStyle();
    addCompare({
      day:'1日目',
      title:'メイン写真を差し替える',
      beforeSrc:'assets/samples/before-main-sub-sample.jpg',
      beforeAlt:'改善前のメイン写真サンプル',
      beforeCaption:'暗さ・自撮り感があり、第一印象で少し損しやすい',
      afterSrc:'assets/samples/profile-photo-after-sample.jpg',
      afterAlt:'改善後のメイン写真サンプル',
      afterCaption:'自然光・軽い笑顔で、清潔感と親しみやすさが伝わる',
      ariaLabel:'1日目のメイン写真ビフォーアフター比較'
    });
    addCompare({
      day:'3日目',
      title:'サブ写真を1枚追加する',
      beforeSrc:'assets/samples/before-no-hobby-sample.jpg',
      beforeAlt:'改善前の趣味が伝わりにくいサブ写真サンプル',
      beforeCaption:'人柄や趣味が見えにくく、会話の入口になりにくい',
      afterSrc:'assets/samples/after-hobby-movie-sample.jpg',
      afterAlt:'改善後の映画趣味が伝わるサブ写真サンプル',
      afterCaption:'映画好きが自然に伝わり、相手が話題を振りやすい',
      ariaLabel:'3日目のサブ写真ビフォーアフター比較'
    });
    addCompare({
      day:'4日目',
      title:'初回メッセージを変える',
      beforeSrc:'assets/samples/first-message-before-after-sample.jpg',
      beforeAlt:'初回メッセージのビフォーアフター改善例',
      beforeCaption:'無難な挨拶だけだと、相手が返す理由を見つけにくい',
      afterSrc:'assets/samples/message-patterns-mockup.png',
      afterAlt:'初回メッセージ改善パターンのやり取りモック',
      afterCaption:'相手プロフィールに触れ、返しやすい質問で会話の入口を作る',
      ariaLabel:'4日目の初回メッセージビフォーアフター比較'
    });
  };

  run();
  setTimeout(run,100);
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',enhanceSampleReportPhotoCompareStandalone);
}else{
  enhanceSampleReportPhotoCompareStandalone();
}
