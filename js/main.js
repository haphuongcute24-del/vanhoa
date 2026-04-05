/* ============================================
   VÂN HOA — Main JavaScript
   Navbar, Mobile Menu, Preloader, Back-to-Top,
   Smooth Scroll, Utilities
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
  initCopyrightYear();
  initCustomCursor();
});

/* ── Preloader ── */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.classList.remove('loading');

      preloader.addEventListener('transitionend', () => {
        preloader.remove();
      }, { once: true });
    }, 800);
  });
}

/* ── Navbar Scroll Effect ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const threshold = 50;

  function updateNavbar() {
    if (window.scrollY > threshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

/* ── Mobile Menu ── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

  function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    document.body.style.overflow = isActive ? 'hidden' : '';

    hamburger.setAttribute('aria-expanded', isActive);
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Back to Top ── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const showThreshold = 500;

  function toggleBtn() {
    if (window.scrollY > showThreshold) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  toggleBtn();
  window.addEventListener('scroll', toggleBtn, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Copyright Year ── */
function initCopyrightYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ── Custom Cursor (Magnetic Bloom) ── */
function initCustomCursor() {
  if (window.innerWidth < 1024) return; // Only desktop

  const cursorDot = document.querySelector('.cursor-dot');
  const cursorFollower = document.querySelector('.cursor-follower');
  const cursorFlower = document.querySelector('.cursor-flower');
  if (!cursorDot || !cursorFollower || !cursorFlower) return;
  
  if (typeof gsap === 'undefined') return;

  // Track position
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  // Set initial dot opacity after mouse move
  let initialized = false;

  // Particle Engine state
  let lastParticleX = 0;
  let lastParticleY = 0;
  let isHovering = false;

  const createParticle = (x, y, isPetal, forceX = 0, forceY = 0, isBurst = false) => {
    const particle = document.createElement('div');
    particle.className = isPetal ? 'petal-particle' : 'sparkle-particle';
    document.body.appendChild(particle);

    const startX = x + (Math.random() - 0.5) * 10;
    const startY = y + (Math.random() - 0.5) * 10;
    gsap.set(particle, { x: startX, y: startY });

    if (isPetal) {
      let endX, endY, rot, ease, duration;
      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 40 + Math.random() * 40;
        endX = startX + Math.cos(angle) * radius;
        endY = startY + Math.sin(angle) * radius + 30; // fall down a bit
        rot = (Math.random() - 0.5) * 360;
        ease = 'expo.out';
        duration = 1.0 + Math.random() * 0.5;
      } else {
        endX = startX + (Math.random() - 0.5) * 50 + forceX * 1.5;
        endY = startY + 50 + Math.random() * 30 + forceY * 0.5;
        rot = (Math.random() - 0.5) * 180;
        ease = 'power1.out';
        duration = 1.5 + Math.random();
      }
      
      gsap.to(particle, {
        x: endX,
        y: endY,
        rotation: rot,
        opacity: 0,
        duration: duration,
        ease: ease,
        onComplete: () => particle.remove()
      });
    } else {
      let endX, endY, ease, duration;
      if (isBurst) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 60;
        endX = startX + Math.cos(angle) * radius;
        endY = startY + Math.sin(angle) * radius;
        ease = 'expo.out';
        duration = 0.6 + Math.random() * 0.4;
      } else {
        endX = startX + (Math.random() - 0.5) * 20 + forceX;
        endY = startY + (Math.random() - 0.5) * 20 + forceY * 0.5;
        ease = 'power2.out';
        duration = 0.4 + Math.random() * 0.3;
      }
      gsap.to(particle, {
        x: endX,
        y: endY,
        scale: Math.random() * 0.5 + 0.5,
        opacity: 0,
        duration: duration,
        ease: ease,
        onComplete: () => particle.remove()
      });
    }
  };

    let activeTarget = null;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!initialized) {
      gsap.set([cursorDot, cursorFollower], { xPercent: -50, yPercent: -50 });
      gsap.to([cursorDot, cursorFollower], { opacity: 1, duration: 0.3 });
      initialized = true;
    }

    let targetX = mouseX;
    let targetY = mouseY;

    if (activeTarget) {
      const rect = activeTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Gentle magnetic pull
      targetX = centerX + (mouseX - centerX) * 0.3;
      targetY = centerY + (mouseY - centerY) * 0.3;
    }

    gsap.set(cursorDot, { x: mouseX, y: mouseY });
    gsap.to(cursorFollower, { x: targetX, y: targetY, duration: 0.15, ease: 'power2.out' });

    // Particle Emitter (Continuous Interpolated Trail)
    const dist = Math.hypot(mouseX - lastParticleX, mouseY - lastParticleY);
    if (dist > 8 && !isHovering) {
      // Calculate how many particles we need to fill the gap (1 particle per 8px)
      // Cap at 15 to prevent lag spikes on huge mouse jumps
      const amount = Math.min(Math.floor(dist / 8), 15);
      
      for (let i = 1; i <= amount; i++) {
        const t = i / amount;
        const lerpX = lastParticleX + (mouseX - lastParticleX) * t;
        const lerpY = lastParticleY + (mouseY - lastParticleY) * t;
        
        const isPetal = Math.random() < 0.08; // 8% chance for a big petal
        
        // Calculate wind momentum based on full distance gap
        const forceX = Math.max(-60, Math.min(60, (mouseX - lastParticleX) * 0.6));
        const forceY = Math.max(-60, Math.min(60, (mouseY - lastParticleY) * 0.6));
        
        createParticle(lerpX, lerpY, isPetal, forceX, forceY, false);
      }
      
      lastParticleX = mouseX;
      lastParticleY = mouseY;
    }
  });

  window.addEventListener('mousedown', (e) => {
    // Burst 15 sparkles and 3 petals
    for (let i = 0; i < 15; i++) {
      createParticle(e.clientX, e.clientY, false, 0, 0, true);
    }
    for (let i = 0; i < 3; i++) {
      createParticle(e.clientX, e.clientY, true, 0, 0, true);
    }
  });

  // Magnetic & Bloom effect on hover targets
  const hoverTargets = document.querySelectorAll('a, button, .card, .social-link, .polaroid-wrapper, .product-card__image img');

  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', (e) => {
      isHovering = true;
      activeTarget = target;
      gsap.killTweensOf([cursorDot, cursorFollower, cursorFlower]);
      
      // Bloom effect
      gsap.to(cursorDot, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(cursorFollower, { 
        width: 60, height: 60, 
        backgroundColor: 'transparent',
        filter: 'blur(0px)',
        duration: 0.3 
      });
      cursorFlower.style.display = 'block';
      gsap.to(cursorFlower, { opacity: 1, scale: 1, rotation: 180, duration: 0.4, ease: 'back.out(1.5)' });
    });

    target.addEventListener('mouseleave', () => {
      isHovering = false;
      activeTarget = null;
      gsap.killTweensOf([cursorDot, cursorFollower, cursorFlower]);
      
      // Reset to original dot and blur follower
      gsap.to(cursorDot, { scale: 1, opacity: 1, duration: 0.2 });
      gsap.to(cursorFollower, { 
        width: 40, height: 40, 
        backgroundColor: 'rgba(242, 181, 200, 0.4)',
        filter: 'blur(4px)',
        duration: 0.3 
      });
      gsap.to(cursorFlower, { opacity: 0, scale: 0, rotation: 0, duration: 0.2, onComplete: () => {
        cursorFlower.style.display = 'none';
      }});
    });
  });
}
