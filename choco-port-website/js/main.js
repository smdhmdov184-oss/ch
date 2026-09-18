/* ============================================================
   CHOCO PORT — main.js
   Image config, preloader, navigation, cursor, smooth scroll
   ============================================================ */

/* ------------------------------------------------------------
   IMAGE CONFIG
   ------------------------------------------------------------
   Every image URL used across the site lives here. These are
   placeholder photographs (Unsplash) chosen to match Choco
   Port's real look — warm chocolate desserts, waffles, coffee
   and café interiors — until you swap in the restaurant's own
   photography from https://www.instagram.com/chocoport/.

   TO REPLACE: export/save the real photos into
   /assets/images/ and change each URL below to the local path,
   e.g. "assets/images/hero.jpg". Nothing else in the codebase
   needs to change.
------------------------------------------------------------- */
const CHOCO_IMAGES = {
  hero: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1920&auto=format&fit=crop",
  intro: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=1400&auto=format&fit=crop",

  signature1: "https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=1000&auto=format&fit=crop",
  signature2: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=1000&auto=format&fit=crop",
  signature3: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1000&auto=format&fit=crop",
  signature4: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?q=80&w=1000&auto=format&fit=crop",
  signature5: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
  signature6: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=1000&auto=format&fit=crop",

  horizontal1: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
  horizontal2: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1200&auto=format&fit=crop",
  horizontal3: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=1200&auto=format&fit=crop",
  horizontal4: "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=1200&auto=format&fit=crop",

  storyLarge: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
  storySmall: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=800&auto=format&fit=crop",

  interior: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1800&auto=format&fit=crop",
  interiorFloat: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=700&auto=format&fit=crop",

  aboutHero: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1600&auto=format&fit=crop",
  aboutLarge: "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1200&auto=format&fit=crop",
  aboutSmall: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
  aboutInterior: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1600&auto=format&fit=crop",

  menuHero: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1600&auto=format&fit=crop",
  galleryHero: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1600&auto=format&fit=crop",
  reservationHero: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1600&auto=format&fit=crop",
  contactHero: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop",

  menuThumbDessert: "https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=300&auto=format&fit=crop",
  menuThumbWaffle: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?q=80&w=300&auto=format&fit=crop",
  menuThumbPancake: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=300&auto=format&fit=crop",
  menuThumbChocolate: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=300&auto=format&fit=crop",
  menuThumbCoffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=300&auto=format&fit=crop",
  menuThumbDrink: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=300&auto=format&fit=crop",

  gallery: [
    { src:"https://images.unsplash.com/photo-1541599468348-e96984315921?q=80&w=900&auto=format&fit=crop", cat:"food" },
    { src:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=900&auto=format&fit=crop", cat:"interior" },
    { src:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop", cat:"moments" },
    { src:"https://images.unsplash.com/photo-1481391319762-47dff72954d9?q=80&w=900&auto=format&fit=crop", cat:"food" },
    { src:"https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=900&auto=format&fit=crop", cat:"interior" },
    { src:"https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=900&auto=format&fit=crop", cat:"food" },
    { src:"https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=900&auto=format&fit=crop", cat:"interior" },
    { src:"https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?q=80&w=900&auto=format&fit=crop", cat:"food" },
    { src:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=900&auto=format&fit=crop", cat:"moments" },
    { src:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=900&auto=format&fit=crop", cat:"food" },
    { src:"https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=900&auto=format&fit=crop", cat:"moments" },
    { src:"https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=900&auto=format&fit=crop", cat:"food" }
  ]
};

/* ------------------------------------------------------------
   Utility
------------------------------------------------------------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;

function setImageSources(){
  document.querySelectorAll('[data-img]').forEach(el=>{
    const key = el.getAttribute('data-img');
    const url = CHOCO_IMAGES[key];
    if(!url) return;
    if(el.tagName === 'IMG'){
      el.src = url;
      el.addEventListener('error', ()=>{
        el.style.background = 'linear-gradient(135deg, var(--chocolate), var(--dark-chocolate))';
        el.removeAttribute('src');
      }, { once:true });
    } else {
      el.style.backgroundImage = `url(${url})`;
    }
  });
}

/* ------------------------------------------------------------
   Preloader
------------------------------------------------------------- */
function initPreloader(onComplete){
  const pre = document.getElementById('preloader');
  if(!pre){ onComplete && onComplete(); return; }

  if(prefersReducedMotion){
    pre.remove();
    onComplete && onComplete();
    return;
  }

  const letters = pre.querySelectorAll('.pre-mark span');
  const barFill = pre.querySelector('.pre-bar-fill');

  const finish = ()=>{
    pre.classList.add('is-hidden');
    if(window.gsap){
      gsap.to(pre, {
        yPercent:-100, duration:0.9, ease:'power3.inOut',
        onComplete:()=>{ pre.remove(); onComplete && onComplete(); }
      });
    } else {
      pre.style.transition = 'transform .8s ease';
      pre.style.transform = 'translateY(-100%)';
      setTimeout(()=>{ pre.remove(); onComplete && onComplete(); }, 850);
    }
  };

  if(window.gsap){
    const tl = gsap.timeline({ onComplete: finish });
    tl.to(barFill, { width:'100%', duration:1.05, ease:'power2.inOut' }, 0)
      .to(letters, { yPercent:0, duration:.7, stagger:.03, ease:'power3.out' }, .15)
      .to(pre, {}, '+=0.35');
  } else {
    if(barFill) barFill.style.transition = 'width 1s ease';
    requestAnimationFrame(()=>{ if(barFill) barFill.style.width = '100%'; });
    setTimeout(finish, 1200);
  }
}

/* ------------------------------------------------------------
   Navigation
------------------------------------------------------------- */
function initNavigation(){
  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  const body = document.body;

  if(header){
    const onScroll = ()=>{
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
  }

  if(burger){
    burger.addEventListener('click', ()=>{
      const open = body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.style.overflow = open ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-nav .nav-link').forEach(link=>{
      link.addEventListener('click', ()=>{
        body.classList.remove('nav-open');
        body.style.overflow = '';
      });
    });
  }

  // mark active nav link
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-link[href]').forEach(link=>{
    const href = link.getAttribute('href');
    if(href === current || (current === '' && href === 'index.html')){
      link.classList.add('is-active');
    }
  });
}

/* ------------------------------------------------------------
   Custom cursor
------------------------------------------------------------- */
function initCursor(){
  if(isTouch) return;
  const cursor = document.getElementById('cursor');
  if(!cursor) return;

  let mx = window.innerWidth/2, my = window.innerHeight/2;
  let cx = mx, cy = my;

  window.addEventListener('mousemove', e=>{
    mx = e.clientX; my = e.clientY;
  });

  function raf(){
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(raf);
  }
  raf();

  const labelEl = cursor.querySelector('.cursor-label');

  document.querySelectorAll('[data-cursor]').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{
      cursor.classList.add('is-hover');
      labelEl.textContent = el.getAttribute('data-cursor') || '';
    });
    el.addEventListener('mouseleave', ()=>{
      cursor.classList.remove('is-hover');
      labelEl.textContent = '';
    });
  });

  // magnetic buttons
  document.querySelectorAll('[data-magnetic]').forEach(el=>{
    el.addEventListener('mousemove', e=>{
      const r = el.getBoundingClientRect();
      const relX = e.clientX - r.left - r.width/2;
      const relY = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${relX*0.25}px, ${relY*0.4}px)`;
    });
    el.addEventListener('mouseleave', ()=>{
      el.style.transform = 'translate(0,0)';
    });
  });
}

/* ------------------------------------------------------------
   Smooth scroll (Lenis, graceful fallback to native)
------------------------------------------------------------- */
function initSmoothScroll(){
  if(prefersReducedMotion || typeof Lenis === 'undefined'){
    document.documentElement.style.scrollBehavior = 'smooth';
    return null;
  }
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t)=> Math.min(1, 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  if(window.ScrollTrigger){
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  window.__lenis = lenis;
  return lenis;
}

/* ------------------------------------------------------------
   Boot
------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  setImageSources();
  initNavigation();
  initCursor();

  initPreloader(()=>{
    initSmoothScroll();
    if(typeof initHeroAnimation === 'function') initHeroAnimation();
    if(typeof initScrollAnimations === 'function') initScrollAnimations();
    if(typeof initHorizontalScroll === 'function') initHorizontalScroll();
    if(typeof initParallax === 'function') initParallax();
    document.body.classList.add('is-ready');
  });

  // page-specific inits guarded so a missing script never breaks the page
  try{ if(typeof initMenuFilter === 'function') initMenuFilter(); }catch(e){ console.error(e); }
  try{ if(typeof initGallery === 'function') initGallery(); }catch(e){ console.error(e); }
  try{ if(typeof initLightbox === 'function') initLightbox(); }catch(e){ console.error(e); }
  try{ if(typeof initReservationForm === 'function') initReservationForm(); }catch(e){ console.error(e); }
});
