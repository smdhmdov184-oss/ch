/** DEMO placeholder images: replace with your own photos. Spans control the asymmetric grid. */
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const galleryImages = [
  { id: "g1", src: img("photo-1551024601-bec78aea704b"), span: "col-span-2 row-span-2", alt: { en: "Glazed desserts on a pink surface (demo image)", az: "Çəhrayı səthdə şirələnmiş desertlər (demo şəkil)", ru: "Глазированные десерты на розовой поверхности (демо-изображение)" } },
  { id: "g2", src: img("photo-1563805042-7684c019e1cb"), span: "", alt: { en: "Ice cream sundae (demo image)", az: "Dondurma sandi (demo şəkil)", ru: "Мороженое санди (демо-изображение)" } },
  { id: "g3", src: img("photo-1519676867240-f03562e64548"), span: "", alt: { en: "Crepe with berries (demo image)", az: "Giləmeyvəli krep (demo şəkil)", ru: "Креп с ягодами (демо-изображение)" } },
  { id: "g4", src: img("photo-1567327613485-fbc7bf196198"), span: "row-span-2", alt: { en: "Waffles with fruit (demo image)", az: "Meyvəli vaflilər (demo şəkil)", ru: "Вафли с фруктами (демо-изображение)" } },
  { id: "g5", src: img("photo-1624353365286-3f8d62daad51"), span: "", alt: { en: "Chocolate fondant (demo image)", az: "Şokolad fondan (demo şəkil)", ru: "Шоколадный фондан (демо-изображение)" } },
  { id: "g6", src: img("photo-1509042239860-f550ce710b93"), span: "col-span-2", alt: { en: "Latte in a cup (demo image)", az: "Fincanda latte (demo şəkil)", ru: "Латте в чашке (демо-изображение)" } },
  { id: "g7", src: img("photo-1562376552-0d160a2f238d"), span: "", alt: { en: "Belgian waffle (demo image)", az: "Belçika vaflisi (demo şəkil)", ru: "Бельгийская вафля (демо-изображение)" } },
  { id: "g8", src: img("photo-1488477181946-6428a0291777"), span: "", alt: { en: "Sweet treats on a table (demo image)", az: "Masada şirin nemətlər (demo şəkil)", ru: "Сладости на столе (демо-изображение)" } },
];
