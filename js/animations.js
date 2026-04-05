/* ============================================
   VÂN HOA — GSAP Animations
   ScrollTrigger reveals, Hero timeline,
   Stagger effects, Parallax
   ============================================ */

function initAllAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded — animations disabled');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  // Mark body so CSS knows GSAP is active
  document.body.classList.add('gsap-ready');

  initHeroAnimation();
  initBrandStory();
  initCollectionCards();
  initProductCards();
  initFeatureCards();
  initSectionHeadings();
  initContactSection();

  // Recalculate after images load
  ScrollTrigger.refresh();
}

// Use load event to ensure GSAP CDN scripts are fully loaded
if (document.readyState === 'complete') {
  initAllAnimations();
} else {
  window.addEventListener('load', initAllAnimations);
}

/* ══════════════════════════════════════════════
   HERO ANIMATION
   ══════════════════════════════════════════════ */
function initHeroAnimation() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const tl = gsap.timeline({
    delay: 0.4,
    defaults: { ease: 'power3.out' }
  });

  // Set initial state explicitly, then animate to visible
  gsap.set(['.hero__label', '.hero__title', '.hero__subtitle', '.hero__desc'], { opacity: 0, y: 30 });
  gsap.set('.hero__actions .btn', { opacity: 0, y: 20 });
  gsap.set('.polaroid-wrapper', { opacity: 0, y: -40, scale: 0.8 }); // Polaroids drop from above

  tl.to('.hero__label', {
    opacity: 1,
    y: 0,
    duration: 0.6
  })
  .to('.hero__title', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.3')
  .to('.hero__subtitle', {
    opacity: 1,
    y: 0,
    duration: 0.8
  }, '-=0.5')
  .to('.hero__desc', {
    opacity: 1,
    y: 0,
    duration: 0.6
  }, '-=0.4')
  .to('.hero__actions .btn', {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.6
  }, '-=0.3')
  .to('.polaroid-wrapper', {
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: 'back.out(1.5)'
  }, '-=0.6');
}

/* ══════════════════════════════════════════════
   SECTION HEADINGS
   ══════════════════════════════════════════════ */
function initSectionHeadings() {
  gsap.utils.toArray('.section-heading').forEach(heading => {
    const children = heading.children;

    gsap.fromTo(children,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          once: true
        }
      }
    );
  });
}

/* ══════════════════════════════════════════════
   BRAND STORY
   ══════════════════════════════════════════════ */
function initBrandStory() {
  const storyText = document.querySelector('.brand-story__text');
  const storyVisual = document.querySelector('.brand-story__visual');

  if (storyText) {
    gsap.fromTo(storyText.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyText,
          start: 'top 85%',
          once: true
        }
      }
    );
  }

  if (storyVisual) {
    gsap.fromTo(storyVisual,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyVisual,
          start: 'top 85%',
          once: true
        }
      }
    );
  }
}

/* ══════════════════════════════════════════════
   COLLECTION CARDS
   ══════════════════════════════════════════════ */
function initCollectionCards() {
  const cards = gsap.utils.toArray('.collection-card');
  if (!cards.length) return;

  /* Stagger reveal on scroll — using fromTo for reliability */
  gsap.fromTo(cards,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.collections__grid',
        start: 'top 85%',
        once: true
      }
    }
  );

  /* 3D tilt on hover (desktop only) */
  if (window.matchMedia('(hover: hover)').matches) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 800
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      });
    });
  }
}

/* ══════════════════════════════════════════════
   PRODUCT CARDS
   ══════════════════════════════════════════════ */
function initProductCards() {
  const cards = gsap.utils.toArray('.product-card');
  if (!cards.length) return;

  gsap.fromTo(cards,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.products__grid',
        start: 'top 85%',
        once: true
      }
    }
  );
}

/* ══════════════════════════════════════════════
   FEATURE CARDS (Why Vân Hoa)
   ══════════════════════════════════════════════ */
function initFeatureCards() {
  const cards = gsap.utils.toArray('.feature-card');
  if (!cards.length) return;

  gsap.fromTo(cards,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.why-us__grid',
        start: 'top 85%',
        once: true
      }
    }
  );

  /* Icon bounce on reveal */
  const icons = gsap.utils.toArray('.feature-card__icon');
  gsap.fromTo(icons,
    { scale: 0.5, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.15,
      duration: 0.6,
      ease: 'back.out(2)',
      delay: 0.2,
      scrollTrigger: {
        trigger: '.why-us__grid',
        start: 'top 80%',
        once: true
      }
    }
  );
}

/* ══════════════════════════════════════════════
   CONTACT SECTION
   ══════════════════════════════════════════════ */
function initContactSection() {
  const contact = document.querySelector('.contact');
  if (!contact) return;

  gsap.fromTo('.contact__content',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contact,
        start: 'top 85%',
        once: true
      }
    }
  );

  gsap.fromTo('.contact__actions .btn',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact__actions',
        start: 'top 90%',
        once: true
      }
    }
  );
}
