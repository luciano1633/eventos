// Datos mock para cuando las APIs no estén disponibles (GitHub Pages)
export const eventosMock = [
  {
    id: 1,
    nombre: "Concierto de Rock en Vivo",
    fecha: "2025-12-15",
    lugar: "Estadio Nacional",
    categoria: "Conciertos",
    imagen: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    agotado: true
  },
  {
    id: 2,
    nombre: "Conferencia de Tecnología 2025",
    fecha: "2025-11-28",
    lugar: "Centro de Convenciones",
    categoria: "Conferencias",
    imagen: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    agotado: true
  },
  {
    id: 3,
    nombre: "Festival de Jazz",
    fecha: "2026-01-20",
    lugar: "Parque Forestal",
    categoria: "Conciertos",
    imagen: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
    agotado: true
  },
  {
    id: 4,
    nombre: "Expo Innovación Digital",
    fecha: "2025-12-05",
    lugar: "Espacio Riesco",
    categoria: "Conferencias",
    imagen: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800",
    agotado: false
  },
  {
    id: 5,
    nombre: "Concierto Sinfónico",
    fecha: "2025-12-10",
    lugar: "Teatro Municipal",
    categoria: "Conciertos",
    imagen: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800",
    agotado: false
  },
  {
    id: 6,
    nombre: "Cumbre de Emprendimiento",
    fecha: "2026-02-14",
    lugar: "Hotel W Santiago",
    categoria: "Conferencias",
    imagen: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    agotado: false
  },
  {
    id: 7,
    nombre: "Festival de Música Electrónica",
    fecha: "2026-01-10",
    lugar: "Movistar Arena",
    categoria: "Conciertos",
    imagen: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    agotado: false
  },
  {
    id: 8,
    nombre: "Congreso de Marketing Digital",
    fecha: "2025-12-20",
    lugar: "CasaPiedra",
    categoria: "Conferencias",
    imagen: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    agotado: false
  }
];

export const eventosDetallesMock = {
  1: {
    id: 1,
    organizador: "Productora Musical Rock & Roll",
    asistentesConfirmados: 8500,
    descripcion: "Un espectacular concierto de rock con las mejores bandas nacionales e internacionales. Disfruta de una noche inolvidable con música en vivo, efectos especiales y una producción de primer nivel.",
    capacidadMaxima: 10000,
    precio: "$45.000 - $120.000",
    requisitos: "Mayores de 18 años. Prohibido introducir bebidas alcohólicas."
  },
  2: {
    id: 2,
    organizador: "Tech Innovators Chile",
    asistentesConfirmados: 1200,
    descripcion: "La conferencia más importante de tecnología del año. Expertos internacionales compartirán las últimas tendencias en IA, blockchain, cloud computing y desarrollo de software. Incluye talleres prácticos y networking.",
    capacidadMaxima: 1500,
    precio: "$85.000 - $150.000",
    requisitos: "Registro previo obligatorio. Se entregará certificado de asistencia."
  },
  3: {
    id: 3,
    organizador: "Fundación Jazz para Todos",
    asistentesConfirmados: 3200,
    descripcion: "Festival al aire libre con los mejores exponentes del jazz nacional e internacional. Un evento familiar que combina música, gastronomía y arte en un ambiente único.",
    capacidadMaxima: 5000,
    precio: "Entrada liberada",
    requisitos: "Evento apto para todo público. Se permite ingreso con mascotas."
  },
  4: {
    id: 4,
    organizador: "Cámara de Comercio Digital",
    asistentesConfirmados: 2800,
    descripcion: "Exposición de las últimas innovaciones en transformación digital, startups tecnológicas y soluciones empresariales. Incluye stands interactivos, charlas magistrales y demostraciones en vivo.",
    capacidadMaxima: 3500,
    precio: "$50.000 - $95.000",
    requisitos: "Dirigido a profesionales y empresarios. Inscripción anticipada recomendada."
  },
  5: {
    id: 5,
    organizador: "Orquesta Filarmónica de Santiago",
    asistentesConfirmados: 890,
    descripcion: "Una velada elegante con las obras maestras de la música clásica. La Orquesta Filarmónica interpreta composiciones de Beethoven, Mozart y Tchaikovsky en el majestuoso Teatro Municipal.",
    capacidadMaxima: 1000,
    precio: "$30.000 - $80.000",
    requisitos: "Vestimenta formal sugerida. No se permite ingreso de menores de 5 años."
  },
  6: {
    id: 6,
    organizador: "StartupChile",
    asistentesConfirmados: 650,
    descripcion: "Encuentro de emprendedores, inversionistas y mentores. Pitch de startups, paneles de discusión sobre financiamiento y estrategias de crecimiento. Oportunidad única de networking con líderes del ecosistema.",
    capacidadMaxima: 800,
    precio: "$60.000",
    requisitos: "Emprendedores, inversionistas y profesionales del ecosistema startup."
  },
  7: {
    id: 7,
    organizador: "Electronic Beats Productions",
    asistentesConfirmados: 7200,
    descripcion: "El festival de música electrónica más esperado del verano. DJs internacionales, visuales impactantes, y una experiencia inmersiva con lo mejor del house, techno y EDM.",
    capacidadMaxima: 9000,
    precio: "$55.000 - $95.000",
    requisitos: "Mayores de 18 años. Identificación obligatoria."
  },
  8: {
    id: 8,
    organizador: "Academia de Marketing Digital",
    asistentesConfirmados: 950,
    descripcion: "Congreso especializado en estrategias de marketing digital, SEO, redes sociales, e-commerce y analítica web. Con casos de éxito, talleres prácticos y las últimas tendencias del mercado.",
    capacidadMaxima: 1200,
    precio: "$75.000",
    requisitos: "Profesionales del marketing, publicidad y comunicaciones."
  }
};
