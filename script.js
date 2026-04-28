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

// Mobile-only visual correction:
// On narrow screens, the character image drop-shadow can look like a gray background stain.
// This override removes that shadow on mobile while keeping the desktop design unchanged.
const mobileVisualFixes = document.createElement('style');
mobileVisualFixes.textContent = `
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

    .hero-guide::before {
      content: none !important;
      display: none !important;
      background: none !important;
      opacity: 0 !important;
    }
  }
`;
document.head.appendChild(mobileVisualFixes);
