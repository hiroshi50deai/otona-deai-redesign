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
    if (currentSrc && characterImageReplacements[currentSrc]) {
      img.src = characterImageReplacements[currentSrc];
    }

    img.addEventListener('error', () => {
      const failedSrc = img.getAttribute('src');
      if (failedSrc && characterImageReplacements[failedSrc]) {
        img.src = characterImageReplacements[failedSrc];
        return;
      }
      if (failedSrc && failedSrc.includes('sakura-')) {
        img.src = 'assets/characters/sakura-think.png';
        return;
      }
      if (failedSrc && failedSrc.includes('teacher')) {
        img.src = 'assets/characters/teacher-new-explain.png';
      }
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
    img.addEventListener('error', () => {
      avatar.classList.remove('conversation-person__image--student-character');
      avatar.textContent = fallbackText;
    }, { once: true });

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

function createHeadingId(index) {
  return `article-section-${index + 1}`;
}

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
  nav.innerHTML = `
    <p class="article-toc__title">この記事でわかること</p>
    <ol class="article-toc__list">
      ${tocItems.map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`).join('')}
    </ol>
  `;

  const eyecatch = articleMain.querySelector('figure.article-block');
  if (eyecatch) {
    eyecatch.insertAdjacentElement('afterend', nav);
  } else {
    articleMain.prepend(nav);
  }
}

function addMobileEyecatchOverrides() {
  const eyecatch = document.querySelector('.article-main > figure.article-block:first-child img[src]');
  const src = eyecatch?.getAttribute('src');
  if (!src) return;

  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 640px) {
      .article-page .article-hero::before {
        background-image: url("${src}") !important;
      }
    }
  `;
  document.head.appendChild(style);
}

function findHeadingByText(selector, text) {
  return Array.from(document.querySelectorAll(selector)).find((heading) => heading.textContent.trim() === text);
}

function addAfterParagraphBeforeNextHeading(heading, html) {
  if (!heading) return;
  let current = heading.nextElementSibling;
  let lastParagraph = null;

  while (current && !/^H[23]$/.test(current.tagName)) {
    if (current.tagName === 'P' || current.tagName === 'UL' || current.tagName === 'FIGURE' || current.tagName === 'DIV') {
      lastParagraph = current;
    }
    current = current.nextElementSibling;
  }

  if (lastParagraph) {
    lastParagraph.insertAdjacentHTML('afterend', html);
  }
}

function enhanceWhy50sPhotoAndProfileSections() {
  if (!location.pathname.endsWith('why-50s-men-get-no-likes.html')) return;
  if (document.querySelector('[data-article-enhancement="photo-real-barrier"]')) return;

  const reason2Heading = findHeadingByText('h3', '理由2：自撮り・無表情・生活感の強い写真で損をしている');
  const reason3Heading = findHeadingByText('h3', '理由3：プロフィール文が「何者か分からない」内容になっている');
  const serviceCta = document.querySelector('.article-service-cta');

  if (reason2Heading) {
    reason3Heading?.insertAdjacentHTML('beforebegin', `
      <div class="article-enhancement-box" data-article-enhancement="photo-real-barrier" style="margin:26px 0; padding:24px; border-radius:22px; background:#fffaf2; border:1px solid rgba(185,154,91,.24);">
        <h4 style="margin:0 0 12px; color:#152a4d; font-size:1.15rem; line-height:1.55;">ただし、自撮りしか用意できない人も多い</h4>
        <p>「他撮りがいい」と言われても、50代男性にとっては簡単ではありません。友人に頼むのは恥ずかしい。家族には見られたくない。写真を撮られること自体が苦手。そもそも、今の自分の顔を写真で見るのがつらい人もいます。</p>
        <p>だから、いきなり完璧な他撮りを目指さなくても大丈夫です。まずは、自撮りの中でも減点されにくい形に整えるところから始めましょう。</p>
        <ul class="article-check-list">
          <li>車内・洗面所・散らかった部屋では撮らない</li>
          <li>スマホを顔から少し離し、上半身と余白を入れる</li>
          <li>窓際や屋外の日陰など、自然光のある場所で撮る</li>
          <li>表情は満面の笑顔でなくても、穏やかに見えれば十分</li>
          <li>服は白・ネイビー・グレーなど、清潔感が出やすい色にする</li>
        </ul>
        <div style="overflow-x:auto; margin-top:20px;">
          <table style="width:100%; min-width:680px; border-collapse:collapse; font-size:.96rem;">
            <thead>
              <tr>
                <th style="text-align:left; padding:12px; border-bottom:1px solid rgba(21,42,77,.18); color:#152a4d;">NG写真</th>
                <th style="text-align:left; padding:12px; border-bottom:1px solid rgba(21,42,77,.18); color:#152a4d;">女性に見えやすい印象</th>
                <th style="text-align:left; padding:12px; border-bottom:1px solid rgba(21,42,77,.18); color:#152a4d;">改善方向</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">車内の無表情自撮り</td><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">怖い・生活感が強い・会うイメージが湧きにくい</td><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">公園やカフェ前など、自然光のある場所で上半身を撮る</td></tr>
              <tr><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">洗面所の鏡自撮り</td><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">雑・生活感・ナルシスト感が出やすい</td><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">背景を整理し、スマホを写さず胸から上を撮る</td></tr>
              <tr><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">昔の若い頃の写真</td><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">会ったときに不信感が出やすい</td><td style="padding:12px; border-bottom:1px solid rgba(21,42,77,.12);">半年〜1年以内の写真に変える</td></tr>
              <tr><td style="padding:12px;">顔のどアップ</td><td style="padding:12px;">圧が強い・距離感が近すぎる</td><td style="padding:12px;">上半身と背景の余白を入れて、穏やかな印象にする</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `);
  }

  if (reason3Heading) {
    const reason4Heading = findHeadingByText('h3', '理由4：「若く見られます」「年齢より若いです」と書いて逆効果になっている');
    reason4Heading?.insertAdjacentHTML('beforebegin', `
      <div class="article-enhancement-box" data-article-enhancement="profile-before-after" style="margin:26px 0; padding:24px; border-radius:22px; background:#fff7fb; border:1px solid rgba(224,122,154,.22);">
        <h4 style="margin:0 0 12px; color:#152a4d; font-size:1.15rem; line-height:1.55;">プロフィール文は、ビフォーアフターで見ると分かりやすい</h4>
        <p>プロフィール文で必要なのは、立派な経歴を書くことではありません。女性が「この人と話したらどんな時間になりそうか」を想像できる材料を置くことです。</p>
        <h5 style="margin:20px 0 8px; color:#d84f7d; font-size:1rem;">改善前</h5>
        <p style="padding:16px; border-radius:16px; background:#fff; border:1px solid rgba(21,42,77,.12);">はじめまして。真剣な出会いを探しています。仕事は会社員です。休日は映画やドライブが好きです。よろしくお願いします。</p>
        <ul class="article-check-list">
          <li>人柄が見えにくい</li>
          <li>会話のきっかけが少ない</li>
          <li>一緒に過ごすイメージが湧きにくい</li>
          <li>真剣さはあるが、少し無難すぎる</li>
        </ul>
        <h5 style="margin:20px 0 8px; color:#152a4d; font-size:1rem;">改善後</h5>
        <p style="padding:16px; border-radius:16px; background:#fff; border:1px solid rgba(21,42,77,.12);">はじめまして。平日は仕事中心ですが、休日は少し遠くのカフェに行ったり、景色のいい場所を歩いたりして気分転換しています。いきなり距離を詰めるより、まずはメッセージでお互いの雰囲気を知れたら嬉しいです。落ち着いた会話ができる方と、自然体で過ごせる関係を作れたらと思っています。</p>
        <p>この改善後の文章では、特別な自慢はしていません。でも、生活の雰囲気、距離感、人柄、会話の入口が伝わります。ここまで見えると、女性は「少し話してみてもいいかも」と判断しやすくなります。</p>
      </div>
    `);
  }

  if (serviceCta && !document.querySelector('[data-article-enhancement="three-minute-diagnosis"]')) {
    serviceCta.insertAdjacentHTML('beforebegin', `
      <section class="article-block" data-article-enhancement="three-minute-diagnosis">
        <h2>3分診断｜あなたが今、損している場所はどこですか？</h2>
        <p>いいねが来ない理由は、ひとつだけとは限りません。写真、清潔感、プロフィール文、メッセージのどこで損しているかを、まずは簡単に確認してみましょう。</p>
        <ul class="article-check-list">
          <li>メイン写真が自撮りになっている</li>
          <li>写真が半年以上前のものになっている</li>
          <li>表情が硬い、または無表情に見える</li>
          <li>プロフィール文が300字未満で、人柄が伝わりにくい</li>
          <li>趣味や休日の過ごし方が一言だけで終わっている</li>
          <li>「若く見られます」「年齢より若いです」と書いている</li>
          <li>初回メッセージが長くなりがち</li>
          <li>女性目線でプロフィールを確認したことがない</li>
        </ul>
        <div style="margin-top:22px; padding:20px; border-radius:20px; background:#fffaf2; border:1px solid rgba(185,154,91,.24);">
          <p><strong>0〜2個：</strong>まずはプロフィール文を整えるだけでも印象が変わる可能性があります。</p>
          <p><strong>3〜5個：</strong>写真と文章の両方を見直すと、女性からの見え方が変わりやすいです。</p>
          <p><strong>6個以上：</strong>一度、写真・清潔感・プロフィール文・メッセージ全体を客観的に見直した方がいい状態です。</p>
        </div>
        <p>自分では判断しにくい場合は、プロフィール再設計相談で「女性からどう見えているか」を一緒に整理できます。</p>
      </section>
    `);
  }
}

function addFooterUtilityLinks() {
  const footerInner = document.querySelector('.site-footer .footer-inner');
  if (!footerInner || footerInner.querySelector('.footer-utility-links')) return;

  const links = document.createElement('nav');
  links.className = 'footer-utility-links';
  links.setAttribute('aria-label', 'フッターリンク');
  links.innerHTML = `
    <a href="about.html">運営者情報</a>
    <a href="contact.html">お問い合わせ</a>
    <a href="privacy.html">プライバシーポリシー</a>
  `;

  links.style.display = 'flex';
  links.style.flexWrap = 'wrap';
  links.style.gap = '12px 18px';
  links.style.justifyContent = 'center';
  links.style.marginTop = '14px';
  links.style.fontSize = '0.9rem';

  links.querySelectorAll('a').forEach((link) => {
    link.style.color = 'inherit';
    link.style.textDecoration = 'underline';
    link.style.textUnderlineOffset = '3px';
  });

  footerInner.appendChild(links);
}

function enhanceSampleReportBeforeSubPhotos() {
  if (!location.pathname.endsWith('sample-report.html')) return;

  const mockup = document.querySelector('#app-mockup');
  if (!mockup) return;

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
enhanceWhy50sPhotoAndProfileSections();
enhanceSampleReportBeforeSubPhotos();
addArticleTableOfContents();
addMobileEyecatchOverrides();
addFooterUtilityLinks();
