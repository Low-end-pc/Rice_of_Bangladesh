# Bengal Rice Archive — Interactive Culinary Atlas & Monograph

An editorial culinary archive documenting **28 authentic rice preparations** across **8 geographic terroirs of Bangladesh**, combining **Pure Sunfarms** botanical color-blocking and 3D interactive cards with **Eat Xenia**'s warm humanist serif + airy geometric sans-serif typography and expansive whitespace.

## Architectural Structure

```text
Biryani WEbsite/
├── index.html                  # Main Archive Atlas (Hero, Interactive Map, 28-Dish Catalogue, Grain Explorer)
├── dish.html                   # Spacious Single-Dish Monograph Page (?id=dish_1 .. dish_28)
├── css/
│   ├── tokens.css              # Design tokens: Fraunces + Rubik fonts, fluid type, expanded spacing (--space-1 to --space-40), regional palette
│   ├── base.css                # Reset, Eat Xenia typography rules, wide-tracked pill buttons, statement quote bands
│   ├── layout.css              # Asymmetric splits, generous vertical rhythm, mega-drawer, footer
│   ├── map.css                 # 2-column Interactive Bangladesh SVG Map + Live Regional Terroir Dossier
│   ├── components.css          # 3D flip cards (8 regional badge classes), cultivar switcher, motion
│   └── dish-page.css           # Un-crowded Monograph layout: Hero Split, Xenia Quote Band, 2-Column Ledger, Cooking Timeline
├── js/
│   ├── data/
│   │   ├── dishes.js           # 28 authentic regional rice dishes across all 8 Bangladesh terroirs
│   │   ├── regions.js          # SVG cartographic coordinates, river paths, and terroir metadata for 8 regions
│   │   └── grains.js           # 8 heirloom rice cultivars (Chinigura, Kalijira, Kataribhog, Tulshimala GI, Balam, etc.)
│   ├── components/
│   │   ├── navbar.js           # Shared header & 28-dish / 8-terroir mega-drawer
│   │   ├── bangladesh-map.js   # Interactive Bangladesh SVG Map controller & catalogue filter sync
│   │   ├── scroll-reveal.js    # IntersectionObserver staggered reveal & parallax controller
│   │   └── card-renderer.js    # 3D Flip Card generator with dynamic regional badge mapping
│   ├── home.js                 # Index page controller (hero cycling, region/category filtering, cultivar explorer)
│   └── dish-detail.js          # Monograph controller (URL ?id= parser, ledger specs, step timeline, sibling recipes)
└── images/
    └── dish_1.jpg .. dish_28.jpg # 28 unique, verified photographs of Bangladeshi rice dishes (zero duplicates)
```
