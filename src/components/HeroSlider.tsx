import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1600&auto=format&fit=crop&q=80",
    title: "Unleash Wireless Audio Performance",
    sub: "Explore premium noise-canceling headsets with rich acoustics, custom equalizers, and hours of pristine playback.",
    tag: "DEALS IN ELECTRONICS"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&auto=format&fit=crop&q=80",
    title: "Upgrade Your Kitchen Architecture",
    sub: "Professional-grade small appliances, multi-cup digital brewers, and organic bamboo accessories for the master chef.",
    tag: "HOME IMPROVEMENTS"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80",
    title: "Explore Autumn Fashion & Accessories",
    sub: "Authentic regular-fit denims, soft pullover sweaters, insulated rainy weather jackets, and classic tortoise eyewear.",
    tag: "APPAREL & DESIGN TRENDS"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1600&auto=format&fit=crop&q=80",
    title: "Ready for Your Next Wild Hike",
    sub: "Heavy duty vacuum temperature bottles, multi-density trigger rollers, double-dome family tents, and multi-cube travel packs.",
    tag: "SPORTS & THE OUTDOORS"
  }
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] overflow-hidden group select-none">
      {/* Slides Container with Fade Effect */}
      <div className="absolute inset-0 w-full h-full bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${HERO_SLIDES[index].image})` }}
            />
            {/* Dark overlay with dynamic side gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
            
            {/* Banner Marketing Text Overlay (left bound) */}
            <div className="absolute top-[15%] sm:top-[20%] left-[5%] max-w-[90%] sm:max-w-[45%] z-10 flex flex-col gap-2 pointer-events-none">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#f0c14b] bg-gray-900/85 px-2.5 py-1 rounded w-max">
                {HERO_SLIDES[index].tag}
              </span>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                {HERO_SLIDES[index].title}
              </h1>
              <p className="hidden sm:block text-xs sm:text-sm text-gray-200 leading-relaxed font-normal drop-shadow-sm">
                {HERO_SLIDES[index].sub}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-[35%] sm:top-[40%] translate-y-[-50%] h-20 w-10 sm:w-12 bg-transparent hover:bg-black/10 text-white rounded-r flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-20 outline-none"
        id="hero-prev-btn"
      >
        <ChevronLeft className="h-10 w-10 text-white drop-shadow-lg" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-[35%] sm:top-[40%] translate-y-[-50%] h-20 w-10 sm:w-12 bg-transparent hover:bg-black/10 text-white rounded-l flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-20 outline-none"
        id="hero-next-btn"
      >
        <ChevronRight className="h-10 w-10 text-white drop-shadow-lg" />
      </button>

      {/* Bottom Gradient Overlay (blends transparent into Amazon light-gray page bg #eaeded) */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] sm:h-[130px] md:h-[180px] bg-gradient-to-t from-[#eaeded] to-transparent pointer-events-none z-10" />
    </div>
  );
}
