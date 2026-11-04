"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { useReducedMotion } from "motion/react";
import { heroSlides } from "@/data/home";
import BookImage from "@/components/books/BookImage";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const reduced = useReducedMotion();
  return (
    <section aria-label="Discover your next chapter" className="w-full">
      <div className="relative w-full overflow-hidden">
        <Swiper
          className="hero-swiper"
          modules={[A11y, Autoplay, Keyboard, Pagination]}
          loop
          speed={750}
          keyboard={{ enabled: true }}
          autoplay={
            reduced
              ? false
              : {
                  delay: 6500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          pagination={{ clickable: true }}
        >
          {heroSlides.map((slide, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <SwiperSlide key={slide.label}>
                <div
                  className={`relative w-full overflow-hidden ${slide.colour}`}
                >
                  <div className="hero-sweep" aria-hidden="true" />
                  <div className="container relative grid items-center gap-8 pb-14 pt-10 md:min-h-[550px] md:grid-cols-[1.2fr_1fr] md:gap-10 md:py-20 lg:min-h-[600px] lg:grid-cols-[1.3fr_1fr] lg:gap-12">
                    <div className="relative z-10 min-w-0">
                      <p className="mb-5 text-base font-medium text-accent">
                        {slide.label}
                      </p>
                      <Heading className="max-w-[720px] text-balance font-display text-hero-title font-semibold tracking-[-0.035em]">
                        {slide.title}
                      </Heading>
                      <p className="mb-7 mt-6 max-w-[560px] text-base leading-7 text-muted-foreground">
                        {slide.description}
                      </p>
                      <Link
                        href="/books"
                        className="inline-flex min-h-12 items-center gap-4 rounded-full bg-white px-6 py-3 text-base font-medium text-[#183325] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        Browse Books
                      </Link>
                    </div>
                    <div className="relative mx-auto flex h-[220px] w-full max-w-[650px] items-center justify-center gap-4 sm:h-[330px] md:h-[370px] md:gap-6 lg:h-[410px]">
                      <div className="hero-badge absolute -left-1 -top-1 z-20 flex size-22 -rotate-6 items-center justify-center bg-[#ed940d] p-4 text-center text-base font-semibold leading-5 text-white md:-left-7 md:top-5 lg:-left-12 lg:size-28 lg:text-xl">
                        {slide.badge}
                      </div>
                      {slide.covers.map((cover, i) => (
                        <div
                          key={cover}
                          className={`hero-book relative aspect-[2/3] w-[29%] max-w-[205px] overflow-hidden rounded-[3px] ${i === 0 ? "-rotate-6 translate-y-2" : i === 1 ? "z-10 -translate-y-3 rotate-2" : "translate-y-3 rotate-6"}`}
                        >
                          <BookImage
                            src={`/images/books/${cover}.webp`}
                            title={slide.titles[i]}
                            priority={index === 0}
                            sizes="(max-width: 768px) 28vw, 205px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
