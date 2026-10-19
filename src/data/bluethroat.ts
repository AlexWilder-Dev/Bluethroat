// Everything factual on the site lives here, split by bar.
// Sources: bluethroatbar.com and its October 2026 menu and private-hire PDFs.

export type BarId = 'deptford' | 'brixton';
export type Glass = 'rocks' | 'coupe' | 'highball';
export type HireBand = 'tue-thu' | 'fri-sat';

export interface Cocktail {
  id: string;
  name: string;
  flavour: string;
  ingredients: string[];
  glass: Glass;
  alcoholFree: boolean;
}

export interface WineItem {
  name: string;
  /** Price for a glass (175ml, or 125ml for sparkling). */
  glass?: number;
  /** Price for a 750ml bottle. */
  bottle: number;
}

export interface WineSection {
  title: string;
  items: WineItem[];
}

/** One opening session. Minutes from midnight of `day`; `close` can run past 1440. */
export interface Session {
  day: number; // 0 Sunday … 6 Saturday
  open: number;
  close: number;
}

export interface Photo {
  src: string; // file stem in public/img, served at 640 and 1280 wide
  alt: string;
  position?: string;
}

export interface Bar {
  id: BarId;
  name: string;
  established: number;
  addressLines: string[];
  addressShort: string;
  postcode: string;
  findingUs: string;
  coords: { lat: number; lng: number };
  mapUrl: string;
  reviewUrl: string;
  hireEmail: string;
  wheelchair: boolean;
  accessNote: string;
  intro: string;
  hoursSummary: { days: string; time: string }[];
  sessions: Session[];
  cocktailPrice: number;
  wines: WineSection[];
  hire: {
    capacity: number;
    minimumSpend: Record<HireBand, number>;
  };
  photos: {
    arch: Photo;
    room: Photo;
    drinks: Photo;
    hire: Photo;
    door: Photo;
    pour: Photo;
  };
}

export const brand = {
  name: 'Bluethroat',
  line: 'Modern hospitality in beautiful railway arches',
  intro:
    'Tucked beneath South London’s railway arches, our bars in Deptford and Brixton are built around modern hospitality, thoughtful cocktails, warm service, and spaces designed for nights that unfold slowly.',
  menuLine: 'A neighbourhood cocktail bar set beneath the arches. Seasonal cocktails, modern hospitality, and a soundtrack worth staying for.',
  nameNote: 'Named after a small songbird with a blue collar and a powerful song.',
  founders: 'Ari and Landi Mucaj',
  instagram: { handle: '@bluethroatbars', url: 'https://www.instagram.com/bluethroatbars/' },
  generalEmail: 'hello@bluethroatbar.com',
  site: 'https://www.bluethroatbar.com',
};

/** Third-party words, used once and credited. */
export const press = {
  lcw: {
    quote: 'The team here focus on classics done well and offer pared back, minimally garnished cocktails with excellent ice.',
    source: 'London Cocktail Week',
    about: 'brixton' as BarId,
  },
  ari: {
    quote: 'Ultimately we want to be known as one of the best cocktail bars in London.',
    source: 'Ari Mucaj, Wharf Life, 2022',
  },
};

export const menu = {
  edition: 'Edition 12',
  season: 'Autumn & Winter 2026',
  // Same order as the printed menu grid, row by row.
  cocktails: [
    {
      id: 'blackberry-smash',
      name: 'Blackberry Smash',
      flavour: 'Tart',
      ingredients: ['Amaro', 'Blackberry & Honey', 'Blanc Vermouth', 'Lime'],
      glass: 'rocks',
      alcoholFree: false,
    },
    {
      id: 'strawberry-sidecar',
      name: 'Strawberry Sidecar',
      flavour: 'Aromatic',
      ingredients: ['Cognac', 'Strawberry & Fig Leaf', 'Bénédictine', 'Lime'],
      glass: 'rocks',
      alcoholFree: false,
    },
    {
      id: 'pear-pressure',
      name: 'Pear Pressure',
      flavour: 'Smoky',
      ingredients: ['Mezcal', 'Pear & Mandarin', 'Lemon', 'Celery Salt'],
      glass: 'rocks',
      alcoholFree: true,
    },
    {
      id: 'doctors-orders',
      name: 'Doctor’s Orders',
      flavour: 'Zesty',
      ingredients: ['12 Yr Scotch', 'Peach & Rhubarb Apéritif', 'Ginger', 'Lime'],
      glass: 'coupe',
      alcoholFree: true,
    },
    {
      id: 'hibiscus-martinez',
      name: 'Hibiscus Martinez',
      flavour: 'Floral',
      ingredients: ['Gin', 'Mezcal', 'Hibiscus & Maraschino', 'Sweet Vermouth'],
      glass: 'coupe',
      alcoholFree: false,
    },
    {
      id: 'pomegranate-margarita',
      name: 'Pomegranate Margarita',
      flavour: 'Juicy',
      ingredients: ['Blanco Tequila', 'Pomegranate & Bergamot', 'Dry Vermouth', 'Chilli'],
      glass: 'rocks',
      alcoholFree: false,
    },
    {
      id: 'bitter-paloma',
      name: 'Bitter Paloma',
      flavour: 'Fizzy',
      ingredients: ['Gin', 'Blood Orange & Fernet', 'Lime', 'Blood Orange Soda'],
      glass: 'highball',
      alcoholFree: false,
    },
    {
      id: 'cinema-butter',
      name: 'Cinema Butter',
      flavour: 'Tropical',
      ingredients: ['Reposado Tequila', 'Peanut & Passion Fruit', 'Hazelnut', 'Lime'],
      glass: 'coupe',
      alcoholFree: false,
    },
    {
      id: 'pandan-negroni',
      name: 'Pandan Negroni',
      flavour: 'Herbaceous',
      ingredients: ['Gin', 'Pandan & Pineapple', 'Bitter Apéritif Blend'],
      glass: 'rocks',
      alcoholFree: false,
    },
    {
      id: 'fig-old-fashioned',
      name: 'Fig Old Fashioned',
      flavour: 'Rich',
      ingredients: ['Rye Whiskey', 'Fig & Walnut', 'Amaro Blend', 'Bénédictine'],
      glass: 'rocks',
      alcoholFree: false,
    },
    {
      id: 'apples-to-lemons',
      name: 'Apples to Lemons',
      flavour: 'Silky',
      ingredients: ['Calvados', 'Quince & Yuzu Saké', 'Fino Sherry', 'Bitters'],
      glass: 'coupe',
      alcoholFree: false,
    },
    {
      id: 'burnt-honey',
      name: 'Burnt Honey',
      flavour: 'Bittersweet',
      ingredients: ['Bourbon', 'Honey & Coconut Apéritif', 'Herbal Bitters'],
      glass: 'rocks',
      alcoholFree: false,
    },
  ] satisfies Cocktail[],
  wineNote: 'Wines are served in 175ml/750ml measures, with the exception of sparkling wines (125ml).',
  beers: [
    { name: 'Pacifico Lager', detail: '355ml bottle · 4.5% abv', price: 6 },
    { name: 'Meantime Pale Ale', detail: '330ml bottle · 4.3% abv', price: 6 },
  ],
  snacks: {
    note: 'For sharing',
    items: [
      { name: 'Nocellara Green Olives', price: 5 },
      { name: 'Roasted & Salted Mixed Nuts', price: 5 },
      { name: 'Wasabi Mix Rice Snacks', price: 5 },
    ],
    all: { name: 'All Snacks', price: 14 },
  },
  allergens: 'Allergens? Please let us know.',
  service: 'A 12.5% service charge applies.',
  alcoholFreeNote: 'Available alcohol-free',
};

// 5pm = 1020, midnight = 1440, 1am = 1500, 2am = 1560
const h = (hour: number) => hour * 60;

export const bars: Record<BarId, Bar> = {
  deptford: {
    id: 'deptford',
    name: 'Deptford',
    established: 2020,
    addressLines: ['Arch 2, Deptford Station', 'London SE8'],
    addressShort: 'Arch 2, Deptford Station',
    postcode: 'SE8',
    findingUs: 'In the brick arch under the Deptford Station sign, on Deptford Market Yard.',
    coords: { lat: 51.4788378, lng: -0.0264192 },
    mapUrl: 'https://maps.app.goo.gl/Jr8jEej4cR3KKFpo8',
    reviewUrl: 'https://g.page/r/CVIaAtlR08VYEAE/review',
    hireEmail: 'deptford@bluethroatbar.com',
    wheelchair: true,
    accessNote: 'We are wheelchair accessible at Bluethroat Deptford.',
    intro:
      'Opened in 2020 by brothers Ari and Landi Mucaj, Bluethroat Deptford is a neighbourhood cocktail bar rooted in thoughtful hospitality. We focus on simple, well-balanced drinks, seasonal ingredients, and carefully re-imagined classics, made to be enjoyed, not overthought.',
    hoursSummary: [
      { days: 'Wed–Thu', time: '5pm–12am' },
      { days: 'Fri–Sat', time: '5pm–1am' },
    ],
    sessions: [
      { day: 3, open: h(17), close: h(24) },
      { day: 4, open: h(17), close: h(24) },
      { day: 5, open: h(17), close: h(25) },
      { day: 6, open: h(17), close: h(25) },
    ],
    cocktailPrice: 13.5,
    wines: [
      {
        title: 'Sparkling',
        items: [
          { name: 'Galanti Prosecco, Extra Dry', glass: 7, bottle: 40 },
          { name: 'Moët Chandon, Brut Imperial', bottle: 90 },
          { name: 'Laurent-Perrier Cuvée Rosé', bottle: 120 },
        ],
      },
      { title: 'White', items: [{ name: 'Vidal Sauvignon Blanc', glass: 10, bottle: 40 }] },
      { title: 'Red', items: [{ name: 'Malbec, Callia Selected', glass: 10, bottle: 40 }] },
      { title: 'Blush', items: [{ name: 'Castello Pinot Grigio Blush', glass: 9, bottle: 36 }] },
    ],
    hire: {
      capacity: 70,
      minimumSpend: { 'tue-thu': 1800, 'fri-sat': 2800 },
    },
    photos: {
      arch: {
        src: 'dep-arch-exterior',
        alt: 'Bluethroat Deptford at night: the brick arch under the Deptford Station sign, with people at tables on the cobbles outside',
        position: '62% 60%',
      },
      room: {
        src: 'dep-long-bar',
        alt: 'The long white marble bar at Deptford under the brick vault, lit by a row of glass pendant lamps',
        position: '50% 55%',
      },
      drinks: {
        src: 'dep-pour-rocks',
        alt: 'A bartender’s hand pouring a cocktail into a rocks glass on the white marble bar at Deptford',
        position: '50% 60%',
      },
      hire: {
        src: 'dep-banquette',
        alt: 'The green velvet banquette against dark ribbed panelling at Deptford',
        position: '50% 60%',
      },
      door: {
        src: 'dep-sign-brick',
        alt: 'The gold Bluethroat sign on the brick wall by the Deptford door, beside an olive tree',
        position: '60% 45%',
      },
      pour: {
        src: 'dep-strain-coupe',
        alt: 'A pale pink cocktail strained into a stemmed glass on the white marble bar at Deptford, a gold lamp beside it',
        position: '50% 55%',
      },
    },
  },
  brixton: {
    id: 'brixton',
    name: 'Brixton',
    established: 2023,
    addressLines: ['51 Atlantic Road', 'London SW9 8JL'],
    addressShort: '51 Atlantic Road',
    postcode: 'SW9 8JL',
    findingUs: 'In a railway arch on Atlantic Road, near the Coldharbour Lane end.',
    coords: { lat: 51.4620009, lng: -0.1118167 },
    mapUrl: 'https://maps.app.goo.gl/vw8CABJEZPLvRicS6',
    reviewUrl: 'https://g.page/r/CZNQpyoeZA56EAE/review',
    hireEmail: 'brixton@bluethroatbar.com',
    wheelchair: false,
    accessNote: 'Unfortunately, there’s no wheelchair access for Bluethroat Brixton.',
    intro:
      'Bluethroat Brixton is our second home, just off Atlantic Road. It carries the same spirit as Deptford – relaxed service, seasonal cocktails, and familiar classics re-imagined, well-balanced, and genuinely delicious.',
    hoursSummary: [
      { days: 'Wed–Thu', time: '5pm–1am' },
      { days: 'Fri–Sat', time: '5pm–2am' },
    ],
    sessions: [
      { day: 3, open: h(17), close: h(25) },
      { day: 4, open: h(17), close: h(25) },
      { day: 5, open: h(17), close: h(26) },
      { day: 6, open: h(17), close: h(26) },
    ],
    cocktailPrice: 14.5,
    wines: [
      {
        title: 'Sparkling',
        items: [
          { name: 'Galanti Prosecco, Extra Dry', glass: 7, bottle: 40 },
          { name: 'Ruinart, Champagne Brut', bottle: 110 },
          { name: 'Laurent-Perrier Cuvée Rosé', bottle: 120 },
        ],
      },
      { title: 'White', items: [{ name: 'Vidal Sauvignon Blanc', glass: 10, bottle: 40 }] },
      { title: 'Red', items: [{ name: 'Malbec, Callia Selected', glass: 10, bottle: 40 }] },
    ],
    hire: {
      capacity: 60,
      minimumSpend: { 'tue-thu': 1800, 'fri-sat': 3000 },
    },
    photos: {
      arch: {
        src: 'brx-tile-vault',
        alt: 'The olive-green tiled vault at Bluethroat Brixton, curving over a row of blue leather stools at small round tables',
        position: '45% 50%',
      },
      room: {
        src: 'brx-vault-night',
        alt: 'A full room at Brixton at night, silhouettes under the curved vault in front of the glowing back bar',
        position: '40% 50%',
      },
      drinks: {
        src: 'brx-menu-drink',
        alt: 'A red cocktail beside the Bluethroat menu on the black marble bar top at Brixton',
        position: '55% 50%',
      },
      hire: {
        src: 'brx-stools',
        alt: 'Blue leather stools and candlelit tables under the tiled arch at Brixton',
        position: '45% 55%',
      },
      door: {
        src: 'brx-sign',
        alt: 'The gold Bluethroat bird and wordmark on a black plate under a single teal light at Brixton',
        position: '50% 50%',
      },
      pour: {
        src: 'brx-strain',
        alt: 'A bartender straining a pale cocktail into a stemmed glass at the Brixton bar',
        position: '40% 40%',
      },
    },
  },
};

export const barOrder: BarId[] = ['deptford', 'brixton'];

export const houseRules = [
  { title: 'Walk-ins', text: 'Mostly walk-in. Drop by on the day.' },
  { title: '18+ only', text: 'Adults only. If you’re over 18 but look younger, bring ID.' },
  { title: 'Dress code', text: 'No shorts, sweatpants, flip-flops or fancy dress.' },
  { title: 'Groups of 10+', text: 'There may be a minimum spend, so email us first.' },
  { title: 'Food & drink', text: 'No outside food or drink, except at private events.' },
  { title: 'Service', text: 'A 12.5% service charge applies. Allergens? Please let us know.' },
];

export const faqs = [
  {
    q: 'Are under 18s allowed?',
    a: 'Bluethroat is an adults only venue. If you are over 18 but look younger you will need to bring your ID. We reserve the right to deny access.',
  },
  {
    q: 'I think I’ve lost something at Bluethroat.',
    a: 'Please email us at hello@bluethroatbar.com with a description of the item and when you visited.',
  },
  {
    q: 'Do you accept walk-ins?',
    a: 'Yes, absolutely. We are primarily a walk-in bar and encourage you to drop by on the day.',
  },
  {
    q: 'Is there a minimum spend required?',
    a: 'Large groups of 10 people and above may be subject to a minimum spend requirement. Please email us in advance to check for details.',
  },
  {
    q: 'Can I bring a cake?',
    a: 'We don’t allow any externally purchased food or drinks to be brought or consumed in Bluethroat. The only exception to this is during private events.',
  },
  {
    q: 'Is Bluethroat wheelchair accessible?',
    a: 'We are wheelchair accessible at Bluethroat Deptford. Unfortunately, there’s no wheelchair access for Bluethroat Brixton.',
  },
  {
    q: 'Do you have a dress code?',
    a: 'While there is no specific dress code, shorts, sweat pants, flip-flops and fancy dress are not allowed.',
  },
];

export const hire = {
  fee: 500,
  serviceRate: 0.125,
  bands: [
    { id: 'tue-thu' as HireBand, label: 'Tuesday – Thursday' },
    { id: 'fri-sat' as HireBand, label: 'Friday – Saturday' },
  ],
  minGuests: 10,
  terms: [
    {
      title: 'Exclusive use',
      points: [
        'The £500 hire fee secures exclusive use of the venue for your event. It is separate from the minimum spend.',
        'The minimum spend is redeemable against drinks purchased during your event. All minimum spends exclude the 12.5% service charge.',
      ],
    },
    {
      title: 'Drinks',
      points: [
        'Champagne and other drinks purchased from Bluethroat count towards the minimum spend. Champagne can also be arranged in advance for your event.',
        'All drinks must be purchased through Bluethroat as part of the agreed minimum spend.',
        'Any unopened bottles purchased for your event can be taken home at the end of the evening.',
      ],
    },
    {
      title: 'Food',
      points: [
        'We are a drinks-led cocktail bar and do not have a kitchen. We can provide olives and nuts.',
        'Guests are welcome to arrange food with their preferred restaurant or caterer, delivered to the bar. Tables and space will be provided for the food to be displayed.',
      ],
    },
    {
      title: 'Setting up',
      points: [
        'Set-up and access times can be discussed when booking. We will do our best to accommodate your requirements depending on the event schedule.',
        'Decorations are welcome, within reason. They must not damage the venue or obstruct guests, staff or access routes. Please discuss any larger installations with us in advance.',
      ],
    },
  ],
  steps: [
    'Send us your preferred date and details.',
    'We confirm availability and send a payment link for the £500 hire fee.',
    'Your booking is secured once the hire fee has been received. It is refundable up to 7 days before the event.',
  ],
  payment:
    'The £500 hire fee is paid upfront to secure your booking. The remaining minimum spend is settled on the night, with the 12.5% service charge added to the final bill.',
};
