/* ==========================================================================
   COMPONENT MODULE: INTERACTIVE CULINARY MAP OF BANGLADESH
   Links all 8 geographical terroirs to region-based dish discovery & filtering
   ========================================================================== */

window.BengalArchive = window.BengalArchive || {};

window.BengalArchive.BangladeshMap = {
  selectedRegionId: "Old Dhaka",

  init() {
    const mount = document.getElementById('bangladesh-map-mount');
    if (!mount) return;

    this.renderShell(mount);
    this.selectRegion(this.selectedRegionId, false);
  },

  renderShell(mount) {
    const regions = window.BengalArchive.REGIONS || [];

    const pillsHtml = regions.map(r => `
      <button type="button"
              class="map-region-pill-btn ${r.id === this.selectedRegionId ? 'is-active' : ''}"
              data-map-region="${r.id}">
        ${r.shortLabel}
      </button>
    `).join('');

    const svgPolygonsHtml = regions.map(r => `
      <path class="bd-region-path ${r.id === this.selectedRegionId ? 'is-active' : ''}"
            data-map-region="${r.id}"
            d="${r.svgPath}"
            role="button"
            tabindex="0"
            aria-label="Explore ${r.name}" />
    `).join('');

    const svgMarkersHtml = regions.map(r => `
      <g class="bd-region-marker ${r.id === this.selectedRegionId ? 'is-active' : ''}"
         data-map-marker="${r.id}">
        <circle class="bd-pin-circle" cx="${r.pinX}" cy="${r.pinY}" r="5" />
        <text class="bd-region-label" x="${r.labelX}" y="${r.labelY}">${r.shortLabel}</text>
      </g>
    `).join('');

    mount.innerHTML = `
      <div class="map-region-pills" role="tablist" aria-label="Select Bangladesh Region">
        ${pillsHtml}
      </div>

      <div class="map-explorer-grid">
        <!-- Left Column: Interactive SVG Cartography of Bangladesh -->
        <div class="map-canvas-card">
          <div class="map-canvas-top">
            <span>Cartographic Terroir Index • 24°N 90°E</span>
            <span>Click Any Region</span>
          </div>

          <div class="bangladesh-svg-wrap">
            <svg class="bangladesh-svg" viewBox="15 10 445 630" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive Map of Bangladesh Culinary Regions">
              <defs>
                <pattern id="bayPattern" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M0 8 Q 4 5, 8 8 T 16 8" fill="none" stroke="rgba(244,241,234,0.12)" stroke-width="1"/>
                </pattern>
              </defs>

              <!-- Bay of Bengal Water Accent -->
              <rect x="65" y="535" width="295" height="82" fill="url(#bayPattern)" rx="4" pointer-events="none" />
              <text x="212" y="592" fill="rgba(244,241,234,0.48)" font-size="9.5" font-family="Rubik, sans-serif" letter-spacing="3" text-anchor="middle" pointer-events="none">BAY OF BENGAL</text>

              <!-- Layer 1: Interactive Regional Polygons -->
              <g id="bd-polygons-layer">
                ${svgPolygonsHtml}
              </g>

              <!-- Layer 2: Major River Arteries (Jamuna-Brahmaputra, Padma, Meghna) -->
              <g id="bd-rivers-layer" pointer-events="none">
                <path class="bd-river-path" d="M192,102 Q186,185 190,275" />
                <path class="bd-river-path" d="M58,242 Q142,268 190,282 Q226,314 262,344" />
                <path class="bd-river-path" d="M352,208 Q296,262 268,322 L262,344 Q266,412 268,485" />
              </g>

              <!-- Layer 3: Always-On-Top Region Pins & Labels (Never Covered by Polygons) -->
              <g id="bd-markers-layer" pointer-events="none">
                ${svgMarkersHtml}
              </g>
            </svg>
          </div>

          <div class="map-canvas-legend">
            <span>8 Culinary Divisions Mapped</span>
            <span>Dashed Lines: Padma • Jamuna • Meghna</span>
          </div>
        </div>

        <!-- Right Column: Live Regional Terroir Dossier & Dish Finder -->
        <div id="map-dossier-mount" class="map-dossier-panel" aria-live="polite"></div>
      </div>
    `;

    // Delegated click listener for SVG paths and top pill buttons
    mount.addEventListener('click', (e) => {
      const regionTarget = e.target.closest('[data-map-region]');
      if (regionTarget) {
        const regionId = regionTarget.getAttribute('data-map-region');
        this.selectRegion(regionId, false);
      }
    });

    // Hover state sync between polygon layer and top marker layer (zero DOM mutation)
    mount.querySelectorAll('.bd-region-path').forEach(pathEl => {
      const regionId = pathEl.getAttribute('data-map-region');
      const markerEl = mount.querySelector(`[data-map-marker="${regionId}"]`);

      pathEl.addEventListener('mouseenter', () => {
        pathEl.classList.add('is-hovered');
        if (markerEl) markerEl.classList.add('is-hovered');
      });

      pathEl.addEventListener('mouseleave', () => {
        pathEl.classList.remove('is-hovered');
        if (markerEl) markerEl.classList.remove('is-hovered');
      });

      pathEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectRegion(regionId, false);
        }
      });
    });
  },

  selectRegion(regionId, scrollToCatalogue = false) {
    this.selectedRegionId = regionId;
    const regions = window.BengalArchive.REGIONS || [];
    const dishes = window.BengalArchive.DISHES || [];
    const Icons = window.BengalArchive.Icons;

    const region = regions.find(r => r.id === regionId) || regions[0];
    const regionDishes = dishes.filter(d => d.region.toLowerCase() === region.id.toLowerCase());

    // Update active classes on polygons, pills, and top-layer markers without moving DOM nodes
    document.querySelectorAll('[data-map-region]').forEach(el => {
      const isMatch = el.getAttribute('data-map-region') === region.id;
      el.classList.toggle('is-active', isMatch);
    });

    document.querySelectorAll('[data-map-marker]').forEach(el => {
      const isMatch = el.getAttribute('data-map-marker') === region.id;
      el.classList.toggle('is-active', isMatch);
    });

    const dossierMount = document.getElementById('map-dossier-mount');
    if (!dossierMount) return;

    const dishRowsHtml = regionDishes.map(d => `
      <a href="./dish.html?id=${d.id}" class="dossier-dish-item">
        <img src="${d.image}" alt="${d.title}" class="dossier-dish-thumb" loading="lazy" />
        <div>
          <div class="dossier-dish-name">${d.title}</div>
          <div class="dossier-dish-meta">${d.bengali} • <strong>${d.rice}</strong></div>
        </div>
        <div class="dossier-dish-arrow">Monograph →</div>
      </a>
    `).join('');

    dossierMount.innerHTML = `
      <div class="dossier-eyebrow">Active Terroir • ${region.climate}</div>
      <h3 class="dossier-title">${region.name}</h3>
      <div class="dossier-bengali bengali-title">${region.bengali}</div>
      <p class="dossier-desc">${region.description}</p>

      <div class="dossier-specs">
        <div>
          <div class="dossier-spec-label">Indigenous Rice Cultivars</div>
          <div class="dossier-spec-val">${region.signatureGrains.join(' • ')}</div>
        </div>
        <div>
          <div class="dossier-spec-label">Signature Hearth &amp; Fat Medium</div>
          <div class="dossier-spec-val">${region.cookingMedium}</div>
        </div>
      </div>

      <div class="dossier-dishes-heading">
        <div class="h5" style="color: var(--text-primary);">Dishes From ${region.shortLabel} (${regionDishes.length})</div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">Click any dish to open monograph</span>
      </div>

      <div class="dossier-dishes-list">
        ${dishRowsHtml}
      </div>

      <div class="dossier-actions">
        <button type="button" class="button neon" id="filter-by-map-region-btn">
          <span>Filter Catalogue by ${region.shortLabel}</span>
          ${Icons.arrowRight}
        </button>
        <a href="./dish.html?id=${regionDishes[0] ? regionDishes[0].id : 1}" class="button text-link">
          <span>Open Lead ${region.shortLabel} Monograph</span>
        </a>
      </div>
    `;

    const filterBtn = document.getElementById('filter-by-map-region-btn');
    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        if (window.BengalArchive.Home) {
          window.BengalArchive.Home.setRegionFilter(region.id);
          const catEl = document.getElementById('catalogue');
          if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (scrollToCatalogue) {
      const catEl = document.getElementById('catalogue');
      if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
