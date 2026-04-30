const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

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

// On narrow screens, move the eyecatch before the article title.
// This makes the first view more visual on small devices like iPhone 8.
const articleEyecatch = document.querySelector('.article-page .article-main > figure.article-block:first-child');
const articleHeroGrid = document.querySelector('.article-page .article-hero-grid');
const articleHeroCopy = document.querySelector('.article-page .article-hero-copy');
const articleMain = document.querySelector('.article-page .article-main');
const originalEyecatchNext = articleEyecatch ? articleEyecatch.nextElementSibling : null;
const mobileArticleQuery = window.matchMedia('(max-width: 640px)');

function placeArticleEyecatch(event) {
  if (!articleEyecatch || !articleHeroGrid || !articleHeroCopy || !articleMain) return;

  if (mobileArticleQuery.matches) {
    articleEyecatch.classList.add('mobile-first-eyecatch');
    articleHeroGrid.insertBefore(articleEyecatch, articleHeroCopy);
  } else {
    articleEyecatch.classList.remove('mobile-first-eyecatch');
    if (originalEyecatchNext && originalEyecatchNext.parentElement === articleMain) {
      articleMain.insertBefore(articleEyecatch, originalEyecatchNext);
    } else {
      articleMain.insertBefore(articleEyecatch, articleMain.firstChild);
    }
  }
}

placeArticleEyecatch();
mobileArticleQuery.addEventListener('change', placeArticleEyecatch);

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
      padding-top: 26px !important;
      padding-bottom: 30px !important;
    }

    .article-page .article-hero-grid {
      gap: 18px !important;
    }

    .article-page .mobile-first-eyecatch {
      margin: 0 0 10px !important;
      padding: 0 !important;
      overflow: hidden !important;
      border-radius: 22px !important;
      box-shadow: 0 12px 28px rgba(21,42,77,0.08) !important;
    }

    .article-page .mobile-first-eyecatch img {
      display: block !important;
      width: 100% !important;
      height: auto !important;
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
