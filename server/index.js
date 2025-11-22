import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import cors from 'cors';

// Esquema GraphQL
const schema = buildSchema(`
  type EventoDetalle {
    id: Int!
    organizador: String!
    asistentesConfirmados: Int!
    descripcion: String!
    capacidadMaxima: Int!
    precio: String!
    requisitos: String!
  }

  type Query {
    eventoDetalle(id: Int!): EventoDetalle
  }
`);

// Datos mock para detalles de eventos
const eventosDetalles = {
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

// Resolver
const root = {
  eventoDetalle: ({ id }) => {
    return eventosDetalles[id] || null;
  }
};

const app = express();
app.use(cors());

app.all('/graphql', createHandler({
  schema: schema,
  rootValue: root,
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor GraphQL ejecutándose en http://localhost:${PORT}/graphql`);
});
