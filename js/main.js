const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

document.querySelectorAll('.servicios-grid .servicio-card, .redes-grid .red-card, .prox-list .prox-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 70}ms`;
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', window.scrollY > 20);
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 900) {
  document.addEventListener('mousemove', (event) => {
    const x = ((event.clientX / window.innerWidth) - 0.5) * 12;
    const y = ((event.clientY / window.innerHeight) - 0.5) * 12;
    hero.style.setProperty('--pointer-x', `${x}px`);
    hero.style.setProperty('--pointer-y', `${y}px`);
  });
}

const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const whatsappPhone = '573222462392';

if (form && formMessage) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('#name');
    const contact = form.querySelector('#contact');
    const topic = form.querySelector('#topic');
    const message = form.querySelector('#message');

    const valid = [name, contact, topic, message].every((field) => field && field.value.trim() !== '');

    if (!valid) {
      formMessage.textContent = 'Por favor completa todos los campos.';
      formMessage.className = 'form-message error';
      return;
    }

    const text = `Hola Arena Sports. Soy ${name.value.trim()} (${contact.value.trim()}). Necesito: ${topic.value.trim()}. Mensaje: ${message.value.trim()}`;
    const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`;

    formMessage.textContent = 'Redirigiendo a WhatsApp…';
    formMessage.className = 'form-message success';
    window.open(url, '_blank', 'noopener,noreferrer');
    form.reset();
  });
}