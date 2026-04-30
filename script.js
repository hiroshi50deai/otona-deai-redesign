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

function addArticleSupportComponents() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage || document.querySelector('.article-support-box[data-auto="true"]')) return;

  const articleBlocks = Array.from(document.querySelectorAll('.article-main .article-block'));

  const introBlock = articleBlocks.find((block) => block.textContent.includes('この記事では、50代男性が'));
  const reasonBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がマッチングアプリでいいねをもらえない主な理由'));
  const checklistBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がまず見直すべき5つのポイント'));

  const pointBox = createElementFromHTML(`
    <aside class="article-support-box" data-auto="true">
      <div class="article-support-box__icon">💡</div>
      <div>
        <p class="article-support-box__label">教室ポイント</p>
        <h3>年齢だけで判断されているわけではありません。</h3>
        <p>マッチングアプリでは、写真・清潔感・プロフィール文・メッセージの印象が合わさって判断されます。まずは変えられる部分から整えましょう。</p>
      </div>
    </aside>
  `);

  const dialogueBox = createElementFromHTML(`
    <aside class="article-dialogue-box" data-auto="true">
      <h3>よくある不安</h3>
      <div class="article-dialogue-box__rows">
        <div class="dialogue-row dialogue-row--reader">
          <div class="dialogue-bubble">
            <span class="dialogue-name">読者</span>
            <p>やっぱり50代だと、もうマッチングアプリは厳しいんですか？</p>
          </div>
          <div class="dialogue-avatar">🙍‍♂️</div>
        </div>
        <div class="dialogue-row dialogue-row--teacher">
          <div class="dialogue-avatar">👨‍🏫</div>
          <div class="dialogue-bubble">
            <span class="dialogue-name">教室</span>
            <p>年齢の影響はあります。でも、年齢だけが原因とは限りません。まずは写真・清潔感・プロフィール文の見え方を確認しましょう。</p>
          </div>
        </div>
      </div>
    </aside>
  `);

  const summaryBox = createElementFromHTML(`
    <aside class="article-summary-box" data-auto="true">
      <p class="article-summary-box__label">この章のまとめ</p>
      <h3>最初に直すなら、この順番です。</h3>
      <ul>
        <li>まずはメイン写真で清潔感と安心感を伝える</li>
        <li>次にプロフィール文で人柄と会話の入口を作る</li>
        <li>最後にメッセージの距離感を短く自然に整える</li>
      </ul>
    </aside>
  `);

  insertAfter(introBlock, pointBox);
  insertAfter(reasonBlock, dialogueBox);
  insertAfter(checklistBlock, summaryBox);
}

addArticleSupportComponents();

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
      padding-bottom: 30px !important;
    }

    .article-page .article-hero-grid {
      gap: 18px !important;
    }

    .article-page .article-main > figure.article-block:first-child {
      display: none !important;
    }

    .article-page .article-layout {
      padding-top: 24px !important;
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
