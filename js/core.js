// ═══════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════
function goPage(id, e) {
  if(e) e.preventDefault();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('pg-'+id).classList.add('active');
  // nav links
  document.querySelectorAll('.n-links a').forEach(a => a.classList.remove('active'));
  const nl = document.getElementById('nl-'+id);
  if(nl) nl.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  // close mobile menu
  document.getElementById('mobMenu').classList.remove('open');
  document.getElementById('hamBtn').classList.remove('open');
  // init pages
  if(id==='menu') initMenu();
  if(id==='reviews') renderReviews('all');
  initReveal();
}

function toggleMob(){
  document.getElementById('hamBtn').classList.toggle('open');
  document.getElementById('mobMenu').classList.toggle('open');
}

// ═══════════════════════════════════════
// THEME
// ═══════════════════════════════════════
function toggleTheme(){
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme', dark?'light':'dark');
  document.getElementById('themeBtn').textContent = dark?'🌙':'☀️';
}

// ═══════════════════════════════════════
// SCROLL + NAV
// ═══════════════════════════════════════
window.addEventListener('scroll',()=>{
  document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>60);
  initReveal();
});

// ═══════════════════════════════════════
// REVEAL
// ═══════════════════════════════════════
function initReveal(){
  document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight-80) el.classList.add('in');
  });
}
document.addEventListener('DOMContentLoaded',()=>{ setTimeout(initReveal,100); });

// ═══════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════
const dot = document.getElementById('curDot');
const ring = document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
});
function animRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.feat-card,.testi-card,.menu-item,.cat-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ ring.style.width='56px';ring.style.height='56px';ring.style.borderColor='rgba(232,99,10,.7)';ring.style.background='rgba(232,99,10,.07)'; });
  el.addEventListener('mouseleave',()=>{ ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='rgba(232,99,10,.5)';ring.style.background=''; });
});

// ═══════════════════════════════════════
// MENU RENDERING

// ═══════════════════════════════════════
// TOAST
// ═══════════════════════════════════════
let toastTimer;
function showToast(msg,type='success'){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.className='toast '+type+' show';
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),3200);
}

window.addEventListener('DOMContentLoaded',()=>{
  initReveal();
  // set dates
  const today=new Date().toISOString().split('T')[0];
  ['m-date','p-date'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){el.min=today;el.value=today;}
  });
  // cursor hide on mobile
  if('ontouchstart' in window){
    document.getElementById('curDot').style.display='none';
    document.getElementById('curRing').style.display='none';
  }
});
