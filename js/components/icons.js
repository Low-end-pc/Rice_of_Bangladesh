/* ==========================================================================
   COMPONENT MODULE: CUSTOM BOTANICAL & CULINARY SVG ICONS
   Modeled on Pure Sunfarms circular SVG aroma illustrations (Zero Emojis)
   ========================================================================== */

window.BengalArchive = window.BengalArchive || {};

window.BengalArchive.Icons = {
  brandCrest: `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 2v20"/>
      <path d="M12 6c-3-2-6-1-7 2 2 2 5 2 7-2z"/>
      <path d="M12 6c3-2 6-1 7 2-2 2-5 2-7-2z"/>
      <path d="M12 11c-3-2-6-1-7 2 2 2 5 2 7-2z"/>
      <path d="M12 11c3-2 6-1 7 2-2 2-5 2-7-2z"/>
      <path d="M12 16c-3-2-6-1-7 2 2 2 5 2 7-2z"/>
      <path d="M12 16c3-2 6-1 7 2-2 2-5 2-7-2z"/>
    </svg>
  `,

  arrowRight: `
    <svg class="arrow-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 10h12"/>
      <path d="M11 5l5 5-5 5"/>
    </svg>
  `,

  arrowLeft: `
    <svg class="arrow-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M16 10H4"/>
      <path d="M9 5l-5 5 5 5"/>
    </svg>
  `,

  closeX: `
    <svg width="22" height="22" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M19.62 6.54 6.54 19.62M19.62 19.62 6.54 6.54" stroke="#173D32" stroke-width="1.8" stroke-linecap="round"/>
    </svg>
  `,

  search: `
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/>
      <path d="M20 20l-3.5-3.5"/>
    </svg>
  `,

  getAromaIcon(type) {
    const map = {
      mustard: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6">
          <circle cx="11" cy="13" r="3.2" fill="#FCB900"/>
          <circle cx="20" cy="11" r="2.8" fill="#ADF76D"/>
          <circle cx="16" cy="20" r="3.5" fill="#FCB900"/>
          <path d="M8 23c4-2 12-2 16 0" stroke-linecap="round"/>
        </svg>
      `,
      chili: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 8c-4 0-10 5-12 14 7-1 13-6 14-12 0-1-1-2-2-2z" fill="#ADF76D"/>
          <path d="M21 8c1-2 3-3 5-2"/>
        </svg>
      `,
      meat: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <rect x="7" y="12" width="18" height="11" rx="3" fill="#F4B6A4"/>
          <path d="M11 9v3M16 8v4M21 9v3"/>
          <circle cx="13" cy="17.5" r="2" fill="#F4F1EA"/>
        </svg>
      `,
      leaf: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 24C8 14 15 8 24 8c0 9-6 16-16 16z" fill="#ADF76D"/>
          <path d="M8 24L19 13"/>
        </svg>
      `,
      ghee: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 7c-4 6-7 9.5-7 13.5a7 7 0 0 0 14 0C23 16.5 20 13 16 7z" fill="#FCB900"/>
          <path d="M13 21a3 3 0 0 0 3 2.5"/>
        </svg>
      `,
      floral: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="16" cy="16" r="3" fill="#FCB900"/>
          <path d="M16 7v5M16 20v5M7 16h5M20 16h5M10 10l3.5 3.5M18.5 18.5L22 22M22 10l-3.5 3.5M13.5 18.5L10 22"/>
        </svg>
      `,
      nutty: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="16" cy="17" rx="7" ry="8" fill="#F5D08A"/>
          <path d="M11 14c3-2 7-2 10 0"/>
          <path d="M16 9V6"/>
        </svg>
      `,
      grain: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 6v20"/>
          <ellipse cx="12.5" cy="12" rx="2.5" ry="4" transform="rotate(-25 12.5 12)" fill="#ADF76D"/>
          <ellipse cx="19.5" cy="12" rx="2.5" ry="4" transform="rotate(25 19.5 12)" fill="#ADF76D"/>
          <ellipse cx="12.5" cy="19" rx="2.5" ry="4" transform="rotate(-25 12.5 19)" fill="#FCB900"/>
          <ellipse cx="19.5" cy="19" rx="2.5" ry="4" transform="rotate(25 19.5 19)" fill="#FCB900"/>
        </svg>
      `,
      spice: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="16,6 19,13 26,16 19,19 16,26 13,19 6,16 13,13" fill="#F5D08A"/>
          <circle cx="16" cy="16" r="2" fill="#173D32"/>
        </svg>
      `,
      sour: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="16" cy="16" r="8" fill="#ADF76D"/>
          <path d="M16 8v16M8 16h16M10.5 10.5l11 11M21.5 10.5l-11 11"/>
        </svg>
      `,
      earth: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 21h20l-3 5H9l-3-5z" fill="#F4B6A4"/>
          <path d="M9 21c0-5 3-9 7-9s7 4 7 9"/>
        </svg>
      `,
      citrus: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 20a8 8 0 0 1 16 0Z" fill="#FCB900"/>
          <path d="M16 20v-8M16 20l-5-5M16 20l5-5"/>
        </svg>
      `,
      bamboo: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <rect x="12" y="6" width="8" height="20" rx="1" fill="#ADF76D"/>
          <path d="M10 12h12M10 19h12"/>
        </svg>
      `,
      smoke: `
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#173D32" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 24c0-4 4-4 4-8s-4-4-4-8"/>
          <path d="M17 24c0-4 4-4 4-8s-4-4-4-8"/>
          <path d="M7 26h18"/>
        </svg>
      `
    };
    return map[type] || map.grain;
  }
};
