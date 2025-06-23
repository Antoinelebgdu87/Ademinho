import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for admin key combination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "1") {
        e.preventDefault();
        window.location.href = "/admin";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/works", label: "WORKS" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-bold text-xl tracking-tight"
          >
            ADEMINHO 🎬
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`font-display font-medium text-sm tracking-wider transition-colors duration-300 ${
                  location.pathname === path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <Button
            asChild
            className="hidden md:block font-display font-semibold tracking-wide"
          >
            <Link to="/#order">COMMANDER</Link>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu?.classList.toggle("hidden");
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className="hidden md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-4">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`font-display font-medium text-sm tracking-wider transition-colors duration-300 ${
                  location.pathname === path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
                onClick={() => {
                  const menu = document.getElementById("mobile-menu");
                  menu?.classList.add("hidden");
                }}
              >
                {label}
              </Link>
            ))}
            <Button
              asChild
              className="w-full font-display font-semibold tracking-wide"
            >
              <Link to="/#order">COMMANDER</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
