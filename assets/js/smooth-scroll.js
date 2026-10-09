/**
 * Golden Moon Landing Page – High Performance Smooth Scroll Engine
 * - Buttery-smooth 60fps/120fps momentum wheel scrolling (Physics Lerp)
 * - Zero layout thrashing scrollspy using IntersectionObserver
 * - Smooth anchor navigation with header offset compensation
 */

(function () {
  'use strict';

  const SECTIONS = [
    { id: 'home', title: 'Trang chủ' },
    { id: 'about', title: 'Giới thiệu' },
    { id: 'products', title: 'Sản phẩm' },
    { id: 'gallery', title: 'Thư viện' },
    { id: 'why-us', title: 'Vì sao chọn?' },
    { id: 'testimonials', title: 'Đánh giá' },
    { id: 'contact', title: 'Liên hệ' }
  ];

  const HEADER_OFFSET = 70; // Height of sticky navbar + safety margin

  // Scroll state
  let currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  let targetScrollY = currentScrollY;
  let isLerping = false;
  let activeAnimationId = null;
  let isProgrammaticScroll = false;

  function getMaxScroll() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    ) - window.innerHeight;
  }

  function getSectionScrollTop(sectionId) {
    if (sectionId === 'home') return 0;
    const el = document.getElementById(sectionId);
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return Math.max(0, Math.min(rect.top + scrollTop - HEADER_OFFSET, getMaxScroll()));
  }

  // ── High Performance Smooth Animator (Cubic Ease In-Out) ──
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(destY, duration = 650, callback) {
    if (activeAnimationId) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
    isLerping = false;

    destY = Math.max(0, Math.min(destY, getMaxScroll()));
    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const distance = destY - startY;

    if (Math.abs(distance) < 2) {
      window.scrollTo(0, destY);
      currentScrollY = destY;
      targetScrollY = destY;
      if (callback) callback();
      return;
    }

    const startTime = performance.now();
    isProgrammaticScroll = true;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeVal = easeInOutCubic(progress);
      const newY = startY + distance * easeVal;

      window.scrollTo(0, newY);
      currentScrollY = newY;
      targetScrollY = newY;

      if (progress < 1) {
        activeAnimationId = requestAnimationFrame(step);
      } else {
        window.scrollTo(0, destY);
        currentScrollY = destY;
        targetScrollY = destY;
        activeAnimationId = null;
        setTimeout(() => {
          isProgrammaticScroll = false;
          if (callback) callback();
        }, 50);
      }
    }

    activeAnimationId = requestAnimationFrame(step);
  }

  function scrollToSection(sectionId) {
    const target = getSectionScrollTop(sectionId);
    smoothScrollTo(target, 650);
  }

  // ── Continuous Momentum Lerp Loop (Pure Smooth Glide) ──
  function momentumLerpLoop() {
    if (!isLerping || isProgrammaticScroll) return;

    const diff = targetScrollY - currentScrollY;
    if (Math.abs(diff) < 0.6) {
      currentScrollY = targetScrollY;
      window.scrollTo(0, currentScrollY);
      isLerping = false;
      return;
    }

    // Exponential smoothing factor 0.13: silky luxury glide
    currentScrollY += diff * 0.13;
    window.scrollTo(0, currentScrollY);
    requestAnimationFrame(momentumLerpLoop);
  }

  // ── Wheel Event Listener (Momentum Physics) ──
  function onWheel(e) {
    // Pass through if mouse is inside scrollable modal / dropdown
    let target = e.target;
    while (target && target !== document.body && target !== document.documentElement) {
      if (target.scrollHeight > target.clientHeight && target.clientHeight > 0) {
        const overflowY = window.getComputedStyle(target).overflowY;
        if (overflowY === 'auto' || overflowY === 'scroll') return;
      }
      target = target.parentElement;
    }

    const deltaY = e.deltaY;
    if (Math.abs(deltaY) < 3) return;

    // Detect mouse wheel step vs trackpad
    const isDiscreteWheel = e.deltaMode === 1 || Math.abs(deltaY) >= 30;

    if (activeAnimationId) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
      isProgrammaticScroll = false;
    }

    if (isDiscreteWheel) {
      e.preventDefault();
      const maxScroll = getMaxScroll();
      currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      const step = deltaY * 1.15;
      targetScrollY = Math.max(0, Math.min(maxScroll, (isLerping ? targetScrollY : currentScrollY) + step));

      if (!isLerping) {
        isLerping = true;
        requestAnimationFrame(momentumLerpLoop);
      }
    }
  }

  // ── Scrollspy with IntersectionObserver (Zero layout thrashing) ──
  function setupScrollSpy() {
    const observer = new IntersectionObserver(entries => {
      if (isProgrammaticScroll) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link').forEach(link => {
            const on = link.getAttribute('href') === '#' + id;
            link.classList.toggle('active', on);
            if (on) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-25% 0px -55% 0px', threshold: 0 });

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
  }

  // ── Throttled Navbar Shadow & Scroll-to-Top Handler ──
  let scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.getElementById('navbar');
        const scrollTopBtn = document.getElementById('scroll-top');

        if (navbar) {
          navbar.classList.toggle('scrolled', y > 40);
        }
        if (scrollTopBtn) {
          if (y > 300) {
            scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollTopBtn.classList.add('opacity-100');
          } else {
            scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollTopBtn.classList.remove('opacity-100');
          }
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  // ── Hijack Anchor Clicks ──
  function setupAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          scrollToSection(targetId);
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu');
          const hamburger = document.getElementById('hamburger');
          if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // ── Expose Global API ──
  window.GoldenMoonScroll = {
    scrollToSection,
    smoothScrollTo
  };

  // ── Init ──
  function init() {
    setupScrollSpy();
    setupAnchorLinks();

    // Async image decoding
    document.querySelectorAll('img').forEach(img => {
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    });

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
