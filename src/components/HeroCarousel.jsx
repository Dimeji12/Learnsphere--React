import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const carouselItems = [
  {
    id: 1,
    title: "Elevate Your Style",
    description: "Discover the latest trends in fashion and accessories. Unbeatable quality, unmatched style.",
    imageDescription: "Fashionable person wearing modern outfit in a stylish city setting",
    imgReplaceText: "Stylish urban fashion shoot",
    ctaText: "Shop New Arrivals",
    ctaLink: "/products?sort=newest",
    bgColor: "bg-secondary/10",
    textColor: "text-secondary-foreground",
    primaryColor: "secondary"
  },
  {
    id: 2,
    title: "Tech Redefined",
    description: "Explore cutting-edge gadgets that blend performance with sleek design. Future is now.",
    imageDescription: "Collection of modern electronic gadgets like smartphones, laptops, and headphones",
    imgReplaceText: "Modern tech gadgets flatlay",
    ctaText: "Explore Electronics",
    ctaLink: "/categories/electronics",
    bgColor: "bg-accent/10",
    textColor: "text-accent-foreground",
    primaryColor: "accent"
  },
  {
    id: 3,
    title: "Home Comforts",
    description: "Transform your living space with our curated collection of home decor and essentials.",
    imageDescription: "Beautifully decorated modern living room with comfortable furniture",
    imgReplaceText: "Cozy modern living room interior",
    ctaText: "Discover Home Goods",
    ctaLink: "/categories/home",
    bgColor: "bg-primary/10",
    textColor: "text-primary-foreground",
    primaryColor: "primary"
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); 
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const currentItem = carouselItems[currentIndex];

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 w-full h-full ${currentItem.bgColor}`}
        >
          <img  
            alt={currentItem.imageDescription}
            className="w-full h-full object-cover hero-overlay"
           src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8 bg-black/30">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white`}
            >
              {currentItem.title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
            >
              {currentItem.description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button asChild size="lg" className={`bg-${currentItem.primaryColor} text-${currentItem.primaryColor === 'accent' ? 'accent-foreground' : `${currentItem.primaryColor}-foreground`} hover:bg-${currentItem.primaryColor}/90 transition-opacity text-base`}>
                <Link to={currentItem.ctaLink}>{currentItem.ctaText}</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="carousel-button left-4"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="carousel-button right-4"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="carousel-dots">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`carousel-dot ${currentIndex === index ? "carousel-dot-active" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;