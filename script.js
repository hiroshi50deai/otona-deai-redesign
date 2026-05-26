const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const characterImageReplacements = {
  'assets/characters/05_icon_bust.png': 'assets/characters/teacher-new-icon.png',
  'assets/characters/01_hero_teacher.png': 'assets/characters/teacher-new-main.png',
  'assets/characters/02_worry.png': 'assets/characters/teacher-new-worry.png',
  'assets/characters/03_ok_explain.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/04_gentle_cta.png': 'assets/characters/teacher-new-cta.png',
  'assets/characters/sakura-worry.png': 'assets/characters/sakura-think.png',
  'assets/characters/sakura-thought.png': 'assets/characters/sakura-think.png',
  'assets/characters/sakura-listen.png': 'assets/characters/sakura-support.png',
  'assets/characters/sakura-guide.png': 'assets/characters/sakura-point.png',
  'assets/characters/teacher-point.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/teacher-explain.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/teacher-calm.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/teacher-smile.png': 'assets/characters/teacher-new-explain.png',
};

function normalizeCharacterImages() {
  document.querySelectorAll('img').forEach((img) => {
    const currentSrc = img.getAttribute('src');
    if (currentSrc && characterImageReplacements[currentSrc]) img.src = characterImageReplacements[currentSrc];
    img.addEventListener('error', () => {
      const failedSrc = img.getAttribute('src');
      if (failedSrc && characterImageReplacements[failedSrc]) { img.src = characterImageReplacements[failedSrc]; return; }
      if (failedSrc && failedSrc.includes('sakura-')) { img.src = 'assets/characters/sakura-think.png'; return; }
      if (failedSrc && failedSrc.includes('teacher')) img.src = 'assets/characters/teacher-new-explain.png';
    }, { once: true });
  });
}

function chooseStudentAvatar(bubbleText) {
  const text = bubbleText || '';
  if (/ひえ|不安|焦|困|悩|無理|相手にされない|いいねが来ない|マッチしません|意味がない|心当たり/.test(text)) return 'assets/characters/student-male-60s-worried.png';
  if (/落ち込|ダメ|全部やって|反応しづら|損/.test(text)) return 'assets/characters/student-male-60s-depressed.png';
  if (/でしょうか|ですか|なんですか|？|\?/.test(text)) return 'assets/characters/student-male-60s-question.png';
  if (/ふむふむ|なるほど|たしかに|納得|分かりました|現実的|大事なんですね|そういうこと/.test(text)) return 'assets/characters/student-male-60s-understanding.png';
  if (/安心|よかった|少し楽|ほっと|大丈夫/.test(text)) return 'assets/characters/student-male-60s-relieved.png';
  if (/やってみ|頑張|前向き|変えてみ|整え|改善できそう|見直してみ/.test(text)) return 'assets/characters/student-male-60s-motivated.png';
  return 'assets/characters/student-male-60s-question.png';
}

function enhanceStudentAvatars() {
  document.querySelectorAll('.conversation-row-v2 .conversation-person').forEach((person) => {
    const label = person.querySelector('.conversation-person__label');
    if (!label || !label.textContent.includes('生徒')) return;
    const avatar = person.querySelector('.conversation-person__image--student');
    if (!avatar || avatar.querySelector('img')) return;
    const row = person.closest('.conversation-row-v2');
    const bubbleText = row?.querySelector('.conversation-bubble-v2')?.textContent || '';
    const src = chooseStudentAvatar(bubbleText);
    const fallbackText = avatar.textContent.trim() || '50';
    avatar.textContent = '';
    avatar.classList.add('conversation-person__image--student-character');
    const img = document.createElement('img');
    img.src = src;
    img.alt = '生徒・50代男性';
    img.loading = 'lazy';
    img.addEventListener('error', () => { avatar.classList.remove('conversation-person__image--student-character'); avatar.textContent = fallbackText; }, { once: true });
    avatar.appendChild(img);
  });
}

function markSakuraSpeakers() {
  document.querySelectorAll('.conversation-row-v2 .conversation-person').forEach((person) => {
    const label = person.querySelector('.conversation-person__label');
    if (!label || label.textContent.trim() !== 'さくら') return;
    person.classList.add('conversation-person--sakura');
    const row = person.closest('.conversation-row-v2');
    if (row) row.classList.add('conversation-row-v2--sakura');
  });
}

function createHeadingId(index) { return `article-section-${index + 1}`; }

function addArticleTableOfContents() {
  const articleMain = document.querySelector('.article-page .article-main');
  if (!articleMain || articleMain.querySelector('.article-toc')) return;
  const headings = Array.from(articleMain.querySelectorAll('h2'));
  if (!headings.length) return;
  const tocItems = headings.map((heading, index) => {
    if (!heading.id) heading.id = createHeadingId(index);
    return { id: heading.id, label: heading.textContent.trim() };
  });
  const nav = document.createElement('nav');
  nav.className = 'article-toc';
  nav.setAttribute('aria-label', 'この記事の目次');
  nav.innerHTML = `<p class="article-toc__title">この記事でわかること</p><ol class="article-toc__list">${tocItems.map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`).join('')}</ol>`;
  const eyecatch = articleMain.querySelector('figure.article-block');
  if (eyecatch) eyecatch.insertAdjacentElement('afterend', nav); else articleMain.prepend(nav);
}

function addMobileEyecatchOverrides() {
  const eyecatch = document.querySelector('.article-main > figure.article-block:first-child img[src]');
  const src = eyecatch?.getAttribute('src');
  if (!src) return;
  const style = document.createElement('style');
  style.textContent = `@media (max-width: 640px) { .article-page .article-hero::before { background-image: url("${src}") !important; } }`;
  document.head.appendChild(style);
}

function addFooterUtilityLinks() {
  const footerInner = document.querySelector('.site-footer .footer-inner');
  if (!footerInner || footerInner.querySelector('.footer-utility-links')) return;
  const links = document.createElement('nav');
  links.className = 'footer-utility-links';
  links.setAttribute('aria-label', 'フッターリンク');
  links.innerHTML = `<a href="about.html">運営者情報</a><a href="contact.html">お問い合わせ</a><a href="privacy.html">プライバシーポリシー</a>`;
  links.style.display = 'flex';
  links.style.flexWrap = 'wrap';
  links.style.gap = '12px 18px';
  links.style.justifyContent = 'center';
  links.style.marginTop = '14px';
  links.style.fontSize = '0.9rem';
  links.querySelectorAll('a').forEach((link) => { link.style.color = 'inherit'; link.style.textDecoration = 'underline'; link.style.textUnderlineOffset = '3px'; });
  footerInner.appendChild(links);
}

function enhanceSampleReportBeforeSubPhotos() {
  if (!location.pathname.endsWith('sample-report.html')) return;
  const mockup = document.querySelector('#app-mockup');
  if (!mockup) return;
  const beforeMainImage = mockup.querySelector('.phone-shell:first-child .app-photo-main img');
  if (beforeMainImage) {
    beforeMainImage.src = 'assets/samples/before-main-sub-sample.jpg';
    beforeMainImage.alt = '改善前の赤白チェックシャツのプロフィール写真サンプル';
  }
  const beforeGrid = mockup.querySelector('.phone-shell:first-child .app-photo-grid');
  if (!beforeGrid || beforeGrid.querySelector('img')) return;
  beforeGrid.innerHTML = `
    <div class="app-thumb"><img src="assets/samples/before-main-sub-sample.jpg" alt="改善前のメイン補助写真"><span class="app-thumb-label">メイン</span></div>
    <div class="app-thumb"><img src="assets/samples/before-dark-room-sample.jpg" alt="改善前の暗い室内写真"><span class="app-thumb-label">サブ写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-full-body-sample.jpg" alt="改善前の全身が伝わりにくい写真"><span class="app-thumb-label">全身写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-hobby-sample.jpg" alt="改善前の趣味が伝わりにくい写真"><span class="app-thumb-label">趣味写真</span></div>
    <div class="app-thumb"><img src="assets/samples/before-life-feeling-sample.jpg" alt="改善前の生活感が強い写真"><span class="app-thumb-label">生活感</span></div>
    <div class="app-thumb"><img src="assets/samples/before-no-conversation-topic-sample.jpg" alt="改善前の会話ネタが弱い写真"><span class="app-thumb-label">会話ネタ</span></div>
  `;
}

function enhanceSampleReportProfileCopy() {
  if (!location.pathname.endsWith('sample-report.html')) return;

  const sections = Array.from(document.querySelectorAll('section'));
  const editingSection = sections.find((section) => section.textContent.includes('プロフィール文の行ごと添削'));
  const editingBody = editingSection?.querySelector('tbody');
  if (editingBody) {
    editingBody.innerHTML = `
      <tr><td>仕事は会社員をしています。</td><td>職業情報だけで終わっていて、誠実さ・余裕・日常の雰囲気が見えません。</td><td>平日は仕事中心ですが、帰り道に映画のレビューを読んだり、週末に観たい作品を探したりする時間がちょうどいい息抜きになっています。</td></tr>
      <tr><td>休日は映画を見たり、カフェに行ったりしています。</td><td>趣味の羅列に見えます。女性が「一緒に行ったらどんな時間になるか」を想像しにくいです。</td><td>休日は、気になっていた映画を観てから、近くのカフェで感想を話すような落ち着いた時間が好きです。にぎやかすぎる場所より、ゆっくり会話できる雰囲気の方が合っています。</td></tr>
      <tr><td>良い出会いがあればと思い登録しました。</td><td>受け身で、相手に何を大切にしている人なのかが伝わりません。</td><td>最初から無理に距離を縮めるより、メッセージで少しずつ人柄を知りながら、安心して会える関係を作れたらうれしいです。</td></tr>
      <tr><td>よろしくお願いします。</td><td>締めが弱く、相手が返信するきっかけがありません。</td><td>映画やカフェの話からでも、気軽にやり取りできたらうれしいです。最近観てよかった作品があれば、ぜひ教えてください。</td></tr>
    `;
  }

  const completedSection = sections.find((section) => section.textContent.includes('完成プロフィール文'));
  const completedText = completedSection?.querySelector('.completed-text');
  if (completedText) {
    completedText.innerHTML = `はじめまして。プロフィールを見ていただきありがとうございます。<br><br>平日は仕事中心ですが、休日は気になっていた映画を観に行ったり、帰りに落ち着いたカフェで少しゆっくりしたりして過ごすことが多いです。派手なタイプではありませんが、相手の話を聞きながら、穏やかに会話する時間は好きです。<br><br>いきなり距離を詰めるより、まずはメッセージで少しずつ雰囲気を知れたらうれしいです。映画の話、休日の過ごし方、最近行ってよかったお店など、気軽なところから話せたらと思っています。<br><br>一緒にいて無理をしなくていい、自然体で笑える関係を大切にしたいです。よろしくお願いします。`;
  }

  const beforeProfile = document.querySelector('#app-mockup .phone-shell:first-child .app-profile-body');
  const beforePromptCards = beforeProfile ? Array.from(beforeProfile.querySelectorAll('.prompt-card')) : [];
  if (beforePromptCards[1]) {
    const label = beforePromptCards[1].querySelector('b');
    const text = beforePromptCards[1].querySelector('p');
    if (label) label.textContent = '一緒にしたいこと';
    if (text) text.textContent = '映画を見たり、カフェに行ったりしたいです。';
  }

  const afterProfile = document.querySelector('#app-mockup .phone-shell:nth-child(2) .app-profile-body');
  const promptCards = afterProfile ? Array.from(afterProfile.querySelectorAll('.prompt-card')) : [];
  if (promptCards[0]) promptCards[0].querySelector('p').textContent = '平日は仕事中心ですが、休日は気になっていた映画を観に行ったり、帰りに落ち着いたカフェで少しゆっくりしたりしています。筋トレや散歩も続けていて、年齢を重ねても清潔感や健康的な生活は大切にしたいです。';
  if (promptCards[1]) promptCards[1].querySelector('p').textContent = '景色の良い場所を探索したり、映画を観たあとカフェで感想を話す時間が好きです。同じ映画でも、人によって感じ方が違うところにその人らしさが出るので、そういう会話を楽しめる関係に惹かれます。';
  if (promptCards[2]) promptCards[2].querySelector('p').textContent = '無理に盛り上げるより、安心して話せる関係を大切にしたいです。趣味や最近楽しかったことなど日常のちょっとした会話から少しずつ仲良くなれたらと考えています。';
}

function enhanceSampleReportPhotoAuditCards() {
  if (!location.pathname.endsWith('sample-report.html')) return;

  const sections = Array.from(document.querySelectorAll('section'));
  const photoSection = sections.find((section) => section.textContent.includes('写真ごとの診断シート'));
  const tableCard = photoSection?.querySelector('.diagnosis-table-card');
  if (!photoSection || !tableCard || tableCard.dataset.visualAudit === 'true') return;

  const auditItems = [
    {
      title: 'メイン写真', role: '第一印象', badge: '差し替え推奨', badgeClass: 'must',
      beforeSrc: 'assets/samples/before-main-sub-sample.jpg', afterSrc: 'assets/samples/profile-photo-after-sample.jpg',
      beforeText: '暗い室内・自撮り感・表情の硬さがあり、悪い人ではなさそうでも魅力が伝わりにくい状態です。',
      improveText: '自然光・軽い笑顔・胸から上の他撮り風写真に変更。最初の1枚で清潔感と話しやすさが伝わる印象に改善。'
    },
    {
      title: 'サブ写真1', role: '休日感', badge: '追加推奨', badgeClass: 'warn',
      beforeSrc: 'assets/samples/before-dark-room-sample.jpg', afterSrc: 'assets/samples/after-walking-outdoor-sample.jpg',
      beforeText: '室内写真が続くと、休日の雰囲気や一緒に過ごすイメージが伝わりにくくなります。',
      improveText: '散歩・外出・日常感が伝わる写真を追加。この人と会ったらこんな時間になりそう、が想像しやすくなります。'
    },
    {
      title: 'サブ写真2', role: '全身・服装', badge: '必須', badgeClass: 'must',
      beforeSrc: 'assets/samples/before-no-full-body-sample.jpg', afterSrc: 'assets/samples/after-half-body-style-sample.jpg',
      beforeText: '体型や服装の雰囲気が伝わりにくく、会う前の安心材料が不足しています。',
      improveText: '半身〜全身が分かる写真に変更。服装の清潔感、姿勢、全体のバランスが伝わりやすくなります。'
    },
    {
      title: '趣味写真', role: '会話のきっかけ', badge: '改善余地あり', badgeClass: 'good',
      beforeSrc: 'assets/samples/before-no-hobby-sample.jpg', afterSrc: 'assets/samples/after-hobby-movie-sample.jpg',
      beforeText: '趣味や人となりが写真から見えにくく、相手がメッセージで触れやすい話題が生まれにくい状態です。',
      improveText: '映画・カフェ・散歩など、相手が質問しやすい写真を追加。会話の入口ができて、やり取りのしやすさが上がります。'
    }
  ];

  tableCard.dataset.visualAudit = 'true';
  tableCard.style.border = 'none';
  tableCard.style.boxShadow = 'none';
  tableCard.style.background = 'transparent';
  tableCard.style.overflow = 'visible';

  tableCard.innerHTML = `
    <div class="photo-audit-cards" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;">
      ${auditItems.map((item) => `
        <article style="background:#fff;border:1px solid var(--border);border-radius:26px;overflow:hidden;box-shadow:0 14px 36px rgba(21,42,77,.07);">
          <div style="display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--border);">
            <div style="position:relative;background:#f8fafc;"><img src="${item.beforeSrc}" alt="${item.title} 改善前" loading="lazy" style="width:100%;height:220px;object-fit:cover;display:block;"><span style="position:absolute;top:10px;left:10px;background:rgba(15,23,42,.82);color:#fff;font-size:.72rem;font-weight:700;padding:6px 10px;border-radius:999px;">Before</span></div>
            <div style="position:relative;background:#f8fafc;"><img src="${item.afterSrc}" alt="${item.title} 改善後" loading="lazy" style="width:100%;height:220px;object-fit:cover;display:block;"><span style="position:absolute;top:10px;left:10px;background:rgba(37,99,235,.88);color:#fff;font-size:.72rem;font-weight:700;padding:6px 10px;border-radius:999px;">After</span></div>
          </div>
          <div style="padding:18px;display:grid;gap:10px;">
            <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;"><h3 style="margin:0;color:var(--navy);font-size:1.12rem;">${item.title}</h3><span class="tag ${item.badgeClass}">${item.badge}</span></div>
            <p style="margin:0;color:var(--muted);font-weight:800;">役割：${item.role}</p>
            <div style="padding:13px;border-radius:16px;background:#f8fafc;line-height:1.75;"><strong>改善前の印象：</strong>${item.beforeText}</div>
            <div style="padding:13px;border-radius:16px;background:#fff7ed;line-height:1.75;"><strong>改善後の変化：</strong>${item.improveText}</div>
          </div>
        </article>
      `).join('')}
    </div>
    <style>@media(max-width:800px){.photo-audit-cards{grid-template-columns:1fr!important}}@media(max-width:560px){.photo-audit-cards article>div:first-child{grid-template-columns:1fr!important}.photo-audit-cards img{height:210px!important}}</style>
  `;
}

function enhanceSampleReportWardrobeGuide() {
  if (!location.pathname.endsWith('sample-report.html')) return;

  const sections = Array.from(document.querySelectorAll('section'));
  const photoSection = sections.find((section) => section.textContent.includes('写真ごとの診断シート'));
  if (!photoSection || document.querySelector('.wardrobe-guide-section')) return;

  const wardrobeSection = document.createElement('section');
  wardrobeSection.className = 'section wardrobe-guide-section report-soft';
  wardrobeSection.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Wardrobe Guide</p>
        <h2>服装・買い足しガイド</h2>
        <p>After写真のような印象は、高級ブランドで固めなくても作れます。大切なのは、ブランド名そのものよりも、色・サイズ感・清潔感・組み合わせです。</p>
      </div>

      <div style="display:grid;gap:18px;">
        <div style="background:#fff;border:1px solid var(--border);border-radius:28px;padding:24px;box-shadow:0 14px 36px rgba(21,42,77,.06);">
          <h3 style="margin:0 0 12px;color:var(--navy);font-size:1.15rem;">まず揃えたい基本構成</h3>
          <ul style="margin:0;padding-left:1.2em;line-height:1.9;">
            <li>ネイビー〜黒系のシンプルなジャケット</li>
            <li>白の無地Tシャツ、または白系のシンプルなインナー</li>
            <li>黒・チャコール・ネイビーなど濃色のパンツ</li>
            <li>きれいめスニーカー、または革靴風の落ち着いた靴</li>
          </ul>
          <p style="margin:14px 0 0;line-height:1.8;">40代・50代男性は、まずこの組み合わせだけでも印象がかなり整います。派手な服より、「無難だけど清潔感がある」方向の方がマッチングアプリでは強いです。</p>
        </div>

        <div class="wardrobe-guide-grid" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;">
          <div style="background:#fff;border:1px solid var(--border);border-radius:28px;padding:24px;box-shadow:0 14px 36px rgba(21,42,77,.06);">
            <h3 style="margin:0 0 12px;color:var(--navy);font-size:1.15rem;">買いやすい候補</h3>
            <ul style="margin:0;padding-left:1.2em;line-height:1.9;">
              <li>ユニクロ</li>
              <li>無印良品</li>
              <li>グローバルワーク</li>
              <li>GU（アイテムを選べば十分使えます）</li>
            </ul>
            <p style="margin:14px 0 0;line-height:1.8;">まずは高級ブランドではなく、手に入りやすく清潔感を作りやすい店で十分です。</p>
          </div>

          <div style="background:#fff;border:1px solid var(--border);border-radius:28px;padding:24px;box-shadow:0 14px 36px rgba(21,42,77,.06);">
            <h3 style="margin:0 0 12px;color:var(--navy);font-size:1.15rem;">相談で提案する内容</h3>
            <ul style="margin:0;padding-left:1.2em;line-height:1.9;">
              <li>今ある服で使えるもの・使いにくいものの整理</li>
              <li>買い足すなら何を優先すべきか</li>
              <li>予算に合わせた現実的な候補</li>
              <li>写真用だけでなく、初対面でも使いやすい服装の方向性</li>
            </ul>
            <p style="margin:14px 0 0;line-height:1.8;">ただ「おしゃれにしましょう」と言うのではなく、手持ち服と予算に合わせて現実的に提案します。</p>
          </div>
        </div>

        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:28px;padding:24px;">
          <h3 style="margin:0 0 10px;color:var(--navy);font-size:1.1rem;">このセクションの意図</h3>
          <p style="margin:0;line-height:1.85;">Before / Afterを見て「こんな服は持っていない」と感じる方は少なくありません。その不安を減らすために、このレポートでは <strong>“何を目指すべきか”だけでなく、“どこで・何を・どの順番で揃えるか”</strong> まで分かる構成にしています。</p>
        </div>
      </div>
    </div>
    <style>@media(max-width:800px){.wardrobe-guide-grid{grid-template-columns:1fr!important}}</style>
  `;

  photoSection.insertAdjacentElement('afterend', wardrobeSection);
}

if (navToggle && siteNav) {
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

normalizeCharacterImages();
enhanceStudentAvatars();
markSakuraSpeakers();
enhanceSampleReportBeforeSubPhotos();
enhanceSampleReportProfileCopy();
enhanceSampleReportPhotoAuditCards();
enhanceSampleReportWardrobeGuide();
addArticleTableOfContents();
addMobileEyecatchOverrides();
addFooterUtilityLinks();
