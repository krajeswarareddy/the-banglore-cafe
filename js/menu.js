// ═══════════════════════════════════════
// MENU
// ═══════════════════════════════════════

const TYPE_MAP = {
  popular:'chef', chaat:'starter', starters:'starter',
  soups:'bread', mains:'main', rice:'main', pizza:'main',
  pasta:'bread', breads:'bread', desserts:'main'
};

function initMenu() {
  const cats = Object.keys(TYPE_MAP);
  cats.forEach(cat => renderMenuCat(cat, 'items-' + cat));
  initMenuObserver();

  const today = new Date().toISOString().split('T')[0];
  ['p-date','m-date'].forEach(id => {
    const el = document.getElementById(id);
    if(el){ el.min = today; el.value = today; }
  });
}

// ── badges ──────────────────────────────
function badgesHtml(tags) {
  return tags.map(t => {
    if(t === 'pop') return '<span class="i-badge badge-pop">🔥 Popular</span>';
    if(t === 'new') return '<span class="i-badge badge-new">✨ New</span>';
    if(t === 'hot') return '<span class="i-badge badge-hot">🌶 Spicy</span>';
    return '';
  }).join('');
}

// ── spice dots ───────────────────────────
function spiceHtml(level) {
  return `<div class="spice">${
    [1,2,3].map(i => `<div class="spice-dot ${i <= level ? 'spice-on' : 'spice-off'}"></div>`).join('')
  }</div>`;
}

// ── THE ONE BEAUTIFUL CARD ───────────────
function menuCardHtml(item) {
  const avail = menuAvailability[item.id] !== false;
  const soldCls = avail ? '' : 'sold-out';
  const badges = badgesHtml(item.tags);
  const price = item.price > 0 ? '₹' + item.price : '';

  return `
    <div class="menu-card ${soldCls}">
      <div class="mc-top">
        <div class="mc-left">
          <div class="mc-emoji">${item.emoji}</div>
          <div class="mc-info">
            ${badges ? `<div class="mc-badges">${badges}</div>` : ''}
            <div class="mc-name">${item.name}</div>
          </div>
        </div>
        ${price ? `
        <div class="mc-price-block">
          <div class="mc-price">${price}</div>
          <div class="mc-price-sub">per plate</div>
        </div>` : ''}
      </div>

      <div class="mc-desc">${item.desc}</div>

      <div class="mc-divider"></div>

      <div class="mc-footer">
        <div class="mc-meta">
          <div class="veg-d" title="Pure Veg"></div>
          ${item.spice > 0 ? spiceHtml(item.spice) : ''}
        </div>
        <div class="mc-avail ${avail ? '' : 'off'}">
          ${avail ? 'Available' : 'Sold Out'}
        </div>
      </div>
    </div>`;
}

// ── render a category ────────────────────
function renderMenuCat(catKey, containerId) {
  const items = MENU.filter(i => i.cat === catKey && !i._hide);
  const c = document.getElementById(containerId);
  if(!c) return;
  c.innerHTML = items.map(menuCardHtml).join('');
}

// ── sidebar scroll ───────────────────────
function scrollCat(cat, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById('cat-' + cat);
  if(el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ── auto-highlight sidebar on scroll ────
function initMenuObserver() {
  const cats = Object.keys(TYPE_MAP);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        const cat = entry.target.id.replace('cat-', '');
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        const matchBtn = [...document.querySelectorAll('.cat-btn')]
          .find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes("'" + cat + "'"));
        if(matchBtn) {
          matchBtn.classList.add('active');
          matchBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }
    });
  }, { rootMargin: '-70px 0px -55% 0px', threshold: 0 });

  cats.forEach(cat => {
    const el = document.getElementById('cat-' + cat);
    if(el) observer.observe(el);
  });
}

// ── search ───────────────────────────────
function searchMenu(q) {
  const query = q.toLowerCase().trim();
  document.getElementById('menuEmpty').style.display = 'none';

  if(!query) {
    document.querySelectorAll('.menu-cat-section').forEach(s => s.style.display = '');
    // restore all items
    MENU.forEach(item => { delete item._hide; });
    Object.keys(TYPE_MAP).forEach(cat => renderMenuCat(cat, 'items-' + cat));
    return;
  }

  const results = MENU.filter(i =>
    i.name.toLowerCase().includes(query) || i.desc.toLowerCase().includes(query)
  );

  document.querySelectorAll('.menu-cat-section').forEach(s => s.style.display = 'none');

  if(!results.length) {
    document.getElementById('menuEmpty').style.display = 'block';
    document.getElementById('emptyQ').textContent = q;
    return;
  }

  const matchedCats = [...new Set(results.map(i => i.cat))];
  matchedCats.forEach(cat => {
    const sec = document.getElementById('cat-' + cat);
    if(sec) sec.style.display = '';
    // mark hidden items
    MENU.forEach(item => {
      item._hide = item.cat === cat && !results.includes(item);
    });
    renderMenuCat(cat, 'items-' + cat);
    MENU.forEach(item => { delete item._hide; });
  });
}
