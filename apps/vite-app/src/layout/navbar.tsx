import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains("dark"));

  // Handle Dark Mode Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <header className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary hover:text-primary-foreground">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-muted hover:bg-muted-foreground transition-colors">
          <span className="sr-only">Toggle Dark Mode</span>
          {isDarkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
        </button>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 rounded bg-muted hover:bg-muted-foreground transition-colors" onClick={toggleMenu}>
          <span className="sr-only">Toggle Menu</span>
          {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-black/50 z-40" onClick={toggleMenu}></motion.div>

            {/* Sliding Menu */}
            <motion.nav initial={{ x: "-10%" }} animate={{ x: 0 }} exit={{ x: "-10%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed top-0 left-0 z-50 w-3/4 max-w-sm h-full bg-background border-r border-border shadow-lg">
              <div className="flex flex-col space-y-4 p-6">
                <button className="flex items-center justify-end" onClick={toggleMenu}>
                  <X className="w-6 h-6 text-foreground" />
                </button>
                <Link to="/" className="text-lg text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                  Home
                </Link>
                <Link to="/about" className="text-lg text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                  About
                </Link>
                <Link to="/contact" className="text-lg text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                  Contact
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
