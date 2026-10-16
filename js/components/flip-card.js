/* ==========================================================================
   COMPONENT MODULE: PURE SUNFARMS 3D FLIP CARD RENDERER
   Models `<article class="product"><div class="flip"><div class="front">...<div class="back">`
   ========================================================================== */

window.BengalArchive = window.BengalArchive || {};

window.BengalArchive.FlipCard = {
  create(dish) {
    const Icons = window.BengalArchive.Icons;
    const article = document.createElement('article');
    article.className = 'dish-card reveal';
    article.setAttribute('data-region', dish.region);

    const aromasHtml = dish.aromas.map(a => `
      <div class="aroma-icon-item">
        <div class="aroma-svg-circle">
          ${Icons.getAromaIcon(a.icon)}
        </div>
        <span class="aroma-icon-label">${a.label}</span>
      </div>
    `).join('');

    article.innerHTML = `
      <div class="dish-card-flip">
        <!-- FRONT FACE -->
        <div class="dish-card-front">
          <div class="dish-artwork">
            <img src="${dish.image}" alt="${dish.title} — ${dish.bengali}" loading="lazy" decoding="async" />
            <span class="dish-badge">${dish.badge}</span>
          </div>

          <header class="dish-front-header">
            <div>
              <div class="dish-format-label">${dish.vessel}</div>
              <h3 class="dish-card-title">${dish.title}</h3>
              <div class="dish-card-bengali bengali-title">${dish.bengali}</div>
            </div>

            <div class="dish-front-meta">
              <span class="region-pill ${dish.regionClass}">${dish.region}</span>
              <div class="grain-spec">
                <b>Grain</b> ${dish.rice}
              </div>
            </div>
          </header>
        </div>

        <!-- BACK FACE (Pure Sunfarms Terpene/Flavor Profile, Lineage & Circular SVG Aromas) -->
        <div class="dish-card-back">
          <div class="dish-back-top">
            <div class="dish-format-label">${dish.vessel}</div>
            <div class="dish-card-title" style="font-size: 1.2rem;">${dish.title}</div>
            <div class="dish-front-meta" style="margin-top: 10px; padding-top: 10px;">
              <span class="region-pill ${dish.regionClass}">${dish.region}</span>
              <div class="grain-spec">
                <b>Grain</b> ${dish.rice}
              </div>
            </div>
            <button type="button" class="dish-close-btn js-unflip" title="Flip back" aria-label="Close card back">
              ${Icons.closeX}
            </button>
          </div>

          <div class="dish-back-middle">
            <div>
              <div class="back-field-label">Dominant Flavor Compounds</div>
              <div class="back-field-value">${dish.compounds}</div>
            </div>

            <div>
              <div class="back-field-label">Lineage & Hearth Origin</div>
              <div class="back-field-value">${dish.lineage}</div>
            </div>

            <div>
              <div class="back-field-label">Aromas</div>
              <div class="aroma-icon-grid">
                ${aromasHtml}
              </div>
            </div>
          </div>

          <div class="dish-back-bottom">
            <a href="./dish.html?id=${dish.id}" class="button neon">
              <span>More Info</span>
              ${Icons.arrowRight}
            </a>
            <a href="./dish.html?id=${dish.id}#anatomy" class="button">
              <span>Grain Study</span>
            </a>
          </div>
        </div>
      </div>
    `;

    // Touch / Click support for flipping card when not clicking a link
    article.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (e.target.closest('.js-unflip')) {
        e.stopPropagation();
        article.classList.remove('is-flipped');
        return;
      }
      article.classList.toggle('is-flipped');
    });

    return article;
  }
};
