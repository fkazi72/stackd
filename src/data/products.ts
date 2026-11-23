import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  // 1. Gel Pens (New Stationery Feature)
  {
    id: 'stackd-mascot-gel-pens',
    name: "Stack'd Mascot Pastel Gel Pen Set (8-Pack)",
    tagline: 'Super-smooth 0.5mm pastel quick-dry pens with 3D sculpted mascot toppers!',
    price: 449,
    originalPrice: 599,
    rating: 5.0,
    reviewsCount: 168,
    category: 'stationery',
    categoryLabel: 'Kawaii Stationery',
    badge: 'New Drop',
    images: [
      '/products/gel-pens.jpg',
      '/mascots/mascots-group.jpg',
      '/mascots/mascot-blue.jpg',
    ],
    description: `Write your dreams with silky smooth precision! The Stack'd Mascot Gel Pen Set includes 8 aesthetic pastel barrels with custom 3D sculpted clay mascot toppers (Blobby Blue, Pip Pink, Sunny Cloud, and Minty Pop). Features ultra-fast drying waterproof Japanese pigment gel ink that glides effortlessly across bullet journals and diaries without smudging or bleeding.`,
    mascotQuote: {
      mascot: 'Sunny Cloud',
      quote: "My lecture notes look 1000x cuter now! Plus, the little mascot topper wobbles happily while you write.",
      mascotAvatar: '/mascots/mascot-yellow.jpg',
      color: '#FFD12F',
    },
    features: [
      '8 soft-touch matte pastel barrels with 3D claymation mascot clips',
      '0.5mm fine bullet nib with smooth Japanese black & blue archival gel ink',
      'Quick-drying smudge-free formula perfect for left-handed writers',
      'Refillable ink cartridge design with anti-fatigue silicone comfort grip',
      'Includes collectible pastel acrylic desk presentation tray'
    ],
    specifications: {
      'Pen Count': '8 Retractable Gel Ink Pens',
      'Nib Size': '0.5 mm Ultra-Fine Bullet Tip',
      'Ink Type': 'Quick-Dry Smudge-Resistant Gel Ink (Black & Blue)',
      'Barrel Material': 'Soft-touch ABS with 3D PVC Mascot Sculpt',
      'Box Dimensions': '18 x 14 x 2.5 cm'
    },
    inStock: true,
    stockLeft: 24,
    variants: [
      {
        name: 'Ink Shade',
        options: [
          { label: 'Classic Deep Black Ink', value: 'black', inStock: true },
          { label: 'Royal Blue Ink', value: 'blue', inStock: true },
          { label: 'Pastel Rainbow Ink Pack', value: 'rainbow', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['pens', 'gel pens', 'stationery', 'kawaii', 'school', 'study', 'journaling']
  },

  // 2. Plushie Journal Gifting Hamper (New Gifting Feature)
  {
    id: 'stackd-plush-journal-hamper',
    name: "Stack'd Fluffy Plushie Diary & Gifting Hamper",
    tagline: 'Marshmallow-soft faux-fur locking journal with gold pen & sticker sheets!',
    price: 899,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 142,
    category: 'gifting',
    categoryLabel: 'Gifting & Hampers',
    badge: 'Bestseller',
    images: [
      '/products/plush-journal.jpg',
      '/products/gel-pens.jpg',
      '/mascots/mascot-pink.jpg',
    ],
    description: `The coziest gift imaginable for yourself or a bestie! This luxury gifting hamper features an ultra-plush, faux-fur journal embossed with Pip Pink's smiling face and cute little ears. Inside the gift box, you'll also find an engraved pastel brass gel pen, decorative ribbon bookmarks, 4 mascot die-cut sticker sheets, and a secret heart lock with two keys to protect your deepest thoughts.`,
    mascotQuote: {
      mascot: 'Pip Pink',
      quote: "Hugging this diary while writing my daily gratitude feels like hugging a warm cloud!",
      mascotAvatar: '/mascots/mascot-pink.jpg',
      color: '#FF2E7E',
    },
    features: [
      'Super-soft hypoallergenic cloud faux-fur cover with embroidered mascot art',
      '192 pages of 120gsm bleed-proof bleed-resistant thick dotted/lined paper',
      'Heart-shaped brass padlock with 2 keys for private journaling',
      'Includes matching metallic pastel pen and mascot washi tape roll',
      'Packaged in a gift-ready rigid pastel magnetic-close ribbon box'
    ],
    specifications: {
      'Journal Size': 'A5 (14.8 x 21 cm) - 192 Acid-Free Pages',
      'Paper Weight': '120 GSM Heavyweight Bleed-Proof Paper',
      'Cover Material': 'Premium Spandex Cloud Plush Velvet',
      'Gift Box': 'Rigid Keepsake Box with Satin Bow & Shredded Bedding'
    },
    inStock: true,
    stockLeft: 12,
    variants: [
      {
        name: 'Cover Mascot',
        options: [
          { label: 'Pip Pink Bunny Velvet', value: 'pip-pink', inStock: true, colorHex: '#FF2E7E' },
          { label: 'Sunny Cloud Yellow Sherpa', value: 'sunny-yellow', inStock: true, colorHex: '#FFD12F' },
          { label: 'Minty Pop Turquoise Plush', value: 'minty-green', inStock: true, colorHex: '#06D6A0' }
        ]
      }
    ],
    isStackable: true,
    tags: ['diary', 'journal', 'gifting', 'hamper', 'plush journal', 'birthday gift', 'stationery']
  },

  // 3. Mega Stationery Mystery Crate (New Gifting Feature)
  {
    id: 'stackd-mega-stationery-crate',
    name: "The Mega Stack'd Stationery Mystery Gift Crate",
    tagline: 'Curated 15-piece deluxe hamper box tied with satin ribbon — ultimate unboxing!',
    price: 1699,
    originalPrice: 2299,
    rating: 5.0,
    reviewsCount: 210,
    category: 'gifting',
    categoryLabel: 'Gifting & Hampers',
    badge: 'Limited',
    images: [
      '/products/stationery-crate.jpg',
      '/products/gel-pens.jpg',
      '/mascots/mascots-group.jpg',
    ],
    description: `The holy grail for cute stationery collectors! The Mega Stack'd Stationery Gift Crate is hand-packed with over 15 premium stationery goodies: a hardbound mascot planner, 8 pastel gel pens, 3 washi tapes, sticky memo pad stacks, mascot keychains, enamel pins, and a surprise collectible vinyl toy. Elegantly wrapped with a dual-color royal blue & bubblegum pink satin bow.`,
    mascotQuote: {
      mascot: 'Minty Pop',
      quote: "Opening this box feels like your birthday and Diwali all rolled into one magical moment! 🎁✨",
      mascotAvatar: '/mascots/mascot-mint.jpg',
      color: '#06D6A0',
    },
    features: [
      '15+ curated premium kawaii stationery goodies in one grand gift box',
      'Includes guaranteed mystery Series 01 vinyl blind box figure',
      'Custom handwritten calligraphy greeting card included with your order',
      'Sturdy decorative keepsake wooden-feel crate with satin gift ribbon',
      'Save over 35% compared to purchasing items individually'
    ],
    specifications: {
      'Box Dimensions': '28 x 24 x 12 cm',
      'Total Items': '15+ Stationery & Collectible Goodies',
      'Packaging': 'Deluxe Rigid Gift Hamper Box with Embossed Gold Foil',
      'Weight': '1.1 kg total'
    },
    inStock: true,
    stockLeft: 8,
    variants: [
      {
        name: 'Gift Theme',
        options: [
          { label: 'Student & Journaling Crate', value: 'student', inStock: true },
          { label: 'Aesthetic Work Desk Crate', value: 'desk', inStock: true },
          { label: 'Collector Toy & Pen Crate', value: 'collector', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['gift crate', 'hamper', 'stationery box', 'mystery box', 'deluxe gift', 'kawaii']
  },

  // 4. Washi Tape Tower Set (New Stationery Feature)
  {
    id: 'stackd-washi-tower-set',
    name: "Stack'd 6-Piece Washi Tape Tower & Dispenser",
    tagline: 'Stackable Japanese paper washi rolls with gold foil mascot prints & cloud cutter!',
    price: 399,
    originalPrice: 499,
    rating: 4.8,
    reviewsCount: 94,
    category: 'stationery',
    categoryLabel: 'Kawaii Stationery',
    badge: 'Staff Favorite',
    images: [
      '/products/washi-tower.jpg',
      '/products/gel-pens.jpg',
      '/mascots/mascot-mint.jpg',
    ],
    description: `Add sparkle to your scrapbooks, study notes, and gift wrapping! This set includes 6 rolls of authentic Japanese washi tape featuring whimsical mascot doodles, geometric pastel stacks, and shining gold foil stars. The rolls stack vertically inside an interlocking cloud-shaped acrylic cutter dispenser.`,
    mascotQuote: {
      mascot: 'Minty Pop',
      quote: "The gold foil shines so brightly in sunlight! They peel off cleanly without tearing delicate journal paper.",
      mascotAvatar: '/mascots/mascot-mint.jpg',
      color: '#06D6A0',
    },
    features: [
      '6 distinct tape widths (10mm, 15mm, 20mm, 30mm) for versatile crafting',
      'Authentic Japanese washi paper with clean residue-free repositionable adhesive',
      'Hot-stamped holographic gold foil details on each roll',
      'Includes cloud-shaped pastel safety tape dispenser with serrated edge',
      'Water-resistant and writeable with pencil or gel pen'
    ],
    specifications: {
      'Roll Count': '6 Tape Rolls (5 meters length each)',
      'Tape Widths': '1 x 30mm, 2 x 20mm, 2 x 15mm, 1 x 10mm',
      'Material': 'Eco-Friendly Japanese Rice Paper (Washi) + Gold Foil',
      'Dispenser': 'Pastel Cloud Acrylic Cutter'
    },
    inStock: true,
    stockLeft: 30,
    variants: [
      {
        name: 'Color Palette',
        options: [
          { label: 'Pastel Dreamland (Pink & Yellow)', value: 'pastel-dream', inStock: true },
          { label: 'Ocean Cloud (Blue & Mint)', value: 'ocean-cloud', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['washi tape', 'tape', 'stationery', 'crafts', 'journaling', 'scrapbooking']
  },

  // 5. Mystery Blind Box
  {
    id: 'stackd-mystery-box-s1',
    name: "The Stack'd Mystery Blind Box (Series 01)",
    tagline: '1 of 8 collectible surprise 3D clay-style vinyl desk buddies inside!',
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    reviewsCount: 342,
    category: 'blind-boxes',
    categoryLabel: 'Mystery Blind Boxes',
    badge: 'Bestseller',
    images: [
      '/products/mystery-box.jpg',
      '/products/vinyl-figures.jpg',
      '/mascots/mascots-group.jpg',
      '/mascots/mascot-mint.jpg',
    ],
    description: `Get ready to experience the pure joy of the unboxing! The Stack'd Series 01 Blind Box features 8 unique collectible figures including Blobby Blue, Pip Pink, Sunny Cloud, Minty Pop, plus 2 ultra-rare secret chase variants (Gold Sparkle Sunny & Glow-in-the-Dark Pip, 1/72 odds!). Each figure is precision cast in heavyweight smooth vinyl with tactile claymation styling, ready to sit perched on your monitor, desk, or stack atop each other.`,
    mascotQuote: {
      mascot: 'Pip Pink',
      quote: "I literally unboxed 6 of these and scored the secret chase Minty! The excitement is real!",
      mascotAvatar: '/mascots/mascot-pink.jpg',
      color: '#FF2E7E',
    },
    features: [
      'Blind mystery packaging with tamper-evident holographic seal',
      'Collect all 8 standard designs + 2 rare secret chase variants',
      'Interlocking magnetic base for easy stacking atop other figures',
      'Includes illustrated character collector card & foil sticker',
      'Non-toxic premium matte/glossy vinyl finish'
    ],
    specifications: {
      'Material': 'High-grade PVC / Vinyl with Matte UV Seal',
      'Figure Height': '7.5 cm - 9.0 cm (approx 3.2 inches)',
      'Blind Box Dimensions': '8 x 8 x 11 cm',
      'Series': 'Series 01: Genesis Stack',
      'Age Recommendation': '12+ Collectible Display Figure'
    },
    inStock: true,
    stockLeft: 14,
    variants: [
      {
        name: 'Pack Size',
        options: [
          { label: 'Single Blind Box (₹499)', value: 'single', inStock: true },
          { label: 'Trio Stack (3 Boxes - ₹1,349 - Save 10%)', value: 'trio', inStock: true },
          { label: 'Full Case (8 Boxes - ₹3,499 - Guaranteed Full Set + Chase!)', value: 'full-case', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['blind box', 'mystery', 'collectibles', 'kawaii', 'stackable', 'pop mart', 'desk buddy']
  },

  // 6. Complete Vinyl Toy Set
  {
    id: 'stackd-vinyl-toy-set',
    name: "The Complete Stack'd 4-Piece Vinyl Set",
    tagline: 'All 4 signature Stack\'d mascots in ultra-glossy designer art vinyl.',
    price: 1499,
    originalPrice: 1999,
    rating: 5.0,
    reviewsCount: 188,
    category: 'figures',
    categoryLabel: 'Art Toys & Figures',
    badge: 'Limited',
    images: [
      '/products/vinyl-figures.jpg',
      '/mascots/mascots-group.jpg',
      '/products/mystery-box.jpg',
      '/mascots/mascot-blue.jpg',
    ],
    description: `Why leave it to luck when you can own the full founding squad? The Complete Stack'd 4-Piece Vinyl Set includes Blobby Blue with his signature orange swirl dollop, cheerful winking Sunny Cloud, rosy-cheeked Pip Pink, and bubbly-textured Minty Pop. Each art toy is weighted, balanced to interlock into a vertical tower, and arrives in a collector gift box with custom foam cutouts.`,
    mascotQuote: {
      mascot: 'Blobby Blue',
      quote: "We spent 6 months balancing our sculpts so all 4 of us can literally stack vertically on your desk without falling!",
      mascotAvatar: '/mascots/mascot-blue.jpg',
      color: '#2756E8',
    },
    features: [
      'Complete set of all 4 foundational brand mascots',
      'Engineered interlocking grooves so they physically stack vertically',
      'Weighted vinyl bottom prevents tipping on moving desks',
      'Ultra glossy Pop-Mart collectible finish with saturated colors',
      'Numbered certificate of authenticity included in box'
    ],
    specifications: {
      'Includes': '4 Vinyl Figures + 4 Display Risers',
      'Combined Stack Height': '32 cm (12.6 inches) when fully stacked',
      'Packaging': 'Collector Window Box with Foil Stamping',
      'Weight': '520g total set',
      'Edition': 'First Pressing Edition of 2,500 Sets'
    },
    inStock: true,
    stockLeft: 9,
    variants: [
      {
        name: 'Finish',
        options: [
          { label: 'Classic Glossy Studio Finish', value: 'classic', inStock: true },
          { label: 'Candy Pastel Matte Finish', value: 'pastel-matte', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['vinyl toy', 'designer figure', 'art toy', 'mascots', 'collector', 'gift set']
  },

  // 7. Giant Stacking Plushie Tower
  {
    id: 'stackd-plushie-tower',
    name: "Stack'd Giant Stacking Plushie Tower",
    tagline: 'Super squishy marshmallow-soft plushies designed to pile up high.',
    price: 1199,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 226,
    category: 'plushies',
    categoryLabel: 'Plushies & Pillows',
    badge: 'Staff Favorite',
    images: [
      '/products/plushie-tower.jpg',
      '/mascots/mascot-pink.jpg',
      '/mascots/hero-banner.jpg',
      '/mascots/mascot-yellow.jpg'
    ],
    description: `Meet the coziest addition to your bedroom or workspace! The Stack'd Stacking Plushie Tower is made from micro-velvet cloud plush stuffed with high-resilience memory fiber that bounces right back into shape. Flat weighted bases and gentle magnetic tabs keep Pip, Sunny, and Minty comfortably stacked in a cuddly 3-tier tower on your bed or sofa.`,
    mascotQuote: {
      mascot: 'Sunny Cloud',
      quote: "Warning: Resting your head on this plushie tower during study sessions will cause instant peaceful slumber.",
      mascotAvatar: '/mascots/mascot-yellow.jpg',
      color: '#FFD12F',
    },
    features: [
      'Velvety ultra-soft cloud fleece fabric that is gentle on sensitive skin',
      'Concealed safe magnetic touchpoints allow effortless stacking',
      'Hypoallergenic high-density cloud polyfill stuffing',
      'Removable machine-washable outer shell with hidden zipper',
      'Embroidered facial expressions that never peel or fade'
    ],
    specifications: {
      'Size (Standard 3-Tier)': '45 cm height stacked, 24 cm diameter',
      'Size (Megastack 4-Tier)': '65 cm height stacked, 28 cm diameter',
      'Fabric': '100% Premium Spandex Super-Soft Velvet',
      'Filling': '3D Hollow Siliconized Memory Microfiber',
      'Care': 'Machine wash cold on gentle cycle, tumble dry low'
    },
    inStock: true,
    stockLeft: 18,
    variants: [
      {
        name: 'Tower Height',
        options: [
          { label: '3-Tier Plush Stack (45cm)', value: '3-tier', inStock: true },
          { label: 'Megastack 4-Tier Deluxe (+ Blobby Blue 65cm)', value: '4-tier-deluxe', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['plushie', 'pillow', 'squishy', 'cute', 'bedding', 'soft toy']
  },

  // 8. 32oz Insulated Tumbler
  {
    id: 'stackd-insulated-tumbler',
    name: "Keep It Stacked 32oz Insulated Tumbler",
    tagline: 'Triple-walled stainless steel with silicone mascot boot & spill-proof straw.',
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 195,
    category: 'drinkware',
    categoryLabel: 'Drinkware & Tumblers',
    badge: 'Hot',
    images: [
      '/products/tumbler.jpg',
      '/mascots/hero-banner.jpg',
      '/mascots/mascot-blue.jpg',
    ],
    description: `Hydration made extraordinarily cute. The Keep It Stacked Tumbler holds 32oz (950ml) of iced matcha, boba, iced latte, or water, keeping drinks ice-cold for 24+ hours or piping hot for 12 hours. Features a soft-touch powder coat with glossy embossed mascot artwork, ergonomic comfort handle, leak-resistant dual-function flip straw lid, and a silicone protective boot that prevents clanking on hard surfaces.`,
    mascotQuote: {
      mascot: 'Sunny Cloud',
      quote: "My iced coffee literally had cubes floating in it after 18 hours at my desk! Plus no condensation puddles anywhere.",
      mascotAvatar: '/mascots/mascot-yellow.jpg',
      color: '#FFD12F',
    },
    features: [
      'Triple-wall copper vacuum insulation prevents sweat & temperature loss',
      'Cupholder friendly base fits 99% of car and treadmill drink holders',
      '18/8 food-grade pro-steel ensures zero metallic taste transfer',
      'Includes silicone mascot straw topper charm & cleaning brush',
      '100% BPA, BPS, and Phthalate free'
    ],
    specifications: {
      'Capacity': '32 oz (950 ml)',
      'Temperature Retention': 'Cold for 24h, Hot for 12h',
      'Lid': '2-in-1 Straw Sip & Direct Chug Lid with Seal Ring',
      'Dimensions': '27 cm tall (with straw) x 8.8 cm base',
      'Weight': '460g'
    },
    inStock: true,
    stockLeft: 22,
    variants: [
      {
        name: 'Colorway',
        options: [
          { label: 'Pastel Cream & Royal Blue', value: 'cream-blue', inStock: true, colorHex: '#2756E8' },
          { label: 'Bubblegum Pink & Berry', value: 'pink-berry', inStock: true, colorHex: '#FF2E7E' },
          { label: 'Mint Pop & Turquoise', value: 'mint-splash', inStock: true, colorHex: '#06D6A0' },
          { label: 'Buttercup Sunshine Yellow', value: 'yellow-sun', inStock: true, colorHex: '#FFD12F' }
        ]
      }
    ],
    isStackable: true,
    tags: ['tumbler', 'water bottle', 'drinkware', 'insulated', 'boba', 'iced coffee']
  },

  // 9. Modular Desk Drawers
  {
    id: 'stackd-modular-organizer',
    name: "Stack'd Modular Translucent Desk Drawers",
    tagline: 'Interlocking stackable candy pastel acrylic drawers for your dream desk.',
    price: 749,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 164,
    category: 'desk-tech',
    categoryLabel: 'Desk Setup & Tech',
    badge: 'Bestseller',
    images: [
      '/products/desk-organizer.jpg',
      '/mascots/hero-banner.jpg',
      '/mascots/mascot-blue.jpg',
    ],
    description: `Transform desktop clutter into a candy-colored aesthetic dream. The Stack'd Modular Acrylic Desk Caddy features individual pull-out translucent drawers in matching brand pastels that snap securely on top of each other. Customize your setup: stack them tall in a tower or side-by-side to house stationery, pens, washi tape, makeup, jewelry, and small collectibles.`,
    mascotQuote: {
      mascot: 'Blobby Blue',
      quote: "The click when one drawer snaps on top of another is so deeply satisfying. Clutter: eliminated!",
      mascotAvatar: '/mascots/mascot-blue.jpg',
      color: '#2756E8',
    },
    features: [
      'Smart tongue-and-groove track system locks drawers firmly in place',
      'Frosted translucent acrylic lets you glimpse contents while looking tidy',
      'Silicone anti-slip feet on bottom modules protect desktop surfaces',
      'Smooth pull-out drawer mechanism with safety stopper prevents spills',
      'Dust-proof enclosed compartment design'
    ],
    specifications: {
      'Units Included': '3-Drawer Modular Stackable System',
      'Dimensions (3-Stacked)': '22 cm (W) x 16 cm (D) x 18 cm (H)',
      'Material': 'Shatter-resistant Acrylic Polymer (Lucite Grade)',
      'Capacity': 'Holds up to 45 pens + accessories per tier'
    },
    inStock: true,
    stockLeft: 11,
    variants: [
      {
        name: 'Stack Configuration',
        options: [
          { label: '3-Tier Pastel Stack', value: '3-tier', inStock: true },
          { label: '5-Tier Mega Desk Tower (+ Pen Top Caddy)', value: '5-tier-tower', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['desk organizer', 'acrylic drawers', 'stationery storage', 'workspace', 'pastel desk']
  },

  // 10. Artisan Mechanical Keycaps
  {
    id: 'stackd-artisan-keycaps',
    name: "Stack'd Cute Artisan Mechanical Keycaps",
    tagline: 'Hand-sculpted 3D clay-style mascot novelty keys for mechanical keyboards.',
    price: 649,
    originalPrice: 849,
    rating: 5.0,
    reviewsCount: 112,
    category: 'desk-tech',
    categoryLabel: 'Desk Setup & Tech',
    badge: 'Limited',
    images: [
      '/products/artisan-keycaps.jpg',
      '/mascots/mascot-yellow.jpg',
      '/products/desk-organizer.jpg',
    ],
    description: `Bring playful mascot charm directly under your fingertips! Each Stack'd Artisan Keycap is hand-cast with dense resin in the exact likeness of our 3D mascots: Blobby, Pip, Sunny, and Minty. Compatible with any standard Cherry MX stem mechanical keyboard. Features a satisfying tactile textured surface that feels amazing to click all workday.`,
    mascotQuote: {
      mascot: 'Sunny Cloud',
      quote: "I replaced my ESC key with my own face and my typing productivity jumped by at least 300%. Clack on!",
      mascotAvatar: '/mascots/mascot-yellow.jpg',
      color: '#FFD12F',
    },
    features: [
      'Universal Cherry MX stem compatible (fits Gateron, Kailh, Outemu, Akko)',
      'Precision molded resin with scratch-resistant matte clear coating',
      'Ergonomic profile matches standard OEM & Cherry row profiles (R1-R4)',
      'Packaged in collectible miniature pastel acrylic display case',
      'Includes stainless steel keycap puller tool'
    ],
    specifications: {
      'Stem Compatibility': 'Standard MX Cross Stem',
      'Profile': 'OEM Profile Novelty Keycap (Esc / F-Row / Enter)',
      'Material': 'Artisan Epoxy Resin & PBT Hybrid',
      'Quantity': 'Set of 4 Mascot Artisan Keys + Keycap Puller'
    },
    inStock: true,
    stockLeft: 7,
    variants: [
      {
        name: 'Stem & Profile',
        options: [
          { label: 'Complete 4-Mascot Artisan Key Set', value: '4-set', inStock: true },
          { label: 'Deluxe Key Set + Custom Pastel Coiled Cable Bundle', value: 'cable-bundle', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['mechanical keyboard', 'artisan keycaps', 'cherry mx', 'desk setup', 'kawaii tech']
  },

  // 11. Holographic Sticker Vault
  {
    id: 'stackd-sticker-stationery-pack',
    name: "Keep It Stacked Holographic Sticker & Washi Vault",
    tagline: '50+ waterproof vinyl stickers, 3 metallic washi tapes & cute memo pads.',
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviewsCount: 289,
    category: 'stationery',
    categoryLabel: 'Kawaii Stationery',
    badge: 'New Drop',
    images: [
      '/products/mystery-box.jpg',
      '/mascots/mascots-group.jpg',
      '/mascots/mascot-pink.jpg'
    ],
    description: `Cover your world in Stack'd magic! This ultimate stationery vault comes packed with over 50 individual die-cut waterproof vinyl stickers with glitter and holographic prism coatings, 3 rolls of decorative washi tape, and 2 tear-away mascot sticky note pads. Perfect for journals, laptops, hydro flasks, phone cases, and scrapbooking.`,
    mascotQuote: {
      mascot: 'Minty Pop',
      quote: "These stickers survived my dishwasher 12 times and still look brand new and super shiny!",
      mascotAvatar: '/mascots/mascot-mint.jpg',
      color: '#06D6A0',
    },
    features: [
      '100% waterproof UV-laminated vinyl stickers that never peel or fade',
      'Prism holographic and glitter star finishes on select mascot designs',
      'Japanese washi tape with easy repositionable residue-free adhesive',
      'Cute speech bubble sticky notes for reminders and sweet messages',
      'Arrives in a reusable zip-lock collectible mascot pouch'
    ],
    specifications: {
      'Sticker Count': '52 Die-Cut Vinyl Stickers (5-8cm each)',
      'Washi Tape': '3 Rolls (15mm x 10m each)',
      'Sticky Notes': '2 Pads (50 sheets each)',
      'Waterproof': 'Yes, Dishwasher & Outdoor Safe'
    },
    inStock: true,
    stockLeft: 35,
    variants: [
      {
        name: 'Edition',
        options: [
          { label: 'Standard Holographic Vault', value: 'standard', inStock: true },
          { label: 'Double Pack (2 Sets - Share with a Bestie!)', value: 'double', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['stickers', 'holographic', 'stationery', 'washi tape', 'bullet journal', 'kawaii']
  },

  // 12. Heavyweight Canvas Tote
  {
    id: 'stackd-canvas-tote-pin-set',
    name: "Keep It Stacked Heavyweight Canvas Tote & Pin Trio",
    tagline: '16oz heavyweight organic cotton canvas tote with embroidered mascot patch.',
    price: 799,
    originalPrice: 999,
    rating: 4.8,
    reviewsCount: 147,
    category: 'figures',
    categoryLabel: 'Lifestyle & Gifting',
    badge: 'Staff Favorite',
    images: [
      '/mascots/mascot-pink.jpg',
      '/products/vinyl-figures.jpg',
      '/mascots/mascots-group.jpg',
      '/mascots/hero-banner.jpg'
    ],
    description: `Carry your daily stack in sustainable, heavy-duty style. Cut from premium 16oz natural cream unbleached cotton canvas, this tote features reinforced box-stitched handles, an interior zippered phone pocket with key clip, and an embroidered 3D chenille Stack'd mascot patch. Comes bundled with 3 hard-enamel mascot collector pins to customize your bag.`,
    mascotQuote: {
      mascot: 'Pip Pink',
      quote: "I fit my 15-inch laptop, tumbler, lunch box, and a whole plushie in this bag and the straps never dig into my shoulder!",
      mascotAvatar: '/mascots/mascot-pink.jpg',
      color: '#FF2E7E',
    },
    features: [
      'Heavyweight 16oz organic unbleached cotton canvas with reinforced base',
      'Includes 3 deluxe hard enamel collector pins with rubber clutch backs',
      'Interior zippered slip pocket & solid brass key lanyard clip',
      'Comfort-padded wide handles prevent shoulder fatigue under heavy loads',
      'Machine washable and pre-shrunk'
    ],
    specifications: {
      'Bag Dimensions': '38 cm (W) x 42 cm (H) x 12 cm (Base Gusset)',
      'Handle Drop': '28 cm (easy over bulky coats)',
      'Pins Included': '3 x Gold-Plated Hard Enamel Pins (3.5cm each)',
      'Fabric': '100% GOTS Certified Organic Cotton'
    },
    inStock: true,
    stockLeft: 16,
    variants: [
      {
        name: 'Color Accent',
        options: [
          { label: 'Natural Cream / Royal Blue Trim', value: 'cream-blue', inStock: true },
          { label: 'Natural Cream / Bubblegum Pink Trim', value: 'cream-pink', inStock: true }
        ]
      }
    ],
    isStackable: true,
    tags: ['canvas tote', 'tote bag', 'enamel pins', 'lifestyle', 'eco friendly', 'apparel']
  }
];
