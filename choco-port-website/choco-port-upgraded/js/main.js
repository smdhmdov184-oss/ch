const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const header=$("#header"), menu=$("#menuBtn"), nav=$("#navLinks"), theme=$("#themeBtn");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>10));
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
theme?.addEventListener("click",()=>{document.body.classList.toggle("light");localStorage.setItem("choco-theme",document.body.classList.contains("light")?"light":"dark");theme.textContent=document.body.classList.contains("light")?"☀":"☾"});
if(localStorage.getItem("choco-theme")==="light"){document.body.classList.add("light");theme.textContent="☀"}
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
$$(".reveal").forEach(el=>observer.observe(el));
$$(".filter-btn").forEach(btn=>btn.addEventListener("click",()=>{ $$(".filter-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;$$(".project").forEach(p=>p.style.display=f==="all"||p.dataset.category===f?"block":"none")}));
const form=$("#contactForm"), note=$("#formNote");
form?.addEventListener("submit",e=>{e.preventDefault();note.textContent="Form hazırdır. Netlify Forms aktivləşdirildikdə mesajlar qəbul ediləcək.";form.reset()});
