const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

const componentStyles = document.createElement('link');
componentStyles.rel = 'stylesheet';
componentStyles.href = 'components.css';
document.head.appendChild(componentStyles);

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

// Use the generated PNG eyecatch instead of the temporary SVG placeholder.
document.querySelectorAll('img[src="assets/eyecatches/why-50s-men-get-no-likes.svg"]').forEach((img) => {
  img.src = 'assets/eyecatches/why-50s-men-get-no-likes.png';
});

function insertAfter(target, element) {
  if (!target || !target.parentElement || !element) return;
  target.parentElement.insertBefore(element, target.nextSibling);
}

function createElementFromHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function createInfographic(src, title, caption) {
  return createElementFromHTML(`
    <figure class="article-infographic article-infographic--large" data-reading-guide="true">
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

function addArticleReadingLayout() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage || document.querySelector('[data-reading-guide="true"]')) return;

  const articleBlocks = Array.from(document.querySelectorAll('.article-main .article-block'));
  const introBlock = articleBlocks.find((block) => block.textContent.includes('この記事では、50代男性が'));
  const reasonBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がマッチングアプリでいいねをもらえない主な理由'));
  const womenBlock = articleBlocks.find((block) => block.textContent.includes('女性は50代男性のどこを見ているのか'));
  const checklistBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がまず見直すべき5つのポイント'));
  const finalBlock = articleBlocks.find((block) => block.textContent.includes('まとめ｜50代男性がいいねをもらえない理由'));
  const ctaBlock = document.querySelector('.article-service-cta');

  const topConclusion = createElementFromHTML(`
    <aside class="article-summary-box article-summary-box--compact" data-reading-guide="true">
      <p class="article-summary-box__label">この記事の結論</p>
      <h3>まず、ここだけ押さえれば大丈夫です。</h3>
      <ul>
        <li>年齢だけが原因ではない</li>
        <li>写真・清潔感・プロフィールで改善できる</li>
        <li>最初は写真から見直す</li>
      </ul>
    </aside>
  `);

  const causeMap = createInfographic(
    'assets/infographics/no-likes-cause-map.svg',
    'いいねが来ない原因を、4つに分けて見る',
    '原因を一つに決めつけず、写真・清潔感・プロフィール文・メッセージに分けて確認します。画像をタップすると大きく開けます。'
  );

  const photoGraphic = createInfographic(
    'assets/infographics/photo-checkpoints.svg',
    '写真で見られるポイント',
    '女性は顔立ちだけではなく、清潔感・明るさ・表情・背景から安心できる人かを見ています。画像をタップすると大きく開けます。'
  );

  const actionGraphic = createInfographic(
    'assets/infographics/action-order.svg',
    '見直す順番',
    '全部を一気に直そうとせず、まず写真、次にプロフィール文、最後にメッセージの距離感を整えます。画像をタップすると大きく開けます。'
  );

  const rememberBox = createElementFromHTML(`
    <aside class="article-remember-box article-remember-box--compact" data-reading-guide="true">
      <p class="article-remember-box__label">ここだけ覚える</p>
      <h3>50代だから終わり、ではありません。</h3>
      <ul>
        <li>年齢は変えられない</li>
        <li>でも、写真・清潔感・文章・距離感は変えられる</li>
        <li>見せ方を整えれば、出会いの入口は作れる</li>
      </ul>
    </aside>
  `);

  insertAfter(introBlock, topConclusion);
  insertAfter(topConclusion, causeMap);
  insertAfter(reasonBlock, photoGraphic);
  insertAfter(checklistBlock, actionGraphic);
  insertAfter(finalBlock, rememberBox);

  if (ctaBlock) {
    const h2 = ctaBlock.querySelector('h2');
    const p = ctaBlock.querySelector('p:not(.eyebrow)');
    const btn = ctaBlock.querySelector('.btn');
    if (h2) h2.textContent = '自分のプロフィールを見直したい方へ';
    if (p) p.textContent = '写真・プロフィール文・メッセージのどこで損しているかを整理できます。';
    if (btn) btn.textContent = 'プロフィールを見直す';
  }
}

addArticleReadingLayout();

const visualFixes = document.createElement('style');
visualFixes.textContent = `
  .hero-guide::before {
    content: none !important;
    display: none !important;
    background: none !important;
    opacity: 0 !important;
  }

  .character-img {
    filter: drop-shadow(0 12px 18px rgba(21,42,77,0.10)) !important;
  }

  .section-heading.with-mascot {
    align-items: center !important;
  }

  .mini-guide {
    position: relative !important;
    display: grid !important;
    grid-template-columns: 96px minmax(190px, 1fr) !important;
    align-items: center !important;
    gap: 14px !important;
    width: 360px !important;
    min-height: auto !important;
    padding: 10px 0 !important;
  }

  .mini-guide .small-character {
    position: static !important;
    width: 96px !important;
    height: auto !important;
    flex: none !important;
    margin: 0 !important;
    z-index: 2 !important;
  }

  .mini-guide .speech-bubble.small {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    max-width: none !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 14px 16px !important;
    font-size: 0.88rem !important;
    line-height: 1.7 !important;
    text-align: left !important;
    z-index: 3 !important;
  }

  .mini-guide .speech-bubble.small::after {
    left: -9px !important;
    right: auto !important;
    top: 50% !important;
    bottom: auto !important;
    width: 18px !important;
    height: 18px !important;
    transform: translateY(-50%) rotate(135deg) !important;
  }

  .article-page .article-main {
    gap: 34px !important;
  }

  .article-page .article-block {
    padding: clamp(26px, 4.2vw, 46px) !important;
  }

  .article-page .article-block p {
    margin-top: 0.95em !important;
    margin-bottom: 0.95em !important;
  }

  .article-page .article-block h2 {
    margin-top: 0 !important;
    margin-bottom: 1.1em !important;
  }

  .article-page .article-block h3 {
    margin-top: 2em !important;
    margin-bottom: 0.85em !important;
  }

  .article-infographic--large img {
    width: 100% !important;
    max-width: none !important;
  }

  @media (min-width: 901px) {
    .article-page .article-layout {
      grid-template-columns: minmax(0, 780px) 280px !important;
      justify-content: center !important;
    }
  }

  @media (max-width: 640px) {
    .character-img,
    .hero-character,
    .small-character,
    .medium-character {
      filter: none !important;
    }

    .guide-panel {
      background: rgba(255, 255, 255, 0.92) !important;
    }

    .article-page .article-hero-guide {
      display: none !important;
    }

    .article-page .article-hero {
      padding-top: 24px !important;
      padding-bottom: 28px !important;
    }

    .article-page .article-hero-grid {
      gap: 18px !important;
    }

    .article-page .article-main > figure.article-block:first-child {
      display: none !important;
    }

    .article-page .article-layout {
      padding-top: 22px !important;
    }

    .article-page h1 {
      font-size: clamp(1.65rem, 8vw, 2.15rem) !important;
      line-height: 1.42 !important;
      letter-spacing: -0.03em !important;
    }

    .article-page .article-lead,
    .article-page .article-block p,
    .article-page .article-block li {
      font-size: 1.04rem !important;
      line-height: 2.0 !important;
    }

    .article-page .article-block {
      padding: 24px 20px !important;
      border-radius: 22px !important;
    }

    .article-page .article-block h2 {
      font-size: 1.42rem !important;
      line-height: 1.55 !important;
      margin-bottom: 1em !important;
    }

    .article-page .article-block h3 {
      font-size: 1.15rem !important;
      line-height: 1.55 !important;
      margin-top: 2.2em !important;
    }

    .article-page .article-main {
      gap: 26px !important;
    }

    .article-infographic--large {
      margin-left: -6px !important;
      margin-right: -6px !important;
      border-radius: 22px !important;
    }

    .article-infographic--large .article-infographic__body {
      padding: 18px 16px 0 !important;
    }

    .article-infographic--large h3 {
      font-size: 1.18rem !important;
      line-height: 1.55 !important;
    }

    .article-infographic--large img {
      display: block !important;
      width: 100% !important;
      min-height: 210px !important;
      object-fit: contain !important;
      background: #fff !important;
    }

    .article-infographic--large figcaption {
      font-size: 0.92rem !important;
      line-height: 1.75 !important;
    }

    .article-summary-box--compact,
    .article-remember-box--compact {
      padding: 20px !important;
      border-radius: 22px !important;
    }

    .article-summary-box--compact h3,
    .article-remember-box--compact h3 {
      font-size: 1.12rem !important;
    }

    .article-summary-box--compact li,
    .article-remember-box--compact li {
      font-size: 1rem !important;
      line-height: 1.85 !important;
    }

    .article-service-cta {
      padding: 24px 20px !important;
      border-radius: 22px !important;
    }

    .article-service-cta h2 {
      font-size: 1.32rem !important;
      line-height: 1.55 !important;
    }

    .section-heading.with-mascot {
      display: block !important;
    }

    .mini-guide {
      display: grid !important;
      grid-template-columns: 86px 1fr !important;
      gap: 10px !important;
      width: 100% !important;
      max-width: 100% !important;
      margin-top: 20px !important;
      padding: 12px !important;
      border-radius: 22px !important;
      background: rgba(255, 255, 255, 0.48) !important;
      border: 1px solid rgba(21,42,77,0.08) !important;
    }

    .mini-guide .small-character {
      width: 82px !important;
      align-self: end !important;
    }

    .mini-guide .speech-bubble.small {
      max-width: none !important;
      width: 100% !important;
      padding: 13px 14px !important;
      font-size: 0.86rem !important;
      line-height: 1.7 !important;
      box-shadow: 0 8px 20px rgba(21,42,77,0.06) !important;
    }

    .mini-guide .speech-bubble.small::after {
      left: -8px !important;
      right: auto !important;
      top: 50% !important;
      bottom: auto !important;
      width: 16px !important;
      height: 16px !important;
      transform: translateY(-50%) rotate(135deg) !important;
    }

    .problem-grid {
      margin-top: 20px !important;
    }
  }
`;
document.head.appendChild(visualFixes);
