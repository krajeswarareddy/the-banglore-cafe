function initMenu(){
  renderMenuCat('popular','items-popular','chef');
  renderMenuCat('chaat','items-chaat','starter');
  renderMenuCat('starters','items-starters','starter');
  renderMenuCat('soups','items-soups','bread');
  renderMenuCat('mains','items-mains','main');
  renderMenuCat('rice','items-rice','main');
  renderMenuCat('pizza','items-pizza','main');
  renderMenuCat('pasta','items-pasta','bread');
  renderMenuCat('breads','items-breads','bread');
  renderMenuCat('desserts','items-desserts','main');
  initMenuObserver();
  const today=new Date().toISOString().split('T')[0];
  document.getElementById('p-date').min=today;
  document.getElementById('p-date').value=today;
  document.getElementById('m-date').min=today;
  document.getElementById('m-date').value=today;
}

function spiceHtml(level){
  let s='<div class="spice">';
  for(let i=1;i<=3;i++) s+=`<div class="spice-dot ${i<=level?'spice-on':'spice-off'}"></div>`;
  return s+'</div>';
}

function badgesHtml(tags){
  return tags.map(t=>{
    if(t==='pop') return '<span class="i-badge badge-pop">🔥 Popular</span>';
    if(t==='new') return '<span class="i-badge badge-new">✨ New</span>';
    if(t==='hot') return '<span class="i-badge badge-hot">🌶 Spicy</span>';
    return '';
  }).join('');
}

function renderMenuCat(catKey, containerId, type){
  const items = MENU.filter(i=>i.cat===catKey);
  const c = document.getElementById(containerId);
  if(!c) return;
  c.innerHTML = items.map(item=>{
    const avail = menuAvailability[item.id];
    const soldCls = avail?'':'sold-out';
    if(type==='chef') return `
      <div class="item-chef ${soldCls}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem;margin-bottom:.6rem">
          <div style="display:flex;align-items:center;gap:.75rem">
            <span style="font-size:1.75rem">${item.emoji}</span>
            <div>
              ${badgesHtml(item.tags)}
              <div class="i-name" style="margin-bottom:.2rem">${item.name}</div>
              <div style="display:flex;align-items:center;gap:.5rem">${spiceHtml(item.spice)}<span class="i-avail ${avail?'':'off'}">${avail?'Available':'Unavailable'}</span></div>
            </div>
          </div>
          <div class="i-price">${item.price>0?'₹'+item.price:''}</div>
        </div>
        <div class="i-desc">${item.desc}</div>
      </div>`;
    if(type==='starter') return `
      <div class="item-starter ${soldCls}">
        <div class="i-emoji">${item.emoji}</div>
        <div class="i-body">
          ${badgesHtml(item.tags)}
          <div class="i-name">${item.name}</div>
          <div class="i-desc">${item.desc}</div>
        </div>
        <div class="i-right">
          <div class="i-price">₹${item.price}</div>
          <div style="margin-top:.4rem">${spiceHtml(item.spice)}</div>
          <div class="i-avail ${avail?'':'off'}" style="margin-top:.35rem;justify-content:flex-end">${avail?'Available':'Sold Out'}</div>
        </div>
      </div>`;
    if(type==='main') return `
      <div class="item-main ${soldCls}">
        <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.75rem">
          <span style="font-size:1.6rem">${item.emoji}</span>
          <div style="flex:1">${badgesHtml(item.tags)}</div>
          <div class="i-price">₹${item.price}</div>
        </div>
        <div class="i-name">${item.name}</div>
        <div class="i-desc">${item.desc}</div>
        <div class="i-footer" style="margin-top:.75rem">
          <div style="display:flex;align-items:center;gap:.5rem"><div class="veg-d"></div>${spiceHtml(item.spice)}</div>
          <div class="i-avail ${avail?'':'off'}">${avail?'Available':'Sold Out'}</div>
        </div>
      </div>`;
    if(type==='bread') return `
      <div class="item-bread ${soldCls}">
        <div style="font-size:1.8rem;margin-bottom:.6rem">${item.emoji}</div>
        <div class="i-name">${item.name}</div>
        <div class="i-desc" style="margin:.5rem 0">${item.desc}</div>
        <div class="i-price" style="margin-top:.6rem">₹${item.price}</div>
        <div class="i-avail ${avail?'':'off'}" style="justify-content:center;margin-top:.5rem">${avail?'Available':'Sold Out'}</div>
      </div>`;
    if(type==='drink') return `
      <div class="item-drink ${soldCls}">
        <span class="i-emoji">${item.emoji}</span>
        ${badgesHtml(item.tags)}
        <div class="i-name" style="margin-bottom:.4rem">${item.name}</div>
        <div class="i-desc" style="margin-bottom:.75rem">${item.desc}</div>
        <div class="i-price">₹${item.price}</div>
        <div class="i-avail ${avail?'':'off'}" style="justify-content:center;margin-top:.4rem">${avail?'Available':'Sold Out'}</div>
      </div>`;
    if(type==='dessert') return `
      <div class="item-dessert ${soldCls}">
        <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:.75rem">
          <span style="font-size:1.6rem">${item.emoji}</span>
          <div>${badgesHtml(item.tags)}</div>
        </div>
        <div class="i-name">${item.name}</div>
        <div class="i-desc" style="margin:.5rem 0">${item.desc}</div>
        <div class="i-footer">
          <div class="i-price">₹${item.price}</div>
          <div class="i-avail ${avail?'':'off'}">${avail?'Available':'Sold Out'}</div>
        </div>
      </div>`;
    return '';
  }).join('');
}

function scrollCat(cat, btn){
  document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById('cat-'+cat);
  if(el){
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({top,behavior:'smooth'});
  }
}

// Auto-highlight sidebar category as user scrolls menu content
function initMenuObserver(){
  const cats = ['popular','chaat','starters','soups','mains','rice','pizza','pasta','breads','desserts'];
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const cat = entry.target.id.replace('cat-','');
        document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
        const matchBtn = [...document.querySelectorAll('.cat-btn')].find(b=>b.getAttribute('onclick')&&b.getAttribute('onclick').includes("'"+cat+"'"));
        if(matchBtn){
          matchBtn.classList.add('active');
          // scroll sidebar to show active btn
          matchBtn.scrollIntoView({block:'nearest',behavior:'smooth'});
        }
      }
    });
  },{rootMargin:'-70px 0px -55% 0px',threshold:0});
  cats.forEach(cat=>{
    const el=document.getElementById('cat-'+cat);
    if(el) observer.observe(el);
  });
}

function searchMenu(q){
  const query = q.toLowerCase().trim();
  document.getElementById('menuEmpty').style.display='none';
  if(!query){ document.querySelectorAll('.menu-cat-section').forEach(s=>s.style.display=''); return; }
  const results = MENU.filter(i=>i.name.toLowerCase().includes(query)||i.desc.toLowerCase().includes(query));
  document.querySelectorAll('.menu-cat-section').forEach(s=>s.style.display='none');
  if(!results.length){
    document.getElementById('menuEmpty').style.display='block';
    document.getElementById('emptyQ').textContent=q;
    return;
  }
  const cats=[...new Set(results.map(i=>i.cat))];
  cats.forEach(cat=>{
    const sec=document.getElementById('cat-'+cat);
    if(sec){ sec.style.display=''; }
    // re-render with filtered
    const containerId='items-'+cat;
    const typeMap={popular:'chef',chaat:'starter',starters:'starter',soups:'bread',mains:'main',rice:'main',pizza:'main',pasta:'bread',breads:'bread',desserts:'main'};
    const c=document.getElementById(containerId);
    if(c){
      const filtered=results.filter(i=>i.cat===cat);
      const full=MENU.filter(i=>i.cat===cat);
      // Temporarily replace data
      const originals=full.map(i=>i);
      MENU.forEach((item,idx)=>{ if(item.cat===cat) item._hide=!filtered.includes(item); });
      renderMenuCat(cat,containerId,typeMap[cat]);
      MENU.forEach(item=>{ delete item._hide; });
    }
  });
}
