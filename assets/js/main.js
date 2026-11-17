/* ایلیا اصغارحری — رزومه سه‌بعدی · تعاملات */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const faNum = (n) => n.toLocaleString('fa-IR');

  /* ============================================================
     پری‌لودر
     ============================================================ */
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => {
    if (!preloader) return;
    preloader.classList.add('done');
    setTimeout(() => preloader.remove(), 700);
  };
  if (preloader) {
    window.addEventListener('load', () => setTimeout(hidePreloader, 450));
    setTimeout(hidePreloader, 2600); //fallback
  }

  /* ============================================================
     نشانگر سفارشی
     ============================================================ */
  if (finePointer && !reduceMotion) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (dot && ring) {
      let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
      addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
      (function cursorLoop() {
        rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16);
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(cursorLoop);
      })();
      document.querySelectorAll('a, button, [data-tilt], .cube, .tag').forEach((el) => {
        el.addEventListener('pointerenter', () => ring.classList.add('hovering'));
        el.addEventListener('pointerleave', () => ring.classList.remove('hovering'));
      });
    }
  }

  /* ============================================================
     موتور ستاره‌های سه‌بعدی (Canvas)
     ============================================================ */
  const canvas = document.getElementById('stars');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, DPR, stars = [], speed = 0.0009, targetSpeed = 0.0009;
    let parX = 0, parY = 0, tParX = 0, tParY = 0;
    let lastScroll = scrollY;
    const COLORS = ['#ffffff', '#cdd6ff', '#a78bfa', '#7c5cff', '#22d3ee'];
    const COUNT = finePointer ? 340 : 170;

    const resize = () => {
      DPR = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    addEventListener('resize', resize, { passive: true });

    const spawn = (z) => ({
      x: (Math.random() - 0.5) * 2.4,
      y: (Math.random() - 0.5) * 2.4,
      z: z !== undefined ? z : Math.random(),
      c: COLORS[(Math.random() * COLORS.length) | 0],
      s: 0.5 + Math.random() * 1.2,
      tw: Math.random() * 6.2832
    });
    for (let i = 0; i < COUNT; i++) stars.push(spawn());

    if (finePointer) {
      addEventListener('pointermove', (e) => {
        tParX = (e.clientX / innerWidth - 0.5);
        tParY = (e.clientY / innerHeight - 0.5);
      }, { passive: true });
    }

    const draw = (now) => {
      // وارپ هنگام اسکرول سریع
      const dy = Math.abs(scrollY - lastScroll);
      lastScroll = scrollY;
      targetSpeed = 0.0009 + Math.min(dy * 0.004, 0.02);
      speed = lerp(speed, targetSpeed, 0.08);
      parX = lerp(parX, tParX, 0.05);
      parY = lerp(parY, tParY, 0.05);

      ctx.clearRect(0, 0, W, H);
      const cx = W / 2 + parX * 46;
      const cy = H / 2 + parY * 34;
      const warp = speed > 0.006;

      for (const st of stars) {
        const pz = st.z;
        st.z -= speed * (16 + st.s * 8);
        if (st.z <= 0.04) { Object.assign(st, spawn(1)); continue; }

        const k = 0.72 / st.z;
        const sx = cx + st.x * k * (W * 0.5);
        const sy = cy + st.y * k * (H * 0.5);
        if (sx < -60 || sx > W + 60 || sy < -60 || sy > H + 60) continue;

        const size = (1 - st.z) * 3 * st.s;
        let alpha = clamp((1 - st.z) * 1.2, 0.16, 1);
        alpha *= 0.72 + 0.28 * Math.sin(now * 0.0016 + st.tw);

        ctx.globalAlpha = alpha;
        if (warp && st.z < 0.55) {
          const k2 = 0.72 / pz;
          const px = cx + st.x * k2 * (W * 0.5);
          const py = cy + st.y * k2 * (H * 0.5);
          ctx.strokeStyle = st.c;
          ctx.lineWidth = size * 0.85;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
        } else {
          ctx.fillStyle = st.c;
          ctx.beginPath(); ctx.arc(sx, sy, Math.max(size * 0.75, 0.5), 0, 6.2832); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };

    if (reduceMotion) { draw(0); } else { requestAnimationFrame(draw); }
  }

  /* ============================================================
     ناوبری: اسکرول، پیشرفت، منوی موبایل، اسکرول‌اسپای
     ============================================================ */
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('progressBar');
  const toTop = document.getElementById('toTop');

  const onScroll = () => {
    const y = scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 30);
    if (toTop) toTop.classList.toggle('show', y > 620);
    if (progressBar) {
      const h = document.documentElement.scrollHeight - innerHeight;
      progressBar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navLinks.querySelectorAll('.nav-link').forEach((l, i) => {
        l.style.setProperty('--md', open ? (0.06 + i * 0.05) + 's' : '0s');
      });
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if (links.length && sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) =>
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id)
          );
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ============================================================
     ظاهر شدن هنگام اسکرول
     ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ============================================================
     شمارنده‌های آمار
     ============================================================ */
  const counters = document.querySelectorAll('.count');
  const animateCount = (el) => {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = faNum(target); return; }
    const dur = 1500; const t0 = performance.now();
    const tick = (t) => {
      const p = clamp((t - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = faNum(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  } else counters.forEach(animateCount);

  /* ============================================================
     کارت‌های سه‌بعدی (Tilt)
     ============================================================ */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      const max = parseFloat(card.dataset.tiltMax || '9');
      let raf = null;
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          card.style.setProperty('--ry', ((px - 0.5) * 2 * max).toFixed(2) + 'deg');
          card.style.setProperty('--rx', ((0.5 - py) * 2 * max).toFixed(2) + 'deg');
          card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
          raf = null;
        });
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ============================================================
     کیوب سه‌بعدی: چرخش خودکار + کشیدن با ماوس/لمس
     ============================================================ */
  const cube = document.getElementById('cube');
  if (cube) {
    let rx = -16, ry = -28, vx = 0, vy = 0.32, dragging = false, lastX = 0, lastY = 0, idleT = 0;

    const render = () => { cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; };

    cube.addEventListener('pointerdown', (e) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      cube.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    cube.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      ry += dx * 0.45; rx = clamp(rx - dy * 0.35, -85, 85);
      vy = dx * 0.45; vx = -dy * 0.35;
      idleT = 0;
      render();
    });
    const stopDrag = () => { dragging = false; };
    cube.addEventListener('pointerup', stopDrag);
    cube.addEventListener('pointercancel', stopDrag);

    if (!reduceMotion) {
      (function cubeLoop() {
        if (!dragging) {
          idleT += 1;
          if (idleT > 50) { vx *= 0.94; vy = lerp(vy, 0.32, 0.02); }
          else { vx *= 0.92; vy *= 0.94; }
          ry += vy; rx = clamp(rx + vx, -85, 85);
          rx = lerp(rx, -16, 0.012);
        }
        render();
        requestAnimationFrame(cubeLoop);
      })();
    } else { render(); }
  }

  /* ============================================================
     افکت تایپ
     ============================================================ */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const roles = [
      'توسعه‌دهنده نرم‌افزار با تمرکز بر بک‌اند',
      'توسعه‌دهنده سامانه‌های ERP سازمانی',
      'علاقه‌مند به معماری نرم‌افزار و طراحی سیستم'
    ];
    if (reduceMotion) {
      typedEl.textContent = roles[0];
    } else {
      let ri = 0, ci = 0, del = false;
      (function type() {
        const word = roles[ri];
        typedEl.textContent = word.slice(0, ci);
        let wait = del ? 32 : 62;
        if (!del && ci === word.length) { wait = 2100; del = true; }
        else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; wait = 420; }
        else ci += del ? -1 : 1;
        setTimeout(type, wait);
      })();
    }
  }

  /* ============================================================
     پارالاکس نام هیرو
     ============================================================ */
  const heroName = document.getElementById('heroName');
  if (heroName && finePointer && !reduceMotion) {
    addEventListener('pointermove', (e) => {
      const px = (e.clientX / innerWidth - 0.5);
      const py = (e.clientY / innerHeight - 0.5);
      heroName.style.setProperty('--px', px.toFixed(3));
      heroName.style.setProperty('--py', py.toFixed(3));
    }, { passive: true });
  }

  /* ============================================================
     کپی کد
     ============================================================ */
  const copyBtn = document.getElementById('copyBtn');
  const codeBlock = document.getElementById('codeBlock');
  const copyLabel = document.getElementById('copyLabel');
  if (copyBtn && codeBlock) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.innerText);
        if (copyLabel) { copyLabel.textContent = 'کپی شد!'; setTimeout(() => copyLabel.textContent = 'کپی', 1800); }
      } catch (_) {
        const r = document.createRange();
        r.selectNodeContents(codeBlock);
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      }
    });
  }

})();
