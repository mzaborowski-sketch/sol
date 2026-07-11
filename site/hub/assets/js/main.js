(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const backTop = document.querySelector('.backtop');
  const mobileQuery = window.matchMedia('(max-width: 1240px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const focusableInMenu = () => [menuButton, ...nav.querySelectorAll('a[href]')].filter(Boolean);

  function setPageInert(value) {
    if (main) main.inert = value;
    if (footer) footer.inert = value;
    if (backTop) backTop.inert = value;
  }

  function closeMenu(restoreFocus = false) {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', menuButton.dataset.labelOpen || 'Open menu');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    setPageInert(false);
    if (restoreFocus) menuButton.focus();
  }

  function openMenu() {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', menuButton.dataset.labelClose || 'Close menu');
    nav.classList.add('open');
    document.body.classList.add('menu-open');
    setPageInert(true);
    const firstLink = nav.querySelector('a[href]');
    if (firstLink) firstLink.focus();
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      open ? closeMenu(true) : openMenu();
    });

    nav.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', () => closeMenu(false));
    });

    document.addEventListener('keydown', event => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (!isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key === 'Tab') {
        const items = focusableInMenu();
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    mobileQuery.addEventListener('change', event => {
      if (!event.matches) closeMenu(false);
    });
  }

  const skipLink = document.querySelector('.skip');
  if (skipLink && main) {
    skipLink.addEventListener('click', () => {
      window.setTimeout(() => main.focus(), 0);
    });
  }

  function updateBackTop() {
    if (!backTop) return;
    const pageIsLong = document.documentElement.scrollHeight > window.innerHeight * 1.6;
    const shouldShow = pageIsLong && window.scrollY > Math.max(600, window.innerHeight);
    backTop.classList.toggle('show', shouldShow);
    backTop.setAttribute('aria-hidden', String(!shouldShow));
    backTop.tabIndex = shouldShow ? 0 : -1;
  }

  if (backTop) {
    updateBackTop();
    window.addEventListener('scroll', updateBackTop, { passive: true });
    window.addEventListener('resize', updateBackTop, { passive: true });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  }
})();
