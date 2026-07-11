(function () {
  'use strict';

  var SELECTORS = {
    tile: '[data-href]',
    welcome: '#nanusiaWelcome',
    toast: '#appToast',
    search: '#tileSearch',
    clearSearch: '#clearSearch',
    clock: '#appClock',
    frame: '#wordFrame',
    frameStatus: '#frameStatus',
    frameOpen: '#frameOpenLink'
  };

  var state = {
    navigating: false,
    toastTimer: 0,
    clockTimer: 0,
    frameTimer: 0
  };

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function isModifiedClick(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button === 1;
  }

  function normaliseUrl(rawUrl) {
    var text = String(rawUrl || '').trim();
    if (!text) return '';
    try {
      return new URL(text, window.location.href).toString();
    } catch (error) {
      return text;
    }
  }

  function tileLabel(tile) {
    var title = qs('h3', tile);
    return title ? title.textContent.trim() : 'stronę';
  }

  function showToast(message, tone) {
    var toast = qs(SELECTORS.toast);
    if (!toast) return;

    window.clearTimeout(state.toastTimer);
    toast.textContent = message;
    toast.dataset.tone = tone || 'info';
    toast.hidden = false;
    toast.classList.add('is-visible');

    state.toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
      window.setTimeout(function () {
        if (!toast.classList.contains('is-visible')) {
          toast.hidden = true;
        }
      }, 220);
    }, 2200);
  }

  function addRipple(tile, event) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    var rect = tile.getBoundingClientRect();
    var ripple = document.createElement('span');
    var size = Math.max(rect.width, rect.height);
    var x = (event.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    var y = (event.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

    ripple.className = 'tile-ripple';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    tile.appendChild(ripple);

    window.setTimeout(function () {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 520);
  }

  function navigateTile(tile, event) {
    var url = normaliseUrl(tile.getAttribute('data-href') || tile.getAttribute('href'));
    if (!url || state.navigating) return;

    if (event && isModifiedClick(event)) {
      return;
    }

    if (event) event.preventDefault();
    state.navigating = true;
    tile.classList.add('is-navigating');
    tile.setAttribute('aria-busy', 'true');
    addRipple(tile, event || {});
    showToast('Otwieram: ' + tileLabel(tile), 'info');

    window.setTimeout(function () {
      window.location.assign(url);
    }, 120);
  }

  function initTiles() {
    qsa(SELECTORS.tile).forEach(function (tile) {
      var url = tile.getAttribute('data-href') || tile.getAttribute('href');
      if (!url) return;

      if (!tile.hasAttribute('href') && tile.tagName.toLowerCase() !== 'a') {
        tile.setAttribute('role', 'link');
        tile.setAttribute('tabindex', '0');
      }

      tile.setAttribute('data-href', url);
      tile.addEventListener('click', function (event) {
        navigateTile(tile, event);
      });
      tile.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          navigateTile(tile, event);
        }
      });
    });
  }

  function visibleTiles() {
    return qsa(SELECTORS.tile).filter(function (tile) {
      return tile.offsetParent !== null && tile.getAttribute('aria-hidden') !== 'true';
    });
  }

  function filterTiles(query) {
    var needle = String(query || '').trim().toLowerCase();
    var matches = 0;

    qsa(SELECTORS.tile).forEach(function (tile) {
      var haystack = tile.textContent.toLowerCase();
      var match = !needle || haystack.indexOf(needle) !== -1;
      tile.hidden = !match;
      tile.setAttribute('aria-hidden', match ? 'false' : 'true');
      if (match) matches += 1;
    });

    var grid = qs('.grid');
    if (grid) grid.dataset.empty = matches === 0 ? 'true' : 'false';
  }

  function initSearch() {
    var search = qs(SELECTORS.search);
    var clear = qs(SELECTORS.clearSearch);
    if (!search) return;

    search.addEventListener('input', function () {
      filterTiles(search.value);
    });

    search.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        search.value = '';
        filterTiles('');
        search.blur();
      }
      if (event.key === 'Enter') {
        var first = visibleTiles()[0];
        if (first) navigateTile(first, event);
      }
    });

    if (clear) {
      clear.addEventListener('click', function () {
        search.value = '';
        filterTiles('');
        search.focus();
      });
    }

    window.addEventListener('keydown', function (event) {
      var activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (event.key === '/' && activeTag !== 'input' && activeTag !== 'textarea') {
        event.preventDefault();
        search.focus();
      }
    });
  }

  function hideWelcome() {
    var welcome = qs(SELECTORS.welcome);
    if (!welcome) return;
    welcome.classList.add('is-hidden');
    window.setTimeout(function () {
      if (welcome && welcome.parentNode) welcome.parentNode.removeChild(welcome);
    }, 450);
  }

  function initWelcome() {
    var welcome = qs(SELECTORS.welcome);
    if (!welcome) return;

    welcome.addEventListener('click', hideWelcome);
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') hideWelcome();
    });
    window.setTimeout(hideWelcome, 1500);
  }

  function updateClock() {
    var clock = qs(SELECTORS.clock);
    if (!clock) return;

    var now = new Date();
    var dateText = new Intl.DateTimeFormat('pl-PL', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(now);
    var timeText = new Intl.DateTimeFormat('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(now);
    var onlineText = navigator.onLine ? 'online' : 'offline';

    clock.innerHTML = '<strong>' + timeText + '</strong><span>' + dateText + ' · ' + onlineText + '</span>';
  }

  function initClock() {
    updateClock();
    state.clockTimer = window.setInterval(updateClock, 30000);
    window.addEventListener('online', function () {
      updateClock();
      showToast('Połączenie wróciło', 'success');
    });
    window.addEventListener('offline', function () {
      updateClock();
      showToast('Brak połączenia', 'warning');
    });
  }

  function initFrameStatus() {
    var frame = qs(SELECTORS.frame);
    var status = qs(SELECTORS.frameStatus);
    var open = qs(SELECTORS.frameOpen);
    if (!frame || !status) return;

    var frameUrl = frame.getAttribute('src') || '';
    if (open && frameUrl) open.setAttribute('href', frameUrl);

    status.textContent = 'Ładowanie osadzonej strony...';
    status.hidden = false;

    state.frameTimer = window.setTimeout(function () {
      status.textContent = 'Jeżeli ramka jest pusta, strona najpewniej blokuje osadzanie. Użyj przycisku „Otwórz w nowej karcie”.';
      status.hidden = false;
    }, 4200);

    frame.addEventListener('load', function () {
      window.clearTimeout(state.frameTimer);
      status.textContent = 'Strona załadowana.';
      window.setTimeout(function () {
        status.hidden = true;
      }, 1400);
    });
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;

    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js')
        .then(function (reg) {
          console.log('Service worker registered', reg.scope);
        })
        .catch(function (err) {
          console.log('Service worker registration failed', err);
        });
    });
  }

  function init() {
    document.documentElement.classList.add('js-ready');
    initTiles();
    initSearch();
    initWelcome();
    initClock();
    initFrameStatus();
    registerServiceWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
