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

function completeProfileTextWomenCheckSection() {
  if (!location.pathname.endsWith('/profile-text-safe-adult-men.html')) return;

  const section = Array.from(document.querySelectorAll('.article-page .article-block')).find((block) => {
    const heading = block.querySelector('h2');
    return heading && heading.textContent.trim() === '女性がプロフィール文で見ているもの';
  });

  if (!section) return;

  if (!section.querySelector('img[src="assets/infographics/profile-text-what-women-check.png"]')) {
    const heading = section.querySelector('h2');
    heading?.insertAdjacentHTML('afterend', `
      <figure class="article-infographic article-infographic--large article-infographic--bare reason-infographic">
        <img
          src="assets/infographics/profile-text-what-women-check.png"
          alt="女性がプロフィール文で見ている5つのポイント。会話できそうか、生活の雰囲気、配慮、距離感、写真や年齢との一貫性を整理した図解"
          loading="lazy"
        />
      </figure>
    `);
  }

  const hasCareHeading = Array.from(section.querySelectorAll('h3')).some((h3) => h3.textContent.trim() === '相手への配慮があるか');
  const hasConsistencyHeading = Array.from(section.querySelectorAll('h3')).some((h3) => h3.textContent.trim() === '写真や年齢との一貫性があるか');
  const distanceHeading = Array.from(section.querySelectorAll('h3')).find((h3) => h3.textContent.trim() === '距離感が急すぎないか');

  if (!hasCareHeading && distanceHeading) {
    distanceHeading.insertAdjacentHTML('beforebegin', `
      <h3>相手への配慮があるか</h3>
      <p>プロフィール文では、自分の希望だけでなく、相手への配慮が伝わるかも見られています。</p>
      <p>「こういう人は無理です」「返信が遅い人は合いません」のように条件を強く並べると、読む側は少し身構えてしまいます。</p>
      <p>一方で、「お互いに無理なく、丁寧にやり取りできたらうれしいです」と書くと、自分本位ではなく、相手のペースも大切にできる人だと伝わりやすくなります。</p>
    `);
  }

  if (!hasConsistencyHeading) {
    section.insertAdjacentHTML('beforeend', `
      <h3>写真や年齢との一貫性があるか</h3>
      <p>女性は、プロフィール文だけを単体で見ているわけではありません。写真、年齢、文章、メッセージの雰囲気がつながっているかも見ています。</p>
      <p>写真では落ち着いて見えるのに文章が軽すぎる。年齢は50代なのに「気持ちは30代」と若さばかりを強調している。こうしたズレがあると、実際に会ったときのギャップを想像されやすくなります。</p>
      <p>大切なのは、若く見せることではなく、写真と文章から伝わる印象が自然にそろっていることです。一貫性があるプロフィールは、女性にとって安心材料になります。</p>
    `);
  }
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
completeProfileTextWomenCheckSection();
enhanceStudentAvatars();
markSakuraSpeakers();
addArticleTableOfContents();
