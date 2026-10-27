'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';

type DesktopSlide =
  | {
      type: 'image';
      src: string;
      alt: string;
      title: React.ReactNode;
      desc: string;
      align: 'left' | 'right';
      stackedTitle?: boolean;
    }
  | {
      type: 'video';
      src: string;
    };

const desktopSlides: DesktopSlide[] = [
  {
    type: 'image',
    src: '/desk-1-bgimage.png',
    alt: 'Android and iOS Apps',
    title: (
      <>
        Android &amp;
        <br />
        iOS Apps
      </>
    ),
    desc: 'Scalable mobile solutions built for your business.',
    align: 'left',
  },
  {
    type: 'image',
    src: '/desk-2-bgimage.png',
    alt: 'Product Engineering',
    title: <>Product Engineering</>,
    desc: 'From idea to launch, we engineer powerful digital products. Built for performance, scalability, and long-term growth.',
    align: 'right',
  },
  {
    type: 'image',
    src: '/desk-3-bgimage.png',
    alt: 'Business Management Systems',
    title: (
      <>
        BUSINESS
        <br />
        MANAGEMENT
        <br />
        SYSTEMS
      </>
    ),
    desc: 'Streamline workflows, manage operations, and improve efficiency.',
    align: 'right',
    stackedTitle: true,
  },
  {
    type: 'video',
    src: '/desk-4.mp4',
  },
];

export default function Hero() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [autoplay] = useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [autoplay]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      setSelectedIndex(idx);
      if (desktopSlides[idx]?.type === 'video') {
        const video = document.querySelector<HTMLVideoElement>('.hero-slide__video');
        if (video) {
          video.play().catch(() => {});
        }
      }
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="home" aria-label="Hero banner" className="hero-section">
      <h1 className="sr-only">
        EnovixTech — Digital Product Studio, Web &amp; Mobile App Development
      </h1>
      {/* Desktop & iPad / Tablet carousel */}
      <div className="hero-desktop">
        <div
          className="hero-embla"
          ref={emblaRef}
          onMouseEnter={() => autoplay.stop()}
          onMouseLeave={() => autoplay.play()}
        >
          <div className="hero-embla__container">
            {desktopSlides.map((slide, i) => (
              <div
                key={slide.src}
                className={`hero-slide${i === selectedIndex ? ' is-active' : ''}`}
              >
                {slide.type === 'image' ? (
                  <>
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={1920}
                      height={1080}
                      priority={i === 0}
                      sizes="100vw"
                      className="hero-slide__img"
                    />
                    <div className={`hero-content hero-content--${slide.align}`}>
                      <h2
                        className={`hero-content__title ${
                          slide.stackedTitle ? 'hero-content__title--stacked' : ''
                        }`}
                      >
                        {slide.title}
                      </h2>
                      <p className="hero-content__desc">{slide.desc}</p>
                    </div>
                  </>
                ) : (
                  <video
                    src={slide.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="hero-slide__video"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="hero-arrow hero-arrow-prev"
        >
          <span className="hero-arrow__icon">
            <ArrowLeft size={18} strokeWidth={2.25} />
          </span>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="hero-arrow hero-arrow-next"
        >
          <span className="hero-arrow__icon">
            <ArrowRight size={18} strokeWidth={2.25} />
          </span>
        </button>

        <div role="tablist" aria-label="Hero slides" className="hero-dots">
          {desktopSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`hero-dot${i === selectedIndex ? ' is-active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: clean standalone hero replacing mob-1.mp4 video */}
      <div className="hero-mobile">
        {/* Subtle ambient lighting & cyber mesh background */}
        <div className="hero-mob__bg" aria-hidden="true">
          <div className="hero-mob__glow hero-mob__glow--top" />
          <div className="hero-mob__glow hero-mob__glow--center" />
          <div className="hero-mob__glow hero-mob__glow--bottom" />
          <div className="hero-mob__grid" />
          <div className="hero-mob__particles" />
        </div>

        {/* Content matching mob-1 typography and styling */}
        <div className="hero-mob__content">
          <div className="hero-mob__line hero-mob__line--top" />
          <h2 className="hero-mob__title">
            BUILD
            <br />
            WHAT
            <br />
            MATTERS
          </h2>
          <div className="hero-mob__line hero-mob__line--bottom" />
          <p className="hero-mob__subtitle">
            CREATING PRODUCTS THAT
            <br />
            SOLVE REAL BUSINESS NEEDS
          </p>
        </div>

        {/* Scroll indicator */}
        {/* <a
          href="#services"
          className="hero-mob__scroll-hint"
          aria-label="Scroll to services"
        >
          <span className="hero-mob__scroll-mouse">
            <span className="hero-mob__scroll-wheel" />
          </span>
          <span className="hero-mob__scroll-text">SCROLL</span>
        </a> */}
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          background: #07090e;
        }

        .hero-desktop {
          position: relative;
          display: block;
          width: 100%;
        }

        .hero-mobile {
          display: none;
          width: 100%;
        }

        .hero-embla {
          overflow: hidden;
          width: 100%;
        }

        .hero-embla__container {
          display: flex;
          width: 100%;
        }

        .hero-slide {
          position: relative;
          flex: 0 0 100%;
          min-width: 0;
          width: 100%;
          background: #07090e;
        }

        .hero-slide__img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          user-select: none;
          -webkit-user-drag: none;
        }

        .hero-slide__video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }

        /* Slide text overlay */
        .hero-content {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          pointer-events: none;
          color: #ffffff;
        }

        .hero-content--left {
          left: clamp(56px, 8.5vw, 140px);
          max-width: min(520px, 44vw);
          text-align: left;
        }

        .hero-content--right {
          left: clamp(50%, 53vw, 56%);
          max-width: min(580px, 44vw);
          text-align: left;
          padding-right: clamp(24px, 4vw, 60px);
        }

        .hero-content__title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.2rem, 4.2vw, 4.2rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-shadow:
            0 4px 28px rgba(0, 0, 0, 0.6),
            0 1px 4px rgba(0, 0, 0, 0.45);
          margin: 0;
        }

        .hero-content__title--stacked {
          font-weight: 900;
          font-size: clamp(2rem, 3.8vw, 3.8rem);
          letter-spacing: 0.03em;
          line-height: 1.05;
          text-transform: uppercase;
        }

        .hero-content__desc {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: clamp(1rem, 1.35vw, 1.25rem);
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.88);
          margin-top: clamp(14px, 1.8vw, 24px);
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.6);
          max-width: 480px;
        }

        /* Slide active entrance animations */
        @keyframes heroTextReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-slide.is-active .hero-content__title {
          animation: heroTextReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-slide.is-active .hero-content__desc {
          animation: heroTextReveal 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.14s both;
        }

        /* Tablet / iPad (641px to 1199px): desktop carousel with fitted aspect ratio & shorter side arrows */
        @media (min-width: 641px) and (max-width: 1199px) {
          .hero-section {
            padding-top: 0;
          }

          .hero-slide {
            aspect-ratio: 16 / 9;
            height: auto;
          }

          .hero-content--left {
            left: clamp(40px, 6vw, 80px);
            max-width: 44vw;
          }

          .hero-content--right {
            left: clamp(50%, 52vw, 55%);
            max-width: 44vw;
            padding-right: 20px;
          }

          .hero-arrow {
            width: 40px;
            height: 40px;
          }

          .hero-arrow-prev { left: 14px; }
          .hero-arrow-next { right: 14px; }

          .hero-arrow svg {
            width: 16px;
            height: 16px;
          }

          .hero-dots {
            bottom: 14px;
            padding: 6px 10px;
          }
        }

        /* Large desktop: edge-to-edge, full screen height */
        @media (min-width: 1200px) {
          .hero-section {
            padding-top: 0;
          }

          .hero-slide {
            height: 100dvh;
            aspect-ratio: auto;
          }
        }

        .hero-arrow {
          position: absolute;
          top: 50%;
          translate: 0 -50%;
          z-index: 3;
          width: 52px;
          height: 52px;
          padding: 0;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(17, 24, 39, 0.48);
          backdrop-filter: blur(16px) saturate(1.5);
          -webkit-backdrop-filter: blur(16px) saturate(1.5);
          box-shadow:
            0 10px 30px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          color: #ffffff;
          cursor: pointer;
          display: grid;
          place-items: center;
          overflow: hidden;
          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-arrow__icon {
          display: grid;
          place-items: center;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-arrow-prev { left: 28px; }
        .hero-arrow-next { right: 28px; }

        .hero-arrow:hover {
          background: var(--blue-accent);
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow:
            0 14px 36px rgba(26, 111, 196, 0.5),
            0 0 0 4px rgba(26, 111, 196, 0.2);
          transform: scale(1.08);
        }

        .hero-arrow-prev:hover .hero-arrow__icon {
          transform: translateX(-3px);
        }

        .hero-arrow-next:hover .hero-arrow__icon {
          transform: translateX(3px);
        }

        .hero-arrow:active {
          transform: scale(0.94);
          box-shadow:
            0 6px 16px rgba(26, 111, 196, 0.28),
            0 0 0 2px rgba(26, 111, 196, 0.12);
        }

        .hero-arrow:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 3px;
          box-shadow:
            0 10px 30px rgba(17, 24, 39, 0.18),
            0 0 0 4px rgba(26, 111, 196, 0.35);
        }

        .hero-dots {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 8px;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(17, 24, 39, 0.55);
          backdrop-filter: blur(12px) saturate(1.3);
          -webkit-backdrop-filter: blur(12px) saturate(1.3);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: none;
          padding: 0;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.35);
          transition:
            width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.25s ease,
            transform 0.25s ease;
        }

        .hero-dot:hover {
          background: rgba(255, 255, 255, 0.65);
          transform: scale(1.15);
        }

        .hero-dot.is-active {
          width: 24px;
          background: var(--blue-accent);
          transform: none;
        }

        /* Mobile phones (640px and below) */
        @media (max-width: 640px) {
          .hero-section {
            padding-top: 0;
            height: 100dvh;
            background: #06080e;
          }

          .hero-desktop {
            display: none !important;
          }

          .hero-mobile {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100dvh;
            overflow: hidden;
            padding: 72px 24px 32px;
            background: #06080e;
          }

          .hero-mob__bg {
            position: absolute;
            inset: 0;
            pointer-events: none;
            overflow: hidden;
          }

          .hero-mob__grid {
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
            background-size: 32px 32px;
            mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
            -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          }

          .hero-mob__glow {
            position: absolute;
            border-radius: 9999px;
            filter: blur(65px);
            pointer-events: none;
          }

          .hero-mob__glow--top {
            top: 10%;
            left: 5%;
            width: 200px;
            height: 200px;
            background: rgba(26, 111, 196, 0.28);
          }

          .hero-mob__glow--center {
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 260px;
            height: 260px;
            background: radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, rgba(26, 111, 196, 0.12) 60%, transparent 80%);
            animation: heroPulse 5s ease-in-out infinite alternate;
          }

          .hero-mob__glow--bottom {
            bottom: 5%;
            right: 5%;
            width: 220px;
            height: 220px;
            background: rgba(30, 58, 138, 0.24);
          }

          .hero-mob__particles {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(rgba(0, 229, 255, 0.28) 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.5;
          }

          @keyframes heroPulse {
            0% {
              opacity: 0.55;
              transform: translate(-50%, -50%) scale(0.92);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1.18);
            }
          }

          .hero-mob__content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            max-width: 320px;
            margin: auto 0;
          }

          .hero-mob__line {
            width: 60px;
            height: 3px;
            background: #00e5ff;
            border-radius: 2px;
            box-shadow:
              0 0 12px rgba(0, 229, 255, 0.8),
              0 0 24px rgba(0, 229, 255, 0.4);
            animation: heroLineGlow 3s ease-in-out infinite alternate;
          }

          .hero-mob__line--top {
            margin-bottom: 24px;
          }

          .hero-mob__line--bottom {
            margin-top: 24px;
            margin-bottom: 24px;
          }

          @keyframes heroLineGlow {
            0% {
              box-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
              width: 50px;
            }
            100% {
              box-shadow: 0 0 22px rgba(0, 229, 255, 0.95), 0 0 32px rgba(0, 229, 255, 0.45);
              width: 72px;
            }
          }

          .hero-mob__title {
            font-family: 'Syne', sans-serif;
            font-size: 2.75rem;
            font-weight: 800;
            line-height: 1.08;
            letter-spacing: 0.08em;
            color: #ffffff;
            text-transform: uppercase;
            text-shadow:
              0 2px 20px rgba(0, 0, 0, 0.8),
              0 0 40px rgba(26, 111, 196, 0.35);
            margin: 0;
          }

          .hero-mob__subtitle {
            font-family: 'DM Sans', sans-serif;
            font-size: 0.82rem;
            font-weight: 500;
            line-height: 1.6;
            letter-spacing: 0.16em;
            color: rgba(255, 255, 255, 0.78);
            text-transform: uppercase;
            margin: 0;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
          }

          .hero-mob__scroll-hint {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            margin-top: auto;
            margin-bottom: 12px;
            text-decoration: none;
            color: rgba(255, 255, 255, 0.45);
            transition: color 0.25s ease;
          }

          .hero-mob__scroll-hint:hover {
            color: #00e5ff;
          }

          .hero-mob__scroll-mouse {
            width: 20px;
            height: 32px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            display: flex;
            justify-content: center;
            padding-top: 5px;
          }

          .hero-mob__scroll-wheel {
            width: 3px;
            height: 6px;
            background: #00e5ff;
            border-radius: 99px;
            animation: heroWheel 1.8s infinite;
          }

          @keyframes heroWheel {
            0% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(10px);
            }
          }

          .hero-mob__scroll-text {
            font-size: 0.65rem;
            letter-spacing: 0.18em;
            font-weight: 500;
            text-transform: uppercase;
          }
        }
      `}</style>
    </section>
  );
}

