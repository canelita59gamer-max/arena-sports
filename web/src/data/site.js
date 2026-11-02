// Todo el contenido de la web vive aquí: para cambiar un texto, un link o un dato,
// se edita este archivo y nada más.

const whatsapp = '573222462392'

const site = {
  appUrl: 'https://perfil-jugador-wheat.vercel.app',
  torneoUrl: '/torneo.html',

  nav: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Perfil de Jugador', href: '/perfil-jugador' },
    { label: 'Cómo trabajamos', href: '/#proceso' },
    { label: 'Faith Cup', href: '/#eventos' },
    { label: 'Patrocinadores', href: '/#patrocinadores' },
  ],

  hero: {
    eyebrow: 'Organización profesional de eventos deportivos',
    lines: [
      { text: 'Donde', variant: 'solid' },
      { text: 'el juego', variant: 'accent' },
      { text: 'se vuelve', variant: 'outline' },
      { text: 'historia', variant: 'solid' },
    ],
    lead: 'Torneos con estándar profesional y tecnología propia para que cada jugador tenga su historia registrada. Desde torneos comunitarios hasta ligas para marcas e instituciones.',
  },

  // Solo números reales. Mientras esté vacío, la sección de cifras no aparece.
  // Ejemplo: { value: 5, suffix: '', label: 'Equipos en el primer torneo' }
  stats: [],

  services: [
    { title: 'Organización de torneos', tag: 'Organización', img: '/assets/images/servicios/patrocinios.jpg', desc: 'Diseñamos cada competencia con estructura, solvencia y detalle, desde la planificación hasta la premiación final.' },
    { title: 'Cobertura & difusión', tag: 'Cobertura', img: '/assets/images/servicios/cobertura.jpg', desc: 'Capturamos cada momento con una mirada profesional para que el evento viva más allá del día de juego.' },
    { title: 'Gestión de patrocinios', tag: 'Patrocinios', img: '/assets/images/servicios/organizacion.jpg', desc: 'Conectamos marcas con experiencias de alto impacto, creando visibilidad auténtica y valor real para cada alianza.' },
    { title: 'Ligas corporativas', tag: 'Corporativo', desc: 'Diseñamos experiencias deportivas que fortalecen equipos, marcas y culturas institucionales con propósito y energía.' },
    { title: 'Torneos comunitarios', tag: 'Comunidad', desc: 'Impulsamos espacios de encuentro y orgullo comunitario, donde el deporte une y deja huella.' },
    { title: 'Consultoría deportiva', tag: 'Consultoría', desc: 'Acompañamos a instituciones que desean construir torneos con metodología, orden y una propuesta deportiva sólida.' },
  ],

  steps: [
    { title: 'Diagnóstico', desc: 'Entendemos tu comunidad, tu presupuesto y lo que quieres lograr con el torneo.' },
    { title: 'Diseño', desc: 'Formato de competencia, calendario, reglamento, sedes y paquete de patrocinio.' },
    { title: 'Ejecución', desc: 'Logística, arbitraje, resultados en vivo y cobertura de cada jornada.' },
    { title: 'Legado', desc: 'Premiación, contenido para redes y la historia de cada jugador en Perfil de Jugador.' },
  ],

  player: {
    tagline: 'La hoja de vida deportiva de cada jugador',
    lead: 'Perfil de Jugador es la app de Arena Sports para clubes: cada jugador tiene su card, su historia y sus entrenamientos, y el club lo maneja todo desde un solo panel.',
    features: [
      { title: 'Una carta por jugador', desc: 'De bronce a élite: arranca en 50 y sube hasta 99 según cómo entrena y juega. El profesor de cada categoría decide qué cualidades pesan.' },
      { title: 'Ficha privada', desc: 'Datos personales, documentos y fotos que solo ve el administrador del club.' },
      { title: 'Entrenamientos e informes', desc: 'Lo que pasa en cada entrenamiento queda registrado, y el informe del trimestre se arma solo.' },
      { title: 'Fútbol y voleibol', desc: 'Cada categoría elige su deporte. Un mismo club puede manejar los dos.' },
    ],
    start: [
      { title: 'Escríbenos', desc: 'Nos cuentas cuántas categorías y jugadores tiene tu club.' },
      { title: 'Creamos tu club', desc: 'Configuramos tu club, tus categorías y el acceso de tu staff.' },
      { title: 'Carga tus jugadores', desc: 'Tu equipo agrega a los jugadores y empieza a usar la app desde el celular.' },
    ],
    clubs: [{ name: 'Club Deportivo Jogo Bonito', city: 'Fútbol formativo · Bucaramanga' }],
    screens: [
      { src: '/app/cartas.jpg', alt: 'Portada de Perfil de Jugador con cartas de jugador' },
      { src: '/app/carta.jpg', alt: 'Carta de jugador nivel oro' },
      { src: '/app/clubes.jpg', alt: 'Lista de clubes en Perfil de Jugador' },
    ],
  },

  events: {
    featured: {
      name: 'Faith Cup',
      desc: 'Nuestro torneo interiglesias: posiciones, partidos, goleadores y cartas de jugador en vivo.',
      img: '/assets/images/copafe.jpeg',
      logo: '/assets/images/faith-cup-logo.jpg',
    },
    past: [
      { date: 'Abril 2026', name: 'Torneo Intercolegiados Beth Shalom', desc: '5 equipos · 2 meses de competencia · Campeón: José Celestino Mutis', img: '/assets/images/premiacion.jpeg' },
    ],
  },

  sponsors: [
    { name: 'El Mero Taco', logo: '/assets/images/logos/patrocinadores/el-mero-taco.png' },
    { name: 'Comunidad Espresso', logo: '/assets/images/logos/patrocinadores/comunidad-espresso.png' },
    { name: 'Negrón', logo: '/assets/images/logos/patrocinadores/negron.png' },
    { name: 'Luminus Car', logo: '/assets/images/logos/patrocinadores/luminus-car.png' },
    { name: 'MV Autos', logo: '/assets/images/logos/patrocinadores/m-autos.jpg' },
    { name: 'Servicentro', logo: '/assets/images/logos/patrocinadores/servicentro.png' },
    { name: 'Superdrogas Piedecuesta', logo: '/assets/images/logos/patrocinadores/superdrogas-piedecuesta.png' },
    { name: 'Avila Market', logo: '/assets/images/logos/patrocinadores/avila-market.jpg' },
    { name: 'Dr. Oscar Mendoza', logo: '/assets/images/logos/patrocinadores/oscar-mendoza.jpg' },
  ],

  social: {
    whatsapp,
    whatsappLabel: '+57 322 246 2392',
    email: 'arenasports.eventos@gmail.com',
    instagram: 'https://www.instagram.com/arenasportsco_',
    tiktok: 'https://www.tiktok.com/@arenasportsco_',
    youtube: 'https://www.youtube.com/@ArenaSportsCo',
    handle: '@arenasportsco_',
  },

  contactTopics: ['Organizar un torneo', 'Perfil de Jugador para mi club', 'Patrocinar un evento', 'Liga corporativa o institucional', 'Información general'],
}

export default site
