'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const desktopVideos = [
  { src: '/desk-1.mp4' },
  { src: '/desk-2.mp4' },
  { src: '/desk-3.mp4' },
  { src: '/desk-4.mp4' },
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
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="home" aria-label="Hero banner" className="hero-section">
      {/* Desktop & iPad / Tablet carousel */}
      <div className="hero-desktop">
        <div
          className="hero-embla"
          ref={emblaRef}
          onMouseEnter={() => autoplay.stop()}
          onMouseLeave={() => autoplay.play()}
        >
          <div className="hero-embla__container">
            {desktopVideos.map((video) => (
              <div key={video.src} className="hero-slide">
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="hero-slide__video"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous video"
          className="hero-arrow hero-arrow-prev"
        >
          <span className="hero-arrow__icon">
            <ArrowLeft size={18} strokeWidth={2.25} />
          </span>
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next video"
          className="hero-arrow hero-arrow-next"
        >
          <span className="hero-arrow__icon">
            <ArrowRight size={18} strokeWidth={2.25} />
          </span>
        </button>

        <div role="tablist" aria-label="Video slides" className="hero-dots">
          {desktopVideos.map((_, i) => (
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

      {/* Mobile: single looping video fitted to viewport height */}
      <div className="hero-mobile">
        <video
          src="/mob-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero-mobile__video"
        />
      </div>

      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          background: #f8f9fb;
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
          background: #f8f9fb;
        }

        .hero-slide__video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
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

          .hero-slide__video {
            object-fit: cover;
          }

          .hero-arrow {
            width: 38px;
            height: 38px;
          }

          .hero-arrow-prev { left: 12px; }
          .hero-arrow-next { right: 12px; }

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

          .hero-slide__video {
            object-fit: cover;
            object-position: center center;
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
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(17, 24, 39, 0.42);
          backdrop-filter: blur(16px) saturate(1.5);
          -webkit-backdrop-filter: blur(16px) saturate(1.5);
          box-shadow:
            0 10px 30px rgba(17, 24, 39, 0.18),
            0 0 0 1px rgba(17, 24, 39, 0.06);
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
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow:
            0 14px 36px rgba(26, 111, 196, 0.4),
            0 0 0 4px rgba(26, 111, 196, 0.14);
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
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(12px) saturate(1.3);
          -webkit-backdrop-filter: blur(12px) saturate(1.3);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 6px 20px rgba(17, 24, 39, 0.08);
        }

        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: none;
          padding: 0;
          cursor: pointer;
          background: rgba(17, 24, 39, 0.28);
          transition:
            width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.25s ease,
            transform 0.25s ease;
        }

        .hero-dot:hover {
          background: rgba(17, 24, 39, 0.45);
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
          }

          .hero-desktop {
            display: none !important;
          }

          .hero-mobile {
            display: block;
            width: 100%;
            height: 100dvh;
            overflow: hidden;
          }

          .hero-mobile__video {
            width: 100%;
            height: 100dvh;
            object-fit: cover;
            object-position: center center;
            display: block;
          }
        }
      `}</style>
    </section>
  );
}
