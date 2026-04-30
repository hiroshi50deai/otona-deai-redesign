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
    <figure class="article-infographic" data-reading-guide="true">
      <div class="article-infographic__body">
        <p class="article-infographic__label">図解</p>
        <h3>${title}</h3>
      </div>
      <img src="${src}" alt="${title}" loading="lazy" />
      <figcaption>${caption}</figcaption>
    </figure>
  `);
}

function addArticleSupportComponents() {
  const articlePage = document.querySelector('.article-page');
  if (!articlePage || document.querySelector('[data-reading-guide="true"]')) return;

  const articleBlocks = Array.from(document.querySelectorAll('.article-main .article-block'));

  const introBlock = articleBlocks.find((block) => block.textContent.includes('この記事では、50代男性が'));
  const ageBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がマッチングアプリでいいねをもらえないのは'));
  const reasonBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がマッチングアプリでいいねをもらえない主な理由'));
  const womenBlock = articleBlocks.find((block) => block.textContent.includes('女性は50代男性のどこを見ているのか'));
  const ngBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がやりがちなNGプロフィール'));
  const improveBlock = articleBlocks.find((block) => block.textContent.includes('いいねをもらえる50代男性は、何を整えているのか'));
  const checklistBlock = articleBlocks.find((block) => block.textContent.includes('50代男性がまず見直すべき5つのポイント'));
  const profileExampleBlock = articleBlocks.find((block) => block.textContent.includes('50代男性向け・プロフィール改善の具体例'));
  const finalBlock = articleBlocks.find((block) => block.textContent.includes('まとめ｜50代男性がいいねをもらえない理由'));
  const ctaBlock = document.querySelector('.article-service-cta');

  const openingGuide = createElementFromHTML(`
    <aside class="article-guide-box" data-reading-guide="true">
      <p class="article-guide-box__label">この章でわかること</p>
      <h3>この記事全体の地図</h3>
      <ul>
        <li>いいねが来ない理由は年齢だけではない</li>
        <li>女性は写真・清潔感・プロフィール文を見ている</li>
        <li>最初に直す順番は写真、プロフィール、メッセージ</li>
      </ul>
    </aside>
  `);

  const causeMap = createInfographic(
    'assets/infographics/no-likes-cause-map.svg',
    'いいねが来ない原因を、4つに分けて見る',
    '原因を一つに決めつけず、写真・清潔感・プロフィール文・メッセージに分けて確認します。'
  );

  const ageShort = createElementFromHTML(`
    <aside class="article-in-short-box" data-reading-guide="true">
      <p class="article-in-short-box__label">つまり</p>
      <h3>年齢は影響します。でも、全部の原因ではありません。</h3>
      <ul>
        <li>50代という年齢が不利になる場面はある</li>
        <li>でも写真・清潔感・プロフィール文は改善できる</li>
        <li>まずは変えられる場所を見つけることが大切</li>
      </ul>
    </aside>
  `);

  const pointBox = createElementFromHTML(`
    <aside class="article-support-box" data-reading-guide="true">
      <div class="article-support-box__icon">💡</div>
      <div>
        <p class="article-support-box__label">教室ポイント</p>
        <h3>年齢だけで判断されているわけではありません。</h3>
        <p>マッチングアプリでは、写真・清潔感・プロフィール文・メッセージの印象が合わさって判断されます。まずは変えられる部分から整えましょう。</p>
      </div>
    </aside>
  `);

  const dialogueBox = createElementFromHTML(`
    <aside class="article-dialogue-box" data-reading-guide="true">
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

  const photoGraphic = createInfographic(
    'assets/infographics/photo-checkpoints.svg',
    '写真で見られるポイント',
    '女性は顔立ちだけではなく、清潔感・明るさ・表情・背景から安心できる人かを見ています。'
  );

  const womenGuide = createElementFromHTML(`
    <aside class="article-guide-box" data-reading-guide="true">
      <p class="article-guide-box__label">この章でわかること</p>
      <h3>女性が見ているのは、顔だけではありません。</h3>
      <ul>
        <li>清潔感があるか</li>
        <li>安心して話せそうか</li>
        <li>一緒にいて疲れなさそうか</li>
      </ul>
    </aside>
  `);

  const ngRemember = createElementFromHTML(`
    <aside class="article-remember-box" data-reading-guide="true">
      <p class="article-remember-box__label">ここだけ覚える</p>
      <h3>プロフィールで避けたいのは、この3つです。</h3>
      <ul>
        <li>昔の写真で実物とのギャップを作る</li>
        <li>車・時計・高級店で自慢っぽく見える</li>
        <li>自虐や重すぎる真剣さで相手に気を遣わせる</li>
      </ul>
    </aside>
  `);

  const profileGraphic = createInfographic(
    'assets/infographics/profile-ng-ok.svg',
    'プロフィール文のNGとOK',
    '同じ内容でも、言い方を変えるだけで安心感と会話のしやすさが伝わりやすくなります。'
  );

  const improveShort = createElementFromHTML(`
    <aside class="article-in-short-box" data-reading-guide="true">
      <p class="article-in-short-box__label">つまり</p>
      <h3>いいねをもらえる人は、魅力を“伝わる形”に整えています。</h3>
      <ul>
        <li>写真は若作りより自然さ</li>
        <li>服装はブランドよりサイズ感</li>
        <li>プロフィールはスペックより人柄</li>
      </ul>
    </aside>
  `);

  const actionGraphic = createInfographic(
    'assets/infographics/action-order.svg',
    '見直す順番',
    '全部を一気に直そうとせず、まず写真、次にプロフィール文、最後にメッセージの距離感を整えます。'
  );

  const summaryBox = createElementFromHTML(`
    <aside class="article-summary-box" data-reading-guide="true">
      <p class="article-summary-box__label">この章のまとめ</p>
      <h3>最初に直すなら、この順番です。</h3>
      <ul>
        <li>まずはメイン写真で清潔感と安心感を伝える</li>
        <li>次にプロフィール文で人柄と会話の入口を作る</li>
        <li>最後にメッセージの距離感を短く自然に整える</li>
      </ul>
    </aside>
  `);

  const exampleGuide = createElementFromHTML(`
    <aside class="article-guide-box" data-reading-guide="true">
      <p class="article-guide-box__label">この章でわかること</p>
      <h3>文章は、言い方ひとつで印象が変わります。</h3>
      <ul>
        <li>若く見られるアピールは強く出しすぎない</li>
        <li>穏やかさや生活感を伝える</li>
        <li>最初のメッセージは相手が返しやすくする</li>
      </ul>
    </aside>
  `);

  const finalDialogue = createElementFromHTML(`
    <aside class="article-dialogue-box" data-reading-guide="true">
      <h3>最後にもう一度</h3>
      <div class="article-dialogue-box__rows">
        <div class="dialogue-row dialogue-row--reader">
          <div class="dialogue-bubble">
            <span class="dialogue-name">読者</span>
            <p>自分の場合、どこから直せばいいのか分からなくなります。</p>
          </div>
          <div class="dialogue-avatar">🙍‍♂️</div>
        </div>
        <div class="dialogue-row dialogue-row--teacher">
          <div class="dialogue-avatar">👨‍🏫</div>
          <div class="dialogue-bubble">
            <span class="dialogue-name">教室</span>
            <p>まずは写真です。次にプロフィール文。最後にメッセージ。この順番なら迷いにくいです。</p>
          </div>
        </div>
      </div>
    </aside>
  `);

  const finalRemember = createElementFromHTML(`
    <aside class="article-remember-box" data-reading-guide="true">
      <p class="article-remember-box__label">ここだけ覚える</p>
      <h3>50代だから終わり、ではありません。</h3>
      <ul>
        <li>年齢は変えられない</li>
        <li>でも、写真・清潔感・文章・距離感は変えられる</li>
        <li>見せ方を整えれば、出会いの入口は作れる</li>
      </ul>
    </aside>
  `);

  insertAfter(introBlock, openingGuide);
  insertAfter(openingGuide, causeMap);
  insertAfter(ageBlock, ageShort);
  insertAfter(ageShort, pointBox);
  insertAfter(reasonBlock, dialogueBox);
  insertAfter(dialogueBox, photoGraphic);
  insertAfter(womenBlock, womenGuide);
  insertAfter(ngBlock, ngRemember);
  insertAfter(ngRemember, profileGraphic);
  insertAfter(improveBlock, improveShort);
  insertAfter(improveShort, actionGraphic);
  insertAfter(checklistBlock, summaryBox);
  insertAfter(profileExampleBlock, exampleGuide);
  insertAfter(finalBlock, finalDialogue);
  insertAfter(finalDialogue, finalRemember);

  if (ctaBlock) {
    const h2 = ctaBlock.querySelector('h2');
    const p = ctaBlock.querySelector('p:not(.eyebrow)');
    const btn = ctaBlock.querySelector('.btn');
    if (h2) h2.textContent = 'この記事を読んで、自分のプロフィールも見直した方がいいかもと感じた方へ。';
    if (p) p.textContent = '写真・プロフィール文・メッセージの流れを一緒に見れば、どこで損しているかを整理できます。まずは今の状態を見直すところから始めましょう。';
    if (btn) btn.textContent = '自分のプロフィールを見直してみる';
  }
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
