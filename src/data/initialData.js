// GraphicDen.in Core Catalog & Store Data
// Authentic human e-commerce configuration matching GraphicDen design & Veltrix Stories proposal

export const INITIAL_PRODUCTS = [
  {
    id: 'gd-001',
    name: 'Photo mug',
    category: 'Mugs',
    categoryType: 'mugs',
    price: 299,
    originalPrice: 399,
    discount: '25% OFF',
    badge: '-25%',
    rating: 4.8,
    reviewsCount: 142,
    stock: 25,
    description: 'High-gloss ceramic mug customized with your uploaded photo and text. Microwave and dishwasher safe with vibrant sublimation color print.',
    isCustomizable: true,
    sku: 'GD-MUG-001',
    features: ['HD Photo Sublimation', 'Microwave Safe', 'Ceramic 325ml', 'Gift-Ready Box'],
    tags: ['Best Seller', 'Photo Gift']
  },
  {
    id: 'gd-002',
    name: 'Name keychain',
    category: 'Keychains',
    categoryType: 'keychains',
    price: 149,
    originalPrice: 199,
    discount: '25% OFF',
    badge: 'Popular',
    rating: 4.7,
    reviewsCount: 98,
    stock: 60,
    description: 'Precision laser-cut wooden name keychain with durable stainless steel split ring. Customized with your name or initials.',
    isCustomizable: true,
    sku: 'GD-KEY-002',
    features: ['Natural Wood Finish', 'Laser Engraved', 'Heavy Duty Ring', 'Pocket Size'],
    tags: ['Accessories', 'Personalized']
  },
  {
    id: 'gd-003',
    name: 'Custom cushion',
    category: 'Home',
    categoryType: 'cushions',
    price: 549,
    originalPrice: 699,
    discount: '21% OFF',
    badge: 'Best Seller',
    rating: 4.9,
    reviewsCount: 184,
    stock: 12,
    description: 'Ultra-soft microfiber velvet personalized cushion with edge-to-edge photo printing. Includes high-resilience virgin fiber filler.',
    isCustomizable: true,
    sku: 'GD-CSH-003',
    features: ['HD Sublimation Print', 'Concealed Zipper', 'Plush Filling Included', 'Machine Washable'],
    tags: ['Home Decor', 'Couple Special']
  },
  {
    id: 'gd-004',
    name: 'Memory frame',
    category: 'Frames',
    categoryType: 'frames',
    price: 449,
    originalPrice: 599,
    discount: '25% OFF',
    badge: '-25%',
    rating: 4.8,
    reviewsCount: 110,
    stock: 18,
    description: 'Handcrafted teak-finish wooden frame with protective anti-glare acrylic shield. Holds your favorite printed memory with tabletop stand.',
    isCustomizable: true,
    sku: 'GD-FRM-004',
    features: ['Real Wood Moulding', 'Anti-Glare Acrylic', 'Dual Stand & Wall Mount', 'High Gloss Photo Included'],
    tags: ['Wall Decor', 'Photo Frame']
  },
  {
    id: 'gd-005',
    name: 'Gift hamper',
    category: 'Hampers',
    categoryType: 'hampers',
    price: 1299,
    originalPrice: 1599,
    discount: '19% OFF',
    badge: 'Luxury',
    rating: 5.0,
    reviewsCount: 89,
    stock: 8,
    description: 'Hand packed basket with treats, a card and ribbon. Curated gift collection including mug, scented candle, treats, and greetings.',
    isCustomizable: true,
    sku: 'GD-HMP-005',
    features: ['Hand-Woven Basket', 'Personalized Card', 'Artisan Treats', 'Ribbon Gift Wrap'],
    tags: ['All-in-One', 'Festive Hamper']
  },
  {
    id: 'gd-006',
    name: 'Scented candle',
    category: 'Home',
    categoryType: 'candles',
    price: 349,
    originalPrice: 449,
    discount: '22% OFF',
    badge: 'Handmade',
    rating: 4.6,
    reviewsCount: 67,
    stock: 30,
    description: '100% natural soy wax candle hand-poured into an amber glass jar. Infused with soothing Madagascar vanilla and lavender essential oils.',
    isCustomizable: false,
    sku: 'GD-CND-006',
    features: ['Natural Soy Wax', 'Lead-Free Cotton Wick', '35-Hour Burn Time', 'Amber Glass Jar'],
    tags: ['Aromatherapy', 'Home Decor']
  },
  {
    id: 'gd-007',
    name: 'Printed T-shirt',
    category: 'Apparel',
    categoryType: 'apparel',
    price: 599,
    originalPrice: 799,
    discount: '25% OFF',
    badge: '-25%',
    rating: 4.7,
    reviewsCount: 75,
    stock: 20,
    description: '180 GSM 100% combed cotton unisex t-shirt printed with durable DTF inks. Breathable, pre-shrunk, and comfortable all-day wear.',
    isCustomizable: true,
    sku: 'GD-TSH-007',
    features: ['100% Bio-Wash Cotton', 'HD Screen/DTF Print', 'Ribbed Round Neck', 'Fade-Resistant'],
    tags: ['Apparel', 'Custom Wear']
  },
  {
    id: 'gd-008',
    name: 'Love photo book',
    category: 'Frames',
    categoryType: 'books',
    price: 799,
    originalPrice: 999,
    discount: '20% OFF',
    badge: 'Memories',
    rating: 4.9,
    reviewsCount: 132,
    stock: 3,
    description: 'Hardcover 24-page custom photo memory album printed on 300 GSM lustre paper. The perfect keepsake for love stories and trips.',
    isCustomizable: true,
    sku: 'GD-BOK-008',
    features: ['Hardbound Fabric Cover', '24 High-Res Pages', 'Lustre Photo Paper', 'Lay-Flat Binding'],
    tags: ['Anniversary', 'Photo Book']
  },
  {
    id: 'gd-009',
    name: 'Couple mug set',
    category: 'Mugs',
    categoryType: 'mugs',
    price: 549,
    originalPrice: 699,
    discount: '21% OFF',
    badge: 'Couple Special',
    rating: 4.8,
    reviewsCount: 164,
    stock: 14,
    description: 'Pair of his-and-hers ceramic mugs that nest together with heart-shaped handles. Personalized with couple names and special date.',
    isCustomizable: true,
    sku: 'GD-CMG-009',
    features: ['Twin Nesting Design', 'Heart Handles', 'Dual Names Inscribed', 'Gloss Finish'],
    tags: ['Wedding', 'Romantic']
  },
  {
    id: 'gd-010',
    name: 'Desk calendar',
    category: 'Home',
    categoryType: 'stationery',
    price: 249,
    originalPrice: 329,
    discount: '24% OFF',
    badge: 'Popular',
    rating: 4.6,
    reviewsCount: 58,
    stock: 40,
    description: '12-month tabletop spiral desk calendar customized with your family or couple photo for each month of the year.',
    isCustomizable: true,
    sku: 'GD-CAL-010',
    features: ['12 Custom Monthly Photos', 'Twin Wire-O Spiral', 'Sturdy Cardboard Stand', 'Matte Thick Cardstock'],
    tags: ['Office', 'Calendar']
  }
];

export const CATEGORIES_LIST = [
  { name: 'All categories', count: 10 },
  { name: 'Mugs', count: 2 },
  { name: 'Keychains', count: 1 },
  { name: 'Home', count: 3 },
  { name: 'Frames', count: 2 },
  { name: 'Hampers', count: 1 },
  { name: 'Apparel', count: 1 }
];

export const PROMO_ADS = [
  {
    id: 'ad-1',
    tag: 'LIMITED TIME OFFER',
    title: 'Celebrate Anniversaries in Style',
    subtitle: 'Flat 30% OFF on all Couple Gifts, Frames & Hampers',
    code: 'LOVE30',
    discount: '30% OFF',
    badge: '30% OFF',
    buttonText: 'Shop Anniversary Deals',
    category: 'Frames'
  },
  {
    id: 'ad-2',
    tag: 'CORPORATE & BULK ORDERS',
    title: 'Bespoke Executive Gift Sets',
    subtitle: 'Custom laser engraved pens, mugs & wooden plaques with your company branding',
    code: 'CORP15',
    discount: '15% OFF',
    badge: 'Bulk Discount',
    buttonText: 'Explore Corporate Hampers',
    category: 'Hampers'
  },
  {
    id: 'ad-3',
    tag: 'FESTIVAL SPECIAL',
    title: 'Free Photo Mug Offer',
    subtitle: 'Get a free personalized ceramic photo mug on any order above ₹999',
    code: 'FREEPHOTO',
    discount: 'Free Gift',
    badge: 'Free Mug',
    buttonText: 'Claim Offer',
    category: 'Mugs'
  }
];

// Exact orders matching Image 3 (Admin Dashboard)
export const INITIAL_ORDERS = [
  {
    id: 'GD1003',
    customerName: 'Kiran Kumar',
    customerPhone: '9123456780',
    customerEmail: 'kiran.kumar@gmail.com',
    shippingAddress: 'Flat 204, Green Glen Layout, Bellandur, Bengaluru, Karnataka - 560103',
    items: [
      {
        id: 'gd-009',
        name: 'Couple mug set',
        price: 549,
        quantity: 1,
        customization: 'Kiran & Sneha'
      },
      {
        id: 'gd-010',
        name: 'Desk calendar',
        price: 249,
        quantity: 1,
        customization: 'Year 2026 Family'
      }
    ],
    itemsSummary: 'Couple mug set ×1, Desk calendar ×1',
    totalAmount: 858,
    paymentMethod: 'Cash on delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Confirmed',
    createdAt: '2026-11-16T14:30:00Z',
    trackingNumber: 'DELHIVERY-GD1003-IN'
  },
  {
    id: 'GD1002',
    customerName: 'Anitha Rao',
    customerPhone: '9988776655',
    customerEmail: 'anitha.rao@gmail.com',
    shippingAddress: 'Plot 42, Road 12, Banjara Hills, Hyderabad, Telangana - 500034',
    items: [
      {
        id: 'gd-005',
        name: 'Gift hamper',
        price: 1299,
        quantity: 1,
        customization: 'Happy Birthday Mom'
      }
    ],
    itemsSummary: 'Gift hamper ×1',
    totalAmount: 1299,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: '2026-11-15T11:20:00Z',
    trackingNumber: 'BLUEDART-GD1002-EXP'
  },
  {
    id: 'GD1001',
    customerName: 'Priya Reddy',
    customerPhone: '9876543210',
    customerEmail: 'priya.reddy@gmail.com',
    shippingAddress: 'Villa 18, Palm Meadows, Whitefield, Bengaluru, Karnataka - 560066',
    items: [
      {
        id: 'gd-001',
        name: 'Photo mug',
        price: 299,
        quantity: 2,
        customization: 'Priya & Vikram'
      }
    ],
    itemsSummary: 'Photo mug ×2',
    totalAmount: 658,
    paymentMethod: 'Card ending 4242',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2026-11-14T09:15:00Z',
    trackingNumber: 'DTDC-GD1001-DL'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    timestamp: '2026-11-16T14:32:10Z',
    adminEmail: 'admin@graphicden.in',
    action: 'ORDER_STATUS_UPDATE',
    details: 'Order GD1003 marked as Confirmed',
    ipAddress: '103.21.144.12'
  },
  {
    id: 'log-2',
    timestamp: '2026-11-16T12:05:40Z',
    adminEmail: 'admin@graphicden.in',
    action: 'INVENTORY_RESTOCK',
    details: 'Photo mug restocked (+10 units)',
    ipAddress: '103.21.144.12'
  },
  {
    id: 'log-3',
    timestamp: '2026-11-15T11:25:00Z',
    adminEmail: 'admin@graphicden.in',
    action: 'ORDER_STATUS_UPDATE',
    details: 'Order GD1002 marked as Shipped via BlueDart',
    ipAddress: '103.21.144.12'
  }
];

export const OCCASIONS = [
  { id: 'all', label: 'All Occasions', icon: 'gift' },
  { id: 'anniversary', label: 'Anniversary', icon: 'heart' },
  { id: 'birthday', label: 'Birthday', icon: 'cake' },
  { id: 'corporate', label: 'Corporate', icon: 'briefcase' },
  { id: 'wedding', label: 'Wedding', icon: 'gem' },
  { id: 'home', label: 'Home Decor', icon: 'home' }
];

export const CATEGORIES = CATEGORIES_LIST.map(c => c.name);
