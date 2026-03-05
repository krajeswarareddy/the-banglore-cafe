// ═══════════════════════════════════════
// REVIEWS
// ═══════════════════════════════════════
const AVATAR_COLORS = ['#E8630A','#2D6A4F','#C75B7A','#7B4F2E','#D4AF37','#4A90D9'];
let currentFilter = 'all';

function renderReviews(filter) {
  currentFilter = filter;
  const grid = document.getElementById('revGrid');
  const all = filter === 'all'
    ? REVIEWS_DATA
    : REVIEWS_DATA.filter(r => r.rating === filter);

  if (!all.length) {
    grid.innerHTML = '<p style="color:var(--txt2);font-size:.85rem;grid-column:1/-1">No reviews for this rating yet.</p>';
    return;
  }

  grid.innerHTML = all.map(r => {
    const stars = Array(5).fill(0).map((_, i) =>
      `<svg viewBox="0 0 24 24" style="${i < r.rating ? '' : 'fill:rgba(244,161,36,.2)'}"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>`
    ).join('');
    return `<div class="testi-card rv in">
      <div class="tc-head">
        <div class="tc-av" style="background:${r.color || '#E8630A'}">${r.avatar || r.name[0]}</div>
        <div><div class="tc-name">${r.name}</div><div class="tc-meta">${r.meta || 'Guest'}</div></div>
      </div>
      <div class="tc-stars">${stars}</div>
      <p class="tc-text">${r.text}</p>
      <div class="tc-date">${r.date}</div>
    </div>`;
  }).join('');
}

function filterRevs(f, btn) {
  document.querySelectorAll('.rf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderReviews(f);
}
