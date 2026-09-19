/**
 * Menu data. Images below are DEMO placeholders (stock URLs), not photos of a real restaurant.
 * Replace `image` with your own files (e.g. "/images/crepe.jpg" placed in /public/images).
 * `price` is a number; the currency comes from siteConfig.currency. Prices are sample values.
 */
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

export const CATEGORY_KEYS = ["all", "crepes", "waffles", "desserts", "drinks", "sets"];

export const menuItems = [
  {
    id: "strawberry-crepe",
    category: "crepes",
    image: img("photo-1519676867240-f03562e64548"),
    price: 9.5,
    translations: {
      en: { name: "Strawberry Hazelnut Crepe", description: "A thin warm crepe filled with hazelnut cream and fresh strawberries.", ingredients: ["Crepe", "Hazelnut cream", "Strawberry"] },
      az: { name: "Çiyələkli fındıq kreppi", description: "Fındıq kremi və təzə çiyələklə doldurulmuş nazik isti krep.", ingredients: ["Krep", "Fındıq kremi", "Çiyələk"] },
      ru: { name: "Креп с клубникой и фундуком", description: "Тонкий тёплый креп с ореховым кремом и свежей клубникой.", ingredients: ["Креп", "Ореховый крем", "Клубника"] },
    },
  },
  {
    id: "banana-crepe",
    category: "crepes",
    image: img("photo-1484723091739-30a097e8f929"),
    price: 8.5,
    translations: {
      en: { name: "Banana Caramel Crepe", description: "Soft crepe with sliced banana and slow-cooked salted caramel.", ingredients: ["Crepe", "Banana", "Salted caramel"] },
      az: { name: "Banan karamel kreppi", description: "Doğranmış banan və yavaş bişirilmiş duzlu karamelli yumşaq krep.", ingredients: ["Krep", "Banan", "Duzlu karamel"] },
      ru: { name: "Креп с бананом и карамелью", description: "Мягкий креп с нарезанным бананом и медленно сваренной солёной карамелью.", ingredients: ["Креп", "Банан", "Солёная карамель"] },
    },
  },
  {
    id: "berry-waffle",
    category: "waffles",
    image: img("photo-1562376552-0d160a2f238d"),
    price: 11,
    translations: {
      en: { name: "Belgian Berry Waffle", description: "Crisp Belgian waffle with mixed berries and light vanilla cream.", ingredients: ["Waffle", "Mixed berries", "Vanilla cream"] },
      az: { name: "Belçika giləmeyvə vaflisi", description: "Qarışıq giləmeyvə və yüngül vanil kremi ilə xırtıldayan Belçika vaflisi.", ingredients: ["Vafli", "Giləmeyvə", "Vanil kremi"] },
      ru: { name: "Бельгийская вафля с ягодами", description: "Хрустящая бельгийская вафля с ягодным миксом и лёгким ванильным кремом.", ingredients: ["Вафля", "Ягоды", "Ванильный крем"] },
    },
  },
  {
    id: "oreo-waffle",
    category: "waffles",
    image: img("photo-1567327613485-fbc7bf196198"),
    price: 12,
    translations: {
      en: { name: "Oreo Chocolate Waffle", description: "Warm waffle with dark chocolate, crushed Oreo and a scoop of vanilla ice cream.", ingredients: ["Waffle", "Chocolate", "Oreo", "Vanilla ice cream"] },
      az: { name: "Oreo şokolad vaflisi", description: "Tünd şokolad, əzilmiş Oreo və bir kürə vanil dondurmalı isti vafli.", ingredients: ["Vafli", "Şokolad", "Oreo", "Vanil dondurma"] },
      ru: { name: "Вафля с шоколадом и Орео", description: "Тёплая вафля с тёмным шоколадом, дроблёным Орео и шариком ванильного мороженого.", ingredients: ["Вафля", "Шоколад", "Орео", "Ванильное мороженое"] },
    },
  },
  {
    id: "vanilla-sundae",
    category: "desserts",
    image: img("photo-1563805042-7684c019e1cb"),
    price: 8,
    translations: {
      en: { name: "Vanilla Caramel Sundae", description: "Vanilla ice cream, caramel ribbon and toasted nuts in a tall glass.", ingredients: ["Vanilla ice cream", "Caramel", "Toasted nuts"] },
      az: { name: "Vanil karamel sandi", description: "Hündür stəkanda vanil dondurma, karamel və qovrulmuş qoz-fındıq.", ingredients: ["Vanil dondurma", "Karamel", "Qovrulmuş qoz-fındıq"] },
      ru: { name: "Санди с ванилью и карамелью", description: "Ванильное мороженое, карамельная лента и обжаренные орехи в высоком бокале.", ingredients: ["Ванильное мороженое", "Карамель", "Обжаренные орехи"] },
    },
  },
  {
    id: "choco-fondant",
    category: "desserts",
    image: img("photo-1624353365286-3f8d62daad51"),
    price: 10,
    translations: {
      en: { name: "Warm Chocolate Fondant", description: "A soft chocolate cake with a molten centre, served with a strawberry.", ingredients: ["Dark chocolate", "Butter", "Strawberry"] },
      az: { name: "İsti şokolad fondan", description: "Ortası axıcı yumşaq şokolad tortu, çiyələklə təqdim olunur.", ingredients: ["Tünd şokolad", "Yağ", "Çiyələk"] },
      ru: { name: "Тёплый шоколадный фондан", description: "Нежный шоколадный кекс с жидкой серединой, подаётся с клубникой.", ingredients: ["Тёмный шоколад", "Сливочное масло", "Клубника"] },
    },
  },
  {
    id: "rose-latte",
    category: "drinks",
    image: img("photo-1509042239860-f550ce710b93"),
    price: 6,
    translations: {
      en: { name: "Rose Latte", description: "Smooth espresso with steamed milk and a delicate rose syrup.", ingredients: ["Espresso", "Milk", "Rose syrup"] },
      az: { name: "Qızılgüllü latte", description: "Buxarlanmış süd və zərif qızılgül şərbəti ilə yumşaq espresso.", ingredients: ["Espresso", "Süd", "Qızılgül şərbəti"] },
      ru: { name: "Розовый латте", description: "Мягкий эспрессо с молоком и нежным розовым сиропом.", ingredients: ["Эспрессо", "Молоко", "Розовый сироп"] },
    },
  },
  {
    id: "signature-set",
    category: "sets",
    image: img("photo-1551024601-bec78aea704b"),
    price: 24,
    translations: {
      en: { name: "Signature Sweet Set", description: "A crepe, a mini waffle and a scoop of vanilla ice cream, finished with fresh strawberries and chocolate sauce. Made for sharing.", ingredients: ["Crepe", "Mini waffle", "Vanilla ice cream", "Strawberry", "Chocolate sauce"] },
      az: { name: "İmza şirin seti", description: "Krep, mini vafli və bir kürə vanil dondurma, təzə çiyələk və şokolad sousu ilə tamamlanır. Paylaşmaq üçün hazırlanıb.", ingredients: ["Krep", "Mini vafli", "Vanil dondurma", "Çiyələk", "Şokolad sousu"] },
      ru: { name: "Фирменный сладкий сет", description: "Креп, мини-вафля и шарик ванильного мороженого, завершённые свежей клубникой и шоколадным соусом. Создан, чтобы делиться.", ingredients: ["Креп", "Мини-вафля", "Ванильное мороженое", "Клубника", "Шоколадный соус"] },
    },
  },
  {
    id: "duo-set",
    category: "sets",
    image: img("photo-1488477181946-6428a0291777"),
    price: 18,
    translations: {
      en: { name: "Sweet Duo Set", description: "Two desserts of your day, paired with two rose lattes.", ingredients: ["Two desserts", "Two rose lattes"] },
      az: { name: "Şirin duet seti", description: "Gününüzün iki desertı və iki qızılgüllü latte.", ingredients: ["İki desert", "İki qızılgüllü latte"] },
      ru: { name: "Сладкий дуэт", description: "Два десерта дня и два розовых латте.", ingredients: ["Два десерта", "Два розовых латте"] },
    },
  },
];

export const featuredProduct = menuItems.find((i) => i.id === "signature-set");
