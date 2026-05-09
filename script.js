const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const componentStyles = document.createElement('link');
componentStyles.rel = 'stylesheet';
componentStyles.href = 'components.css';
document.head.appendChild(componentStyles);

const characterImageReplacements = {
  'assets/characters/05_icon_bust.png': 'assets/characters/teacher-new-icon.png',
  'assets/characters/01_hero_teacher.png': 'assets/characters/teacher-new-main.png',
  'assets/characters/02_worry.png': 'assets/characters/teacher-new-worry.png',
  'assets/characters/03_ok_explain.png': 'assets/characters/teacher-new-explain.png',
  'assets/characters/04_gentle_cta.png': 'assets/characters/teacher-new-cta.png',
};

document.querySelectorAll('img').forEach((img) => {
  const currentSrc = img.getAttribute('src');
  if (currentSrc && characterImageReplacements[currentSrc]) {
    img.src = characterImageReplacements[currentSrc];
  }
});

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

function createElementFromHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function insertAfter(target, element) {
  if (!target || !target.parentElement || !element) return;
  target.parentElement.insertBefore(element, target.nextSibling);
}

function createBareInfographic(src, alt) {
  return createElementFromHTML(`
    <figure class="article-infographic article-infographic--large article-infographic--bare reason-infographic" data-reading-guide="true" data-src="${src}">
      <a href="${src}" target="_blank" rel="noopener">
        <img src="${src}" alt="${alt}" loading="lazy" />
      </a>
    </figure>
  `);
}

function createLabeledInfographic(src, title, caption) {
  return createElementFromHTML(`
    <figure class="article-infographic article-infographic--large" data-reading-guide="true" data-src="${src}">
      <div class="article-infographic__body">
        <p class="article-infographic__label">図解</p>
        <h3>${title}</h3>
      </div>
      <a href="${src}" target="_blank" rel="noopener">
        <img src="${src}" alt="${title}" loading="lazy" />
      </a>
      <figcaption>${caption}</figcaption>
    </figure>
  `);
}

function insertReasonInfographics() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage) return;

  const reasonImages = [
    {
      text: '理由1：プロフィール写真で清潔感や安心感が伝わっていない',
      src: 'assets/infographics/profile-photo-cleanliness.png',
      alt: '理由1「プロフィール写真で清潔感や安心感が伝わっていない」を説明するインフォグラフィック',
    },
    {
      text: '理由2：自撮り・無表情・生活感の強い写真で損をしている',
      src: 'assets/infographics/profile_photo_advice_for_men_40s_50s.png',
      alt: '理由2「自撮り・無表情・生活感の強い写真で損をしている」を説明するインフォグラフィック',
    },
    {
      text: '理由3：プロフィール文が「何者か分からない」内容になっている',
      src: 'assets/infographics/reason-7-ojisan-vibe.png',
      alt: '理由3「プロフィール文が何者か分からない内容になっている」を説明するインフォグラフィック',
    },
    {
      text: '理由4：「若く見られます」「年齢より若いです」と書いて逆効果になっている',
      src: 'assets/infographics/reason-4-young-appeal-backfire.png',
      alt: '理由4「若く見られます、年齢より若いですと書いて逆効果になっている」を説明するインフォグラフィック',
    },
    {
      text: '理由5：相手への希望条件が現実とズレている',
      src: 'assets/infographics/reason-5-unrealistic-conditions.png',
      alt: '理由5「相手への希望条件が現実とズレている」を説明するインフォグラフィック',
    },
    {
      text: '理由6：メッセージが重い・長い・距離感が近すぎる',
      src: 'assets/infographics/reason-3-profile-unknown.png',
      alt: '理由6「メッセージが重い・長い・距離感が近すぎる」を説明するインフォグラフィック',
    },
    {
      text: '理由7：会話の前に“おじさんっぽさ”が伝わってしまっている',
      src: 'assets/infographics/reason-6-heavy-message.png',
      alt: '理由7「会話の前におじさんっぽさが伝わってしまっている」を説明するインフォグラフィック',
    },
  ];

  reasonImages.forEach(({ text, src, alt }) => {
    const heading = Array.from(document.querySelectorAll('.article-main h3')).find((h) => h.textContent.trim() === text);
    if (!heading) return;

    const next = heading.nextElementSibling;
    if (next && next.classList && next.classList.contains('reason-infographic')) {
      const link = next.querySelector('a');
      const img = next.querySelector('img');
      if (link) link.href = src;
      if (img) {
        img.src = src;
        img.alt = alt;
      }
      next.dataset.src = src;
      return;
    }

    insertAfter(heading, createBareInfographic(src, alt));
  });
}

function addSupportingReadingGuides() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage) return;

  const articleBlocks = Array.from(document.querySelectorAll('.article-main .article-block'));
  const introBlock = articleBlocks.find((block) => block.textContent.includes('この記事では、50代男性が'));
  const reasonBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がマッチングアプリでいいねをもらえない主な理由'));
  const checklistBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がまず見直すべき5つのポイント'));
  const finalBlock = articleBlocks.find((block) => block.textContent.includes('まとめ｜50代男性がいいねをもらえない理由'));

  if (introBlock && !document.querySelector('[data-guide="top-conclusion"]')) {
    insertAfter(introBlock, createElementFromHTML(`
      <aside class="article-summary-box article-summary-box--compact" data-reading-guide="true" data-guide="top-conclusion">
        <p class="article-summary-box__label">この記事の結論</p>
        <h3>まず、ここだけ押さえれば大丈夫です。</h3>
        <ul><li>年齢だけが原因ではない</li><li>写真・清潔感・プロフィールで改善できる</li><li>最初は写真から見直す</li></ul>
      </aside>
    `));
  }

  const conclusion = document.querySelector('[data-guide="top-conclusion"]');
  if (conclusion && !document.querySelector('[data-src="assets/infographics/no-likes-cause-map.svg"]')) {
    insertAfter(conclusion, createLabeledInfographic(
      'assets/infographics/no-likes-cause-map.svg',
      'いいねが来ない原因を、4つに分けて見る',
      '原因を一つに決めつけず、写真・清潔感・プロフィール文・メッセージに分けて確認します。画像をタップすると大きく開けます。'
    ));
  }

  if (reasonBlock && !document.querySelector('[data-src="assets/infographics/photo-checkpoints.svg"]')) {
    insertAfter(reasonBlock, createLabeledInfographic(
      'assets/infographics/photo-checkpoints.svg',
      '写真で見られるポイント',
      '女性は顔立ちだけではなく、清潔感・明るさ・表情・背景から安心できる人かを見ています。画像をタップすると大きく開けます。'
    ));
  }

  if (checklistBlock && !document.querySelector('[data-src="assets/infographics/action-order.svg"]')) {
    insertAfter(checklistBlock, createLabeledInfographic(
      'assets/infographics/action-order.svg',
      '見直す順番',
      '全部を一気に直そうとせず、まず写真、次にプロフィール文、最後にメッセージの距離感を整えます。画像をタップすると大きく開けます。'
    ));
  }

  if (finalBlock && !document.querySelector('[data-guide="remember"]')) {
    insertAfter(finalBlock, createElementFromHTML(`
      <aside class="article-remember-box article-remember-box--compact" data-reading-guide="true" data-guide="remember">
        <p class="article-remember-box__label">ここだけ覚える</p>
        <h3>50代だから終わり、ではありません。</h3>
        <ul><li>年齢は変えられない</li><li>でも、写真・清潔感・文章・距離感は変えられる</li><li>見せ方を整えれば、出会いの入口は作れる</li></ul>
      </aside>
    `));
  }
}

document.querySelectorAll('img[src="assets/eyecatches/why-50s-men-get-no-likes.svg"]').forEach((img) => {
  img.src = 'assets/eyecatches/why-50s-men-get-no-likes.png';
});

addSupportingReadingGuides();
insertReasonInfographics();

const visualFixes = document.createElement('style');
visualFixes.textContent = `
  .hero-guide::before{content:none!important;display:none!important;background:none!important;opacity:0!important;}
  .conversation-person__image--student{display:grid!important;place-items:center!important;background:linear-gradient(135deg,#eef3fb,#fff)!important;color:#152a4d!important;font-weight:900!important;font-size:1.45rem!important;}
  .character-img{filter:drop-shadow(0 12px 18px rgba(21,42,77,.10))!important;}
  .article-page .article-main{gap:34px!important;}
  .article-page .article-block{padding:clamp(26px,4.2vw,46px)!important;}
  .article-page .article-block p{margin-top:.95em!important;margin-bottom:.95em!important;}
  .article-page .article-block h2{margin-top:0!important;margin-bottom:1.1em!important;}
  .article-page .article-block h3{margin-top:2em!important;margin-bottom:.85em!important;}
  .article-infographic--large img{width:100%!important;max-width:none!important;}
  .article-infographic--bare{padding:0!important;margin-top:14px!important;margin-bottom:22px!important;overflow:hidden!important;background:#fff!important;}
  .article-infographic--bare a{display:block!important;}
  .article-infographic--bare img{display:block!important;width:100%!important;height:auto!important;border-radius:18px!important;}
  @media (min-width:901px){.article-page .article-layout{grid-template-columns:minmax(0,780px) 280px!important;justify-content:center!important;}}
  @media (max-width:640px){
    .character-img,.hero-character,.small-character,.medium-character{filter:none!important;}
    .article-page .article-hero-guide{display:none!important;}
    .article-page .article-hero{padding-top:24px!important;padding-bottom:28px!important;}
    .article-page .article-main>figure.article-block:first-child{display:none!important;}
    .article-page .article-layout{padding-top:22px!important;}
    .article-page h1{font-size:clamp(1.65rem,8vw,2.15rem)!important;line-height:1.42!important;letter-spacing:-.03em!important;}
    .article-page .article-lead,.article-page .article-block p,.article-page .article-block li{font-size:1.04rem!important;line-height:2!important;}
    .article-page .article-block{padding:24px 20px!important;border-radius:22px!important;}
    .article-page .article-block h2{font-size:1.42rem!important;line-height:1.55!important;margin-bottom:1em!important;}
    .article-page .article-block h3{font-size:1.15rem!important;line-height:1.55!important;margin-top:2.2em!important;}
    .article-page .article-main{gap:26px!important;}
    .article-infographic--large{margin-left:-6px!important;margin-right:-6px!important;border-radius:22px!important;}
    .article-infographic--large img{display:block!important;width:100%!important;min-height:210px!important;object-fit:contain!important;background:#fff!important;}
    .article-infographic--bare{margin-top:12px!important;margin-bottom:20px!important;}
    .article-infographic--bare img{min-height:0!important;object-fit:contain!important;}
    .article-summary-box--compact,.article-remember-box--compact{padding:20px!important;border-radius:22px!important;}
    .article-service-cta{padding:24px 20px!important;border-radius:22px!important;}
    .article-service-cta h2{font-size:1.32rem!important;line-height:1.55!important;}
  }
`;
document.head.appendChild(visualFixes);
