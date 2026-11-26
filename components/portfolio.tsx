"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Github,
  Menu,
  Moon,
  MousePointer2,
  Send,
  Sparkles,
  Sun,
  X
} from "lucide-react";
import HeroScene from "@/components/hero-scene";
import ProjectVisual from "@/components/project-visual";
import { navigation, siteConfig } from "@/lib/site-config";
import {
  products,
  projectFilters,
  projects,
  services,
  technologies,
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
              {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noreferrer">Live demo <ExternalLink size={14} /></a>}
              {item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noreferrer">Source code <Github size={14} /></a>}
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
  const [activeTech, setActiveTech] = useState("React");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [formValues, setFormValues] = useState({ name: "", email: "", projectType: "Website development", message: "", website: "" });

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

  const updateField = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    if (formState !== "idle") {
      setFormState("idle");
      setFormMessage("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState === "loading") return;
    setFormMessage("");

    // GitHub Pages is static and cannot run the Next.js contact API route.
    // If an email address is added later, open a pre-filled email draft instead.
    if (!siteConfig.email) {
      setFormState("error");
      setFormMessage("The contact form is not connected in this GitHub Pages preview yet. Please use the GitHub link to get in touch.");
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry: ${formValues.projectType || "New project"}`);
    const body = encodeURIComponent(
      `Name: ${formValues.name}\nEmail: ${formValues.email}\nProject type: ${formValues.projectType}\n\nMessage:\n${formValues.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setFormState("success");
    setFormMessage("Your email app should open with your message. Press Send there to complete delivery.");
  };

  return (
    <main>
      <div className="loading-veil" aria-hidden="true"><span className="loading-mark">a<span>.</span></span><div className="loading-track"><i /></div></div>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      <CursorFollower />

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <a href="#home" className="brand-mark" aria-label={`${siteConfig.name} home`}>
            <span className="brand-symbol">a<span>.</span></span>
            <span className="brand-name">{siteConfig.shortName}<small>INDEPENDENT DIGITAL STUDIO</small></span>
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
              <p className="hero-description">I design and build websites, interactive applications, and innovative products that solve real problems.</p>
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
          <div className="hero-side-note">DESIGN / DEVELOP / EXPLORE</div>
        </div>
        <a href="#work" className="scroll-cue" aria-label="Scroll to selected work"><span>SCROLL</span><ArrowDown size={14} /></a>
        <div className="hero-bottom-rule page-shell"><span>BASED IN THE DIGITAL WORLD</span><span>BUILDING WITH INTENTION ↘</span></div>
      </section>

      <section className="intro-strip" aria-label="Creative approach">
        <div className="page-shell intro-strip-inner">
          <span>THOUGHTFUL BY DESIGN</span><i />
          <span>BUILT TO BE USEFUL</span><i />
          <span>ALWAYS IN PROGRESS</span><i />
          <span>MADE TO MOVE IDEAS FORWARD</span>
        </div>
      </section>

      <section className="work-section section-pad" id="work">
        <div className="page-shell">
          <Reveal className="section-heading-row">
            <div><div className="section-kicker"><span>01 / SELECTED WORK</span><span>2025 — {new Date().getFullYear()}</span></div><h2>Selected <em>work.</em></h2></div>
            <p>A collection of websites, experiments, and product ideas — each one a chance to make something clearer, more useful, or more interesting.</p>
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
            <p>Not every idea starts as software. I like exploring the full journey — from the first sketch and interaction to a prototype that can be tested in the real world.</p>
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
            <Reveal delay={0.08}><p className="about-lede">I'm {siteConfig.name}, a developer and product builder interested in the space between technology, design, and useful ideas.</p><p className="about-copy">I enjoy turning open-ended problems into clear digital experiences — whether that's a business website, an interactive tool, or an early-stage product concept. I care about how something works, how it feels, and whether it genuinely helps someone.</p></Reveal>
            <Reveal delay={0.14} className="about-principles"><div><span>01</span><strong>Start with the problem.</strong></div><div><span>02</span><strong>Make the experience feel effortless.</strong></div><div><span>03</span><strong>Build, learn, and improve.</strong></div></Reveal>
          </div>
          <Reveal className="about-aside" delay={0.12}>
            <div className="profile-orbit"><div className="profile-initial">A<span>.</span></div><div className="profile-ring ring-a" /><div className="profile-ring ring-b" /><span className="profile-orbit-label">IDEAS IN MOTION</span></div>
            <div className="about-aside-meta"><span>BASED IN</span><strong>{siteConfig.location}</strong><span>FOCUS</span><strong>Software · Products · Experiences</strong></div>
          </Reveal>
        </div>
        <div className="page-shell tech-panel-wrap">
          <Reveal className="tech-panel">
            <div className="tech-panel-heading"><div className="section-kicker"><span>THE TOOLBOX</span><span>ALWAYS EVOLVING</span></div><h3>Tools are only as good<br />as the ideas behind them.</h3><p>A living toolkit — not a list of skill ratings.</p></div>
            <div className="tech-visual"><div className="tech-orbit"><div className="tech-center"><Code2 size={24} /><span>BUILD</span></div>{technologies.map((tech, index) => <button key={tech} className={`tech-node tech-node-${index + 1}${activeTech === tech ? " is-active" : ""}`} onClick={() => setActiveTech(tech)} aria-pressed={activeTech === tech}>{tech}</button>)}</div><div className="tech-selected"><span>SELECTED TOOL</span><strong>{activeTech}</strong><span>Explore · Combine · Create</span></div></div>
          </Reveal>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="page-shell">
          <Reveal className="section-heading-row"><div><div className="section-kicker"><span>04 / WHAT I CAN HELP WITH</span><span>IDEA → EXPERIENCE</span></div><h2>Good work starts<br />with a <em>conversation.</em></h2></div><p>From a focused landing page to an early product prototype, the goal is always the same: solve the right problem with care and clarity.</p></Reveal>
          <div className="services-list">
            {services.map((service, index) => (
              <Reveal key={service.number} delay={index * 0.025}>
                <a href="#contact" className="service-row"><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><span className="service-arrow"><ArrowUpRight size={20} /></span></a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="page-shell">
          <Reveal className="contact-heading"><div className="section-kicker"><span>05 / START SOMETHING</span><span>{siteConfig.availability.toUpperCase()}</span></div><h2>Have an idea?<br /><em>Let's build</em> something<span className="headline-period">.</span></h2><p>Tell me what you're thinking. A rough idea is more than enough to start a good conversation.</p></Reveal>
          <div className="contact-layout">
            <Reveal className="contact-details">
              <div className="contact-detail-block"><span className="detail-label">PREFER EMAIL?</span>{siteConfig.email ? <a href={`mailto:${siteConfig.email}`} className="contact-email">{siteConfig.email}<ArrowUpRight size={16} /></a> : <span className="contact-email placeholder-email">Email address will be added soon</span>}</div>
              <div className="contact-detail-block"><span className="detail-label">FIND ME ELSEWHERE</span><div className="social-links"><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>{siteConfig.linkedin && <a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a>}{siteConfig.instagram && <a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a>}</div></div>
              <div className="contact-aside-note"><MousePointer2 size={17} /><span>Good projects start with a clear problem, a curious mind, and an open conversation.</span></div>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.08}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row"><label>Your name<input name="name" type="text" placeholder="How should I call you?" autoComplete="name" required minLength={2} maxLength={80} value={formValues.name} onChange={(event) => updateField("name", event.target.value)} /></label><label>Your email<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={160} value={formValues.email} onChange={(event) => updateField("email", event.target.value)} /></label></div>
                <label>What are you thinking about?<select name="projectType" value={formValues.projectType} onChange={(event) => updateField("projectType", event.target.value)}><option>Website development</option><option>Web application</option><option>UI / UX design</option><option>Product prototype</option><option>Custom software</option><option>Something else</option></select></label>
                <label>Your message<textarea name="message" placeholder="A little context about your idea, goals, or the problem you're trying to solve..." required minLength={10} maxLength={4000} rows={5} value={formValues.message} onChange={(event) => updateField("message", event.target.value)} /></label>
                <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={formValues.website} onChange={(event) => updateField("website", event.target.value)} /></label>
                <div className="form-bottom"><span>Usually reply within 1–2 business days.</span><button className="button button-primary form-submit" type="submit" disabled={formState === "loading"}>{formState === "loading" ? "Sending..." : "Send message"}{formState === "loading" ? <span className="button-spinner" /> : <Send size={15} />}</button></div>
                <AnimatePresence mode="wait">{formMessage && <motion.p key={formState} className={`form-feedback ${formState}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">{formState === "success" ? <CheckCircle2 size={16} /> : <span>!</span>}{formMessage}</motion.p>}</AnimatePresence>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-top"><a href="#home" className="brand-mark"><span className="brand-symbol">a<span>.</span></span><span className="brand-name">{siteConfig.shortName}<small>INDEPENDENT DIGITAL STUDIO</small></span></a><span className="footer-signoff">MADE WITH CURIOSITY, NOT A TEMPLATE.</span><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={14} /></a></div>
        <div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. ALL RIGHTS RESERVED.</span><span>DESIGN / CODE / PRODUCT</span><span>BUILT TO KEEP EVOLVING ↗</span></div>
      </footer>

      <AnimatePresence>{selectedItem && <DetailModal item={selectedItem} onClose={closeModal} />}</AnimatePresence>
    </main>
  );
}
