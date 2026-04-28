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

const visualFixes = document.createElement('style');
visualFixes.textContent = `
  /* Remove the decorative gray plate behind the hero speech bubble */
  .hero-guide::before {
    content: none !important;
    display: none !important;
    background: none !important;
    opacity: 0 !important;
  }

  /* Make the problem-section mascot look like it is speaking */
  .mini-guide {
    position: relative !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 280px !important;
    min-height: auto !important;
    padding: 0 !important;
    gap: 0 !important;
  }

  .mini-guide .speech-bubble.small {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    order: 1 !important;
    max-width: 260px !important;
    margin: 0 auto !important;
    text-align: left !important;
    z-index: 3 !important;
  }

  .mini-guide .speech-bubble.small::after {
    left: 50% !important;
    right: auto !important;
    bottom: -10px !important;
    width: 18px !important;
    height: 18px !important;
    transform: translateX(-50%) rotate(45deg) !important;
  }

  .mini-guide .small-character {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    order: 2 !important;
    width: 112px !important;
    flex: none !important;
    margin: 4px auto 0 !important;
    z-index: 2 !important;
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

    .section-heading.with-mascot {
      align-items: flex-start !important;
    }

    .mini-guide {
      width: 100% !important;
      max-width: 280px !important;
      align-items: center !important;
      margin-top: 8px !important;
    }

    .mini-guide .speech-bubble.small {
      max-width: 260px !important;
    }

    .mini-guide .small-character {
      width: 96px !important;
    }
  }
`;
document.head.appendChild(visualFixes);
