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

type MobileSlide =
  | {
      type: 'image';
      src: string;
      alt: string;
      title: React.ReactNode;
      desc: string;
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

const mobileSlides: MobileSlide[] = [
  {
    type: 'image',
    src: '/mobile-1-bgimage.png',
    alt: 'Android and iOS Apps',
    title: (
      <>
        Android &amp;
        <br />
        iOS Apps
      </>
    ),
    desc: 'Scalable mobile solutions built for your business.',
  },
  {
    type: 'image',
    src: '/mobile-2-bgimage.png',
    alt: 'Product Engineering',
    title: <>Product Engineering</>,
    desc: 'From idea to launch — powerful digital products built for performance.',
  },
  {
    type: 'image',
    src: '/mobile-3-bgimage.png',
    alt: 'Business Management Systems',
    title: (
      <>
        Business
        <br />
        Management
        <br />
        Systems
      </>
    ),
    desc: 'Streamline workflows and improve efficiency.',
  },
  {
    type: 'video',
    src: '/mobile-4-video.mp4',
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

  // Mobile carousel
  const [mobSelectedIndex, setMobSelectedIndex] = useState(0);
  const [mobAutoplay] = useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  const [mobEmblaRef, mobEmblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [mobAutoplay]
  );

  const mobScrollPrev = useCallback(() => mobEmblaApi?.scrollPrev(), [mobEmblaApi]);
  const mobScrollNext = useCallback(() => mobEmblaApi?.scrollNext(), [mobEmblaApi]);
  const mobScrollTo = useCallback(
    (index: number) => mobEmblaApi?.scrollTo(index),
    [mobEmblaApi]
  );

  useEffect(() => {
    if (!mobEmblaApi) return;
    const onSelect = () => {
      const idx = mobEmblaApi.selectedScrollSnap();
      setMobSelectedIndex(idx);
      if (mobileSlides[idx]?.type === 'video') {
        const video = document.querySelector<HTMLVideoElement>('.mob-slide__video');
        if (video) {
          video.play().catch(() => {});
        }
      }
    };
    mobEmblaApi.on('select', onSelect);
    mobEmblaApi.on('reInit', onSelect);
    onSelect();
    return () => {
      mobEmblaApi.off('select', onSelect);
      mobEmblaApi.off('reInit', onSelect);
    };
  }, [mobEmblaApi]);

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

      {/* Mobile carousel (640px and below) */}
      <div className="hero-mobile">
        <div
          className="mob-embla"
          ref={mobEmblaRef}
        >
          <div className="mob-embla__container">
            {mobileSlides.map((slide, i) => (
              <div
                key={i}
                className={`mob-slide${i === mobSelectedIndex ? ' is-active' : ''}`}
              >
                {slide.type === 'image' ? (
                  <>
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="mob-slide__img"
                    />
                    <div className="mob-slide__text">
                      <h2 className="mob-slide__title">{slide.title}</h2>
                      <p className="mob-slide__desc">{slide.desc}</p>
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
                    className="mob-slide__video"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile arrow buttons */}
        <button
          type="button"
          onClick={mobScrollPrev}
          aria-label="Previous slide"
          className="mob-arrow mob-arrow-prev"
        >
          <span className="mob-arrow__icon">
            <ArrowLeft size={16} strokeWidth={2.25} />
          </span>
        </button>
        <button
          type="button"
          onClick={mobScrollNext}
          aria-label="Next slide"
          className="mob-arrow mob-arrow-next"
        >
          <span className="mob-arrow__icon">
            <ArrowRight size={16} strokeWidth={2.25} />
          </span>
        </button>

        {/* Mobile dots */}
        <div role="tablist" aria-label="Mobile hero slides" className="mob-dots">
          {mobileSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === mobSelectedIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => mobScrollTo(i)}
              className={`mob-dot${i === mobSelectedIndex ? ' is-active' : ''}`}
            />
          ))}
        </div>
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

        /* ── Mobile carousel (640px and below) ── */
        @media (max-width: 640px) {
          .hero-section {
            padding-top: 0;
            background: #06080e;
          }

          .hero-desktop {
            display: none !important;
          }

          .hero-mobile {
            position: relative;
            display: block;
            width: 100%;
            background: #06080e;
          }

          /* Embla wrapper */
          .mob-embla {
            overflow: hidden;
            width: 100%;
          }

          .mob-embla__container {
            display: flex;
            width: 100%;
          }

          /* Each slide: relative container so text can overlay the image */
          .mob-slide {
            flex: 0 0 100%;
            min-width: 0;
            width: 100%;
            position: relative;
            height: 100dvh;
            background: #06080e;
            overflow: hidden;
          }

          /* Image as full background — uses Next.js fill */
          .mob-slide__img {
            object-fit: cover;
            object-position: center center;
            user-select: none;
            -webkit-user-drag: none;
          }

          /* Video slide: full-screen height */
          .mob-slide__video {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          }

          /* Text: absolute, sitting ON the bg image at the bottom */
          .mob-slide__text {
            position: absolute;
            bottom: 72px;
            left: 0;
            right: 0;
            padding: 0 24px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            z-index: 2;
          }

          .mob-slide__title {
            font-family: 'Syne', sans-serif;
            font-weight: 800;
            font-size: 2rem;
            line-height: 1.1;
            letter-spacing: -0.01em;
            color: #ffffff;
            margin: 0 0 10px;
            text-shadow:
              0 2px 12px rgba(0, 0, 0, 0.75),
              0 1px 3px rgba(0, 0, 0, 0.5);
          }

          .mob-slide__desc {
            font-family: 'DM Sans', sans-serif;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
            text-shadow: 0 1px 6px rgba(0, 0, 0, 0.65);
          }

          /* Entrance animation for active slide text */
          @keyframes mobTextReveal {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .mob-slide.is-active .mob-slide__title {
            animation: mobTextReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
          }

          .mob-slide.is-active .mob-slide__desc {
            animation: mobTextReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
          }

          /* Arrow buttons — vertically centred over the image */
          .mob-arrow {
            position: absolute;
            top: 35%;
            translate: 0 -50%;
            z-index: 3;
            width: 36px;
            height: 36px;
            padding: 0;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            background: rgba(17, 24, 39, 0.52);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: #ffffff;
            cursor: pointer;
            display: grid;
            place-items: center;
            transition:
              background 0.25s ease,
              transform 0.25s ease;
          }

          .mob-arrow__icon {
            display: grid;
            place-items: center;
          }

          .mob-arrow-prev { left: 12px; }
          .mob-arrow-next { right: 12px; }

          .mob-arrow:active {
            transform: scale(0.92);
            background: var(--blue-accent);
          }

          /* Dots — sit inside the image over the gradient scrim */
          .mob-dots {
            position: absolute;
            bottom: 14px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
            display: flex;
            gap: 7px;
            align-items: center;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(17, 24, 39, 0.55);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          .mob-dot {
            width: 7px;
            height: 7px;
            border-radius: 999px;
            border: none;
            padding: 0;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.32);
            transition:
              width 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              background 0.22s ease;
          }

          .mob-dot.is-active {
            width: 20px;
            background: var(--blue-accent);
          }
        }
      `}</style>
    </section>
  );
}

