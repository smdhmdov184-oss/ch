/* ============================================================
   CHOCO PORT — menu.js
   Menu category filter, gallery filter + lightbox,
   reservation form validation
   ============================================================ */

/* ---------------- Menu filter (menu.html) ---------------- */
function initMenuFilter(){
  const filters = document.querySelectorAll('.menu-filter');
  const items = document.querySelectorAll('.menu-item');
  if(!filters.length || !items.length) return;

  filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cat = btn.getAttribute('data-filter');
      filters.forEach(b=>b.classList.remove('is-active'));
      btn.classList.add('is-active');

      items.forEach(item=>{
        const match = cat === 'all' || item.getAttribute('data-category') === cat;
        if(window.gsap && !prefersReducedMotion){
          if(match){
            item.classList.remove('is-hidden');
            gsap.fromTo(item, { opacity:0, y:16 }, { opacity:1, y:0, duration:.5, ease:'power2.out' });
          } else {
            gsap.to(item, { opacity:0, y:-10, duration:.3, onComplete:()=> item.classList.add('is-hidden') });
          }
        } else {
          item.classList.toggle('is-hidden', !match);
        }
      });
    });
  });
}

/* ---------------- Gallery filter (gallery.html) ---------------- */
function initGallery(){
  const grid = document.querySelector('.gallery-grid');
  if(!grid) return;

  // build items from CHOCO_IMAGES.gallery if grid is empty of items
  if(grid.children.length === 0 && typeof CHOCO_IMAGES !== 'undefined'){
    CHOCO_IMAGES.gallery.forEach((item, i)=>{
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';
      fig.setAttribute('data-category', item.cat);
      fig.setAttribute('data-index', i);
      fig.innerHTML = `
        <img src="${item.src}" alt="Choco Port ${item.cat} photograph" loading="lazy" decoding="async">
        <div class="g-overlay"><span>View image</span></div>
      `;
      grid.appendChild(fig);
    });
  }

  const filters = document.querySelectorAll('.gallery-filter');
  const items = () => document.querySelectorAll('.gallery-item');

  filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cat = btn.getAttribute('data-filter');
      filters.forEach(b=>b.classList.remove('is-active'));
      btn.classList.add('is-active');
      items().forEach(item=>{
        const match = cat === 'all' || item.getAttribute('data-category') === cat;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });
}

/* ---------------- Lightbox (gallery.html) ---------------- */
function initLightbox(){
  const grid = document.querySelector('.gallery-grid');
  const lightbox = document.querySelector('.lightbox');
  if(!grid || !lightbox) return;

  const imgWrap = lightbox.querySelector('.lightbox-img-wrap img');
  const counter = lightbox.querySelector('.lightbox-count');
  const btnClose = lightbox.querySelector('.lightbox-close');
  const btnPrev = lightbox.querySelector('.lightbox-prev');
  const btnNext = lightbox.querySelector('.lightbox-next');

  let visibleItems = [];
  let currentIndex = 0;

  function refreshVisible(){
    visibleItems = Array.from(grid.querySelectorAll('.gallery-item:not(.is-hidden)'));
  }

  function open(index){
    refreshVisible();
    currentIndex = index;
    show();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function close(){
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  function show(){
    if(!visibleItems.length) return;
    const el = visibleItems[currentIndex];
    const src = el.querySelector('img').getAttribute('src');
    imgWrap.src = src;
    imgWrap.alt = el.querySelector('img').alt || 'Choco Port photograph';
    counter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
  }

  function next(){ currentIndex = (currentIndex + 1) % visibleItems.length; show(); }
  function prev(){ currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length; show(); }

  grid.addEventListener('click', (e)=>{
    const item = e.target.closest('.gallery-item');
    if(!item) return;
    refreshVisible();
    const idx = visibleItems.indexOf(item);
    if(idx > -1) open(idx);
  });

  btnClose && btnClose.addEventListener('click', close);
  btnNext && btnNext.addEventListener('click', next);
  btnPrev && btnPrev.addEventListener('click', prev);
  lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) close(); });

  document.addEventListener('keydown', (e)=>{
    if(!lightbox.classList.contains('is-open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowRight') next();
    if(e.key === 'ArrowLeft') prev();
  });
}

/* ---------------- Reservation form (reservation.html) ---------------- */
function initReservationForm(){
  const form = document.querySelector('.reservation-form');
  if(!form) return;

  const success = document.querySelector('.form-success');

  const validators = {
    name: v => v.trim().length >= 2 || 'Please enter your name.',
    phone: v => /^[+0-9\s()-]{7,20}$/.test(v.trim()) || 'Please enter a valid phone number.',
    date: v => v.trim().length > 0 || 'Please choose a date.',
    time: v => v.trim().length > 0 || 'Please choose a time.',
    guests: v => (Number(v) >= 1 && Number(v) <= 20) || 'Please enter between 1 and 20 guests.'
  };

  function validateField(field){
    const name = field.name;
    const rule = validators[name];
    const wrapper = field.closest('.field');
    const errorEl = wrapper ? wrapper.querySelector('.field-error') : null;
    if(!rule) return true;

    const result = rule(field.value);
    if(result === true){
      wrapper && wrapper.classList.remove('has-error');
      if(errorEl) errorEl.textContent = '';
      return true;
    } else {
      wrapper && wrapper.classList.add('has-error');
      if(errorEl) errorEl.textContent = result;
      return false;
    }
  }

  form.querySelectorAll('input, select').forEach(field=>{
    if(validators[field.name]){
      field.addEventListener('blur', ()=> validateField(field));
    }
  });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input, select').forEach(field=>{
      if(validators[field.name] && !validateField(field)) valid = false;
    });

    if(!valid){
      const firstError = form.querySelector('.has-error input, .has-error select');
      if(firstError) firstError.focus();
      return;
    }

    // Demo only — no real booking system is connected.
    form.classList.add('is-hidden');
    if(success){
      success.classList.add('is-shown');
      success.setAttribute('tabindex','-1');
      success.focus();
    }
  });
}
