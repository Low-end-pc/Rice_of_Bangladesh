/* ==========================================================================
   PAGE CONTROLLER: HOME EXPERIENCE (index.html)
   Coordinates Interactive Bangladesh Map, 28-Dish Catalogue & Grain Ledger
   ========================================================================== */

window.BengalArchive = window.BengalArchive || {};

window.BengalArchive.Home = {
  activeRegion: 'all',
  searchQuery: '',

  init() {
    window.BengalArchive.Navbar.init();

    // Check if URL has ?region= parameter from Mega-Drawer or Dish Breadcrumb
    const params = new URLSearchParams(window.location.search);
    const regionParam = params.get('region');
    if (regionParam) {
      this.activeRegion = regionParam;
      if (window.BengalArchive.BangladeshMap) {
        window.BengalArchive.BangladeshMap.selectedRegionId = regionParam;
      }
    }

    if (window.BengalArchive.BangladeshMap) {
      window.BengalArchive.BangladeshMap.init();
    }

    this.bindControls();
    this.renderCatalogue();
    this.renderGrainsLedger();
    this.observeScrollReveals();
  },

  setRegionFilter(regionId) {
    this.activeRegion = regionId;
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(t => {
      const tabRegion = t.getAttribute('data-region');
      t.classList.toggle('is-active', tabRegion.toLowerCase() === regionId.toLowerCase());
    });
    this.renderCatalogue();
  },

  bindControls() {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
      const region = tab.getAttribute('data-region');
      if (region.toLowerCase() === this.activeRegion.toLowerCase()) {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
      }

      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        this.activeRegion = region;
        this.renderCatalogue();

        if (region !== 'all' && window.BengalArchive.BangladeshMap) {
          window.BengalArchive.BangladeshMap.selectRegion(region, false);
        }
      });
    });

    const searchInput = document.getElementById('catalogue-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.renderCatalogue();
      });
    }
  },

  renderCatalogue() {
    const grid = document.getElementById('products-grid');
    const counter = document.getElementById('catalogue-count');
    if (!grid) return;

    const dishes = window.BengalArchive.DISHES || [];
    const filtered = dishes.filter(d => {
      const matchRegion =
        this.activeRegion === 'all' ||
        d.region.toLowerCase() === this.activeRegion.toLowerCase();

      const matchQuery =
        !this.searchQuery ||
        d.title.toLowerCase().includes(this.searchQuery) ||
        d.bengali.toLowerCase().includes(this.searchQuery) ||
        d.rice.toLowerCase().includes(this.searchQuery) ||
        d.region.toLowerCase().includes(this.searchQuery) ||
        d.compounds.toLowerCase().includes(this.searchQuery);

      return matchRegion && matchQuery;
    });

    if (counter) {
      counter.textContent = `SHOWING ${filtered.length} OF ${dishes.length} MONOGRAPHS`;
    }

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 5rem 2rem; text-align: center;">
          <div class="h3">No dishes match your filter</div>
          <p style="margin: 1rem auto 2rem; color: var(--text-secondary);">
            Try clearing your search query or switching to All Terroirs.
          </p>
          <button type="button" class="button neon" id="reset-catalogue-btn">Reset Catalogue</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-catalogue-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.activeRegion = 'all';
          this.searchQuery = '';
          const searchInput = document.getElementById('catalogue-search');
          if (searchInput) searchInput.value = '';
          document.querySelectorAll('.filter-tab').forEach(t => {
            t.classList.toggle('is-active', t.getAttribute('data-region') === 'all');
          });
          this.renderCatalogue();
        });
      }
      return;
    }

    filtered.forEach(dish => {
      const card = window.BengalArchive.FlipCard.create(dish);
      grid.appendChild(card);
    });

    this.observeScrollReveals();
  },

  renderGrainsLedger() {
    const mount = document.getElementById('grains-ledger-mount');
    if (!mount) return;

    const grains = window.BengalArchive.GRAINS || [];
    mount.innerHTML = grains.map(g => `
      <article class="grain-row reveal">
        <div>
          <h3 class="grain-name">${g.name}</h3>
          <div class="grain-bengali bengali-title">${g.bengali}</div>
          <span class="grain-origin-badge">${g.origin}</span>
        </div>
        <p class="grain-desc">${g.description}</p>
        <div class="grain-starch">${g.starch}</div>
      </article>
    `).join('');
  },

  observeScrollReveals() {
    const items = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '40px' });

    items.forEach(el => observer.observe(el));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.BengalArchive.Home.init();
});
