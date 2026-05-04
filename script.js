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

function createIntroConversation() {
  return createElementFromHTML(`
    <section class="article-conversation-block" aria-label="先生と生徒の会話">
      <h2 class="article-conversation-block__title">先生と生徒の会話で読む</h2>

      <div class="conversation-row-v2 conversation-row-v2--student">
        <div class="conversation-person">
          <div class="conversation-person__image conversation-person__image--student" aria-hidden="true">50</div>
          <span class="conversation-person__label">生徒・50代男性</span>
        </div>
        <div class="conversation-bubble-v2">
          <p>マッチングアプリを始めてみたけれど、まったくいいねが来ないんです。</p>
          <p>こちらから送っても、ほとんどマッチしません。</p>
          <p>やっぱり50代男性は、もう恋愛対象として見られないのでしょうか。</p>
        </div>
      </div>

      <div class="conversation-row-v2 conversation-row-v2--teacher">
        <div class="conversation-bubble-v2">
          <p>そんなふうに感じて、落ち込んでいる50代男性は少なくありません。</p>
          <p>たしかに、マッチングアプリでは年齢が影響する場面があります。20代・30代の男性と同じ土俵で見られれば、50代という年齢が不利に働くこともあります。</p>
          <p>ただし、ここで大事なのは、いいねをもらえない理由を「年齢だけ」で片づけないことです。同じ50代でも、きちんとマッチしている男性はいます。</p>
          <p>派手な若作りをしているわけではなく、写真・清潔感・プロフィール文・メッセージの見せ方を整えて、女性に安心感や魅力が伝わるようにしている人です。</p>
          <p>この記事では、50代男性がマッチングアプリでいいねをもらえない理由と、まず見直すべきポイントを具体的に解説します。</p>
        </div>
        <div class="conversation-person">
          <img class="conversation-person__image" src="assets/characters/03_ok_explain.png" alt="解説する先生キャラクター" />
          <span class="conversation-person__label">先生</span>
        </div>
      </div>
    </section>
  `);
}

function convertIntroToConversation() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage || document.querySelector('.article-conversation-block')) return;

  const articleBlocks = Array.from(document.querySelectorAll('.article-main .article-block'));
  const introBlock = articleBlocks.find((block) => block.textContent.includes('マッチングアプリを始めてみたけれど') && block.textContent.includes('この記事では、50代男性が'));
  if (!introBlock) return;

  introBlock.replaceWith(createIntroConversation());
}

function addArticleReadingLayout() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage || document.querySelector('[data-reading-guide="true"]')) return;

  const articleBlocks = Array.from(document.querySelectorAll('.article-main .article-block'));
  const introBlock = articleBlocks.find((block) => block.textContent.includes('この記事では、50代男性が'));
  const reasonBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がマッチングアプリでいいねをもらえない主な理由'));
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
convertIntroToConversation();

const visualFixes = document.createElement('style');
visualFixes.textContent = `
  .hero-guide::before {
    content: none !important;
    display: none !important;
    background: none !important;
    opacity: 0 !important;
  }

  .conversation-person__image--student {
    display: grid !important;
    place-items: center !important;
    background: linear-gradient(135deg, #eef3fb, #ffffff) !important;
    color: #152a4d !important;
    font-weight: 900 !important;
    font-size: 1.45rem !important;
  }

  .hero-guide::before {
    display: none !important;
  }

  .character-img {
    filter: drop-shadow(0 12px 18px rgba(21,42,77,0.10)) !important;
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

    .article-page .article-hero-guide {
      display: none !important;
    }

    .article-page .article-hero {
      padding-top: 24px !important;
      padding-bottom: 28px !important;
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

    .article-infographic--large img {
      display: block !important;
      width: 100% !important;
      min-height: 210px !important;
      object-fit: contain !important;
      background: #fff !important;
    }

    .article-summary-box--compact,
    .article-remember-box--compact {
      padding: 20px !important;
      border-radius: 22px !important;
    }

    .article-service-cta {
      padding: 24px 20px !important;
      border-radius: 22px !important;
    }

    .article-service-cta h2 {
      font-size: 1.32rem !important;
      line-height: 1.55 !important;
    }
  }
`;
document.head.appendChild(visualFixes);
