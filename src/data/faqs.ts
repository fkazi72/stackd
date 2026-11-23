export interface FAQItem {
  id: string;
  category: 'orders' | 'shipping' | 'products' | 'returns';
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'shipping',
    question: 'How fast do you dispatch orders & do you deliver across India?',
    answer: 'We dispatch all in-stock stationery & gift orders within 24–48 hours! We deliver across all pincodes in India via express tracked couriers (Bluedart, Delhivery, Speed Post). Delivery typically takes 2–4 business days.',
  },
  {
    id: 'faq-2',
    category: 'shipping',
    question: 'How can I unlock Free Shipping?',
    answer: 'All orders over ₹999 automatically qualify for Free Tracked Express Shipping across India! On orders below ₹999, standard shipping is just ₹79. You can also use code FREESHIP at checkout or bundle 3+ items in our Stack & Save builder to unlock instant free delivery.',
  },
  {
    id: 'faq-3',
    category: 'products',
    question: 'Are the mystery blind boxes truly random?',
    answer: 'Yes! Every single blind box is factory-sealed with our holographic tamper-proof sticker and shuffled thoroughly before boxing. A full case of 8 guarantees no duplicate standard figures and includes a 1-in-72 chance of the super-rare Gold Sparkle or Glow-in-the-Dark chase variant.',
  },
  {
    id: 'faq-4',
    category: 'products',
    question: 'How do the stacking figures stay balanced?',
    answer: 'Our industrial design team engineered interlocking magnetic bases and subtle micro-grooves into the top and bottom of each character sculpt. They snap together with a gentle tactile click so you can stack them 2, 3, or even 4 tiers high without wobbling!',
  },
  {
    id: 'faq-5',
    category: 'orders',
    question: 'Can I change my address or cancel an order after placing it?',
    answer: 'We process orders quickly, but if you email us at hello@keepitstackd.com within 2 hours of placing your order, our mascot care team will gladly modify your address or cancel the order without fee.',
  },
  {
    id: 'faq-6',
    category: 'returns',
    question: 'What is your return & replacement policy?',
    answer: 'We offer a 30-day "100% Smile Guarantee." If any non-blind-box item arrives damaged, defective, or simply does not bring you immense joy, return it for a full refund or free replacement. For blind boxes, we accept returns on unopened, factory-sealed boxes.',
  },
  {
    id: 'faq-7',
    category: 'products',
    question: 'Are Stack\'d materials non-toxic and eco-conscious?',
    answer: 'Absolutely. All our vinyl figures, plushies, and tumblers are manufactured in audited ethical facilities using 100% BPA-free, lead-free, non-toxic materials. Our packaging boxes are printed with soy-based inks on FSC-certified recycled paper.',
  },
];
