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

function convertCleanlinessIntroSection() {
  if (!location.pathname.endsWith('/middle-aged-men-cleanliness-mistakes.html')) return;

  const section = Array.from(document.querySelectorAll('.article-page .article-block')).find((block) => {
    const heading = block.querySelector('h2');
    return heading && heading.textContent.trim() === '清潔感は、恋愛対象に入るための最低条件';
  });

  if (!section || section.dataset.cleanlinessIntroConverted === 'true') return;
  section.dataset.cleanlinessIntroConverted = 'true';
  section.classList.add('article-conversation-block');
  section.setAttribute('aria-label', '清潔感が恋愛対象に入る最低条件である理由の会話');

  section.innerHTML = `
    <h2 class="article-conversation-block__title">清潔感は、恋愛対象に入るための最低条件</h2>

    <div class="conversation-row-v2 conversation-row-v2--student">
      <div class="conversation-person">
        <div class="conversation-person__image conversation-person__image--student" aria-hidden="true">50</div>
        <span class="conversation-person__label">生徒・50代男性</span>
      </div>
      <div class="conversation-bubble-v2">
        <p>先生、マッチングアプリで反応が悪いんです。</p>
        <p>いいねも来ないし、マッチしても会う前にやり取りが止まることが多くて……。やっぱり年齢とか顔の問題なんでしょうか。</p>
      </div>
    </div>

    <div class="conversation-row-v2 conversation-row-v2--teacher">
      <div class="conversation-bubble-v2">
        <p>年齢や見た目の影響がまったくないとは言いません。</p>
        <p>でも、女性が最初に見ているのは、顔立ちそのものだけではありません。実はかなり強く見られているのが、<strong>清潔感</strong>です。</p>
      </div>
      <div class="conversation-person">
        <img class="conversation-person__image" src="assets/characters/teacher-new-explain.png" alt="清潔感が恋愛対象に入る最低条件であることを説明する先生キャラクター" />
        <span class="conversation-person__label">先生</span>
      </div>
    </div>

    <div class="conversation-row-v2 conversation-row-v2--student">
      <div class="conversation-person">
        <div class="conversation-person__image conversation-person__image--student" aria-hidden="true">50</div>
        <span class="conversation-person__label">生徒・50代男性</span>
      </div>
      <div class="conversation-bubble-v2">
        <p>清潔感ですか……。</p>
        <p>でも、毎日風呂には入っていますし、服も普通に洗っています。それでも足りないんですか？</p>
      </div>
    </div>

    <div class="conversation-row-v2 conversation-row-v2--student">
      <div class="conversation-person">
        <img class="conversation-person__image" src="assets/characters/sakura-point.png" alt="女性目線で清潔感を説明する助手さくら" />
        <span class="conversation-person__label">さくら</span>
      </div>
      <div class="conversation-bubble-v2">
        <p>ここでいう清潔感は、単にお風呂に入っているかどうかだけではありません。</p>
        <p>髪、肌、ヒゲ、歯、ニオイ、服、爪、写真の雰囲気から、「近づいても不快ではなさそうか」「生活が雑そうに見えないか」「会っても大丈夫そうか」を見ています。</p>
      </div>
    </div>

    <div class="conversation-row-v2 conversation-row-v2--teacher">
      <div class="conversation-bubble-v2">
        <p>清潔感は、恋愛では加点要素というより、入口の条件です。</p>
        <p>結婚相手に求める条件に関する調査でも、清潔感は重視されやすい項目です。不潔と感じる要素としても、汗臭さ、フケ、口臭などが強く挙げられています。</p>
      </div>
      <div class="conversation-person">
        <img class="conversation-person__image" src="assets/characters/teacher-new-explain.png" alt="清潔感が入口の条件であることを説明する先生キャラクター" />
        <span class="conversation-person__label">先生</span>
      </div>
    </div>

    <div class="conversation-row-v2 conversation-row-v2--student">
      <div class="conversation-person">
        <img class="conversation-person__image" src="assets/characters/sakura-think.png" alt="女性が清潔感で安心感を見ていることを補足する助手さくら" />
        <span class="conversation-person__label">さくら</span>
      </div>
      <div class="conversation-bubble-v2">
        <p>女性が見ているのは、おしゃれかどうかだけではありません。</p>
        <p>高い服か、流行の髪型か、若く見えるかより前に、「この人と近い距離で話しても大丈夫そうか」を見ています。</p>
      </div>
    </div>

    <div class="conversation-row-v2 conversation-row-v2--teacher">
      <div class="conversation-bubble-v2">
        <p>清潔感は、イケメンになるためのものではありません。</p>
        <p>女性に安心してもらうための、入口の整備です。ここを整えるだけでも、写真やプロフィールの見え方は変わります。</p>
      </div>
      <div class="conversation-person">
        <img class="conversation-person__image" src="assets/characters/teacher-new-explain.png" alt="清潔感は女性に安心してもらう入口の整備だと説明する先生キャラクター" />
        <span class="conversation-person__label">先生</span>
      </div>
    </div>
  `;
}

function addProfileTextLinkToCleanlinessArticle() {
  if (!location.pathname.endsWith('/middle-aged-men-cleanliness-mistakes.html')) return;
  if (document.querySelector('a[href="profile-text-safe-adult-men.html"]')) return;

  const section = Array.from(document.querySelectorAll('.article-main .article-conversation-block')).find((block) => {
    const heading = block.querySelector('h2');
    return heading && heading.textContent.trim() === '写真・清潔感・プロフィール全体をつなげて整えると、印象は変わる';
  });

  if (!section) return;

  section.insertAdjacentHTML('beforeend', `
    <p>
      清潔感が整っていても、プロフィール文が雑だったり、距離感が急すぎたりすると、女性は途中で不安を感じることがあります。写真の印象と文章の印象をそろえる考え方は、<a href="profile-text-safe-adult-men.html">女性が安心する大人の男のプロフィール文とは</a>の記事でも詳しく解説しています。
    </p>
  `);
}

function addLikesArticleLinkToCleanlinessArticle() {
  if (!location.pathname.endsWith('/middle-aged-men-cleanliness-mistakes.html')) return;
  if (document.querySelector('a[href="why-50s-men-get-no-likes.html"]')) return;

  const section = Array.from(document.querySelectorAll('.article-main .article-block')).find((block) => {
    const heading = block.querySelector('h2');
    return heading && heading.textContent.trim() === 'まとめ｜清潔感は、若さではなく「安心して近づけそうか」で決まる';
  });

  if (!section) return;

  const lastParagraph = section.querySelector('p:last-of-type');
  const html = `
    <p>
      清潔感は大切ですが、いいねが来ない原因は清潔感だけとは限りません。写真、プロフィール文、メッセージ、年齢の見せ方など、全体の原因を整理したい方は、<a href="why-50s-men-get-no-likes.html">50代男性がマッチングアプリでいいねをもらえない理由</a>の記事も参考にしてください。
    </p>
  `;

  if (lastParagraph) {
    lastParagraph.insertAdjacentHTML('beforebegin', html);
  } else {
    section.insertAdjacentHTML('beforeend', html);
  }
}

function addCleanlinessLinkToLikesArticle() {
  if (!location.pathname.endsWith('/why-50s-men-get-no-likes.html')) return;
  if (document.querySelector('a[href="middle-aged-men-cleanliness-mistakes.html"]')) return;

  const targetHeading = Array.from(document.querySelectorAll('.article-main h3')).find((heading) =>
    heading.textContent.trim().includes('理由1：プロフィール写真で清潔感や安心感が伝わっていない')
  );

  if (!targetHeading) return;

  let node = targetHeading.nextElementSibling;
  let lastParagraph = null;

  while (node && node.tagName !== 'H3') {
    if (node.tagName === 'P') lastParagraph = node;
    node = node.nextElementSibling;
  }

  if (!lastParagraph) return;

  lastParagraph.insertAdjacentHTML('afterend', `
    <p>
      いいねが来ない原因は、年齢や顔だけではありません。写真の中で髪・ヒゲ・服装・肌・生活感が雑に見えると、女性はプロフィール文を読む前に不安を感じることがあります。清潔感で損しやすいポイントは、<a href="middle-aged-men-cleanliness-mistakes.html">清潔感がないと思われる中年男性の共通点</a>の記事でも詳しく整理しています。
    </p>
  `);
}

function addCleanlinessLinkToProfileTextArticle() {
  if (!location.pathname.endsWith('/profile-text-safe-adult-men.html')) return;
  if (document.querySelector('a[href="middle-aged-men-cleanliness-mistakes.html"]')) return;

  const section = Array.from(document.querySelectorAll('.article-main .article-block')).find((block) => {
    const heading = block.querySelector('h2');
    return heading && heading.textContent.trim() === '写真と実物のギャップは、見た目ではなく信頼性の問題';
  });

  if (!section) return;

  const note = section.querySelector('.article-note');
  const html = `
    <p>
      プロフィール文だけを丁寧にしても、写真や清潔感の印象とズレていると、女性は違和感を持つことがあります。髪・ヒゲ・服装・肌・ニオイ・生活感など、清潔感で損しやすいポイントは、<a href="middle-aged-men-cleanliness-mistakes.html">清潔感がないと思われる中年男性の共通点</a>の記事でも詳しく整理しています。
    </p>
  `;

  if (note) {
    note.insertAdjacentHTML('beforebegin', html);
  } else {
    section.insertAdjacentHTML('beforeend', html);
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
convertCleanlinessIntroSection();
addProfileTextLinkToCleanlinessArticle();
addLikesArticleLinkToCleanlinessArticle();
addCleanlinessLinkToLikesArticle();
addCleanlinessLinkToProfileTextArticle();
enhanceStudentAvatars();
markSakuraSpeakers();
addArticleTableOfContents();
