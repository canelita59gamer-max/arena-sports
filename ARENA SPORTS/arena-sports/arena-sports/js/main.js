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