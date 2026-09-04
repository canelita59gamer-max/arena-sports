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