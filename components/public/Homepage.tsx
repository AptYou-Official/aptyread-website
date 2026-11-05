"use client";

/* eslint-disable @next/next/no-img-element -- Preserve the approved app screenshots and store badge assets. */

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import Link from "next/link";
import PlayStoreLink from "@/components/public/PlayStoreLink";
import SiteFooter from "@/components/public/SiteFooter";
import "./homepage.css";

const asset = (filename: string) => `/homepage/${filename}`;

// Use the same candidate in the hero and the learning panel so a parent only downloads it once.
function screenPreview(filename: string) {
  if (filename !== "app-words.webp" && filename !== "app-first-story.webp") {
    return { src: asset(filename) };
  }
  const base = asset(filename).replace(/\.webp$/, "");
  return {
    src: `${base}-360.webp`,
    srcSet: [240, 360, 480, 660].map((width) => `${base}-${width}.webp ${width}w`).join(", "),
    sizes: "(max-width: 580px) 170px, (max-width: 800px) 183px, (max-width: 1100px) 192px, (min-width: 1450px) 216px, 201px",
  };
}

const learningSteps = [
  {
    id: "build",
    title: "Build a word.",
    description:
      "Meet s, a, and t. Choose letters, join the sounds, and have a turn reading at and sat.",
    screen: "app-words.webp",
    label: "Inside Lesson 1",
    alt: "Children build and blend sat in Lesson 1",
  },
  {
    id: "story",
    title: "Bring a story to life.",
    description:
      "Words become little stories. Explore what happens and connect the words to their meaning.",
    screen: "app-first-story.webp",
    label: "Your first story · Lesson 9",
    alt: "Pat sat, a page from the Pat and Pip story",
  },
  {
    id: "library",
    title: "Come back to favourites.",
    description:
      "Keep collected words and earned books in My library. Read again, whenever your child wants to practise.",
    screen: "app-library.webp",
    label: "A growing collection · My library",
    alt: "My library holds collected sounds, words and books",
  },
];

const levels = [
  {
    title: "Sounds into first words",
    subtitle: "Letters, words, and first stories",
    description:
      "Connect sounds and letters. Build words and discover their meanings through activities and little stories.",
    status: "Level 1 · Begin here",
    letters: ["s", "a", "t"],
  },
  {
    title: "First reading with meaning",
    subtitle: "More words. Connected ideas.",
    description:
      "Build more words, read sentences and short books, and explore how words work together to express an idea.",
    status: "Level 2 · Continue your journey",
    letters: ["c", "a", "t"],
  },
  {
    title: "Letter teams and longer words",
    subtitle: "Blend sounds. Explore word endings.",
    description:
      "Explore letters that work together, longer words, and richer story events. Connect actions with their results.",
    status: "Level 3 · Sounds and word endings",
    letters: ["sh", "ch", "th"],
  },
  {
    title: "Vowel patterns and longer reading",
    subtitle: "Read longer stories. Follow their meaning.",
    description:
      "Discover more spelling patterns and practise longer reading. Follow ideas, notice feelings, and find details.",
    status: "Level 4 · Stories and understanding",
    letters: ["ai", "ee", "oa"],
  },
  {
    title: "Independent reading and vocabulary",
    subtitle: "Explore new books. Connect their ideas.",
    description:
      "Bring reading and understanding together in suitable new books. Explain ideas and explore what to read next.",
    status: "Level 5 · Books, vocabulary and meaning",
    letters: ["read", "think", "grow"],
  },
];

const languages = [
  { code: "en", label: "English", name: "English" },
  { code: "ml", label: "മലയാളം", name: "Malayalam" },
  { code: "hi", label: "हिन्दी", name: "Hindi" },
];

const writingOptions = [
  {
    id: "paper",
    label: "Paper & pencil",
    alt: "AptyRead demonstrates writing the letter B on paper",
  },
  {
    id: "trace",
    label: "Trace on screen",
    alt: "A guided letter-tracing activity on screen",
  },
];

const questions = [
  {
    question: "Which lessons are free?",
    answer:
      "Lessons 1 to 4 need no account. A free parent account lets you continue through Lesson 9, including the first story, Pat and Pip. Continuing from Lesson 10 requires a Level 1 purchase in the app.",
  },
  {
    question: "My child knows letters. Is this a good place to start?",
    answer:
      "Yes. The first lesson helps children use letter sounds to build and read words. Every child begins at Lesson 1 and follows the sequence, with opportunities to revisit and practise.",
  },
  {
    question: "How much help will my child need?",
    answer:
      "Stay nearby for younger children and help them get comfortable with the activities. Older children can try more independently when ready. Guidance within activities explains how you can help in English, Malayalam, and Hindi.",
  },
  {
    question: "How do we continue after the free lessons?",
    answer:
      "Purchase Level 1 within the app through Google Play or the App Store. You’ll see your local price before buying. Each level is a one-time purchase with no expiry or recurring subscription. When one reader completes a level, you can buy the next available level. Each reader completes their own previous level before starting the next.",
  },
  {
    question: "What does the progress information show?",
    answer:
      "It shows your child’s place in the course and completed activities. AptyRead gives children opportunities to practise aloud, but it does not assess spoken pronunciation or reading fluency.",
  },
  {
    question: "Can we repeat lessons and stories?",
    answer:
      "Yes. Reopen completed lessons for more practice. Collected words and earned books stay in My library to enjoy again. An internet connection is needed for media that has not already loaded.",
  },
];

type EnlargedImage = {
  filename: string;
  title: string;
  alt: string;
  width: number;
  height: number;
};

type ScreenButtonProps = EnlargedImage & {
  className?: string;
  imageId: string;
  label: string;
  onEnlarge: (image: EnlargedImage, trigger: HTMLButtonElement) => void;
};

function ArrowIcon({ direction = "up-right" }: { direction?: "up-right" | "right" }) {
  return (
    <svg
      className="arrow-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={direction === "right" ? "M5 12h14m-6-6 6 6-6 6" : "M6 18 18 6M6 6h12v12"} />
    </svg>
  );
}

function ScreenButton({
  filename,
  title,
  alt,
  width,
  height,
  className = "",
  imageId,
  label,
  onEnlarge,
}: ScreenButtonProps) {
  return (
    <button
      type="button"
      className={`screen-button ${className}`.trim()}
      aria-label={label}
      aria-haspopup="dialog"
      onClick={(event) =>
        onEnlarge({ filename, title, alt, width, height }, event.currentTarget)
      }
    >
      <img
        id={imageId}
        {...screenPreview(filename)}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
      />
      <span className="enlarge-icon" aria-hidden="true"><ArrowIcon /></span>
    </button>
  );
}

function Wordmark() {
  return (
    <Link className="wordmark" href="/" prefetch={false} aria-label="AptyRead home">
      <span>Apty</span><span>Read</span>
    </Link>
  );
}

function handleTabKey(
  event: KeyboardEvent<HTMLDivElement>,
  select: (index: number) => void,
) {
  const tabs = Array.from(
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
  );
  const current = tabs.indexOf(event.target as HTMLButtonElement);
  if (current < 0) return;

  let next: number;
  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      next = (current + 1) % tabs.length;
      break;
    case "ArrowLeft":
    case "ArrowUp":
      next = (current - 1 + tabs.length) % tabs.length;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
      next = tabs.length - 1;
      break;
    default:
      return;
  }
  event.preventDefault();
  select(next);
  tabs[next].focus();
}

export default function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [learningIndex, setLearningIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [languageIndex, setLanguageIndex] = useState(0);
  const [writingIndex, setWritingIndex] = useState(0);
  const [enlargedImage, setEnlargedImage] = useState<EnlargedImage | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const imageTriggerRef = useRef<HTMLButtonElement | null>(null);
  const step = learningSteps[learningIndex];
  const level = levels[levelIndex];
  const language = languages[languageIndex];
  const writing = writingOptions[writingIndex];

  useEffect(() => {
    if (enlargedImage && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      dialogCloseRef.current?.focus();
    }
  }, [enlargedImage]);

  function openImage(image: EnlargedImage, trigger: HTMLButtonElement) {
    imageTriggerRef.current = trigger;
    setEnlargedImage(image);
  }

  function closeImage() {
    dialogRef.current?.close();
  }

  function restoreImageFocus() {
    setEnlargedImage(null);
    imageTriggerRef.current?.focus();
    imageTriggerRef.current = null;
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const rect = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom
    ) {
      closeImage();
    }
  }

  return (
    <div className="apty-homepage">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-wrap">
          <Wordmark />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#learning-journey">Our learning journey</a>
            <a href="#for-parents">For parents</a>
          </nav>
          <PlayStoreLink platform="auto" className="button button-small header-cta" href="#get-the-app">Start learning free</PlayStoreLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            onKeyDown={(event) => {
              if (event.key === "Escape") setMenuOpen(false);
            }}
          >
            <span /><span />
          </button>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setMenuOpen(false);
              menuButtonRef.current?.focus();
            }
          }}
        >
          <a href="#how-it-works">How it works</a>
          <a href="#learning-journey">Our learning journey</a>
          <a href="#for-parents">For parents</a>
          <a href="#questions">Questions</a>
          <PlayStoreLink platform="auto" className="mobile-start" href="#get-the-app">Start learning free</PlayStoreLink>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow">English literacy for ages 4 to 10</p>
            <h1>Help your child read.<br /><span>And understand.</span></h1>
            <p className="hero-description">Your child builds words and discovers what they mean, right from Lesson&nbsp;1.</p>
            <div className="hero-actions"><PlayStoreLink platform="auto" className="button" href="#get-the-app">Start learning free</PlayStoreLink></div>
            <p className="fine-print">Download for Android and iPhone.<br />9 free lessons. First 4 without an account.</p>
          </div>
          <div className="hero-art" aria-label="Real AptyRead screens showing word building and a first story">
            <div className="hero-orbit" />
            <span className="star star-one" aria-hidden="true">✦</span>
            <span className="star star-two" aria-hidden="true">✧</span>
            <figure className="phone phone-words">
              <img {...screenPreview("app-words.webp")} alt="In AptyRead, children blend the letters s, a and t into sat" width={660} height={1434} loading="eager" />
              <figcaption>First sounds. First words.</figcaption>
            </figure>
            <figure className="phone phone-story">
              <img {...screenPreview("app-first-story.webp")} alt="Pat sat. A page from the first AptyRead story, Pat and Pip" width={660} height={1434} loading="eager" fetchPriority="high" />
              <figcaption>Then a story of their own.</figcaption>
            </figure>
            <img className="hero-mascot" src={asset("apty-mascot.webp")} alt="Apty, the blue reading companion" width={180} height={180} />
            <span className="art-caption">A little look inside AptyRead</span>
          </div>
        </section>

        <div className="promise-strip section-wrap">
          <span>No advertisements</span><span className="strip-dot" aria-hidden="true">·</span><span>No recurring subscription</span>
        </div>

        <section className="learning-section section-wrap section-space" id="how-it-works">
          <div className="section-heading">
            <p className="eyebrow">Little steps. Meaningful learning.</p>
            <h2>A word they make.<br />A meaning they discover.</h2>
            <p>Every activity gives your child something to try.<br className="desktop-break" /> Listen, choose, build, read, and explore.</p>
          </div>
          <div className="learning-showcase">
            <div className="learning-steps">
              <div role="tablist" aria-label="Explore the app" aria-orientation="vertical" onKeyDown={(event) => handleTabKey(event, setLearningIndex)}>
                {learningSteps.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    id={`step-${item.id}`}
                    className={`learning-step${index === learningIndex ? " is-active" : ""}`}
                    role="tab"
                    aria-selected={index === learningIndex}
                    aria-controls="learning-panel"
                    tabIndex={index === learningIndex ? 0 : -1}
                    onClick={() => setLearningIndex(index)}
                  >
                    <span className="step-number">0{index + 1}</span>
                    <span><strong>{item.title}</strong><span className="step-copy">{item.description}</span></span>
                    <span className="step-arrow" aria-hidden="true"><ArrowIcon /></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="showcase-picture" id="learning-panel" role="tabpanel" aria-labelledby={`step-${step.id}`} tabIndex={0}>
              <span className="screen-note" id="lesson-label">{step.label}</span>
              <ScreenButton
                filename={step.screen}
                title={step.label}
                alt={step.alt}
                width={660}
                height={1434}
                imageId="learning-screen"
                label={`Enlarge app screen: ${step.label}`}
                onEnlarge={openImage}
              />
              <span className="screen-footnote">Actual app screens</span>
            </div>
            <a className="text-link steps-link" href="#get-the-app">Discover it together <ArrowIcon direction="right" /></a>
          </div>
        </section>

        <section className="journey-section" id="learning-journey">
          <div className="section-wrap section-space">
            <div className="journey-intro">
              <div><p className="eyebrow">A clear path forward</p><h2>One step builds<br />on another.</h2></div>
              <p>Five progressive levels designed to grow reading, vocabulary, and understanding. Lessons open in order, so your child always has a next step.</p>
            </div>
            <div className="journey-layout">
              <div className="level-list" role="tablist" aria-label="The five levels" aria-orientation="vertical" onKeyDown={(event) => handleTabKey(event, setLevelIndex)}>
                {levels.map((item, index) => (
                  <button
                    type="button"
                    key={item.title}
                    className={`level${index === levelIndex ? " is-active" : ""}`}
                    role="tab"
                    aria-selected={index === levelIndex}
                    aria-controls="journey-panel"
                    id={`level-${index + 1}`}
                    tabIndex={index === levelIndex ? 0 : -1}
                    onClick={() => setLevelIndex(index)}
                  >
                    <span className="level-no">0{index + 1}</span>
                    <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
                    <span className="level-symbol" aria-hidden="true"><ArrowIcon /></span>
                  </button>
                ))}
              </div>
              <div className="journey-visual" id="journey-panel" role="tabpanel" aria-labelledby={`level-${levelIndex + 1}`} tabIndex={0}>
                <div className="journey-visual-top"><span className="small-label">THE LEARNING JOURNEY</span><span className="journey-count">0{levelIndex + 1} <span>/ 05</span></span></div>
                <div className="journey-letter-art" aria-hidden="true">
                  {level.letters.map((letter, index) => (
                    <span key={index} style={{ fontSize: letter.length > 2 ? "24px" : letter.length > 1 ? "32px" : undefined }}>{letter}</span>
                  ))}
                  <svg viewBox="0 0 200 50"><path d="M5 14 Q90 63 185 14 M174 10l13 3-4 13" /></svg>
                </div>
                <h3 id="journey-title">{level.title}</h3>
                <p id="journey-description">{level.description}</p>
                <p className="journey-status" id="journey-status">{level.status}</p>
                <img className="journey-mascot" src={asset("apty-mascot.webp")} alt="" width={108} height={108} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        <section className="parent-section section-wrap section-space" id="for-parents">
          <div className="parent-copy">
            <p className="eyebrow">For the grown-ups, too</p>
            <h2>A little guidance.<br />Right when you need it.</h2>
            <p>Open help within an activity to understand what it teaches, what your child does, and how you can support them.</p>
            <p>Choose a language you feel at home with. The reading activities stay in English.</p>
            <div className="language-tabs" role="tablist" aria-label="Preview parent guidance language" onKeyDown={(event) => handleTabKey(event, setLanguageIndex)}>
              {languages.map((item, index) => (
                <button
                  type="button"
                  key={item.code}
                  role="tab"
                  aria-selected={index === languageIndex}
                  aria-controls="parent-panel"
                  id={`language-${item.code}`}
                  tabIndex={index === languageIndex ? 0 : -1}
                  lang={item.code}
                  onClick={() => setLanguageIndex(index)}
                >{item.label}</button>
              ))}
            </div>
            <p>
              <Link className="text-link" href="/reading-guide" prefetch={false}>
                Explore the Reading Guide for parents <ArrowIcon direction="right" />
              </Link>
            </p>
          </div>
          <div className="parent-visual" id="parent-panel" role="tabpanel" aria-labelledby={`language-${language.code}`} tabIndex={0}>
            <span className="guidance-sticker"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-1a3 3 0 1 0 0-6M1 21v-3c0-5 14-5 14 0v3m2-7c3 0 6 1 6 4v3" /></svg>Help at every step</span>
            <ScreenButton
              className="help-screen"
              filename={`help-${language.code}.webp`}
              title="Activity guidance for grown-ups"
              alt={`${language.name} grown-up guidance for a learning activity`}
              width={390}
              height={844}
              imageId="parent-screen"
              label="Enlarge parent guidance"
              onEnlarge={openImage}
            />
            <span className="parent-spark" aria-hidden="true">✧</span>
          </div>
        </section>

        <section className="writing-section section-wrap">
          <div className="writing-copy">
            <p className="eyebrow">A little practice, their way</p>
            <h2>Trace here.<br />Write on paper.</h2>
            <p>Watch how a letter is formed, then try it with paper and pencil. Or follow the tracing guide on screen.</p>
            <p className="small-copy">Writing practice in Level 1 is optional. Your child can join in when ready.</p>
            <div className="writing-tabs" role="tablist" aria-label="Writing options" onKeyDown={(event) => handleTabKey(event, setWritingIndex)}>
              {writingOptions.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  role="tab"
                  aria-selected={index === writingIndex}
                  aria-controls="writing-panel"
                  id={`writing-${item.id}`}
                  tabIndex={index === writingIndex ? 0 : -1}
                  onClick={() => setWritingIndex(index)}
                >{item.label}</button>
              ))}
            </div>
          </div>
          <div className="writing-visual" id="writing-panel" role="tabpanel" aria-labelledby={`writing-${writing.id}`} tabIndex={0}>
            <div className="paper-lines" aria-hidden="true"><span>B</span><span>b</span></div>
            <ScreenButton
              className="writing-phone"
              filename={`writing-${writing.id}.png`}
              title="Optional letter-writing practice"
              alt={writing.alt}
              width={390}
              height={844}
              imageId="writing-screen"
              label="Enlarge writing activity"
              onEnlarge={openImage}
            />
          </div>
        </section>

        <section className="family-section section-wrap section-space">
          <div className="family-visual">
            <img src={asset("app-readers.webp")} alt="Three readers share a family account, each with their own progress" width={660} height={1434} loading="lazy" />
            <div className="reader-label"><span aria-hidden="true">☀</span> Their own next step.</div>
          </div>
          <div className="family-copy">
            <p className="eyebrow">Made for your family</p><h2>One family.<br />Three little journeys.</h2>
            <p>Up to three reader profiles. One parent account. Each child keeps their own progress and place in the course.</p>
            <p>Buy a level once and share it with all three readers. Each child follows the learning journey at their own pace.</p>
            <a className="text-link" href="#get-the-app">Make a start together <ArrowIcon direction="right" /></a>
          </div>
        </section>

        <section className="faq-section section-wrap section-space" id="questions">
          <div className="faq-heading">
            <p className="eyebrow">A few things you might wonder</p><h2>Let’s make<br />starting simple.</h2>
            <p>More questions?<br /><a className="text-link" href="/faq">Browse all answers <ArrowIcon direction="right" /></a></p>
          </div>
          <div className="faq-list">
            {questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="download-section section-wrap" id="get-the-app">
          <div className="download-inner">
            <img className="download-mascot" src={asset("apty-mascot.webp")} alt="Apty is ready to read with you" width={180} height={180} loading="lazy" />
            <p className="eyebrow">A little time together. A place to begin.</p>
            <h2>A reading journey.<br />Start it together.</h2>
            <p>Set aside about 10 minutes. Listen, build a word,<br className="desktop-break" /> and see how your child responds.</p>
            <div className="store-links">
              <PlayStoreLink platform="android" aria-label="Get AptyRead on Google Play">
                <img src={asset("store-google.png")} alt="Get it on Google Play" width={188} height={56} loading="lazy" />
              </PlayStoreLink>
              <PlayStoreLink platform="ios" aria-label="Download AptyRead on the App Store">
                <img src={asset("store-apple.svg")} alt="Download on the App Store" width={168} height={56} loading="lazy" />
              </PlayStoreLink>
            </div>
            <p className="download-small">
              <span className="download-offer">9 free lessons, including your child’s first AptyRead story.</span>
              First 4 without an account.<br />No advertisements. No recurring subscription.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter currentPage="home" />

      <dialog
        ref={dialogRef}
        id="image-dialog"
        aria-labelledby="image-dialog-title"
        onClose={restoreImageFocus}
        onClick={handleBackdropClick}
      >
        <div className="dialog-header">
          <p id="image-dialog-title">{enlargedImage?.title ?? "Inside AptyRead"}</p>
          <button ref={dialogCloseRef} type="button" className="dialog-close" aria-label="Close enlarged image" onClick={closeImage}>×</button>
        </div>
        {enlargedImage && (
          <img id="dialog-image" src={asset(enlargedImage.filename)} alt={enlargedImage.alt} width={enlargedImage.width} height={enlargedImage.height} />
        )}
        <p className="dialog-note">Inside AptyRead.</p>
      </dialog>
    </div>
  );
}
