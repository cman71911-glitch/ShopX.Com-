import { Product, Review } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Sony WH-1000XM4 Wireless Premium Noise Canceling Overhead Headphones with Mic",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charging. Touch Sensor controls to pause/play/skip tracks, control volume, activate your voice assistant, and answer phone calls.",
    price: 24990,
    category: "Electronics",
    rating: 4.8,
    reviewCount: 14590,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60",
    isPrime: true,
    stock: 25,
    features: [
      "Active Noise Cancellation (ANC)",
      "30 hours total battery life plus fast charge",
      "Multipoint Bluetooth connection",
      "High-Res Audio wireless capabilities"
    ],
    dateAdded: "2026-05-10"
  },
  {
    id: "prod-2",
    title: "Apple Watch Series 9 GPS 41mm Smartwatch with Midnight Aluminum Case",
    description: "Your essential companion for a healthy life is now even more powerful. The S9 chip enables a superbright display and a magical new way to quickly and easily interact with your Apple Watch without touching the screen. Advanced health, safety, and activity features provide deep insights and help when you need it.",
    price: 32900,
    category: "Electronics",
    rating: 4.7,
    reviewCount: 3412,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60",
    isPrime: true,
    stock: 14,
    features: [
      "Always-On Retina display (up to 2,000 nits)",
      "ECG and blood oxygen fitness tracking",
      "S9 SiP chip with double tap gesture support",
      "Crash Detection and Fall Detection"
    ],
    dateAdded: "2026-05-12"
  },
  {
    id: "prod-3",
    title: "Keychron K2 Version 2 Mechanical Keyboard with Double-shot Keycaps & RGB Backlit",
    description: "Keychron K2 is a 75% layout (84-key) RGB backlight wireless mechanical keyboard. The ultimate tenkeyless keyboard that retains shortcut and arrow keys. Connects with up to 3 devices via Bluetooth 5.1 and switch among them easily. Best fit home, office and light gaming usage.",
    price: 7499,
    category: "Electronics",
    rating: 4.5,
    reviewCount: 1204,
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=60",
    isPrime: false,
    stock: 8,
    features: [
      "Mac & Windows layouts included",
      "Hot-swappable switches (Gateron G Pro Brown)",
      "4000mAh high capacity battery",
      "Premium aluminum frame finish"
    ],
    dateAdded: "2026-05-15"
  },
  {
    id: "prod-4",
    title: "Keurig K-Elite Single Serve K-Cup Pod Coffee Maker with Ice Settings",
    description: "The Keurig K-Elite brewer combines a premium finish and programmable features to deliver both modern design and the ultimate in beverage customization. With a striking brushed finish and metal details, it’s a stylish addition to any kitchen. Adjust brewing temperature and hot water on demand.",
    price: 14999,
    category: "Home & Kitchen",
    rating: 4.6,
    reviewCount: 22894,
    imageUrl: "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=600&auto=format&fit=crop&q=60",
    isPrime: true,
    stock: 30,
    features: [
      "Brews 5 cup sizes (4, 6, 8, 10, and 12oz)",
      "Strong brew button for bolder flavor",
      "Iced setting brews hot over ice",
      "Large 75oz removable water reservoir"
    ],
    dateAdded: "2026-05-01"
  },
  {
    id: "prod-5",
    title: "Osprey Nebula Unisex Commuter Pack Laptop Backpack with Raincover",
    description: "The Nebula is a city bag with true outdoor heritage, carrying design degrees passed down from decades of Osprey pack influence. A TSA-friendly laptop compartment keeps your electronic items secure while the mesh back panel delivers reliable ventilation. Multiple organization sleeves.",
    price: 9999,
    category: "Apparel",
    rating: 4.7,
    reviewCount: 954,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60",
    isPrime: true,
    stock: 19,
    features: [
      "TSA-approved padded laptop sleeve fits up to 16\"",
      "AirScape breathable ridges backpanel",
      "Scratch-resistant floating sunglasses pocket",
      "Dual stretch-mesh water bottle side pockets"
    ],
    dateAdded: "2026-05-08"
  },
  {
    id: "prod-6",
    title: "Hydro Flask Wide Mouth Straw Lid Insulated Double-Wall Water Bottle",
    description: "Keep life moving with our Wide Mouth Straw Lid water bottle. Fits easily in a backpack pocket or car holder. Our TempShield double-wall vacuum insulation keeps drinks cold for up to 24 hours and hot for up to 12. Made with 18/8 professional-grade stainless steel to ensure taste purity.",
    price: 3499,
    category: "Sports & Outdoors",
    rating: 4.8,
    reviewCount: 41203,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=60",
    isPrime: true,
    stock: 55,
    features: [
      "TempShield double-wall vacuum insulation",
      "Durable 18/8 Pro-Grade Stainless Steel",
      "BPA-free and Phthalate-free",
      "Leakproof straw lid for easy drinking"
    ],
    dateAdded: "2026-05-03"
  },
  {
    id: "prod-7",
    title: "Nike Air Zoom Pegasus 40 Running Shoes for Men - Comfort Cushioning",
    description: "A springy ride for every run, the Peg’s familiar, just-for-you feel returns to help you accomplish your fitness goals. This version has the same responsiveness and neutral support you love, but with improved comfort in those sensitive areas, like the arch and toes.",
    price: 11999,
    category: "Apparel",
    rating: 4.4,
    reviewCount: 2201,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60",
    isPrime: true,
    stock: 12,
    features: [
      "Dual Zoom Air units deliver responsive bounce",
      "Engineered mesh upper for breathable comfort",
      "Waffle-inspired outsole offers excellent traction",
      "Plush padded collar protects heel Achilles"
    ],
    dateAdded: "2026-05-18"
  },
  {
    id: "prod-8",
    title: "Minimalist Adjustable Metal Swing Arm Architects LED Desk Office Lamp",
    description: "Heavy-duty architecture draft desk lamp styled in a clean, sandblasted matte black finish. Features modular joints allowing continuous angle calibration. Ideal for drafting studios, computer workspaces, reading nooks, and intricate workbench hobbies. Integrates an adjustable warm LED filament.",
    price: 3999,
    category: "Home & Kitchen",
    rating: 4.3,
    reviewCount: 3108,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=60",
    isPrime: false,
    stock: 15,
    features: [
      "Stepless brightness dimming (10% to 100%)",
      "Modular metal dual-hinge swing arm mechanism",
      "Interchangeable clamp and robust balance base",
      "Eye-comfort blue-light filter diffuser glass"
    ],
    dateAdded: "2026-05-20"
  }
];

// Pools for generating highly realistic random products
const PRODUCT_CATALOG_TEMPLATES: Array<{
  category: string;
  titles: string[];
  descriptions: string[];
  images: string[];
  featuresPool: string[][];
}> = [
  {
    category: "Electronics",
    titles: [
      "Anker Nano Power Bank 10000mAh Built-In USB-C Cable Charger",
      "Logitech MX Master 3S Wireless Performance Mouse with Click scroll",
      "Roku Streaming Stick 4K HDR Streaming Device with Voice Remote",
      "Bose SoundLink Flex Portable Bluetooth Outdoor Speaker Waterproof",
      "Samsung T7 Shield 1TB Portable SSD Solid State External Drive",
      "HyperX QuadCast S USB Condenser Mic with RGB Lighting for Streamers"
    ],
    descriptions: [
      "Equipped with built-in high-speed charging cables to elevate and simplify your mobile lifestyle while keeping all portable electronics energized.",
      "Re-engineered mouse mechanics designed for ultimate ergonomics. Quiet clicks, ultra-precise darkfield tracking on all surfaces, and instant smart-scrolling speeds.",
      "Plug it in and connect to any TV instantly. Stream in stunning high definition with crisp contrast and fluid animations, using remote speech search controls.",
      "Stunning audio fidelity engineered straight into a robust, travel-friendly structure. Completely dust-free and immersion-secure waterproof shell protects on trails.",
      "Superfast file transfers in an incredibly durable, rubberized armor casing. Drops and elements are no match for this shock-absorbent solid-state backup drive.",
      "A gorgeous standalone USB microphone with professional studio vibration shock mounts and customizable RGB lighting gradients to level up your desktop streams."
    ],
    images: [
      "https://images.unsplash.com/photo-1608248597481-496100c80836?w=600&auto=format&fit=crop&q=60", // speaker
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=60", // mouse
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&auto=format&fit=crop&q=60", // tech setup
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=60", // audio
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60", // tablet screen
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=60"  // gaming controller
    ],
    featuresPool: [
      ["Ultra-compact, pocket-sized structural frame", "Smart power flow sensor ensures safe delivery", "Dual orientation fold-out charging cable sync", "USB-Power Delivery certified support"],
      ["8,000 DPI sensory tracking on glass interfaces", "Virtually silent click triggers reduce room noise", "Universal cross-computer control and file sharing", "Ergonomic thumb support structure design"],
      ["Vibrant 4K picture quality with Dolby Vision", "Remote with dedicated service channel buttons", "Extended-range wireless receiver module built-in", "Compatible with popular voice home systems"],
      ["PositionIQ technology adjusts audio for any setting", "IP67 waterproof and fully buoyant housing", "12 hours battery life per charge cycle", "Durable tear-resistant fabric loop hook"]
    ]
  },
  {
    category: "Home & Kitchen",
    titles: [
      "Cosori Small Smart Air Fryer 4.0 Quart with 9 Easy Cooking Presets",
      "Lodge 10.25 Inch Cast Iron Skillet Pre-Seasoned with Silicone Grip",
      "Secura Automatic Electric Luxury Wine Opener with Blue LED light",
      "Veken Packing Cubes 6 Set with Laundry Bags Suitcase Organizers",
      "Aroma Housewares 8-Cup Digital Rice Cooker Multi-Functional Steamer",
      "Puricon Luxury Bamboo Wood Cutting Board Set with Built-In Soap Grooves"
    ],
    descriptions: [
      "Saves valuable counter space while delivering professional circulating convection hot air. Recreates crispy fried textures using 85% less cooking oils.",
      "A legend in cast iron metallurgy, crafted in Tennessee and pre-seasoned with pure natural vegetable oil. Exceptional heat retention allows consistent slow bakes.",
      "Remove wine corks with absolute ease without ever ripping the wood fibers again. Operates via simple push buttons with sleek blue backlighting.",
      "Turn suitcase chaos into compartmentalized packing storage. Soft, double-stitched fabric prevents wrinkling and maximizes empty room in your luggage.",
      "Steam meat, vegetables, and cook fluffy restaurant-grade rice all at the same time. Custom programmable timer cycles manage cooking while you focus elsewhere.",
      "An gorgeous kitchen block made of organic, split-resistant bamboo stems. Naturally water-sealed surfaces preserve your master cooking knives' sharp grinds."
    ],
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=60", // kitchen appliances
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=60", // kitchen pans
      "https://images.unsplash.com/photo-1595273670150-db0a3e39243f?w=600&auto=format&fit=crop&q=60", // glasses/kitchen
      "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=600&auto=format&fit=crop&q=60", // cutting board / food
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=60", // kitchen counter layout
      "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&auto=format&fit=crop&q=60"  // coffee mugs / home
    ],
    featuresPool: [
      ["Compact 4-quart basket fits a whole chicken", "9 built-in touch cooking option modules", "Dishwasher safe nonstick tray layers", "Sleek temperature scale dialed in seconds"],
      ["Fully pre-seasoned cast-iron foundry composition", "Includes protective thermodynamic silicone handle cover", "Dual pour spout rims prevent grease drips", "Unbreakable lifetime durability seal"],
      ["Uncorks up to 80 bottles on a single charge", "Operates quietly within soft decibels limits", "Convenient foil cutter fits in power base", "Corrosion resistant cobalt drill screw core"],
      ["High-density polyester blend weave structures", "Mesh covers provide fast visual item recognition", "Premium dual metal rust-proof sliding zippers", "6 tailored sizes include separate laundry bags"]
    ]
  },
  {
    category: "Apparel",
    titles: [
      "Champion Powerblend Fleece Pullover Hoodie Embroidered Logo Sport",
      "Levi's 505 Regular Standard Fit Jeans Classic Denim Blue Selection",
      "Carhartt Durable Acrylic Knit Beanie Warm Skully Watch Cap",
      "Under Armour Performance Technical Crew Athletic Mens Socks 6-Pack",
      "Columbia Men's Watertight II Waterproof Hooded Rainy Day Jacket",
      "Ray-Ban Classic Wayfarer Lightweight Sunglasses Matte Tortoise Finish"
    ],
    descriptions: [
      "Designed for extreme coziness without excessive bulk. The poly-fiber hybrid fabric maintains its shape long-term, minimizing stretching or shrinking errors.",
      "The classic American straight-cut jean. Sits comfortably at your waist with traditional 5-pocket styling and signature heavy-duty copper rivets.",
      "An iconic warm cap crafted with stretchable rib-knit yarn. Stays comfortable on cold mountain hikes or standard morning transit walks.",
      "Advanced dry-sweat synthetic fiber blends absorb high humidity. Built-in compression supports critical ankle zones for run sessions.",
      "Lightweight, packable insulation equipped with specialized seam seals to keep aggressive thunderstorms and rain cascades completely blocked away.",
      "Instantly recognizable vintage contours modeled in lightweight organic polymers. High-transparency lenses protect with total UVA and UVB coverages."
    ],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=60", // jacket
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=60", // denim jeans
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=60", // cap / shirt
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=60", // sweater
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=60", // folded shirts
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=60"  // apparel styling
    ],
    featuresPool: [
      ["Double needle structural stitching paths", "Soft-brushed inner fleece regulates temperatures", "Kangaroo pouch utility handwarmer slot", "Adjustable braided hood drawcords"],
      ["100% thick pre-washed cotton denim weaves", "Button-fly classic secure copper closures", "Straight-leg geometry fits over utility boots", "Machine-wash rugged colorfast pigment tones"],
      ["100% thick stretchable acrylic fiber knit", "Carhartt patch sewn cleanly to front fold", "One size fits virtually all head diameters", "Optimized height watch-cap pattern style"],
      ["Integrated heel-arch arch support bands", "HeatGear synthetic ventilation fiber zones", "Seamless toes prevent footwear blister friction", "Moisture-wicking material dries incredibly fast"]
    ]
  },
  {
    category: "Sports & Outdoors",
    titles: [
      "Bowflex SelectTech 552 Adjustable Modular Dumbbells Dumbbell Single",
      "Fitbit Charge 6 Advanced Health & Fitness Smart Tracker Heart Rate",
      "CamelBak Pivot Rolltop Commuter Water Pack Hydration Friendly",
      "Coleman Dome Tent with Screen Room Camping Tent for Families",
      "TriggerPoint Grid Foam Roller for Trigger Point Massage Therapy",
      "Yeti Rambler 20 oz Travel Tumbler with MagSlider Sealed Lid"
    ],
    descriptions: [
      "Replaces 15 separate weight configurations inside a single compact metal housing. Simply turn the dial to adjust weights from 5 to 52.5 lbs instantly.",
      "Stay in sync with your health metrics automatically. Syncs deep-sleep analyses, real-time stress scales, blood temperature charts, and cardio trends.",
      "An eco-friendly pack constructed with recycled plastics. Delivers easy-access rolling tops with quick water-reservoir connection hooks.",
      "Sleep in total comfort while enjoying scenic outdoor views. Features a spacious attached screened vestibule porch to block flying insects completely.",
      "Features a patented multi-density exterior wrapped around a dense hollow pipe core. Channels standard massage pressure to relieve muscle stiffness.",
      "Keep morning coffee steaming hot or post-workout smoothies icy until afternoon hours. Features heavy-duty vacuum insulation barriers."
    ],
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=60", // dumbbells / gym
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=60", // gym / athlete
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=60", // fitness mat
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=60", // camping tent
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=60", // water / hike
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=60"  // sport runner
    ],
    featuresPool: [
      ["Dial adapts weight in small 2.5 lb intervals", "Durable thermoplastic coating guards metal cores", "Saves storage space from redundant items", "Ergonomic textured sweat-proof center metal grips"],
      ["Built-in active global GPS location mapping", "Over 40 structured exercise profiles installed", "Full color AMOLED touchscreen lens glass", "Water resistant down to 50 meters depth"],
      ["Constructed using 50% recycled polymer elements", "Air-mesh cushion straps block back sweat", "Removable quick-clip hazard safety whistle", "Expandable side mesh holds heavy HydroFlasks"],
      ["Sets up under 10 minutes via elastic hooks", "DarkRoom fabric technology blocks morning light rays", "Taped bottom floor seams keep ground damp out", "Mesh windows facilitate breeze drafts"]
    ]
  },
  {
    category: "Books",
    titles: [
      "The Creative Act: A Way of Being by Rick Rubin Hardcover Edition",
      "Atomic Habits: An Easy & Proven Way to Build Good Habits by James Clear",
      "Designing Design by Kenya Hara - Minimalist Fine Arts Paperback",
      "Dune Deluxe Hardcover Graphic Novel Edition by Frank Herbert",
      "Thinking, Fast and Slow by Daniel Kahneman Nobel Prize Selection",
      "Breath: The New Science of a Lost Art by James Nestor Paperback"
    ],
    descriptions: [
      "A beautiful, meditative study on where creative thoughts originate and how to filter artistic self-doubts out of your active daily practices.",
      "One of the most popular personal guides ever written. Illustrates tiny daily changes of 1% that compound into major health and work achievements.",
      "An exquisite, high-concept, matte-paper exploration of the philosophy of white space, simplicity, and communicative typography from MUJI's chief director.",
      "Experience the legendary desert science-fiction world as custom graphic illustrations bound inside gorgeous gold-foil cloth coverings.",
      "Explore the two cognitive channels controlling choices: fast, intuitive, emotional System 1, and slow, analytical, logical System 2.",
      "A fascinating, data-backed physiological study on how human nose breathing transforms cellular vitality, sports endurance, and sleep."
    ],
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=60", // book laying
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=60", // books stack
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60", // library books
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&auto=format&fit=crop&q=60", // books open
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&auto=format&fit=crop&q=60", // book standing
      "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=600&auto=format&fit=crop&q=60"  // bookstore stack
    ],
    featuresPool: [
      ["Premium archival quality rough acid-free papers", "Debossed tactile cloth bound outer covers", "Thoughtful typography layouts aid long sessions", "Contains 40 philosophical vignette logs"],
      ["Features real case histories and interactive formulas", "Compiles simple templates to track personal workflows", "Practical guidelines to restructure home environments", "Includes supplementary goal sheets"]
    ]
  }
];

export function generateRandomProduct(): Product {
  const currentCatalog = PRODUCT_CATALOG_TEMPLATES[Math.floor(Math.random() * PRODUCT_CATALOG_TEMPLATES.length)];
  const titleIndex = Math.floor(Math.random() * currentCatalog.titles.length);
  
  const title = currentCatalog.titles[titleIndex];
  // Slightly randomize the title by adding a suffix or details
  const suffixes = ["", " - Limited Edition", " (New & Improved)", " - Ultimate Edition", " - White Label", " [Global Version]"];
  const finalTitle = title + suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const description = currentCatalog.descriptions[titleIndex % currentCatalog.descriptions.length];
  const imageUrl = currentCatalog.images[Math.floor(Math.random() * currentCatalog.images.length)];
  
  // Decide a realistic price in INR (between ₹399 and ₹45,000)
  const basePrice = 399 + Math.random() * 44600;
  // Format to standard integer or flat number for Rupees
  const price = Math.round(basePrice);
  
  const rating = parseFloat((3.8 + Math.random() * 1.2).toFixed(1));
  const reviewCount = Math.floor(10 + Math.random() * 15000);
  const isPrime = Math.random() > 0.3; // 70% chance of prime
  const stock = Math.floor(1 + Math.random() * 100);
  
  // Pull a subset of features
  const featureListIndex = titleIndex % currentCatalog.featuresPool.length;
  const features = currentCatalog.featuresPool[featureListIndex] || ["Premium durable materials built to last", "Fully backed by manufacturer extended warranty"];

  // Unique ID
  const id = "prod-gen-" + Math.random().toString(36).substring(2, 9);
  
  // DateAdded
  const dateAdded = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return {
    id,
    title: finalTitle,
    description,
    price,
    category: currentCatalog.category,
    rating,
    reviewCount,
    imageUrl,
    isPrime,
    stock,
    features,
    dateAdded
  };
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Jessica M.",
    rating: 5,
    title: "Absolutely worth every single penny",
    comment: "This has completely changed how I perform daily routines. The construction grade is outstandingly sturdy, feels incredibly premium, and setup was faster than reading the user guide card. Excellent support team too!",
    date: "2026-05-20"
  },
  {
    id: "rev-2",
    author: "David K.",
    rating: 4,
    title: "Great product but box was slightly dented",
    comment: "The performance is exactly as advertised, very snappy and premium. I only gave it 4 stars because the exterior cardboard packaging had a tear and dent on arrival. Inside parts are pristine and work perfectly, though.",
    date: "2026-05-22"
  },
  {
    id: "rev-3",
    author: "Alexander P.",
    rating: 5,
    title: "An absolute design masterpiece!",
    comment: "I absolute love how clean, modern, and high-quality this feels in hand. It has a beautiful weight, does not pick up fingerprint smudges, and performs beautifully. Very happy purchase!",
    date: "2026-05-24"
  }
];
