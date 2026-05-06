'use client';
import { useState } from 'react';

const collections = [
  {
    nom: 'Printemps — Légèreté',
    desc: 'Robes fluides, lin naturel, tons pastel. Une collection pensée pour la douceur des matins genevois.',
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    pieces: '24 pièces',
  },
  {
    nom: 'Été — Luminosité',
    desc: 'Coton brodé, soie légère, motifs végétaux. La collection qui célèbre la lumière du lac.',
    src: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
    pieces: '18 pièces',
  },
  {
    nom: 'Automne — Profondeur',
    desc: 'Laine mérinos, cachemire doux, camel et terracotta. Pour les soirées qui s\'étirent.',
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80',
    pieces: '31 pièces',
  },
];

const lookbook = [
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', alt: 'Look 01' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80', alt: 'Look 02' },
  { src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', alt: 'Look 03' },
  { src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&q=80', alt: 'Look 04' },
  { src: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80', alt: 'Look 05' },
  { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80', alt: 'Look 06' },
];

const services = [
  { titre: 'Personal shopping', desc: 'Séance privée d\'1h avec notre styliste pour composer votre garde-robe capsule.' },
  { titre: 'Retouches sur mesure', desc: 'Atelier intégré pour ajustements et personnalisations de toutes pièces.' },
  { titre: 'Livraison Genève', desc: 'Livraison le jour même en ville de Genève, packaging signature inclus.' },
  { titre: 'Programme fidélité', desc: 'Accès prioritaire aux nouvelles collections et invitations aux défilés privés.' },
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="bg-[#faf9f7] text-[#1a1a1a]">

      {/* Bannière démo */}
      <div className="bg-[#1a1a1a] text-[#c4a35a] text-center text-xs font-semibold py-2 px-4 tracking-widest">
        ✦ Site de démonstration · Créé par{' '}
        <a href="https://atelierdigitalgeneve.ch" className="underline underline-offset-2" target="_blank">Atelier Digital Genève</a>
        {' '}· Forfait Pro CHF 990 ✦
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#faf9f7]/95 backdrop-blur border-b border-[#1a1a1a]/8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold tracking-[0.15em] uppercase text-[#1a1a1a]">Elara</span>
            <span className="hidden sm:inline text-[#c4a35a] text-xs tracking-[0.3em] uppercase ml-3">Genève</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {[['#collections', 'Collections'], ['#lookbook', 'Lookbook'], ['#services', 'Services'], ['#contact', 'Contact']].map(([href, label]) => (
              <a key={href} href={href} className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] text-sm tracking-widest uppercase transition-colors">{label}</a>
            ))}
          </div>
          <a href="#contact" className="hidden md:inline-block border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] text-xs tracking-widest uppercase px-6 py-2.5 transition-all">
            Nous visiter
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#1a1a1a]/10 px-6 py-4 flex flex-col gap-4 bg-[#faf9f7]">
            {[['#collections', 'Collections'], ['#lookbook', 'Lookbook'], ['#services', 'Services'], ['#contact', 'Contact']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[#1a1a1a]/60">{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO — plein écran avec vraie photo */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=85"
          alt="Elara Boutique"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-[#1a1a1a]/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-xl">
            <p className="text-[#c4a35a] text-xs tracking-[0.5em] uppercase mb-4">Collection 2025</p>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-none mb-6">
              L&apos;élégance<br />à votre image
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
              Pièces sélectionnées pour leur singularité, portées par des femmes qui savent ce qu&apos;elles veulent.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#collections" className="bg-white text-[#1a1a1a] font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:bg-[#c4a35a] hover:text-white transition-colors">
                Découvrir
              </a>
              <a href="#lookbook" className="border border-white text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-[#1a1a1a] transition-colors">
                Lookbook
              </a>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-white/30 animate-pulse" />
          <span className="text-white/40 text-xs tracking-widest uppercase" style={{writingMode: 'vertical-lr'}}>Scroll</span>
        </div>
      </section>

      {/* BANDEAU SIGNATURE */}
      <div className="bg-[#1a1a1a] py-4 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap text-[#c4a35a]/60 text-xs tracking-[0.4em] uppercase">
          {Array(6).fill(0).map((_, i) => (
            <span key={i}>✦ Mode · Genève ✦ Collections Exclusives ✦ Personal Shopping ✦ Retouches sur Mesure</span>
          ))}
        </div>
      </div>

      {/* COLLECTIONS */}
      <section id="collections" className="py-28 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">Nos univers</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">Collections</h2>
            </div>
            <a href="#contact" className="hidden sm:inline-block text-sm tracking-widest uppercase text-[#1a1a1a]/50 hover:text-[#1a1a1a] border-b border-current pb-0.5 transition-colors">
              Tout voir →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((c) => (
              <div key={c.nom} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-5 aspect-[3/4]">
                  <img
                    src={c.src}
                    alt={c.nom}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute top-4 right-4 bg-[#faf9f7] text-[#1a1a1a] text-xs tracking-widest uppercase px-3 py-1.5">
                    {c.pieces}
                  </div>
                </div>
                <p className="text-[#c4a35a] text-xs tracking-widest uppercase mb-1">{c.nom}</p>
                <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANDE CHIFFRES */}
      <section className="bg-[#f0ede8] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[['12', 'ans à Genève'], ['3', 'collections/an'], ['200+', 'marques sélectionnées'], ['1200+', 'clientes fidèles']].map(([val, label]) => (
              <div key={label}>
                <div className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-2">{val}</div>
                <div className="text-[#1a1a1a]/40 text-xs tracking-widest uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK — grille photos */}
      <section id="lookbook" className="py-28 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">Inspiration</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Lookbook</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {lookbook.map((p, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group ${i === 1 ? 'md:row-span-2' : ''}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-700 ${i === 1 ? 'h-full min-h-[500px]' : 'h-64 md:h-72'}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-end p-4">
                  <span className="text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">{p.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PRO */}
      <section id="services" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#faf9f7]/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">L&apos;expérience Elara</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Nos services exclusifs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white border border-[#1a1a1a]/8 p-8 hover:border-[#c4a35a]/50 hover:shadow-lg transition-all group">
                <div className="w-8 h-px bg-[#c4a35a] mb-6 group-hover:w-16 transition-all duration-300" />
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 tracking-wide">{s.titre}</h3>
                <p className="text-[#1a1a1a]/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À PROPOS — image + texte */}
      <section className="py-28 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-5">Notre histoire</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Née à Genève,<br />façonnée<br />par le monde
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6">
                Elara a ouvert ses portes en 2013 Rue du Rhône avec une conviction : chaque femme mérite une garde-robe qui lui ressemble. Pas un uniforme, pas une tendance — une expression.
              </p>
              <p className="text-white/50 text-lg leading-relaxed mb-10">
                Nous sélectionnons nos pièces lors de voyages à Paris, Milan, Copenhague et Tokyo. Seules les marques qui partagent nos valeurs d&apos;artisanat et de durabilité intègrent nos collections.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[['Rue du Rhône', 'Adresse'], ['Mar–Sam', '10h–19h'], ['Sur RDV', 'Personal shopping']].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-[#c4a35a] font-bold mb-1">{val}</div>
                    <div className="text-white/30 text-xs uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <img
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80"
                alt="Boutique Elara"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#c4a35a] text-[#1a1a1a] p-6 text-center">
                <div className="text-3xl font-bold">2013</div>
                <div className="text-xs font-bold uppercase tracking-wider mt-1">Fondée</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-[#f0ede8]">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">Restez informée</p>
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-3">Accès en avant-première</h2>
          <p className="text-[#1a1a1a]/50 text-sm mb-8 leading-relaxed">
            Recevez nos nouvelles collections, invitations privées et offres exclusives avant tout le monde.
          </p>
          {newsletterSent ? (
            <p className="text-[#c4a35a] font-semibold tracking-widest uppercase text-sm">✦ Merci, à très bientôt ✦</p>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setNewsletterSent(true); }} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="flex-1 px-5 py-4 bg-white border border-[#1a1a1a]/20 focus:outline-none focus:border-[#c4a35a] text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/30"
              />
              <button type="submit" className="bg-[#1a1a1a] hover:bg-[#c4a35a] text-white text-xs tracking-widest uppercase px-6 py-4 transition-colors">
                S&apos;inscrire
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">Prenons rendez-vous</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Nous visiter</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Formulaire */}
            <div>
              {sent ? (
                <div className="bg-[#f0ede8] border border-[#c4a35a]/30 p-12 text-center">
                  <p className="text-[#c4a35a] text-3xl mb-4">✦</p>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Message reçu</h3>
                  <p className="text-[#1a1a1a]/50 text-sm">Notre équipe vous répondra dans les 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { id: 'nom', label: 'Nom', type: 'text', placeholder: 'Camille Dupont' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'camille@example.com' },
                    { id: 'telephone', label: 'Téléphone', type: 'tel', placeholder: '+41 79 000 00 00' },
                  ].map(f => (
                    <div key={f.id}>
                      <label className="block text-xs tracking-widest uppercase text-[#1a1a1a]/50 mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required
                        className="w-full px-0 py-3 border-0 border-b border-[#1a1a1a]/20 focus:border-[#c4a35a] focus:outline-none bg-transparent text-[#1a1a1a] placeholder-[#1a1a1a]/20 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#1a1a1a]/50 mb-2">Je souhaite</label>
                    <select className="w-full px-0 py-3 border-0 border-b border-[#1a1a1a]/20 focus:border-[#c4a35a] focus:outline-none bg-transparent text-[#1a1a1a]/60 transition-colors">
                      <option>Visiter la boutique</option>
                      <option>Séance personal shopping</option>
                      <option>Retouche / ajustement</option>
                      <option>Renseignement collection</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[#1a1a1a]/50 mb-2">Message</label>
                    <textarea
                      rows={3}
                      placeholder="Votre message..."
                      className="w-full px-0 py-3 border-0 border-b border-[#1a1a1a]/20 focus:border-[#c4a35a] focus:outline-none bg-transparent text-[#1a1a1a] placeholder-[#1a1a1a]/20 transition-colors resize-none"
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#1a1a1a] hover:bg-[#c4a35a] disabled:opacity-50 text-white font-semibold text-xs tracking-[0.3em] uppercase py-5 transition-colors"
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Infos & carte */}
            <div className="space-y-10">
              <div className="space-y-6">
                {[
                  { label: 'Adresse', val: 'Rue du Rhône 48\n1204 Genève' },
                  { label: 'Téléphone', val: '+41 22 789 01 23' },
                  { label: 'Email', val: 'bonjour@elara-geneve.ch' },
                  { label: 'Horaires', val: 'Mar–Ven : 10h–19h\nSam : 10h–18h\nDim–Lun : Fermé' },
                ].map(({ label, val }) => (
                  <div key={label} className="flex gap-8 border-b border-[#1a1a1a]/8 pb-6">
                    <span className="text-xs tracking-widest uppercase text-[#c4a35a] w-24 shrink-0 pt-0.5">{label}</span>
                    <span className="text-[#1a1a1a]/60 text-sm leading-relaxed whitespace-pre-line">{val}</span>
                  </div>
                ))}
              </div>
              <div className="overflow-hidden h-52">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.5!2d6.1559!3d46.2024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c64b30c5b5555%3A0x1!2sRue+du+Rh%C3%B4ne%2C+Gen%C3%A8ve!5e0!3m2!1sfr!2sch!4v1"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-bold tracking-[0.2em] uppercase">Elara</span>
            <span className="text-[#c4a35a] text-xs tracking-widest uppercase ml-3">Genève</span>
          </div>
          <p className="text-white/20 text-xs tracking-wider text-center">
            © 2025 Elara · Rue du Rhône 48, Genève
          </p>
          <p className="text-white/20 text-xs tracking-wider">
            Site par{' '}
            <a href="https://atelierdigitalgeneve.ch" className="text-[#c4a35a]/60 hover:text-[#c4a35a] transition-colors">
              Atelier Digital Genève
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
}
