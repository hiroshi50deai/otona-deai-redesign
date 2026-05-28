const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const characterImageReplacements = {
  'assets/characters/05_icon_bust.png': 'assets/characters/teacher-new-icon.png',
  'assets/characters/01_hero_teacher.png': 'assets/characters/teacher-new-main.png',
  'assets/characters/02_worry.png': 'assets/characters/teacher-new-worry.png',
  'assets/characters/03_ok_explain.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/04_gentle_cta.png': 'assets/characters/teacher-new-cta.png',
};

function findSectionByText(text) {
  return Array.from(document.querySelectorAll('section')).find((section) => section.textContent.includes(text));
}

function normalizeCharacterImages() {
  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    if (src && characterImageReplacements[src]) img.src = characterImageReplacements[src];
  });
}

function enhanceSampleReportBeforeSubPhotos() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const mockup = document.querySelector('#app-mockup');
  if (!mockup) return;
  const beforeMain = mockup.querySelector('.phone-shell:first-child .app-photo-main img');
  if (beforeMain) {
    beforeMain.src = 'assets/samples/before-main-sub-sample.jpg';
    beforeMain.alt = '改善前のプロフィール写真サンプル';
  }
  const beforeGrid = mockup.querySelector('.phone-shell:first-child .app-photo-grid');
  if (!beforeGrid || beforeGrid.querySelector('img')) return;
  beforeGrid.innerHTML = `
    <div class="app-thumb"><img src="assets/samples/before-main-sub-sample.jpg" alt="改善前メイン"><span class="app-thumb-label">メイン</span></div>
    <div class="app-thumb"><img src="assets/samples/before-dark-room-sample.jpg" alt="暗い室内"><span class="app-thumb-label">サブ写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-full-body-sample.jpg" alt="全身が弱い"><span class="app-thumb-label">全身写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-hobby-sample.jpg" alt="趣味が弱い"><span class="app-thumb-label">趣味写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-life-feeling-sample.jpg" alt="生活感"><span class="app-thumb-label">生活感</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-conversation-topic-sample.jpg" alt="会話ネタ"><span class="app-thumb-label">会話ネタ</span></div>`;
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
    const after = document.createElement('div');
    after.className = 'line-editing-priority';
    after.innerHTML = `<p class="eyebrow">Priority</p><h3>優先して直すポイント</h3><p>全部を一気に直すより、女性から見た印象が大きく変わる順に整えます。</p><div class="line-priority-grid"><article><span>1位</span><h4>休日の過ごし方</h4><p>趣味の羅列ではなく、一緒に過ごす情景が浮かぶ文にする。</p></article><article><span>2位</span><h4>締めの一言</h4><p>相手が返信しやすい質問や話題を用意する。</p></article><article><span>3位</span><h4>理想の関係</h4><p>安心して話せる日常の雰囲気として伝える。</p></article></div>`;
    section.querySelector('.diagnosis-table-card')?.insertAdjacentElement('afterend', after);
  }
  const completedText = findSectionByText('完成プロフィール文')?.querySelector('.completed-text');
  if (completedText) completedText.innerHTML = 'はじめまして。プロフィールを見ていただきありがとうございます。<br><br>平日は仕事中心ですが、休日は気になっていた映画を観に行ったり、帰りに落ち着いたカフェで少しゆっくりしたりして過ごすことが多いです。派手なタイプではありませんが、相手の話を聞きながら、穏やかに会話する時間は好きです。<br><br>いきなり距離を詰めるより、まずはメッセージで少しずつ雰囲気を知れたらうれしいです。映画の話、休日の過ごし方、最近行ってよかったお店など、気軽なところから話せたらと思っています。<br><br>一緒にいて無理をしなくていい、自然体で笑える関係を大切にしたいです。よろしくお願いします。';
}

function enhanceSampleReportPhotoAuditCards() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const section = findSectionByText('写真ごとの診断シート');
  const card = section?.querySelector('.diagnosis-table-card');
  if (!card || card.dataset.visualAudit) return;
  const items = [
    ['メイン写真','第一印象','差し替え推奨','assets/samples/before-main-sub-sample.jpg','assets/samples/profile-photo-after-sample.jpg','暗い室内・自撮り感・表情の硬さで魅力が伝わりにくい状態です。','自然光・軽い笑顔・胸から上の他撮り風写真へ。'],
    ['サブ写真1','休日感','追加推奨','assets/samples/before-dark-room-sample.jpg','assets/samples/after-walking-outdoor-sample.jpg','休日の雰囲気や一緒に過ごすイメージが弱い状態です。','散歩・外出・日常感が伝わる写真を追加。'],
    ['サブ写真2','全身・服装','必須','assets/samples/before-no-full-body-sample.jpg','assets/samples/after-half-body-style-sample.jpg','体型や服装の雰囲気が伝わりにくい状態です。','半身〜全身が分かる写真で安心材料を増やす。'],
    ['趣味写真','会話のきっかけ','改善余地あり','assets/samples/before-no-hobby-sample.jpg','assets/samples/after-hobby-movie-sample.jpg','相手が触れやすい話題が生まれにくい状態です。','映画・カフェ・散歩など会話の入口を作る写真へ。'],
  ];
  card.dataset.visualAudit = 'true';
  card.style.cssText = 'border:none;box-shadow:none;background:transparent;overflow:visible;';
  card.innerHTML = `<div class="photo-audit-cards">${items.map(([title, role, badge, beforeSrc, afterSrc, beforeText, afterText]) => `<article class="photo-audit-card"><div class="photo-audit-pair"><div><img src="${beforeSrc}" alt="${title} 改善前"><span>Before</span></div><div><img src="${afterSrc}" alt="${title} 改善後"><span>After</span></div></div><div class="photo-audit-body"><h3>${title}</h3><p><strong>役割：</strong>${role}　<span class="tag warn">${badge}</span></p><p><strong>改善前：</strong>${beforeText}</p><p><strong>改善後：</strong>${afterText}</p></div></article>`).join('')}</div>`;
}

function enhanceSampleReportWardrobeGuide() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const photoSection = findSectionByText('写真ごとの診断シート');
  if (!photoSection || document.querySelector('.wardrobe-guide-section')) return;
  const section = document.createElement('section');
  section.className = 'section wardrobe-guide-section report-soft';
  section.innerHTML = `<div class="container"><div class="section-heading"><p class="eyebrow">Wardrobe Guide</p><h2>服装・買い足しガイド</h2><p>高級ブランドで固めなくても、色・サイズ感・清潔感・組み合わせで印象は整います。</p></div><div class="wardrobe-hero-card"><img src="assets/samples/after-half-body-style-sample.jpg" alt="After写真の全身コーディネート"><div><p class="eyebrow">After写真を再現する基本4点セット</p><h3>ジャケット ＋ 白T ＋ 濃色パンツ ＋ きれいめ靴</h3><p>まずこの4点を整えるだけでも、写真の印象はかなり変わります。</p></div></div><div class="wardrobe-item-grid"><article><h3>① ネイビー〜黒系ジャケット</h3><p>初対面でちゃんとして見える定番です。</p></article><article><h3>② 白の無地Tシャツ</h3><p>顔まわりが明るく見えます。</p></article><article><h3>③ 黒〜濃色パンツ</h3><p>全体が引き締まります。</p></article><article><h3>④ レザー白スニーカー / レザーローファー</h3><p>足元の生活感を消します。</p></article></div><div class="wardrobe-priority-card"><h3>買い足すならこの順番</h3><div class="wardrobe-step-grid"><article><img src="assets/samples/wardrobe-item-01-jacket.png" alt="ジャケット"><strong>STEP 1</strong><p>ジャケット</p></article><article><img src="assets/samples/wardrobe-item-02-white-tshirt.png" alt="白T"><strong>STEP 2</strong><p>白T / 白系インナー</p></article><article><img src="assets/samples/wardrobe-item-03-dark-pants.png" alt="濃色パンツ"><strong>STEP 3</strong><p>濃色パンツ</p></article><article><img src="assets/samples/wardrobe-item-04-shoes.png" alt="靴"><strong>STEP 4</strong><p>きれいめな靴</p></article></div></div></div>`;
  photoSection.insertAdjacentElement('afterend', section);
}

function enhanceSampleReportMessagePatterns() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const section = findSectionByText('初回メッセージ改善パターン');
  const container = section?.querySelector('.container');
  if (!container || container.dataset.messageEnhanced) return;
  container.dataset.messageEnhanced = 'true';
  container.innerHTML = `<div class="section-heading"><p class="eyebrow">Message Patterns</p><h2>初回メッセージ改善パターン</h2><p>相手プロフィールに合わせて使いやすい初回メッセージを、実際のやり取りイメージ付きで提案します。</p></div><article class="report-card sample-img-card message-mockup-card"><h3>実際のやり取りイメージ</h3><p class="report-note">どこを見るか → 共感 → 返しやすい質問の流れで作ります。</p><img src="assets/samples/message-patterns-mockup.png" alt="初回メッセージ改善パターンのやり取りモック" loading="lazy"></article><div class="report-grid-3 message-pattern-card-grid"><article class="message-card"><span>Pattern A</span><h3>カフェ趣味に触れる</h3><p class="report-note">使いやすい相手：カフェ巡り、落ち着いた休日、映画好き</p><div class="message-bubble">はじめまして。マッチありがとうございます。プロフィールを見て、カフェ巡りが好きなところに親近感を持ちました。最近行ってよかったお店ってありますか？</div></article><article class="message-card"><span>Pattern B</span><h3>休日感に触れる</h3><p class="report-note">使いやすい相手：散歩、ゆっくりした休日、映画、カフェ</p><div class="message-bubble">はじめまして。休日をゆっくり過ごす感じが似ているなと思って、いいねしました。最近は外で過ごす日と家でのんびりする日、どちらが多いですか？</div></article><article class="message-card"><span>Pattern C</span><h3>写真の雰囲気に触れる</h3><p class="report-note">使いやすい相手：自然な写真、旅行先の写真、屋外写真</p><div class="message-bubble">はじめまして。写真の雰囲気が自然で、話しやすそうだなと思いました。あの写真は旅行先ですか？</div></article></div><div class="completed-profile-bridge"><p class="eyebrow">Point</p><h3>例文だけでなく、狙いまでセットで提案します。</h3><p>相手プロフィールのどこを見て、どう共感し、どんな質問で返しやすくするかまで整理します。</p></div>`;
}

function enhanceSampleReportActionPlan() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const section = findSectionByText('7日間の改善アクションプラン');
  const container = section?.querySelector('.container');
  if (!container || container.dataset.actionEnhanced) return;
  container.dataset.actionEnhanced = 'true';
  const days = [
    ['1日目','メイン写真を差し替える','自然光・軽い笑顔・胸から上の他撮り風写真候補','足あと / いいね率 / 写真の離脱感','表情・明るさ・背景を再確認','#eff6ff'],
    ['2日目','プロフィール文の冒頭を変更する','日常と人柄が伝わる冒頭文','プロフィール閲覧後の反応 / いいねの質','抽象語を減らし、休日の情景を足す','#f0fdf4'],
    ['3日目','サブ写真を1枚追加する','休日感・服装感・趣味が伝わる写真候補','写真全体を見た時の安心感 / 会話のきっかけ','暗い室内写真や生活感の強い写真を減らす','#fffbeb'],
    ['4日目','初回メッセージを変える','相手プロフィール別の初回メッセージ例 A/B/C','返信率 / 返信までの速さ / 会話の続きやすさ','質問が重い場合は選択式に変える','#f5f3ff'],
    ['5〜7日目','反応を見て再調整する','写真・文章・メッセージの微修正リスト','足あと、いいね、マッチ、返信率の推移','反応が弱い箇所から優先して再調整','#fdf2f8'],
  ];
  container.innerHTML = `<div class="section-heading"><p class="eyebrow">7 Days Action Plan</p><h2>7日間の改善アクションプラン</h2><p>診断レポートは読むだけで終わらせず、何を・なぜ・どう直すか、さらに反応をどう見るかまで行動順に整理します。</p></div><div class="action-overview-grid"><article class="report-card"><p class="eyebrow">海外式の納品イメージ</p><h3>行動計画・理由・具体例・測定方法までセットで返す</h3><p>単なるToDo表ではなく、各日の作業に「納品物」「見る指標」「次の調整」を付けることで、迷わず改善しやすくします。</p></article><article class="report-card action-overview-card--accent"><p class="eyebrow">What You Get</p><h3>この7日間で整えるもの</h3><ul><li>写真の第一印象</li><li>プロフィール文の安心感</li><li>サブ写真の会話きっかけ</li><li>初回メッセージの返信しやすさ</li><li>反応を見た再調整</li></ul></article></div><div class="action-plan-grid">${days.map(([day,title,deliverable,metric,adjust,color]) => `<article class="action-day-card" style="--action-bg:${color}"><div class="action-day-head"><span>${day}</span><h3>${title}</h3></div><div class="action-day-body"><p><strong>納品物</strong>${deliverable}</p><p><strong>見る指標</strong>${metric}</p><p><strong>次の調整</strong>${adjust}</p></div></article>`).join('')}</div><div class="completed-profile-bridge action-plan-point"><p class="eyebrow">Point</p><h3>読むレポートではなく、実行できるレポートにする。</h3><p>「何をするか」だけでなく、「何を見て判断するか」「反応が悪ければどう直すか」まで書くことで、改善が止まりにくくなります。</p></div>`;
}

function addSampleReportMobileFixes() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const style = document.createElement('style');
  style.textContent = `
    html,body{max-width:100%;overflow-x:hidden} img{max-width:100%} *{min-width:0}.completed-profile-bridge,.line-editing-priority{margin-top:18px;padding:22px;border-radius:28px;background:#fff7ed;border:1px solid rgba(224,122,154,.18)}.line-editing-priority{background:#fff;border:1px solid var(--border);box-shadow:0 14px 36px rgba(21,42,77,.07)}.line-priority-grid,.action-overview-grid,.action-plan-grid,.photo-audit-cards{display:grid;gap:14px}.line-priority-grid{grid-template-columns:repeat(3,1fr)}.line-priority-grid article,.photo-audit-card,.action-day-card,.wardrobe-item-grid article,.wardrobe-priority-card,.wardrobe-step-grid article{padding:18px;border-radius:22px;background:#fff;border:1px solid var(--border);box-shadow:0 14px 36px rgba(21,42,77,.06)}.line-priority-grid span,.action-day-head span{display:inline-flex;padding:5px 10px;border-radius:999px;background:var(--navy);color:#fff;font-weight:900;font-size:.78rem}.photo-audit-cards{grid-template-columns:repeat(2,1fr)}.photo-audit-pair{display:grid;grid-template-columns:1fr 1fr;gap:0}.photo-audit-pair div{position:relative}.photo-audit-pair img{width:100%;height:220px;object-fit:cover;display:block}.photo-audit-pair span{position:absolute;top:10px;left:10px;background:rgba(15,23,42,.82);color:#fff;font-size:.72rem;font-weight:700;padding:6px 10px;border-radius:999px}.wardrobe-hero-card{display:grid;grid-template-columns:1fr 1.2fr;gap:22px;align-items:center;padding:24px;border-radius:30px;background:linear-gradient(135deg,#fff7ed,#eff6ff);border:1px solid #fed7aa}.wardrobe-hero-card img{width:100%;max-height:380px;object-fit:contain;background:#fff;border-radius:22px}.wardrobe-item-grid,.wardrobe-step-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:18px}.wardrobe-step-grid img{width:100%;height:150px;object-fit:cover;border-radius:14px;background:#fff}.message-mockup-card img{width:100%;height:auto;display:block;border-radius:20px;margin-top:14px;border:1px solid rgba(21,42,77,.1);box-shadow:0 12px 28px rgba(21,42,77,.08)}.message-pattern-card-grid{margin-top:22px}.action-overview-grid{grid-template-columns:1.15fr .85fr;margin-bottom:22px}.action-overview-card--accent{background:linear-gradient(135deg,#fff7ed,#eff6ff)}.action-overview-card--accent ul{margin:0;padding-left:1.2em;line-height:1.9}.action-plan-grid{grid-template-columns:repeat(5,1fr)}.action-day-card{padding:0;overflow:hidden}.action-day-head{padding:16px;background:var(--action-bg)}.action-day-head h3{margin:10px 0 0;color:var(--navy);font-size:1rem;line-height:1.45}.action-day-body{padding:16px;display:grid;gap:10px}.action-day-body p{margin:0;line-height:1.7}.action-day-body strong{display:block;color:var(--pink);font-size:.84rem;margin-bottom:3px}
    @media(max-width:1100px){.action-plan-grid{grid-template-columns:repeat(2,1fr)}.action-overview-grid{grid-template-columns:1fr}}
    @media(max-width:768px){.container{width:calc(100% - 24px)!important;max-width:100%!important}.section{padding:52px 0!important}.report-grid-2,.report-grid-3,.score-board,.app-mockup-wrap,.close-box,.line-priority-grid,.photo-audit-cards,.wardrobe-hero-card,.wardrobe-item-grid,.wardrobe-step-grid,.action-overview-grid,.action-plan-grid{grid-template-columns:1fr!important;width:100%!important;max-width:100%!important}.report-card,.score-item,.message-card,.phone-shell,.diagnosis-table-card,.line-editing-priority,.completed-profile-bridge,.action-day-card{width:100%!important;max-width:100%!important}.diagnosis-table-card{overflow-x:auto}.diagnosis-table-card table.report-table{min-width:680px!important}.phone-shell{padding:8px!important;border-radius:28px!important}.phone-screen{border-radius:22px!important}.app-profile-body{padding:14px!important}.app-photo-grid{grid-template-columns:repeat(2,1fr)!important}.photo-audit-pair{grid-template-columns:1fr!important}.photo-audit-pair img,.wardrobe-step-grid img{height:auto!important;object-fit:contain!important}.wardrobe-hero-card{padding:16px!important;border-radius:24px!important}.wardrobe-hero-card img{height:auto!important;max-height:360px!important}.message-mockup-card{padding:14px!important;border-radius:22px!important}}
  `;
  document.head.appendChild(style);
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.textContent = isOpen ? '×' : '☰';
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = '☰';
  }));
}

normalizeCharacterImages();
enhanceStudentAvatars();
markSakuraSpeakers();
enhanceSampleReportBeforeSubPhotos();
enhanceSampleReportProfileCopy();
enhanceSampleReportPhotoAuditCards();
enhanceSampleReportWardrobeGuide();
enhanceSampleReportMessagePatterns();
enhanceSampleReportActionPlan();
addSampleReportMobileFixes();
addArticleTableOfContents();
addMobileEyecatchOverrides();
addFooterUtilityLinks();
