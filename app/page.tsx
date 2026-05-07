'use client';
import { useState, useEffect, useRef } from 'react';

/* ── DONNÉES ───────────────────────────────────────────────── */

const pieces = [
  { nom: 'Robe Séville', matiere: 'Soie naturelle', prix: 'CHF 485', src: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80', collection: 'Été', dispo: true },
  { nom: 'Robe Azure', matiere: 'Denim italien', prix: 'CHF 390', src: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80', collection: 'Printemps', dispo: true },
  { nom: 'Veste Opéra', matiere: 'Coton', prix: 'CHF 690', src: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600&q=80', collection: 'Automne', dispo: true },
  { nom: 'Pantalon Milano', matiere: 'Crêpe de soie', prix: 'CHF 295', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', collection: 'Automne', dispo: false },
  { nom: 'Chemisier Éden', matiere: 'Coton brodé main', prix: 'CHF 195', src: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80', collection: 'Printemps', dispo: true },
  { nom: 'Robe Riviera', matiere: 'Lin lavé', prix: 'CHF 245', src: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80', collection: 'Été', dispo: true },
  { nom: 'Top Capri', matiere: 'Lin & coton', prix: 'CHF 165', src: '/top-capri.png', collection: 'Été', dispo: true },
  { nom: 'Trench Ciel', matiere: 'Gabardine légère', prix: 'CHF 445', src: '/trench-ciel.png', collection: 'Printemps', dispo: true },
  { nom: 'Pull Brume', matiere: 'Cachemire pur', prix: 'CHF 395', src: '/pull-brume.png', collection: 'Automne', dispo: true },
];

const services = [
  {
    titre: 'Personal Shopping',
    resume: 'Séance privée avec votre styliste dédiée',
    duree: '1h – 1h30',
    tarif: 'Gratuit dès CHF 500 d\'achat',
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=85',
    description: 'Une styliste vous reçoit en exclusivité dans la boutique fermée au public. Ensemble, vous identifiez vos silhouettes idéales, les couleurs qui vous subliment et composez une garde-robe capsule cohérente. Café, champagne et service personnalisé inclus.',
    inclus: ['Analyse morphologique', 'Sélection de pièces sur mesure', 'Conseils entretien & associations', 'Rappel 30j pour suivi'],
  },
  {
    titre: 'Retouches & Ajustements',
    resume: 'Atelier intégré, retouches sous 72h',
    duree: '72h ouvrées',
    tarif: 'Dès CHF 25',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85',
    description: 'Notre atelier de retouche intégré adapte chaque pièce à votre morphologie exacte. Ourlets, cintrage, ajustement d\'épaules, pose de doublure — nos couturières interviennent sur toutes les pièces achetées chez Elara, mais aussi sur vos vêtements personnels.',
    inclus: ['Ourlets & raccourcissements', 'Cintrages & ajustements', 'Réparations & restaurations', 'Poses de doublure'],
  },
  {
    titre: 'Livraison Premium Genève',
    resume: 'Chez vous le jour même, en packaging signature',
    duree: 'Le jour même avant 19h',
    tarif: 'CHF 15 · Gratuit dès CHF 300',
    src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=85',
    description: 'Vos achats sont soigneusement emballés dans notre boîte signature, enveloppés de papier de soie et accompagnés d\'un ruban doré. La livraison est assurée par notre coursier dédié dans toute la ville de Genève. Pour les cadeaux, nous ajoutons un mot manuscrit.',
    inclus: ['Boîte signature Elara', 'Papier de soie & ruban', 'Mot manuscrit personnalisé', 'Suivi en temps réel'],
  },
  {
    titre: 'Cercle Elara',
    resume: 'Programme fidélité · Accès avant-première',
    duree: 'Annuel',
    tarif: 'Gratuit · Sur invitation',
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85',
    description: 'Les membres du Cercle Elara bénéficient d\'un accès exclusif aux nouvelles collections 48h avant leur mise en vente, d\'invitations aux défilés privés et soirées partenaires, ainsi que d\'un pourcentage de fidélité cumulable sur chaque achat.',
    inclus: ['Accès avant-première collections', 'Invitations défilés & soirées', '5% fidélité cumulable', 'Stylist hotline prioritaire'],
  },
];

const lookbook = [
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&q=80', alt: 'Look 01 — Été', col: 'col-span-1 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=80', alt: 'Look 02 — Printemps' },
  { src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&q=80', alt: 'Look 03 — Été' },
  { src: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&q=80', alt: 'Look 04 — Automne' },
  { src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=700&q=80', alt: 'Look 05 — Hiver' },
];

/* ── HOOK INTERSECTION ─────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── COMPOSANT SERVICE MODAL ───────────────────────────────── */
function ServiceModal({ service, onClose }: { service: typeof services[0]; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 bg-[#faf9f7] w-full max-w-3xl max-h-[90vh] overflow-y-auto md:rounded-none shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Photo */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={service.src} alt={service.titre} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/10 backdrop-blur hover:bg-white/20 text-white w-10 h-10 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="absolute bottom-6 left-6">
            <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-1">{service.duree}</p>
            <h3 className="text-2xl font-bold text-white">{service.titre}</h3>
          </div>
        </div>
        {/* Contenu */}
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#1a1a1a] text-[#c4a35a] text-xs tracking-widest uppercase px-4 py-2">{service.tarif}</span>
          </div>
          <p className="text-[#1a1a1a]/70 leading-relaxed mb-8 text-base">{service.description}</p>
          <div className="border-t border-[#1a1a1a]/10 pt-8">
            <p className="text-xs tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-4">Ce qui est inclus</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.inclus.map(item => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-[#c4a35a] mt-0.5 shrink-0">✦</span>
                  <span className="text-[#1a1a1a]/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <a href="#contact" onClick={onClose} className="block text-center bg-[#1a1a1a] hover:bg-[#c4a35a] text-white text-xs tracking-[0.3em] uppercase py-5 transition-colors">
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE PRINCIPALE ───────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [email, setEmail] = useState('');
  const [filtre, setFiltre] = useState('Tous');

  const fadeCollections = useFadeIn();
  const fadePieces = useFadeIn();
  const fadeServices = useFadeIn();

  const filtres = ['Tous', 'Printemps', 'Été', 'Automne'];
  const piecesFiltrees = filtre === 'Tous' ? pieces : pieces.filter(p => p.collection === filtre);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="bg-[#faf9f7] text-[#1a1a1a]">

      {/* Modal service */}
      {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}

      {/* Bannière démo */}
      <div className="bg-[#1a1a1a] text-[#c4a35a] text-center text-xs font-semibold py-2 px-4 tracking-widest">
        ✦ Démonstration · <a href="https://atelierdigitalgeneve.ch" className="underline underline-offset-2" target="_blank">Atelier Digital Genève</a> · Forfait Pro CHF 990 ✦
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#faf9f7]/95 backdrop-blur border-b border-[#1a1a1a]/8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold tracking-[0.18em] uppercase">Elara</span>
            <span className="hidden sm:inline text-[#c4a35a] text-xs tracking-[0.3em] uppercase ml-3">Genève</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {[['#collections', 'Collections'], ['#lookbook', 'Lookbook'], ['#services', 'Services'], ['#contact', 'Contact']].map(([href, label]) => (
              <a key={href} href={href} className="text-[#1a1a1a]/50 hover:text-[#1a1a1a] text-xs tracking-widest uppercase transition-colors">{label}</a>
            ))}
          </div>
          <a href="#contact" className="hidden md:inline-block border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] text-xs tracking-widest uppercase px-6 py-2.5 transition-all">
            Nous visiter
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#1a1a1a]/10 px-6 py-4 flex flex-col gap-5 bg-[#faf9f7]">
            {[['#collections', 'Collections'], ['#lookbook', 'Lookbook'], ['#services', 'Services'], ['#contact', 'Contact']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[#1a1a1a]/60">{label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=85" alt="Elara" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/85 via-[#1a1a1a]/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <div className="max-w-2xl">
            <p className="text-[#c4a35a] text-xs tracking-[0.5em] uppercase mb-5">Collection 2025 · Genève</p>
            <h1 className="text-6xl md:text-[90px] font-bold text-white leading-[0.9] mb-8 tracking-tight">
              L&apos;élégance<br />à votre image
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
              Pièces sélectionnées pour leur singularité. Portées par des femmes qui savent exactement qui elles sont.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#collections" className="bg-white text-[#1a1a1a] font-semibold text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-[#c4a35a] hover:text-white transition-colors">
                Voir les collections
              </a>
              <a href="#lookbook" className="border border-white/50 text-white text-xs tracking-[0.3em] uppercase px-10 py-4 hover:border-white transition-colors">
                Lookbook
              </a>
            </div>
          </div>
        </div>
        <div className="absolute right-8 bottom-10 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-white/30" style={{animation: 'pulse 2s infinite'}} />
          <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase" style={{writingMode:'vertical-lr'}}>Scroll</span>
        </div>
      </section>

      {/* ── BANDEAU ─────────────────────────────────────── */}
      <div className="bg-[#1a1a1a] py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-16 animate-[marquee_30s_linear_infinite]">
          {Array(8).fill('✦ Mode · Genève ✦ Collections Exclusives ✦ Personal Shopping ✦ Retouches Atelier ✦ Livraison Jour Même').map((t, i) => (
            <span key={i} className="text-[#c4a35a]/40 text-[10px] tracking-[0.4em] uppercase">{t}</span>
          ))}
        </div>
      </div>

      {/* ── COLLECTIONS — grille de pièces ──────────────── */}
      <section id="collections" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          {/* En-tête */}
          <div ref={fadeCollections.ref} style={{opacity: fadeCollections.visible ? 1 : 0, transform: fadeCollections.visible ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease'}}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">Saison 2025</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Nos pièces</h2>
              </div>
              {/* Filtres */}
              <div className="flex gap-2 flex-wrap">
                {filtres.map(f => (
                  <button
                    key={f}
                    onClick={() => setFiltre(f)}
                    className={`text-xs tracking-widest uppercase px-5 py-2.5 border transition-all ${filtre === f ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'border-[#1a1a1a]/20 text-[#1a1a1a]/50 hover:border-[#1a1a1a]/50 hover:text-[#1a1a1a]'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grille de pièces */}
          <div ref={fadePieces.ref} style={{opacity: fadePieces.visible ? 1 : 0, transition: 'opacity 0.8s ease 0.15s'}}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {piecesFiltrees.map((p, i) => (
                <div key={p.nom} className="group cursor-pointer" style={{transitionDelay: `${i * 60}ms`}}>
                  <div className="relative overflow-hidden aspect-[3/4] mb-4">
                    <img
                      src={p.src}
                      alt={p.nom}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100">
                      <a href="#contact" className="block text-center bg-white text-[#1a1a1a] text-xs tracking-widest uppercase py-3 font-semibold hover:bg-[#c4a35a] hover:text-white transition-colors">
                        Nous contacter
                      </a>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-[#faf9f7] text-[#1a1a1a] text-[10px] tracking-widest uppercase px-2.5 py-1">{p.collection}</span>
                      {!p.dispo && <span className="bg-[#1a1a1a] text-white text-[10px] tracking-widest uppercase px-2.5 py-1">Épuisé</span>}
                    </div>
                  </div>
                  <p className="text-[10px] tracking-widest uppercase text-[#1a1a1a]/40 mb-1">{p.matiere}</p>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#1a1a1a] text-base">{p.nom}</h3>
                    <span className="text-[#c4a35a] font-semibold text-sm">{p.prix}</span>
                  </div>
                </div>
              ))}
            </div>
            {piecesFiltrees.length === 0 && (
              <p className="text-center text-[#1a1a1a]/30 py-20 text-sm tracking-widest uppercase">Aucune pièce pour cette collection</p>
            )}
          </div>
        </div>
      </section>

      {/* ── CHIFFRES ────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['12', 'ans à Genève'], ['3', 'collections/an'], ['200+', 'marques choisies'], ['1 200+', 'clientes fidèles']].map(([val, label]) => (
            <div key={label}>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{val}</div>
              <div className="text-[#c4a35a]/50 text-[10px] tracking-[0.3em] uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOOKBOOK ────────────────────────────────────── */}
      <section id="lookbook" className="py-28 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">Inspiration saison</p>
            <h2 className="text-4xl md:text-5xl font-bold">Lookbook 2025</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{gridAutoRows: '280px'}}>
            {lookbook.map((p, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group ${i === 0 ? 'row-span-2' : ''}`}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500 flex items-end p-5">
                  <span className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">{p.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — cartes cliquables ────────────────── */}
      <section id="services" className="py-28 bg-[#f0ede8]">
        <div ref={fadeServices.ref} style={{opacity: fadeServices.visible ? 1 : 0, transform: fadeServices.visible ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease'}} className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">L&apos;expérience Elara</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">Services exclusifs</h2>
            <p className="text-[#1a1a1a]/40 text-sm mt-4 tracking-wide">Cliquez sur un service pour en savoir plus</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveService(s)}
                className="group relative bg-white border border-[#1a1a1a]/8 p-8 text-left hover:border-[#c4a35a]/60 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Photo en fond au hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                  <img src={s.src} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-8 h-px bg-[#c4a35a] group-hover:w-16 transition-all duration-300" />
                    <span className="text-[10px] tracking-widest uppercase text-[#c4a35a] bg-[#c4a35a]/10 px-3 py-1">{s.tarif}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{s.titre}</h3>
                  <p className="text-[#1a1a1a]/50 text-sm leading-relaxed mb-6">{s.resume}</p>
                  <div className="flex items-center gap-2 text-[#1a1a1a]/30 group-hover:text-[#c4a35a] transition-colors">
                    <span className="text-xs tracking-widest uppercase">En savoir plus</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── À PROPOS ────────────────────────────────────── */}
      <section className="py-28 bg-[#1a1a1a] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-5">Notre histoire</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Née à Genève,<br />façonnée<br />par le monde
              </h2>
              <p className="text-white/50 leading-relaxed mb-5">
                Elara a ouvert ses portes en 2013 Rue du Rhône avec une conviction : chaque femme mérite une garde-robe qui lui ressemble. Pas un uniforme, pas une tendance — une expression.
              </p>
              <p className="text-white/50 leading-relaxed mb-10">
                Nous sélectionnons nos pièces lors de voyages à Paris, Milan, Copenhague et Tokyo. Seules les marques qui partagent nos valeurs d&apos;artisanat et de durabilité entrent dans nos collections.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[['Rue du Rhône', 'Adresse'], ['Mar–Sam', '10h–19h'], ['Sur RDV', 'Personal shopping']].map(([val, label]) => (
                  <div key={label}>
                    <div className="text-[#c4a35a] font-bold text-sm mb-1">{val}</div>
                    <div className="text-white/25 text-[10px] uppercase tracking-widest">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80" alt="Boutique Elara" className="w-full h-[600px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-[#c4a35a] text-[#1a1a1a] p-6 text-center">
                <div className="text-3xl font-bold">2013</div>
                <div className="text-[10px] font-bold uppercase tracking-widest mt-1">Fondée</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────── */}
      <section className="py-20 bg-[#f0ede8]">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">Cercle Elara</p>
          <h2 className="text-3xl font-bold mb-3">Accès en avant-première</h2>
          <p className="text-[#1a1a1a]/40 text-sm mb-8 leading-relaxed">Nouvelles collections, invitations privées et offres exclusives — avant tout le monde.</p>
          {newsletterSent ? (
            <p className="text-[#c4a35a] text-sm tracking-widest uppercase font-semibold">✦ Bienvenue dans le Cercle Elara ✦</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setNewsletterSent(true); }} className="flex">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required
                className="flex-1 px-5 py-4 bg-white border border-r-0 border-[#1a1a1a]/15 focus:outline-none focus:border-[#c4a35a] text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/25 transition-colors" />
              <button type="submit" className="bg-[#1a1a1a] hover:bg-[#c4a35a] text-white text-[10px] tracking-[0.3em] uppercase px-6 py-4 transition-colors shrink-0">
                Rejoindre
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────── */}
      <section id="contact" className="py-28 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#c4a35a] text-xs tracking-[0.4em] uppercase mb-3">Prenons rendez-vous</p>
            <h2 className="text-4xl md:text-5xl font-bold">Nous visiter</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              {sent ? (
                <div className="bg-[#f0ede8] p-12 text-center">
                  <p className="text-[#c4a35a] text-4xl mb-4">✦</p>
                  <h3 className="text-xl font-bold mb-2">Message reçu</h3>
                  <p className="text-[#1a1a1a]/40 text-sm">Notre équipe vous répondra dans les 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: 'nom', label: 'Nom', type: 'text', placeholder: 'Camille Dupont' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'camille@example.com' },
                    { id: 'telephone', label: 'Téléphone', type: 'tel', placeholder: '+41 79 000 00 00' },
                  ].map(f => (
                    <div key={f.id}>
                      <label className="block text-[10px] tracking-widest uppercase text-[#1a1a1a]/40 mb-2">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required
                        className="w-full px-0 py-3 border-0 border-b border-[#1a1a1a]/15 focus:border-[#c4a35a] focus:outline-none bg-transparent text-[#1a1a1a] placeholder-[#1a1a1a]/20 transition-colors" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#1a1a1a]/40 mb-2">Je souhaite</label>
                    <select className="w-full px-0 py-3 border-0 border-b border-[#1a1a1a]/15 focus:border-[#c4a35a] focus:outline-none bg-transparent text-[#1a1a1a]/60 transition-colors text-sm">
                      <option>Visiter la boutique</option>
                      <option>Séance personal shopping</option>
                      <option>Retouche / ajustement</option>
                      <option>Renseignement collection</option>
                      <option>Rejoindre le Cercle Elara</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest uppercase text-[#1a1a1a]/40 mb-2">Message</label>
                    <textarea rows={3} placeholder="Votre message..."
                      className="w-full px-0 py-3 border-0 border-b border-[#1a1a1a]/15 focus:border-[#c4a35a] focus:outline-none bg-transparent text-[#1a1a1a] placeholder-[#1a1a1a]/20 transition-colors resize-none text-sm" />
                  </div>
                  <div className="pt-4">
                    <button type="submit" disabled={loading}
                      className="w-full bg-[#1a1a1a] hover:bg-[#c4a35a] disabled:opacity-50 text-white text-[10px] tracking-[0.35em] uppercase py-5 transition-colors">
                      {loading ? 'Envoi...' : 'Envoyer le message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  { label: 'Adresse', val: 'Rue du Rhône 48\n1204 Genève' },
                  { label: 'Téléphone', val: '+41 22 789 01 23' },
                  { label: 'Email', val: 'bonjour@elara-geneve.ch' },
                  { label: 'Horaires', val: 'Mar–Ven : 10h–19h\nSam : 10h–18h\nDim–Lun : Fermé' },
                ].map(({ label, val }) => (
                  <div key={label} className="flex gap-8 border-b border-[#1a1a1a]/8 pb-6">
                    <span className="text-[10px] tracking-widest uppercase text-[#c4a35a] w-24 shrink-0 pt-0.5">{label}</span>
                    <span className="text-[#1a1a1a]/50 text-sm leading-relaxed whitespace-pre-line">{val}</span>
                  </div>
                ))}
              </div>
              <div className="overflow-hidden h-52">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.5!2d6.1559!3d46.2024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c64b30c5b5555%3A0x1!2sRue+du+Rh%C3%B4ne%2C+Gen%C3%A8ve!5e0!3m2!1sfr!2sch!4v1"
                  className="w-full h-full border-0" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="bg-[#1a1a1a] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-bold tracking-[0.2em] uppercase">Elara</span>
            <span className="text-[#c4a35a] text-xs tracking-widest uppercase ml-3">Genève</span>
          </div>
          <p className="text-white/20 text-xs tracking-wider text-center">© 2025 Elara · Rue du Rhône 48, Genève</p>
          <p className="text-white/20 text-xs">
            Site par <a href="https://atelierdigitalgeneve.ch" className="text-[#c4a35a]/60 hover:text-[#c4a35a] transition-colors">Atelier Digital Genève</a>
          </p>
        </div>
      </footer>

    </div>
  );
}
