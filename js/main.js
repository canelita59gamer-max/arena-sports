const REVEAL_SELECTOR = '.reveal, .servicio-card, .red-card, .ev-card, .prox-item, .patro-card';

const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), 0);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(REVEAL_SELECTOR).forEach(el => obs.observe(el));

  // Stagger cards within each grid/list independently
  document.querySelectorAll('.servicios-grid, .redes-grid, .eventos-grid, .prox-list, .patro-grid').forEach(grid => {
    Array.from(grid.children).forEach((el, i) => {
      el.style.transitionDelay = `${i * 70}ms`;
    });
  });

function enviarFormularioWhatsApp() {
  const nombre = document.getElementById('cf-nombre').value.trim();
  const contacto = document.getElementById('cf-contacto').value.trim();
  const necesidad = document.getElementById('cf-necesidad').value;
  const mensaje = document.getElementById('cf-mensaje').value.trim();

  if (!nombre || !contacto) {
    alert('Por favor completa al menos tu nombre y tu correo o WhatsApp.');
    return;
  }

  let texto = `Hola Arena Sports, mi nombre es ${nombre}.`;
  if (necesidad) texto += `\nNecesito: ${necesidad}`;
  if (mensaje) texto += `\nMensaje: ${mensaje}`;
  texto += `\nMi contacto: ${contacto}`;

  const url = `https://wa.me/573222462392?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

/* ══════════════════════ MENÚ MÓVIL ══════════════════════ */
(function () {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
})();

/* ══════════════════════ NAV CON SOMBRA AL HACER SCROLL + BACK TO TOP ══════════════════════ */
(function () {
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    document.body.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 480);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

/* ══════════════════════ MODAL DE EVENTOS (historial) ══════════════════════ */
(function () {
  const modal = document.getElementById('eventModal');
  const closeBtn = document.getElementById('closeModal');
  if (!modal || !closeBtn) return;

  const titleEl = document.getElementById('modalTitle');
  const metaEl = document.getElementById('modalMeta');
  const summaryEl = document.getElementById('modalSummary');
  const galleryEl = document.getElementById('modalGallery');
  const descEl = document.getElementById('modalDescription');

  const isVideo = (src) => /\.(mp4|webm|ogg|mov)$/i.test(src);

  function openModal(btn) {
    const { title, date, location, summary, description, images } = btn.dataset;
    titleEl.textContent = title || 'Evento Arena Sports';
    metaEl.textContent = [date, location].filter(Boolean).join(' · ');
    summaryEl.textContent = summary || '';
    descEl.textContent = description || '';

    galleryEl.innerHTML = '';
    (images || '').split(',').map(s => s.trim()).filter(Boolean).forEach(src => {
      if (isVideo(src)) {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.playsInline = true;
        galleryEl.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = title ? `${title} — foto del evento` : 'Foto del evento';
        img.loading = 'lazy';
        galleryEl.appendChild(img);
      }
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    galleryEl.querySelectorAll('video').forEach(v => v.pause());
  }

  document.querySelectorAll('.event-card-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn));
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });
})();

/* ══════════════════════ HERO — LOGO ARENA SPORTS: SE DIBUJA A TRAZO Y SE FUNDE CON EL LOGO REAL ══════════════════════ */
(function () {
  const svg = document.getElementById('heroLogoDrawSvg');
  const raster = document.getElementById('heroLogoRaster');
  if (!svg || !raster) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    svg.classList.add('is-hidden');
    raster.classList.add('is-visible');
    return;
  }

  const iconPaths = Array.from(svg.querySelectorAll('#logoIconPaths path'));
  const textPaths = Array.from(svg.querySelectorAll('#logoTextPaths path'));
  const allPaths = iconPaths.concat(textPaths);

  // 1) Preparar cada trazo como invisible (dasharray = largo total, offset = largo total)
  //    ANTES del primer paint para evitar cualquier parpadeo del logo ya dibujado.
  const lengths = allPaths.map((p) => {
    let len = 0;
    try { len = p.getTotalLength(); } catch (e) { len = 0; }
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
    return len;
  });

  const ICON_STEP_MS = 22;
  const ICON_DRAW_MS = 850;
  const TEXT_START_MS = 900;
  const TEXT_STEP_MS = 30;
  const TEXT_DRAW_MS = 700;
  const EASE = 'cubic-bezier(.65,0,.35,1)';

  function scheduleDraw() {
    iconPaths.forEach((p, i) => {
      const delay = i * ICON_STEP_MS;
      p.style.transition = `stroke-dashoffset ${ICON_DRAW_MS}ms ${EASE} ${delay}ms`;
    });
    textPaths.forEach((p, i) => {
      const delay = TEXT_START_MS + i * TEXT_STEP_MS;
      p.style.transition = `stroke-dashoffset ${TEXT_DRAW_MS}ms ${EASE} ${delay}ms`;
    });

    svg.classList.add('is-drawing');
    allPaths.forEach((p) => { p.style.strokeDashoffset = '0'; });

    const iconEnd = (iconPaths.length ? (iconPaths.length - 1) * ICON_STEP_MS : 0) + ICON_DRAW_MS;
    const textEnd = TEXT_START_MS + (textPaths.length ? (textPaths.length - 1) * TEXT_STEP_MS : 0) + TEXT_DRAW_MS;
    const totalDrawMs = Math.max(iconEnd, textEnd);

    // 2) Al terminar el trazo: pequeño respiro y luego el logo real (raster) se
    //    funde encima, ocultando cualquier imprecisión del vectorizado.
    window.setTimeout(() => {
      svg.classList.remove('is-drawing');
      raster.classList.add('is-visible');
      window.setTimeout(() => { svg.classList.add('is-hidden'); }, 1000);
    }, totalDrawMs + 180);
  }

  // Forzar un reflow para que el navegador registre dasharray/dashoffset
  // iniciales antes de aplicar la transición (si no, no habría animación).
  requestAnimationFrame(() => {
    requestAnimationFrame(scheduleDraw);
  });
})();

/* ══════════════════════ COVERFLOW 3D — SERVICIOS EN DETALLE ══════════════════════ */
(function () {
  const stage = document.getElementById('cfStage');
  const dotsWrap = document.getElementById('cfDots');
  const ambienceImg = document.getElementById('cfAmbienceImg');
  const prevBtn = document.getElementById('cfPrev');
  const nextBtn = document.getElementById('cfNext');
  if (!stage || !dotsWrap || !ambienceImg) return;

  // NOTA: son fotos de referencia de Unsplash (temporal). Se reemplazan por
  // las 6 fotos premium ya generadas en la paleta negro/lima de Arena Sports
  // en cuanto estén copiadas a assets/images/servicios/ en el repo.
  const items = [
    {
      tag: '#Organización',
      title: 'ORGANIZACIÓN DE TORNEOS',
      desc: 'Diseñamos cada competencia con estructura, solvencia y detalle, desde la planificación hasta la premiación final.',
      img: 'assets/images/servicios/patrocinios.jpg',
      ctaText: 'Organiza con Nosotros',
      ctaHref: '#contacto',
    },
    {
      tag: '#Cobertura',
      title: 'COBERTURA & DIFUSIÓN',
      desc: 'Capturamos cada momento con una mirada profesional para que el evento viva más allá del día de juego.',
      img: 'assets/images/servicios/cobertura.jpg',
      ctaText: 'Ver Servicio',
      ctaHref: '#contacto',
    },
    {
      tag: '#Patrocinios',
      title: 'GESTIÓN DE PATROCINIOS',
      desc: 'Conectamos marcas con experiencias de alto impacto, creando visibilidad auténtica y valor real para cada alianza.',
      img: 'assets/images/servicios/organizacion.jpg',
      ctaText: 'Quiero Patrocinar',
      ctaHref: '#patrocinadores',
    },
    {
      tag: '#Corporativo',
      title: 'LIGAS CORPORATIVAS',
      desc: 'Diseñamos experiencias deportivas que fortalecen equipos, marcas y culturas institucionales con propósito y energía.',
      img: 'assets/images/servicios/corporativo.svg',
      ctaText: 'Ver Servicio',
      ctaHref: '#contacto',
    },
    {
      tag: '#Comunidad',
      title: 'TORNEOS COMUNITARIOS',
      desc: 'Impulsamos espacios de encuentro y orgullo comunitario, donde el deporte une y deja huella.',
      img: 'assets/images/servicios/comunidad.svg',
      ctaText: 'Ver Servicio',
      ctaHref: '#contacto',
    },
    {
      tag: '#Consultoría',
      title: 'CONSULTORÍA DEPORTIVA',
      desc: 'Acompañamos a instituciones que desean construir torneos con metodología, orden y una propuesta deportiva sólida.',
      img: 'assets/images/servicios/consultoria.svg',
      ctaText: 'Ver Servicio',
      ctaHref: '#contacto',
    },
  ];

  const total = items.length;
  let current = 0;
  let hovered = false;
  let autoplayTimer = null;

  const cardEls = items.map((item) => {
    const card = document.createElement('div');
    card.className = 'cf-card';
    card.innerHTML =
      '<img class="cf-photo" src="' + item.img + '" alt="' + item.title + '" loading="lazy">' +
      '<div class="cf-vignette"></div>' +
      '<div class="cf-content">' +
        '<div class="cf-tag">' + item.tag + '</div>' +
        '<div class="cf-body">' +
          '<h4>' + item.title + '</h4>' +
          '<div class="cf-rule"></div>' +
          '<p>' + item.desc + '</p>' +
          '<a class="cf-cta" href="' + item.ctaHref + '">' + item.ctaText +
            '<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>' +
          '</a>' +
        '</div>' +
      '</div>';
    stage.appendChild(card);
    return card;
  });

  const dotEls = items.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'cf-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Ir al servicio ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function offsetLook(offset, mobile) {
    const far = mobile ? 140 : 285;
    const farther = mobile ? 230 : 500;
    if (offset === 0) return { t: 'translateX(0px) scale(1) rotateY(0deg)', o: 1, z: 30, f: 'brightness(1)' };
    if (offset === 1) return { t: 'translateX(' + far + 'px) scale(0.84) rotateY(-24deg)', o: .65, z: 20, f: 'brightness(0.75)' };
    if (offset === 2) return { t: 'translateX(' + farther + 'px) scale(0.68) rotateY(-38deg)', o: .38, z: 10, f: 'brightness(0.55) blur(1px)' };
    if (offset === total - 1) return { t: 'translateX(-' + far + 'px) scale(0.84) rotateY(24deg)', o: .65, z: 20, f: 'brightness(0.75)' };
    if (offset === total - 2) return { t: 'translateX(-' + farther + 'px) scale(0.68) rotateY(38deg)', o: .38, z: 10, f: 'brightness(0.55) blur(1px)' };
    return { t: 'translateX(0px) scale(0.4) rotateY(0deg)', o: 0, z: 0, f: 'brightness(0.4) blur(2px)' };
  }

  function render() {
    const mobile = window.innerWidth < 700;
    cardEls.forEach((card, idx) => {
      const offset = (idx - current + total) % total;
      const look = offsetLook(offset, mobile);
      const isCenter = offset === 0;
      card.style.transform = look.t;
      card.style.opacity = look.o;
      card.style.zIndex = look.z;
      card.style.filter = look.f;
      card.style.boxShadow = isCenter
        ? '0 25px 60px rgba(0,0,0,.9), 0 0 35px var(--acento-shadow)'
        : '0 15px 35px rgba(0,0,0,.5)';
      card.style.cursor = isCenter ? 'default' : 'pointer';
      card.onclick = isCenter ? null : () => goTo(idx);
      const content = card.querySelector('.cf-content');
      content.style.opacity = isCenter ? '1' : '0';
      content.style.transform = isCenter ? 'translateY(0px)' : 'translateY(16px)';
      content.style.pointerEvents = isCenter ? 'auto' : 'none';
    });
    dotEls.forEach((dot, i) => dot.classList.toggle('active', i === current));
    ambienceImg.src = items[current].img;
  }

  function goTo(i) {
    current = ((i % total) + total) % total;
    render();
    restartAutoplay();
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function restartAutoplay() {
    clearInterval(autoplayTimer);
    if (hovered || total <= 1) return;
    autoplayTimer = setInterval(next, 5000);
  }

  function inViewport(el) {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  stage.addEventListener('mouseenter', () => { hovered = true; restartAutoplay(); });
  stage.addEventListener('mouseleave', () => { hovered = false; restartAutoplay(); });

  let touchStartX = 0;
  stage.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 45) { diff < 0 ? next() : prev(); }
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    const activeTag = (document.activeElement && document.activeElement.tagName) || '';
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;
    if (!inViewport(stage)) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  window.addEventListener('resize', render);
  render();
  restartAutoplay();
})();

/* ══════════════════════ PARALLAX SUTIL DEL HERO ══════════════════════ */
(function () {
  const heroRight = document.querySelector('.hero-right');
  if (!heroRight || window.matchMedia('(pointer: coarse)').matches) return;

  heroRight.addEventListener('mousemove', (e) => {
    const r = heroRight.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 18;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 18;
    heroRight.style.setProperty('--pointer-x', `${x}px`);
    heroRight.style.setProperty('--pointer-y', `${y}px`);
  });
  heroRight.addEventListener('mouseleave', () => {
    heroRight.style.setProperty('--pointer-x', '0px');
    heroRight.style.setProperty('--pointer-y', '0px');
  });
})();