"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X
} from "lucide-react";
import HeroScene from "@/components/hero-scene";
import ProjectVisual from "@/components/project-visual";
import ContactForm, { hasContactForm } from "@/components/contact-form";
import BasketballQuiz from "@/components/basketball-quiz";
import { familiarTechnologies, navigation, siteConfig } from "@/lib/site-config";
import {
  products,
  projectFilters,
  projects,
  collaborationTopics,
  type PortfolioItem
} from "@/lib/projects";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduced ? 0 : 0.72, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({
  href,
  children,
  className = "",
  onClick,
  external = false
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const handleMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    event.currentTarget.style.transform = `translate(${x * 0.1}px, ${y * 0.12}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`magnetic-link ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let x = 0;
    let y = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      dotRef.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
      const target = event.target as HTMLElement | null;
      const interactive = Boolean(target?.closest("a, button, input, textarea, select, [role='button']"));
      ringRef.current?.classList.toggle("is-hovering", interactive);
    };

    const animate = () => {
      ringX += (x - ringX) * 0.18;
      ringY += (y - ringY) * 0.18;
      ringRef.current?.style.setProperty("transform", `translate3d(${ringX}px, ${ringY}px, 0)`);
      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

function DetailModal({
  item,
  onClose
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const getFocusable = () => dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) ?? [];
    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab") {
        const focusable = Array.from(getFocusable());
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <motion.section
        ref={dialogRef}
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        initial={{ opacity: 0, y: 30, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.985 }}
        transition={{ duration: 0.42, ease }}
      >
        <button className="modal-close icon-button" onClick={onClose} aria-label="Close details">
          <X size={18} />
        </button>
        <div className="modal-visual"><ProjectVisual visual={item.visual} /></div>
        <div className="modal-content">
          <div className="section-kicker"><span>{item.number} / CASE FILE</span><span>{item.status}</span></div>
          <h2 id="detail-title">{item.title}<span>.</span></h2>
          <p className="modal-lede">{item.description}</p>
          {item.id === "nba-knowledge-game" && <BasketballQuiz />}
          <div className="modal-detail-grid">
            <div><span className="detail-label">OVERVIEW</span><p>{item.details.overview}</p></div>
            <div><span className="detail-label">DESIGN APPROACH</span><p>{item.details.approach}</p></div>
          </div>
          <div className="modal-detail-grid lower">
            <div>
              <span className="detail-label">CURRENT SCOPE</span>
              <ul>{item.details.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </div>
            <div>
              <span className="detail-label">WHAT'S NEXT</span>
              <ul>{item.details.nextSteps.map((step) => <li key={step}>{step}</li>)}</ul>
            </div>
          </div>
          <div className="modal-footer">
            <div className="tag-list">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="modal-links">
              {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noreferrer">Visit website <ExternalLink size={14} /></a>}
              {item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noreferrer">Project repository <Github size={14} /></a>}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default function Portfolio() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All Projects");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const filteredProjects = useMemo(() => {
    if (filter === "All Projects") return projects;
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("arian-portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("arian-portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 32);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const closeModal = useCallback(() => setSelectedItem(null), []);

  return (
    <main>
      <div className="loading-veil" aria-hidden="true"><span className="loading-mark">a<span>.</span></span><div className="loading-track"><i /></div></div>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      <CursorFollower />

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <a href="#home" className="brand-mark" aria-label={`${siteConfig.name} home`}>
            <span className="brand-symbol">a<span>.</span></span>
            <span className="brand-name">{siteConfig.shortName}<small>ENGINEERING / PRODUCTS</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>{item.label}</a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle icon-button"
              onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#contact" className="header-cta">Let's talk <ArrowUpRight size={14} /></a>
            <button className="mobile-menu-button icon-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mobile-menu-top"><span>MENU / NAVIGATION</span><button className="icon-button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <motion.a
                  href={item.href}
                  key={item.href}
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.045 }}
                  onClick={() => setMenuOpen(false)}
                ><span>0{index + 1}</span>{item.label}<ArrowUpRight size={20} /></motion.a>
              ))}
            </nav>
            <div className="mobile-menu-bottom"><span>{siteConfig.availability}</span><span>© {new Date().getFullYear()}</span></div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero-section" id="home">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-content page-shell">
          <div className="hero-copy">
            <Reveal>
              <div className="eyebrow"><span className="status-pulse" /> {siteConfig.role}</div>
              <h1>Ideas into<br /><span className="headline-outline">digital</span> experiences<span className="headline-period">.</span></h1>
              <p className="hero-description">I'm {siteConfig.name}, a Civil Engineering student at {siteConfig.education.institution} in Iran. I'm interested in digital products, new business ideas, and how good design makes everyday tasks easier.</p>
              <div className="hero-actions">
                <MagneticLink href="#work" className="button button-primary">Explore my work <ArrowUpRight size={16} /></MagneticLink>
                <MagneticLink href="#contact" className="button button-quiet">Let's work together <ArrowRight size={15} /></MagneticLink>
              </div>
              <div className="hero-footnote"><span>SCROLL TO EXPLORE</span><span className="footnote-line" /><span>01 — 06</span></div>
            </Reveal>
          </div>
          <div className="hero-art-wrap">
            <HeroScene />
            <div className="hero-art-index"><span>INTERACTIVE FORM STUDY</span><strong>001</strong></div>
          </div>
        </div>
        <a href="#work" className="scroll-cue" aria-label="Scroll to selected work"><span>SCROLL</span><ArrowDown size={14} /></a>
        <div className="hero-bottom-rule page-shell"><span>BASED IN THE DIGITAL WORLD</span><span>BUILDING WITH INTENTION ↘</span></div>
      </section>

      <section className="intro-strip" aria-label="Creative approach">
        <div className="page-shell intro-strip-inner">
          <span>ENGINEERING MINDSET</span><i />
          <span>DIGITAL PRODUCTS</span><i />
          <span>BASKETBALL LOVER</span><i />
          <span>ALWAYS IN PROGRESS</span>
        </div>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="page-shell">
          <Reveal className="section-heading-row">
            <div><div className="section-kicker"><span>01 / SELECTED WORK</span><span>2025 — {new Date().getFullYear()}</span></div><h2>Selected <em>work.</em></h2></div>
            <p>Websites, product ideas, and civil engineering research I’m working on.</p>
          </Reveal>
          <div className="project-toolbar">
            <div className="filter-list" role="group" aria-label="Filter projects">
              {projectFilters.map((item) => (
                <button key={item} className={filter === item ? "filter-button is-active" : "filter-button"} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>
              ))}
            </div>
            <span className="project-count">{String(filteredProjects.length).padStart(2, "0")} PROJECTS</span>
          </div>
          <motion.div layout className="project-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.length === 0 ? (
                <motion.div className="empty-projects" key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <span>NO PUBLIC PROJECT IN THIS CATEGORY — YET</span>
                  <p>New work is taking shape. If you have a problem worth solving, let's talk.</p>
                  <a href="#contact">Start a conversation <ArrowUpRight size={14} /></a>
                </motion.div>
              ) : filteredProjects.map((project, index) => (
                <motion.button
                  layout
                  key={project.id}
                  className={`project-card${project.featured ? " project-featured" : ""}`}
                  onClick={() => setSelectedItem(project)}
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: reduced ? 0 : 0.42, delay: index * 0.035, ease }}
                  whileHover={reduced ? undefined : { y: -5 }}
                  onPointerMove={(event) => {
                    if (reduced || event.pointerType !== "mouse") return;
                    const bounds = event.currentTarget.getBoundingClientRect();
                    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                    const preview = event.currentTarget.querySelector(".project-preview-wrap") as HTMLElement | null;
                    if (preview) preview.style.transform = `perspective(1100px) rotateX(${-y * 3.2}deg) rotateY(${x * 4.2}deg)`;
                  }}
                  onPointerLeave={(event) => {
                    const preview = event.currentTarget.querySelector(".project-preview-wrap") as HTMLElement | null;
                    if (preview) preview.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
                  }}
                >
                  <div className="project-preview-wrap"><ProjectVisual visual={project.visual} /><span className="project-open"><ArrowUpRight size={19} /></span><span className="project-number">{project.number} / {project.year}</span></div>
                  <div className="project-card-info">
                    <div><span className="project-category">{project.category} <i>·</i> {project.status}</span><h3>{project.title}</h3><p>{project.description}</p><span className="project-view-label">View project details <ArrowUpRight size={13} /></span></div>
                    <span className="project-arrow"><ArrowUpRight size={19} /></span>
                  </div>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
          <div className="work-footnote"><span>MORE IDEAS ARE TAKING SHAPE</span><span>OPEN A PROJECT TO EXPLORE THE DETAILS <ArrowUpRight size={13} /></span></div>
        </div>
      </section>

      <section className="products-section section-pad" id="products">
        <div className="page-shell">
          <Reveal className="section-heading-row products-heading">
            <div><div className="section-kicker"><span>02 / PRODUCT THINKING</span><span>CONCEPTS & EXPERIMENTS</span></div><h2>From thought<br />to <em>thing.</em></h2></div>
            <p>A hydration bottle concept and a basketball quiz you can try.</p>
          </Reveal>
          <div className="product-feature-grid">
            {products.map((product, index) => (
              <Reveal key={product.id} className={`product-feature product-feature-${index + 1}`} delay={index * 0.1}>
                <button className="product-feature-visual" onClick={() => setSelectedItem(product)} aria-label={`View ${product.title} details`}>
                  <ProjectVisual visual={product.visual} />
                  <span className="product-visual-open">EXPLORE CONCEPT <ArrowUpRight size={14} /></span>
                </button>
                <div className="product-feature-info">
                  <div className="section-kicker"><span>PRODUCT 0{index + 1}</span><span>{product.status}</span></div>
                  <h3>{product.title}<span>.</span></h3>
                  <p>{product.description}</p>
                  <div className="product-feature-bottom"><div className="tag-list">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="text-link" onClick={() => setSelectedItem(product)}>View product brief <ArrowUpRight size={15} /></button></div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="product-note"><Sparkles size={16} /><span>Concepts are shown honestly: prototypes, explorations, and future directions are clearly labelled.</span></div>
        </div>
      </section>

      <section className="about-section section-pad" id="about">
        <div className="page-shell about-layout">
          <div className="about-main">
            <Reveal><div className="section-kicker"><span>03 / A LITTLE ABOUT ME</span><span>THE PERSON BEHIND THE PIXELS</span></div><h2>Curious by nature.<br /><em>Builder</em> by choice.</h2></Reveal>
            <Reveal delay={0.08}><p className="about-lede">Studying civil engineering has made me curious about how cities work. My current research looks at everyday traffic violations and water waste in Tehran.</p><p className="about-copy">I'm interested in AI, financial markets, and what it takes to turn a product idea into a business. Outside of work, I love basketball for its pace, strategy, and teamwork.</p></Reveal>
            <Reveal delay={0.14} className="about-principles"><div><span>01</span><strong>Start with the problem.</strong></div><div><span>02</span><strong>Make the experience feel effortless.</strong></div><div><span>03</span><strong>Build, learn, and improve.</strong></div></Reveal>
          </div>
          <Reveal className="about-aside" delay={0.12}>
            <div className="profile-orbit"><div className="profile-initial">A<span>.</span></div><div className="profile-ring ring-a" /><div className="profile-ring ring-b" /><span className="profile-orbit-label">IDEAS IN MOTION</span></div>
            <div className="about-aside-meta"><span>STUDYING</span><strong>{siteConfig.education.program} · {siteConfig.education.shortInstitution}</strong><span>INTERESTS</span><strong>Basketball · Technology · Markets</strong></div>
          </Reveal>
        </div>
        <div className="page-shell about-personal-grid">
          <Reveal className="personal-card education-card">
            <div className="personal-card-top"><span>01 / EDUCATION</span><span>{siteConfig.education.shortInstitution}</span></div>
            <div className="education-card-main">
              <div className="education-seal">AUT<span>↗</span></div>
              <div className="personal-card-body"><span>UNDERGRADUATE STUDENT</span><h3>{siteConfig.education.program}</h3><p>{siteConfig.education.institution}</p></div>
            </div>
            <p className="ranking-callout">{siteConfig.education.nationalRank}</p>
          </Reveal>
          <Reveal className="personal-card basketball-card" delay={0.07}>
            <div className="personal-card-top"><span>02 / OFF THE SCREEN</span><span>PERSONAL INTEREST</span></div>
            <div className="basketball-art" aria-hidden="true"><div className="basketball-court" /><div className="basketball-ball"><i /><b /></div></div>
            <div className="personal-card-body"><span>THE GAME I LOVE</span><h3>Basketball lover.</h3><p>Big on the game's energy, strategy, teamwork, and the details that make every possession matter.</p></div>
          </Reveal>
          <Reveal className="personal-card research-card" delay={0.14}>
            <div className="personal-card-top"><span>03 / CURRENT RESEARCH</span><span>IN PROGRESS</span></div>
            <div className="research-art" aria-hidden="true">
              <div className="research-art-grid" />
              <svg viewBox="0 0 320 120" role="presentation" focusable="false"><path d="M4 94 C28 88 36 52 58 64 S88 104 111 75 S143 31 165 48 S196 91 218 54 S258 15 278 35 S300 45 316 12" /><path className="research-path-muted" d="M4 106 C35 100 42 88 68 91 S103 66 128 77 S163 89 188 69 S220 83 244 62 S285 66 316 49" /></svg>
              <span>MODEL / 001</span>
            </div>
            <section className="personal-card-body" id="trading-formula" aria-labelledby="trading-heading">
              <h3 id="trading-heading">Trading formula.</h3>
              <p>I'm developing a mathematical formula to study market behavior and structure trading decisions. I'm defining its inputs and how to test it on historical data.</p>
              <button className="text-link" type="button" onClick={() => setSelectedItem(projects.find((project) => project.id === "trading-formula") ?? null)}>
                View the research <ArrowUpRight size={13} />
              </button>
            </section>
          </Reveal>
        </div>
        <section className="page-shell familiarity-wrap" aria-labelledby="familiarity-heading">
          <Reveal className="familiarity-panel">
            <h3 id="familiarity-heading">Technologies I’m familiar with</h3>
            <ul className="familiarity-list">
              {familiarTechnologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            <p className="familiarity-ai"><strong>AI is one of my strongest tools.</strong> I use it to explore ideas, organize research, and move projects forward.</p>
          </Reveal>
        </section>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="page-shell">
          <Reveal className="section-heading-row"><div><h2>Let’s <em>collaborate.</em></h2></div><p>I’m open to talking through ideas for products, storefronts, and early prototypes.</p></Reveal>
          <div className="services-list">
            {collaborationTopics.map((service, index) => (
              <Reveal key={service.number} delay={index * 0.025}>
                <a href="#contact" className="service-row"><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><span className="service-arrow"><ArrowUpRight size={20} /></span></a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="page-shell">
          <Reveal className="contact-heading"><div className="section-kicker"><span>05 / START SOMETHING</span><span>{siteConfig.availability.toUpperCase()}</span></div><h2>Have an idea?<br /><em>Let's build</em> something<span className="headline-period">.</span></h2><p>Tell me what you're building or what problem you'd like to solve.</p></Reveal>
          <div className="contact-layout">
            <Reveal className="contact-details">
              {siteConfig.email && <div className="contact-detail-block"><span className="detail-label">EMAIL</span><a href={`mailto:${siteConfig.email}`} className="contact-email">{siteConfig.email}<ArrowUpRight size={16} /></a></div>}
              <div className="contact-detail-block"><span className="detail-label">FIND ME ELSEWHERE</span><div className="social-links"><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>{siteConfig.linkedin && <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>}{hasContactForm && <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram {siteConfig.instagramHandle} <ArrowUpRight size={14} /></a>}</div></div>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.08}>
              {hasContactForm ? <ContactForm /> : (
                <div className="contact-direct">
                  <span className="detail-label">{siteConfig.instagramHandle}</span>
                  <MagneticLink href={siteConfig.instagram} className="button button-primary" external>
                    Reach out on Instagram <ArrowUpRight size={16} />
                  </MagneticLink>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-top"><a href="#home" className="brand-mark"><span className="brand-symbol">a<span>.</span></span><span className="brand-name">{siteConfig.shortName}<small>ENGINEERING / PRODUCTS</small></span></a><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a></div>
        <div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span></div>
      </footer>

      <AnimatePresence>{selectedItem && <DetailModal item={selectedItem} onClose={closeModal} />}</AnimatePresence>
    </main>
  );
}
