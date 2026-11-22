/* ============================================================
   Portfolio interactions — vanilla JS, no dependencies
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var LANG_KEY = 'ia.lang';
  var THEME_KEY = 'ia.theme';
  var html = document.documentElement;

  var state = {
    lang: html.lang === 'en' ? 'en' : 'fa',
    theme: html.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  };

  function dict(lang) { return (window.translations || {})[lang] || {}; }

  function t(path) {
    var parts = path.split('.');
    var node = dict(state.lang);
    for (var i = 0; i < parts.length; i++) {
      if (node == null) { return undefined; }
      node = node[parts[i]];
    }
    return node;
  }

  var FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  function toFaDigits(value) {
    return String(value).replace(/[0-9]/g, function (d) { return FA_DIGITS[+d]; });
  }

  /* ---------------- i18n engine ---------------- */
  function setMeta(name, content, attr) {
    if (!content) { return; }
    var m = document.querySelector('meta[' + (attr || 'name') + '="' + name + '"]');
    if (m) { m.setAttribute('content', content); }
  }
  function setOG(prop, content) {
    if (!content) { return; }
    var m = document.querySelector('meta[property="' + prop + '"]');
    if (m) { m.setAttribute('content', content); }
  }

  /* Fill an element from a translation string; **segments** become <strong>. */
  function fillI18n(el, v) {
    if (v.indexOf('**') === -1) { el.textContent = v; return; }
    el.textContent = '';
    v.split('**').forEach(function (part, i) {
      if (!part) { return; }
      if (i % 2 === 1) {
        var s = document.createElement('strong');
        s.textContent = part;
        el.appendChild(s);
      } else {
        el.appendChild(document.createTextNode(part));
      }
    });
  }

  function applyI18n() {
    var d = dict(state.lang);

    $$('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (typeof v === 'string') { fillI18n(el, v); }
    });
    $$('[data-i18n-aria-label]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-aria-label'));
      if (typeof v === 'string') { el.setAttribute('aria-label', v); }
    });
    $$('[data-i18n-title]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-title'));
      if (typeof v === 'string') { el.setAttribute('title', v); }
    });

    html.lang = state.lang;
    html.dir = state.lang === 'fa' ? 'rtl' : 'ltr';

    if (d.meta) {
      if (d.meta.title) { document.title = d.meta.title; }
      setMeta('description', d.meta.description);
      setOG('og:title', d.meta.title);
      setOG('og:description', d.meta.description);
      setMeta('twitter:title', d.meta.title);
      setMeta('twitter:description', d.meta.description);
      setOG('og:locale', state.lang === 'fa' ? 'fa_IR' : 'en_US');
    }

    /* copyright with dynamic year */
    var c = document.getElementById('copyright');
    if (c) {
      var year = new Date().getFullYear();
      var rights = t('footer.rights');
      if (typeof rights === 'string') {
        c.textContent = rights.replace('{year}', state.lang === 'fa' ? toFaDigits(year) : String(year));
      }
    }

    /* language switcher state */
    var fa = document.getElementById('langFA');
    var en = document.getElementById('langEN');
    if (fa) { fa.setAttribute('aria-pressed', String(state.lang === 'fa')); }
    if (en) { en.setAttribute('aria-pressed', String(state.lang === 'en')); }

    updateThemeUI();
    html.classList.remove('i18n-pending');
  }

  function setLang(lang) {
    state.lang = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* private mode */ }
    applyI18n();
  }

  /* ---------------- theme ---------------- */
  function updateThemeUI() {
    var btn = document.getElementById('themeToggle');
    if (!btn) { return; }
    var key = state.theme === 'dark' ? 'a11y.themeToLight' : 'a11y.themeToDark';
    var v = t(key);
    if (typeof v === 'string') { btn.setAttribute('aria-label', v); }
  }

  function setTheme(theme) {
    state.theme = theme;
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) { /* private mode */ }
    setMeta('theme-color', theme === 'light' ? '#F7F8FA' : '#0B0D12');
    updateThemeUI();
  }

  /* ---------------- navigation ---------------- */
  function initNav() {
    var header = document.getElementById('navbar');
    var menuBtn = document.getElementById('menuBtn');
    if (!header) { return; }

    function setMenu(open) {
      var wasOpen = header.classList.contains('nav-open');
      if (open) { header.classList.add('nav-open'); }
      else { header.classList.remove('nav-open'); }
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', String(open));
        var v = t(open ? 'a11y.menuClose' : 'a11y.menu');
        if (typeof v === 'string') { menuBtn.setAttribute('aria-label', v); }
        if (!open && wasOpen) { menuBtn.focus(); }
      }
    }

    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        setMenu(!header.classList.contains('nav-open'));
      });
    }
    $$('.nav-panel a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setMenu(false); }
    });
    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) { setMenu(false); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 880) { setMenu(false); }
    });

    /* scroll spy */
    var NAV_IDS = ['about', 'experience', 'projects', 'skills', 'contact'];
    var ALL_IDS = ['hero', 'about', 'experience', 'projects', 'skills', 'learning', 'education', 'contact'];
    var links = {};
    NAV_IDS.forEach(function (id) {
      links[id] = $$('a[href="#' + id + '"]');
    });
    var sections = ALL_IDS
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    function setActive(id) {
      NAV_IDS.forEach(function (k) {
        (links[k] || []).forEach(function (a) {
          a.classList.toggle('active', k === id);
        });
      });
    }

    if ('IntersectionObserver' in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(NAV_IDS.indexOf(entry.target.id) !== -1 ? entry.target.id : null);
          }
        });
      }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  /* ---------------- reveal animations ---------------- */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (el) { el.classList.add('in-view'); });
      $$('[data-stagger]').forEach(function (g) { g.classList.add('in-view'); });
      return;
    }
    $$('[data-stagger]').forEach(function (group) {
      var children = Array.prototype.slice.call(group.children);
      children.forEach(function (child, i) {
        child.style.setProperty('--d', (i * 70) + 'ms');
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal, [data-stagger]').forEach(function (el) { io.observe(el); });
  }

  /* ---------------- monogram 3D tilt ---------------- */
  function initTilt() {
    var card = document.getElementById('monogram');
    if (!card) { return; }
    var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) { return; }
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
      card.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
    });
    card.addEventListener('pointerleave', function () {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  }

  /* ---------------- toast + copy email ---------------- */
  var toastTimer = null;
  function showToast(msg) {
    var toast = document.getElementById('toast');
    var msgEl = document.getElementById('toastMsg');
    if (!toast || !msgEl) { return; }
    msgEl.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  function initCopyEmail() {
    var btn = document.getElementById('copyEmailBtn');
    if (!btn) { return; }
    var EMAIL = 'ilia.dev2005@gmail.com';

    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = EMAIL;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        done(!!ok);
      } catch (e) { done(false); }
    }
    function done(ok) {
      var v = t(ok ? 'contact.copied' : 'contact.copyFailed');
      showToast(typeof v === 'string' ? v : '');
    }

    btn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(function () { done(true); }, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------------- curriculum accordion ---------------- */
  function initCurriculum() {
    var btn = document.getElementById('curriculumToggle');
    var panel = document.getElementById('curriculumPanel');
    if (!btn || !panel) { return; }
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('open', !open);
    });
  }

  /* ---------------- print ---------------- */
  function initPrint() {
    var btn = document.getElementById('printBtn');
    if (btn) {
      btn.addEventListener('click', function () { window.print(); });
    }
  }

  /* ---------------- boot ---------------- */
  function init() {
    var fa = document.getElementById('langFA');
    var en = document.getElementById('langEN');
    if (fa) { fa.addEventListener('click', function () { setLang('fa'); }); }
    if (en) { en.addEventListener('click', function () { setLang('en'); }); }

    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        setTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    }

    applyI18n();
    initNav();
    initReveal();
    initTilt();
    initCopyEmail();
    initCurriculum();
    initPrint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
