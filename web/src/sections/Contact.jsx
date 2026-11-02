import { useState } from 'react'
import site from '../data/site.js'
import Reveal from '../fx/Reveal.jsx'
import Spotlight from '../fx/Spotlight.jsx'
import { buildWhatsAppUrl } from '../lib/whatsapp.js'

const socials = [
  { name: 'Instagram', href: site.social.instagram, handle: site.social.handle },
  { name: 'TikTok', href: site.social.tiktok, handle: site.social.handle },
  { name: 'YouTube', href: site.social.youtube, handle: '@ArenaSportsCo' },
  { name: 'WhatsApp', href: `https://wa.me/${site.social.whatsapp}`, handle: site.social.whatsappLabel },
]

const field = 'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-texto placeholder:text-texto2/60 outline-none transition focus:border-acento/60 focus:bg-white/[0.05]'

// Formulario "Escríbenos": no hay servidor, al enviar abre WhatsApp con el mensaje armado.
export default function Contact({ defaultTopic = '' }) {
  const [form, setForm] = useState({ name: '', contact: '', topic: defaultTopic, message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    window.open(buildWhatsAppUrl(site.social.whatsapp, form), '_blank', 'noopener')
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden="true" className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-acento/10 blur-[140px]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="eyebrow mb-5">Trabajemos juntos</p>
          <h2 className="h-section">Escrí<span className="text-acento">benos</span></h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-texto2">
            ¿Quieres organizar un torneo, llevar Perfil de Jugador a tu club o patrocinar un evento? Te respondemos pronto.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="glass group rounded-2xl p-4 transition hover:border-acento/40">
                <p className="font-display text-sm uppercase tracking-[0.2em] text-texto group-hover:text-acento">{s.name} ↗</p>
                <p className="mt-1 truncate text-sm text-texto2">{s.handle}</p>
              </a>
            ))}
          </div>
          <a href={`mailto:${site.social.email}`} className="mt-6 inline-block text-texto2 underline-offset-4 hover:text-acento hover:underline">
            {site.social.email}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <Spotlight>
            <form onSubmit={onSubmit} className="grid gap-4 p-6 sm:p-9">
              <label className="grid gap-2 text-sm text-texto2">
                Nombre
                <input required value={form.name} onChange={set('name')} className={field} placeholder="Tu nombre" autoComplete="name" />
              </label>
              <label className="grid gap-2 text-sm text-texto2">
                Correo o WhatsApp
                <input value={form.contact} onChange={set('contact')} className={field} placeholder="Para responderte" />
              </label>
              <label className="grid gap-2 text-sm text-texto2">
                ¿Qué necesitas?
                <select value={form.topic} onChange={set('topic')} className={`${field} appearance-none`}>
                  <option value="">Selecciona una opción</option>
                  {site.contactTopics.map((t) => <option key={t} value={t} className="bg-gris2">{t}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-texto2">
                Mensaje
                <textarea rows={4} value={form.message} onChange={set('message')} className={`${field} resize-none`} placeholder="Cuéntanos un poco" />
              </label>
              <button type="submit" className="btn-primary mt-2 w-full">Enviar por WhatsApp</button>
              <p className="text-center text-xs text-texto2/70">Se abre WhatsApp con tu mensaje listo para enviar.</p>
            </form>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  )
}
