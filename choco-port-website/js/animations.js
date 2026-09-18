/* ============================================================
   CHOCO PORT — animations.js
   Hero sequence, scroll-triggered reveals, horizontal gallery,
   parallax. All guarded to fail silently if GSAP is unavailable.
   ============================================================ */

(function(){
  const hasGSAP = typeof window.gsap !== 'undefined';
  if(hasGSAP && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------- Hero entrance ---------------- */
  window.initHeroAnimation = function(){
    const hero = document.querySelector('.hero');
    if(!hero) return;

    const img = hero.querySelector('.hero-media img');
    const header = document.querySelector('.site-header');
    const eyebrow = hero.querySelector('.hero-content .eyebrow');
    const titleLines = hero.querySelectorAll('.hero-title .line-mask > span');
    const sub = hero.querySelector('.hero-sub');
    const actions = hero.querySelector('.hero-actions');
    const scrollInd = document.querySelector('.scroll-indicator');

    if(prefersReducedMotion || !hasGSAP){
      hero.classList.add('is-in');
      return;
    }

    const tl = gsap.timeline({ defaults:{ ease:'power3.out' } });
    tl.to(img, { scale:1, duration:1.6, ease:'power2.out' }, 0)
      .to(header, { opacity:1, duration:.6 }, 0.1)
      .fromTo(eyebrow, { opacity:0, y:16 }, { opacity:1, y:0, duration:.6 }, 0.3)
      .to(titleLines, { yPercent:0, duration:.9, stagger:.08 }, 0.45)
      .fromTo(sub, { opacity:0, y:20 }, { opacity:1, y:0, duration:.7 }, 0.75)
      .fromTo(actions, { opacity:0, y:20 }, { opacity:1, y:0, duration:.7 }, 0.9)
      .fromTo(scrollInd, { opacity:0 }, { opacity:1, duration:.6 }, 1.1);
  };

  /* ---------------- Generic scroll reveals ---------------- */
  window.initScrollAnimations = function(){
    if(prefersReducedMotion){
      document.querySelectorAll('[data-reveal],[data-reveal-scale],[data-clip]').forEach(el=>el.classList.add('is-in'));
      return;
    }

    if(!hasGSAP || !window.ScrollTrigger){
      // fallback: IntersectionObserver
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold:.2 });
      document.querySelectorAll('[data-reveal],[data-reveal-scale],[data-clip]').forEach(el=>io.observe(el));
      return;
    }

    document.querySelectorAll('[data-reveal],[data-reveal-scale],[data-clip]').forEach(el=>{
      const stagger = el.hasAttribute('data-reveal-group');
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: ()=> el.classList.add('is-in'),
        once: true
      });
    });

    // staggered groups (e.g. signature cards)
    document.querySelectorAll('[data-reveal-stagger]').forEach(group=>{
      const items = group.children;
      gsap.set(items, { opacity:0, y:50 });
      ScrollTrigger.create({
        trigger: group,
        start:'top 82%',
        once:true,
        onEnter:()=>{
          gsap.to(items, { opacity:1, y:0, duration:.9, stagger:.12, ease:'power3.out' });
        }
      });
    });
  };

  /* ---------------- Horizontal scroll showcase ---------------- */
  window.initHorizontalScroll = function(){
    const section = document.querySelector('.horizontal-section');
    if(!section || prefersReducedMotion || !hasGSAP || !window.ScrollTrigger) return;

    const track = section.querySelector('.h-track');
    const pin = section.querySelector('.h-pin');
    if(!track || !pin) return;

    function build(){
      const distance = track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter') || 0) * 2;
      gsap.to(track, {
        x: -Math.max(distance, 0),
        ease:'none',
        scrollTrigger:{
          trigger: pin,
          start:'top top',
          end: ()=> '+=' + (Math.max(distance, 0) + window.innerHeight * 0.4),
          scrub:1,
          pin:true,
          invalidateOnRefresh:true
        }
      });
    }
    build();
  };

  /* ---------------- Parallax ---------------- */
  window.initParallax = function(){
    if(prefersReducedMotion || !hasGSAP || !window.ScrollTrigger) return;

    document.querySelectorAll('[data-parallax]').forEach(el=>{
      const strength = parseFloat(el.getAttribute('data-parallax')) || 60;
      gsap.to(el, {
        yPercent: strength,
        ease:'none',
        scrollTrigger:{
          trigger: el.closest('[data-parallax-wrap]') || el.parentElement,
          start:'top bottom',
          end:'bottom top',
          scrub:true
        }
      });
    });
  };

})();
