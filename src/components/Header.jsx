import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <a href="#" className="text-2xl font-bold gradient-text">
            Portfolio
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-1"
        >
          <button onClick={() => scrollToSection("home")} className="nav-link active">
            Home
          </button>
          <button onClick={() => scrollToSection("about")} className="nav-link">
            About
          </button>
          <button onClick={() => scrollToSection("skills")} className="nav-link">
            Skills
          </button>
          <button onClick={() => scrollToSection("projects")} className="nav-link">
            Projects
          </button>
          <button onClick={() => scrollToSection("contact")} className="nav-link">
            Contact
          </button>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <Button
            onClick={() => scrollToSection("contact")}
            className="gradient-bg"
          >
            Get in Touch
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/95 backdrop-blur-md"
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-left py-2 px-4 hover:bg-secondary rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-left py-2 px-4 hover:bg-secondary rounded-md"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-left py-2 px-4 hover:bg-secondary rounded-md"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-left py-2 px-4 hover:bg-secondary rounded-md"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-left py-2 px-4 hover:bg-secondary rounded-md"
            >
              Contact
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="gradient-bg w-full"
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;