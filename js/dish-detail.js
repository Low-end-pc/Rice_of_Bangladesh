/* ==========================================================================
   PAGE CONTROLLER: DEDICATED DISH DISPLAY PAGE (dish.html)
   Eat Xenia Generous Spacing × Pure Sunfarms Monograph Architecture
   ========================================================================== */

window.BengalArchive = window.BengalArchive || {};

window.BengalArchive.DishDetail = {
  currentId: 1,

  init() {
    window.BengalArchive.Navbar.init();

    const params = new URLSearchParams(window.location.search);
    const parsedId = parseInt(params.get('id'), 10);
    const total = (window.BengalArchive.DISHES || []).length || 28;
    if (!isNaN(parsedId) && parsedId >= 1 && parsedId <= total) {
      this.currentId = parsedId;
    }

    this.renderPage(this.currentId, false);

    window.addEventListener('popstate', () => {
      const p = new URLSearchParams(window.location.search);
      const id = parseInt(p.get('id'), 10) || 1;
      this.renderPage(id, false);
    });
  },

  selectDish(id, pushHistory = true) {
    this.currentId = id;
    if (pushHistory && window.history && window.history.pushState) {
      const newUrl = `${window.location.pathname}?id=${id}`;
      window.history.pushState({ id }, '', newUrl);
    }
    this.renderPage(id, true);
  },

  renderPage(id, scrollToTop = false) {
    const dishes = window.BengalArchive.DISHES || [];
    const dish = dishes.find(d => d.id === id) || dishes[0];
    const Icons = window.BengalArchive.Icons;

    document.title = `${dish.title} — Bengal Rice Archive`;

    // 1. Render Top 28-Dish Directory Sub-Menu
    const subMenuMount = document.getElementById('dish-submenu-mount');
    if (subMenuMount) {
      subMenuMount.innerHTML = dishes.map(d => `
        <a href="./dish.html?id=${d.id}"
           data-dish-id="${d.id}"
           class="dish-submenu-link ${d.id === dish.id ? 'is-active' : ''}">
          ${d.title}
        </a>
      `).join('');

      subMenuMount.querySelectorAll('.dish-submenu-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = parseInt(link.getAttribute('data-dish-id'), 10);
          this.selectDish(targetId, true);
        });
      });
    }

    // 2. Render Un-Crowded Single Dish Hero Split
    const monographMount = document.getElementById('single-dish-mount');
    if (monographMount) {
      monographMount.innerHTML = `
        <div class="single-dish-wrapper">
          <!-- Left Column: High-Impact Editorial Dish Photograph -->
          <div class="single-dish-left">
            <figure class="single-dish-figure">
              <img src="${dish.image}" alt="${dish.title} — ${dish.bengali}" />
              <figcaption class="single-dish-photo-caption">
                <span>Terroir • ${dish.region}</span>
                <span>${dish.era}</span>
              </figcaption>
            </figure>
          </div>

          <!-- Right Column: Spacious Eat Xenia Title & Narrative -->
          <div class="single-dish-right">
            <nav class="monograph-breadcrumb" aria-label="Breadcrumb">
              <a href="./index.html">Archive</a>
              <span>/</span>
              <a href="./index.html?region=${encodeURIComponent(dish.region)}#bangladesh-map">${dish.region} Terroir</a>
              <span>/</span>
              <span style="color: var(--text-primary);">${dish.title}</span>
            </nav>

            <header>
              <h1 class="monograph-title">${dish.title}</h1>
              <div class="monograph-bengali bengali-title">${dish.bengali}</div>

              <div class="monograph-meta-bar">
                <span class="region-pill ${dish.regionClass}">${dish.region}</span>
                <div class="monograph-meta-stat">
                  <b>Grain Cultivar</b>
                  <span>${dish.rice}</span>
                </div>
                <div class="monograph-meta-stat">
                  <b>Traditional Vessel</b>
                  <span>${dish.vessel}</span>
                </div>
              </div>

              <div class="monograph-description">
                <p><strong>${dish.lead}</strong></p>
                <p>${dish.story}</p>
              </div>
            </header>
          </div>
        </div>
      `;
    }

    // 3. Render Eat Xenia Centerpiece Editorial Quote Band
    const quoteMount = document.getElementById('dish-quote-mount');
    if (quoteMount) {
      quoteMount.innerHTML = `
        <div class="xenia-statement-inner">
          <blockquote class="xenia-statement-quote">
            “${dish.quote || dish.lead}”
          </blockquote>
          <div class="xenia-statement-source">
            ${dish.region} Culinary Monograph • ${dish.era}
          </div>
        </div>
      `;
    }

    // 4. Render Spacious Architectural Monograph Ledger (Aromas + Spec Stack)
    const ledgerMount = document.getElementById('dish-ledger-mount');
    if (ledgerMount) {
      const aromasHtml = dish.aromas.map(a => `
        <div class="monograph-aroma-card">
          <div class="monograph-aroma-icon">
            ${Icons.getAromaIcon(a.icon)}
          </div>
          <div>
            <div class="monograph-aroma-title">${a.label}</div>
            <div class="monograph-aroma-note">${a.note}</div>
          </div>
        </div>
      `).join('');

      ledgerMount.innerHTML = `
        <div class="container">
          <div class="monograph-ledger-grid">
            <!-- Left Sticky Column: Botanical Aroma Profile -->
            <div class="ledger-intro-col">
              <div class="h5" style="color: var(--text-muted);">Sensory Architecture</div>
              <h2 class="ledger-intro-title">Aromas &amp; Tasting Notes</h2>
              <p style="font-weight: 300; color: var(--text-secondary);">
                Each Bangladeshi rice dish is defined by the interplay of its heirloom grain starch, cooking fat medium, and regional spice volatiles.
              </p>
              <div class="monograph-aromas-grid">
                ${aromasHtml}
              </div>
            </div>

            <!-- Right Column: Spacious .border-top Spec Stack -->
            <div class="monograph-spec-stack">
              <div class="monograph-spec-row">
                <div class="spec-heading">Lineage &amp; Culinary Origin</div>
                <div class="spec-value">${dish.lineage}</div>
              </div>

              <div class="monograph-spec-row">
                <div class="spec-heading">Dominant Flavor &amp; Spice Compounds</div>
                <div class="spec-value">${dish.compounds}</div>
              </div>

              <div class="monograph-spec-row">
                <div class="spec-heading">Traditional Table Accompaniments</div>
                <div class="spec-prose">${dish.sides}</div>
              </div>

              <div class="monograph-spec-row">
                <div class="spec-heading">Regional Terroir Discovery</div>
                <div class="spec-prose" style="margin-bottom: 1.25rem;">
                  Explore how ${dish.region}'s geography, river systems, and harvest calendar shape ${dish.title} on our interactive map.
                </div>
                <a href="./index.html?region=${encodeURIComponent(dish.region)}#bangladesh-map" class="button">
                  <span>Locate ${dish.region} on Bangladesh Map</span>
                  ${Icons.arrowRight}
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // 5. Render Asymmetric Culinary Study Band (Grain Anatomy & Hearth Method)
    const studyMount = document.getElementById('culinary-study-mount');
    if (studyMount) {
      studyMount.innerHTML = `
        <div class="culinary-study-grid">
          <div class="study-col">
            <div class="study-label">Grain Anatomy • ${dish.rice}</div>
            <h2 class="study-heading">How the Grain Behaves in the Pot</h2>
            <p class="study-body">${dish.anatomy}</p>
          </div>
          <div class="study-col">
            <div class="study-label">Hearth Physics • ${dish.vessel}</div>
            <h2 class="study-heading">Thermal &amp; Vessel Extraction</h2>
            <p class="study-body">${dish.hearthMethod}</p>
          </div>
        </div>
      `;
    }

    // 6. Render Related Dishes from the Same Terroir
    const relatedGrid = document.getElementById('related-dishes-grid');
    const relatedHeading = document.getElementById('related-terroir-heading');
    if (relatedHeading) {
      relatedHeading.textContent = `More From ${dish.region}`;
    }
    if (relatedGrid) {
      relatedGrid.innerHTML = '';
      let related = dishes.filter(d => d.region === dish.region && d.id !== dish.id);
      if (related.length < 3) {
        const extras = dishes.filter(d => d.region !== dish.region && d.id !== dish.id);
        related = related.concat(extras).slice(0, 3);
      } else {
        related = related.slice(0, 3);
      }

      related.forEach(relDish => {
        const card = window.BengalArchive.FlipCard.create(relDish);
        card.classList.add('is-visible');
        relatedGrid.appendChild(card);
      });
    }

    // 7. Render Prev / All / Next Pagination Bar
    const paginationMount = document.getElementById('dish-pagination-mount');
    if (paginationMount) {
      const prevId = dish.id === 1 ? dishes.length : dish.id - 1;
      const nextId = dish.id === dishes.length ? 1 : dish.id + 1;
      const prevDish = dishes.find(d => d.id === prevId);
      const nextDish = dishes.find(d => d.id === nextId);

      paginationMount.innerHTML = `
        <div class="pagination-grid container">
          <div>
            <a href="./dish.html?id=${prevDish.id}" data-nav-id="${prevDish.id}" class="button text-link arrow-left">
              ${Icons.arrowLeft}
              <span>${prevDish.title}</span>
            </a>
          </div>
          <div style="text-align: center;">
            <a href="./index.html#catalogue" class="button neon">
              <span>View All ${dishes.length} Dishes</span>
            </a>
          </div>
          <div class="pagination-right">
            <a href="./dish.html?id=${nextDish.id}" data-nav-id="${nextDish.id}" class="button text-link">
              <span>${nextDish.title}</span>
              ${Icons.arrowRight}
            </a>
          </div>
        </div>
      `;

      paginationMount.querySelectorAll('[data-nav-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = parseInt(btn.getAttribute('data-nav-id'), 10);
          this.selectDish(targetId, true);
        });
      });
    }

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.BengalArchive.DishDetail.init();
});
