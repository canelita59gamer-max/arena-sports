const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), 0);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Stagger cards
  document.querySelectorAll('.servicios-grid .servicio-card, .redes-grid .red-card, .prox-list .prox-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 70}ms`;
  });

  // Smooth anchor navigation: start at top, then scroll down to target
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const scrollToHashTarget = (hash) => {
    const id = hash.replace('#', '');
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;

    window.scrollTo({ top: 0, behavior: 'auto' });
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }, 60);
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const targetId = hash.slice(1);
      if (!document.getElementById(targetId)) return;
      event.preventDefault();
      scrollToHashTarget(hash);
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    if (location.hash) {
      scrollToHashTarget(location.hash);
    }
  });