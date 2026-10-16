/* ==========================================================================
   COMPONENT MODULE: SHARED HEADER & EXPANDABLE MEGA-DRAWERS (28 DISHES & 8 TERROIRS)
   ========================================================================== */

window.BengalArchive = window.BengalArchive || {};

window.BengalArchive.Navbar = {
  activeDrawer: null,

  init() {
    const mount = document.getElementById('site-navbar-mount');
    if (!mount) return;

    const dishes = window.BengalArchive.DISHES || [];
    const regions = window.BengalArchive.REGIONS || [];
    const Icons = window.BengalArchive.Icons;

    const dishLinksHtml = dishes.map(d => `
      <a href="./dish.html?id=${d.id}" class="mega-dish-link">
        <span class="mega-dish-name">${d.title}</span>
        <span class="mega-dish-region">${d.region}</span>
      </a>
    `).join('');

    const terroirCardsHtml = regions.map(r => {
      const count = dishes.filter(d => d.region.toLowerCase() === r.id.toLowerCase()).length;
      return `
        <a href="./index.html?region=${encodeURIComponent(r.id)}#catalogue" class="mega-terroir-card">
          <div>
            <div class="h5" style="color: var(--accent-neon); margin-bottom: 8px;">${count} Monographs</div>
            <div class="h4" style="color: var(--text-on-dark); margin-bottom: 10px;">${r.shortLabel}</div>
            <p style="font-size: 0.84rem; font-weight: 300; color: var(--text-on-dark-muted); line-height: 1.6;">${r.tagline}</p>
          </div>
          <div style="font-size: 0.72rem; color: var(--accent-neon); margin-top: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em;">
            Explore Terroir →
          </div>
        </a>
      `;
    }).join('');

    mount.innerHTML = `
      <header class="site-header" role="banner">
        <div class="header-inner">
          <!-- Left Expandable Drawer Triggers -->
          <nav class="nav-group left" aria-label="Archive drawers">
            <button type="button" class="nav-drawer-trigger" data-drawer="dishes" aria-expanded="false">
              <span>All 28 Dishes</span>
              <span class="plus-icon">+</span>
            </button>
            <button type="button" class="nav-drawer-trigger" data-drawer="terroirs" aria-expanded="false">
              <span>8 Terroirs</span>
              <span class="plus-icon">+</span>
            </button>
            <a href="./index.html#bangladesh-map" class="nav-link hide-mobile">Interactive Map</a>
          </nav>

          <!-- Center Brand Wordmark -->
          <a href="./index.html" class="brand-logo" title="Bengal Rice Archive Home">
            <span class="brand-crest">${Icons.brandCrest}</span>
            <span class="brand-text">
              <span class="brand-name">Bengal Rice Archive</span>
              <span class="brand-sub">Heirloom Grain Monograph</span>
            </span>
          </a>

          <!-- Right Navigation -->
          <nav class="nav-group right" aria-label="Section links">
            <a href="./index.html#catalogue" class="nav-link hide-mobile">Catalogue</a>
            <a href="./index.html#grains" class="nav-link hide-mobile">Living Grains</a>
            <a href="./dish.html?id=1" class="button neon" style="min-height: 40px; padding: 0.5rem 1.15rem;">
              <span>Dish Display</span>
              ${Icons.arrowRight}
            </a>
          </nav>
        </div>
      </header>

      <!-- Mega Drawer 1: All 28 Dishes Directory -->
      <section id="drawer-dishes" class="mega-drawer" aria-label="All 28 Dishes Index">
        <div class="mega-drawer-inner">
          <div class="mega-drawer-header">
            <div>
              <div class="h5" style="color: var(--accent-neon);">Complete Monograph Index (28 Dishes)</div>
              <div class="h3" style="margin-top: 6px;">Select Any Dish to Open Full Monograph</div>
            </div>
            <a href="./index.html#catalogue" class="button yellow" onclick="window.BengalArchive.Navbar.closeAll()">
              <span>View Interactive Flip Grid</span>
              ${Icons.arrowRight}
            </a>
          </div>
          <div class="mega-dishes-grid">
            ${dishLinksHtml}
          </div>
        </div>
      </section>

      <!-- Mega Drawer 2: 8 Culinary Terroirs of Bangladesh -->
      <section id="drawer-terroirs" class="mega-drawer" aria-label="Regional Terroirs">
        <div class="mega-drawer-inner">
          <div class="mega-drawer-header">
            <div>
              <div class="h5" style="color: var(--accent-neon);">Eight Culinary Landscapes</div>
              <div class="h3" style="margin-top: 6px;">Regional Terroirs of Bangladesh</div>
            </div>
            <a href="./index.html#bangladesh-map" class="button outline-light" onclick="window.BengalArchive.Navbar.closeAll()">
              <span>Open Interactive Bangladesh Map</span>
              ${Icons.arrowRight}
            </a>
          </div>
          <div class="mega-terroir-grid">
            ${terroirCardsHtml}
          </div>
        </div>
      </section>

      <div id="nav-backdrop" class="page-backdrop"></div>
    `;

    this.bindEvents();
  },

  bindEvents() {
    const triggers = document.querySelectorAll('.nav-drawer-trigger');
    const backdrop = document.getElementById('nav-backdrop');

    triggers.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetKey = btn.getAttribute('data-drawer');
        if (this.activeDrawer === targetKey) {
          this.closeAll();
        } else {
          this.openDrawer(targetKey);
        }
      });
    });

    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeAll());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeAll();
    });
  },

  openDrawer(key) {
    this.closeAll();
    this.activeDrawer = key;

    const drawer = document.getElementById(`drawer-${key}`);
    const trigger = document.querySelector(`.nav-drawer-trigger[data-drawer="${key}"]`);
    const backdrop = document.getElementById('nav-backdrop');

    if (drawer) drawer.classList.add('is-open');
    if (trigger) {
      trigger.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
    if (backdrop) backdrop.classList.add('is-active');
  },

  closeAll() {
    this.activeDrawer = null;
    document.querySelectorAll('.mega-drawer').forEach(d => d.classList.remove('is-open'));
    document.querySelectorAll('.nav-drawer-trigger').forEach(t => {
      t.classList.remove('is-open');
      t.setAttribute('aria-expanded', 'false');
    });
    const backdrop = document.getElementById('nav-backdrop');
    if (backdrop) backdrop.classList.remove('is-active');
  }
};
