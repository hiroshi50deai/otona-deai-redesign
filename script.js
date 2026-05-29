const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

function findSectionByText(text) {
  return Array.from(document.querySelectorAll('section')).find((section) => section.textContent.includes(text));
}

function setupNavigation() {
  if (!navToggle || !siteNav) return;
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? '×' : '☰';
  });
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });
}

function normalizeCharacterImages() {
  const replacements = {
    'assets/characters/05_icon_bust.png': 'assets/characters/teacher-new-icon.png',
    'assets/characters/01_hero_teacher.png': 'assets/characters/teacher-new-main.png',
    'assets/characters/02_worry.png': 'assets/characters/teacher-new-worry.png',
    'assets/characters/03_ok_explain.png': 'assets/characters/teacher-new-explain.png',
    'assets/characters/04_gentle_cta.png': 'assets/characters/teacher-new-cta.png',
    'assets/characters/sakura-worry.png': 'assets/characters/sakura-think.png',
    'assets/characters/sakura-thought.png': 'assets/characters/sakura-think.png',
    'assets/characters/sakura-listen.png': 'assets/characters/sakura-support.png',
    'assets/characters/sakura-guide.png': 'assets/characters/sakura-point.png',
  };
  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && replacements[src]) img.src = replacements[src];
  });
}

function enhanceSampleReportBeforeSubPhotos() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const mockup = document.querySelector('#app-mockup');
  if (!mockup) return;
  const beforeMain = mockup.querySelector('.phone-shell:first-child .app-photo-main img');
  if (beforeMain) {
    beforeMain.src = 'assets/samples/before-main-sub-sample.jpg';
    beforeMain.alt = '改善前の赤白チェックシャツのプロフィール写真サンプル';
  }
  const beforeGrid = mockup.querySelector('.phone-shell:first-child .app-photo-grid');
  if (!beforeGrid || beforeGrid.querySelector('img')) return;
  beforeGrid.innerHTML = `
    <div class="app-thumb"><img src="assets/samples/before-main-sub-sample.jpg" alt="改善前のメイン補助写真"><span class="app-thumb-label">メイン</span></div>
    <div class="app-thumb"><img src="assets/samples/before-dark-room-sample.jpg" alt="改善前の暗い室内写真"><span class="app-thumb-label">サブ写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-full-body-sample.jpg" alt="改善前の全身が伝わりにくい写真"><span class="app-thumb-label">全身写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-hobby-sample.jpg" alt="改善前の趣味が伝わりにくい写真"><span class="app-thumb-label">趣味写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-life-feeling-sample.jpg" alt="改善前の生活感が強い写真"><span class="app-thumb-label">生活感</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-conversation-topic-sample.jpg" alt="改善前の会話ネタが弱い写真"><span class="app-thumb-label">会話ネタ</span></div>`;
}

function enhanceSampleReportProfileCopy() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const section = findSectionByText('プロフィール文の行ごと添削');
  const table = section?.querySelector('table.report-table');
  if (table?.querySelector('thead')) {
    table.querySelector('thead').innerHTML = '<tr><th>現在の文</th><th>問題点</th><th>修正例</th><th>狙い</th></tr>';
  }
  if (table?.querySelector('tbody')) {
    table.querySelector('tbody').innerHTML = `
      <tr><td>仕事は会社員をしています。</td><td>職業情報だけで終わっていて、誠実さ・余裕・日常の雰囲気が見えません。</td><td>平日は仕事中心ですが、帰り道に映画のレビューを読んだり、週末に観たい作品を探したりする時間がちょうどいい息抜きになっています。</td><td><strong>仕事だけの人ではなく、日常に余裕のある人として伝える</strong></td></tr>
      <tr><td>休日は映画を見たり、カフェに行ったりしています。</td><td>趣味の羅列に見えます。女性が「一緒に行ったらどんな時間になるか」を想像しにくいです。</td><td>休日は、気になっていた映画を観てから、近くのカフェで感想を話すような落ち着いた時間が好きです。にぎやかすぎる場所より、ゆっくり会話できる雰囲気の方が合っています。</td><td><strong>一緒に過ごす情景を見せて、会う理由を作る</strong></td></tr>
      <tr><td>良い出会いがあればと思い登録しました。</td><td>受け身で、相手に何を大切にしている人なのかが伝わりません。</td><td>最初から無理に距離を詰めるより、メッセージで少しずつ人柄を知りながら、安心して会える関係を作れたらうれしいです。</td><td><strong>安心感と、関係を進めるペースを伝える</strong></td></tr>
      <tr><td>よろしくお願いします。</td><td>締めが弱く、相手が返信するきっかけがありません。</td><td>映画やカフェの話からでも、気軽にやり取りできたらうれしいです。最近観てよかった作品があれば、ぜひ教えてください。</td><td><strong>相手が返しやすい会話の入口を作る</strong></td></tr>`;
  }
  if (section && !section.querySelector('.line-editing-priority')) {
    const priority = document.createElement('div');
    priority.className = 'line-editing-priority';
    priority.innerHTML = `
      <div class="line-editing-priority__head">
        <p class="eyebrow">Priority</p>
        <h3>優先して直すポイント</h3>
        <p>全部を一気に直すより、女性から見た印象が大きく変わる順に整えます。</p>
      </div>
      <div class="line-priority-grid">
        <article><span>1位</span><h4>休日の過ごし方</h4><p>趣味の羅列ではなく、「一緒に過ごす情景」が浮かぶ文にする。</p></article>
        <article><span>2位</span><h4>締めの一言</h4><p>相手が返信しやすい質問や話題を用意し、会話の入口を作る。</p></article>
        <article><span>3位</span><h4>理想の関係</h4><p>抽象語だけでなく、安心して話せる日常の雰囲気として伝える。</p></article>
      </div>`;
    const bridge = document.createElement('div');
    bridge.className = 'completed-profile-bridge';
    bridge.innerHTML = `<p class="eyebrow">Completed Profile</p><h3>この添削を反映すると、下のような完成プロフィール文になります。</h3><p>問題点を指摘するだけでなく、最終的にそのまま使いやすい文章まで整えます。</p>`;
    section.querySelector('.diagnosis-table-card')?.insertAdjacentElement('afterend', priority);
    priority.insertAdjacentElement('afterend', bridge);
  }
  const completedText = findSectionByText('完成プロフィール文')?.querySelector('.completed-text');
  if (completedText) {
    completedText.innerHTML = 'はじめまして。プロフィールを見ていただきありがとうございます。<br><br>平日は仕事中心ですが、休日は気になっていた映画を観に行ったり、帰りに落ち着いたカフェで少しゆっくりしたりして過ごすことが多いです。派手なタイプではありませんが、相手の話を聞きながら、穏やかに会話する時間は好きです。<br><br>いきなり距離を詰めるより、まずはメッセージで少しずつ雰囲気を知れたらうれしいです。映画の話、休日の過ごし方、最近行ってよかったお店など、気軽なところから話せたらと思っています。<br><br>一緒にいて無理をしなくていい、自然体で笑える関係を大切にしたいです。よろしくお願いします。';
  }
}

function enhanceSampleReportPhotoAuditCards() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const section = findSectionByText('写真ごとの診断シート');
  const card = section?.querySelector('.diagnosis-table-card');
  if (!card || card.dataset.visualAudit === 'true') return;
  const items = [
    ['メイン写真','第一印象','差し替え推奨','assets/samples/before-main-sub-sample.jpg','assets/samples/profile-photo-after-sample.jpg','暗い室内・自撮り感・表情の硬さがあり、悪い人ではなさそうでも魅力が伝わりにくい状態です。','自然光・軽い笑顔・胸から上の他撮り風写真に変更。最初の1枚で清潔感と話しやすさが伝わる印象に改善。'],
    ['サブ写真1','休日感','追加推奨','assets/samples/before-dark-room-sample.jpg','assets/samples/after-walking-outdoor-sample.jpg','室内写真が続くと、休日の雰囲気や一緒に過ごすイメージが伝わりにくくなります。','散歩・外出・日常感が伝わる写真を追加。この人と会ったらこんな時間になりそう、が想像しやすくなります。'],
    ['サブ写真2','全身・服装','必須','assets/samples/before-no-full-body-sample.jpg','assets/samples/after-half-body-style-sample.jpg','体型や服装の雰囲気が伝わりにくく、会う前の安心材料が不足しています。','半身〜全身が分かる写真に変更。服装の清潔感、姿勢、全体のバランスが伝わりやすくなります。'],
    ['趣味写真','会話のきっかけ','改善余地あり','assets/samples/before-no-hobby-sample.jpg','assets/samples/after-hobby-movie-sample.jpg','趣味や人となりが写真から見えにくく、相手がメッセージで触れやすい話題が生まれにくい状態です。','映画・カフェ・散歩など、相手が質問しやすい写真を追加。会話の入口ができます。'],
  ];
  card.dataset.visualAudit = 'true';
  card.style.border = 'none';
  card.style.boxShadow = 'none';
  card.style.background = 'transparent';
  card.style.overflow = 'visible';
  card.innerHTML = `<div class="photo-audit-cards">${items.map(([title, role, badge, beforeSrc, afterSrc, beforeText, afterText]) => `<article class="photo-audit-card"><div class="photo-audit-pair"><div><img src="${beforeSrc}" alt="${title} 改善前"><span>Before</span></div><div><img src="${afterSrc}" alt="${title} 改善後"><span>After</span></div></div><div class="photo-audit-body"><h3>${title}</h3><p><strong>役割：</strong>${role}　<span class="tag warn">${badge}</span></p><p><strong>改善前：</strong>${beforeText}</p><p><strong>改善後：</strong>${afterText}</p></div></article>`).join('')}</div>`;
}

function enhanceSampleReportWardrobeGuide() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const photoSection = findSectionByText('写真ごとの診断シート');
  if (!photoSection || document.querySelector('.wardrobe-guide-section')) return;
  const section = document.createElement('section');
  section.className = 'section wardrobe-guide-section report-soft';
  section.innerHTML = `
    <div class="container"><div class="section-heading"><p class="eyebrow">Wardrobe Guide</p><h2>服装・買い足しガイド</h2><p>After写真のような印象は、高級ブランドで固めなくても作れます。大切なのは、ブランド名そのものよりも、色・サイズ感・清潔感・組み合わせです。</p></div></div>`;
  photoSection.insertAdjacentElement('afterend', section);
}

function enhanceSampleReportMessagePatterns() {
  if (!location.pathname.endsWith('sample-report.html')) return;
}

function enhanceSampleReportActionPlan() {
  if (!location.pathname.endsWith('sample-report.html')) return;
}

function addSampleReportStyles() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const style = document.createElement('style');
  style.textContent = `html,body{max-width:100%;overflow-x:hidden} img{max-width:100%} *{min-width:0}`;
  document.head.appendChild(style);
}

function addFooterUtilityLinks() {
  const footerInner = document.querySelector('.site-footer .footer-inner');
  if (!footerInner || footerInner.querySelector('.footer-utility-links')) return;
  const links = document.createElement('nav');
  links.className = 'footer-utility-links';
  links.setAttribute('aria-label', 'フッターリンク');
  links.innerHTML = '<a href="about.html">運営者情報</a><a href="contact.html">お問い合わせ</a><a href="privacy.html">プライバシーポリシー</a>';
  Object.assign(links.style,{display:'flex',flexWrap:'wrap',gap:'12px 18px',justifyContent:'center',marginTop:'14px',fontSize:'0.9rem'});
  links.querySelectorAll('a').forEach((link)=>{link.style.color='inherit';link.style.textDecoration='underline';link.style.textUnderlineOffset='3px';});
  footerInner.appendChild(links);
}

function enhanceWhy50sNoLikesArticleCta() {
  if (!location.pathname.endsWith('why-50s-men-get-no-likes.html')) return;
  const ctaBody = document.querySelector('.article-service-cta__body');
  if (!ctaBody || ctaBody.dataset.sampleReportCta === 'true') return;
  ctaBody.dataset.sampleReportCta = 'true';
  ctaBody.innerHTML = `<p class="article-service-cta__label">自分の場合、どこで損しているか知りたい方へ</p><h2>写真・プロフィール文・メッセージの見え方を、サンプル診断レポートで確認できます</h2><p>この記事で紹介した内容は、50代男性に多い一般的な改善ポイントです。ただ実際には、どこで損しているかは人によって違います。</p><p>「自分のプロフィールだと、どこを直せばいいのか知りたい」という方は、実際にどのような形で写真・プロフィール文・メッセージを整理するのか、まずはサンプル診断レポートをご覧ください。</p><a class="button button-primary" href="sample-report.html">サンプル診断レポートを見る</a>`;
}

function enhanceProfilePhotoNgArticleCta() {
  if (!location.pathname.endsWith('profile-photo-ng-40s-men.html')) return;
  const miniCta = document.querySelector('.service-mini-cta .service-copy');
  if (miniCta && miniCta.dataset.sampleReportCta !== 'true') {
    miniCta.dataset.sampleReportCta = 'true';
    miniCta.innerHTML = `<p class="eyebrow">Sample Report</p><figure class="article-visual cta-visual"><img src="assets/ctas/profile-redesign-before-after.png" alt="プロフィール写真の相談前と相談後の印象の違い。若作りではなく、女性に安心感が伝わる見せ方へ整えるイメージ" loading="lazy"></figure><h3>自分の写真がどこで損しているか知りたい方へ</h3><p>プロフィール写真を整えると、プロフィール文やメッセージの印象も変わります。ただ、どの写真が足を引っ張っているかは、自分だけでは気づきにくいものです。</p><p>実際にどのような形で写真・プロフィール文・メッセージ導線を整理するのか、まずはサンプル診断レポートで確認できます。</p><a class="btn btn-primary" href="sample-report.html">サンプル診断レポートを見る</a>`;
  }
  const finalCta = Array.from(document.querySelectorAll('section.article-conversation-block')).find((section) => section.textContent.includes('写真・プロフィール文・メッセージをまとめて整えたい方へ'));
  if (finalCta && finalCta.dataset.sampleReportCta !== 'true') {
    finalCta.dataset.sampleReportCta = 'true';
    finalCta.innerHTML = `<h2 class="article-conversation-block__title">自分の写真がどこで損しているか知りたい方へ</h2><p>この記事で紹介した内容は、40代男性に多い写真の改善ポイントです。ただ実際には、どの写真が足を引っ張っているかは人によって違います。</p><p>「自分の写真だと、どこを直せばいいのか知りたい」という方は、写真・プロフィール文・メッセージ導線をどう整理するのか、まずはサンプル診断レポートをご覧ください。</p><p><a class="btn btn-primary" href="sample-report.html">サンプル診断レポートを見る</a></p>`;
  }
}

function enhanceCleanlinessArticleCta() {
  if (!location.pathname.endsWith('middle-aged-men-cleanliness-mistakes.html')) return;
  const miniCta = document.querySelector('.service-mini-cta .service-copy');
  if (!miniCta || miniCta.dataset.sampleReportCta === 'true') return;
  miniCta.dataset.sampleReportCta = 'true';
  miniCta.innerHTML = `<p class="eyebrow">Sample Report</p><figure class="article-visual cta-visual"><img src="assets/ctas/profile-redesign-before-after.png" alt="清潔感・写真・プロフィール全体を整えることで印象が変わるイメージ" loading="lazy"></figure><h2>自分の見た目や清潔感がどう見られているか知りたい方へ</h2><p>清潔感・写真・プロフィール文の見え方を、サンプル診断レポートで確認できます。</p><p>この記事で紹介した内容は、中年男性に多い清潔感の改善ポイントです。ただ実際には、どこが女性から見て減点になっているかは、人によって違います。</p><p>「自分の場合、どこを直せば印象が良くなるのか知りたい」という方は、まずはサンプル診断レポートをご覧ください。</p><a class="btn btn-primary" href="sample-report.html">サンプル診断レポートを見る</a>`;
}

function enhanceProfileTextArticleCta() {
  if (!location.pathname.endsWith('profile-text-safe-adult-men.html')) return;
  const miniCta = document.querySelector('.service-mini-cta .service-copy');
  if (miniCta && miniCta.dataset.sampleReportCta !== 'true') {
    miniCta.dataset.sampleReportCta = 'true';
    miniCta.innerHTML = `<p class="eyebrow">Sample Report</p><figure class="article-visual cta-visual"><img src="assets/ctas/profile-redesign-before-after.png" alt="プロフィール文・写真・メッセージ全体を整えることで印象が変わるイメージ" loading="lazy"></figure><h3>自分のプロフィール文をどう直せばいいか知りたい方へ</h3><p>プロフィール文・写真・メッセージの見え方を、サンプル診断レポートで確認できます。</p><p>この記事で紹介した内容は、40代・50代男性に多いプロフィール文の改善ポイントです。ただ実際には、どの文章が女性から見て不安に見えているかは、人によって違います。</p><p>「自分のプロフィール文だと、どこを直せば安心感が伝わるのか知りたい」という方は、まずはサンプル診断レポートをご覧ください。</p><a class="btn btn-primary" href="sample-report.html">サンプル診断レポートを見る</a>`;
  }
  const finalCta = Array.from(document.querySelectorAll('section.article-conversation-block')).find((section) => section.textContent.includes('プロフィール文が女性にどう見えているか不安'));
  if (finalCta && finalCta.dataset.sampleReportCta !== 'true') {
    finalCta.dataset.sampleReportCta = 'true';
    finalCta.innerHTML = `<h2 class="article-conversation-block__title">自分のプロフィール文をどう直せばいいか知りたい方へ</h2><p>この記事で紹介した内容は、40代・50代男性に多いプロフィール文の改善ポイントです。ただ実際には、どの文章が女性から見て不安に見えているかは、人によって違います。</p><p>「自分のプロフィール文だと、どこを直せば安心感が伝わるのか知りたい」という方は、プロフィール文・写真・メッセージの見え方をどう整理するのか、まずはサンプル診断レポートをご覧ください。</p><p><a class="btn btn-primary" href="sample-report.html">サンプル診断レポートを見る</a></p>`;
  }
}

function enhanceFirstMessageArticleCta() {
  if (!location.pathname.endsWith('first-message-not-continue.html')) return;
  const miniCta = document.querySelector('.service-mini-cta .service-copy');
  if (!miniCta || miniCta.dataset.sampleReportCta === 'true') return;
  miniCta.dataset.sampleReportCta = 'true';
  miniCta.innerHTML = `<p class="eyebrow">Sample Report</p><figure class="article-visual cta-visual"><img src="assets/ctas/profile-redesign-before-after.png" alt="初回メッセージ・プロフィール文・写真をまとめて整えることで印象が変わるイメージ" loading="lazy"></figure><h2>自分のメッセージが返されにくい理由を知りたい方へ</h2><p>初回メッセージ・プロフィール文・写真の見え方を、サンプル診断レポートで確認できます。</p><p>この記事で紹介した内容は、マッチングアプリで初回メッセージが続かない男性に多い改善ポイントです。ただ実際には、どこで返信しにくくなっているかは、人によって違います。</p><p>「自分のメッセージだと、どこを直せば返しやすくなるのか知りたい」という方は、まずはサンプル診断レポートをご覧ください。</p><a class="btn btn-primary" href="sample-report.html">サンプル診断レポートを見る</a>`;
}

function runEnhancements() {
  setupNavigation();
  normalizeCharacterImages();
  enhanceSampleReportBeforeSubPhotos();
  enhanceSampleReportProfileCopy();
  enhanceSampleReportPhotoAuditCards();
  enhanceSampleReportWardrobeGuide();
  enhanceSampleReportMessagePatterns();
  enhanceSampleReportActionPlan();
  addSampleReportStyles();
  enhanceWhy50sNoLikesArticleCta();
  enhanceProfilePhotoNgArticleCta();
  enhanceCleanlinessArticleCta();
  enhanceProfileTextArticleCta();
  enhanceFirstMessageArticleCta();
  addFooterUtilityLinks();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runEnhancements);
} else {
  runEnhancements();
}
