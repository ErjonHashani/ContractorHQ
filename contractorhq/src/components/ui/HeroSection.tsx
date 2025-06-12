"use client";
import { useState, useEffect, JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi"; 

const HERO_IMAGES = [
  {
    src: "/images/hero/hero.png",
    alt: "Professional power drill",
  },
  {
    src: "/images/hero/hero-1.png",
    alt: "Cordless impact wrench",
  },
  {
    src: "/images/hero/hero-2.png",
    alt: "Construction tools collection",
  },
];

export function HeroSection() {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Particle generation
    const newParticles = [...Array(30)].map((_, i) => {
      const size = Math.floor(Math.random() * 3) + 1;
      return (
        <div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 15 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      );
    });
    setParticles(newParticles);

    // Auto-rotate slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col lg:flex-row bg-theme-hero overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc05_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc05_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-pan" />
        </motion.div>
        {particles}
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -right-40 -bottom-40 h-80 w-80 rounded-full bg-primary-light/10 blur-[120px]" />
      </div>

      {/* Content Section */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-8 sm:py-16 lg:pl-12 lg:pr-8 xl:pl-24 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            <span className="block">Industrial</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              Power Tools
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Professional-grade equipment from leading brands with{" "}
            <span className="text-white font-medium">
              free expedited shipping
            </span>{" "}
            and lifetime support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="flex items-center justify-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-accent-dark transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              Shop Collection
              <FiArrowRight/>
            </Link>
            <Link
              href="/shop?category=deals"
              className="flex items-center justify-center rounded-xl bg-white/10 px-8 py-4 text-lg font-semibold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              View Deals
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Image Slider */}
      <div className="w-full lg:w-1/2 relative h-[50vh] sm:h-[60vh] lg:h-auto mb-24">
        <div className="invisible lg:visible absolute inset-0 bg-gradient-to-l from-primary-dark/40 to-transparent z-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={HERO_IMAGES[currentSlide].src}
              alt={HERO_IMAGES[currentSlide].alt}
              fill
              className="object-contain  object-center"
              quality={100}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-6 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-8" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Brand Marquee*/}
      <motion.div
        className="absolute bottom-0 left-0 right-0 py-6 bg-gradient-to-t from-theme-hero/90 via-theme-hero/50 to-transparent z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="overflow-hidden">
          <div className="flex animate-marquee items-center gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex shrink-0 gap-12">
                {["makita", "dewalt", "milwaukee", "bosch"].map((brand) => (
                  <div
                    key={`${brand}-${i}`}
                    className="relative h-10 w-28 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src={`/images/brands/${brand}-logo.png`}
                      alt={`${brand} logo`}
                      fill
                      className="object-contain"
                      loading="eager"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
