import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useApp } from "../contexts/AppContext";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./auth/UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X, LogIn, UserPlus } from "lucide-react";

export const Header = () => {
  const [location] = useLocation();
  const { mobileMenuOpen, setMobileMenuOpen, scrollProgress } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/framework", label: "Framework" },
    { href: "/events", label: "Events" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary z-50 transform-gpu transition-transform duration-300"
        style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: 'left' }}
      />
      
      <header 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg" 
            : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sprout className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AfricaMechanize
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Sustainable Agriculture
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 font-medium ${
                    location === item.href ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <ThemeToggle />
              
              {/* Authentication */}
              {!isLoading && (
                <div className="hidden lg:flex items-center space-x-2">
                  {isAuthenticated ? (
                    <UserMenu />
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" asChild data-testid="button-header-login">
                        <Link href="/login">
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Link>
                      </Button>
                      <Button size="sm" asChild data-testid="button-header-register">
                        <Link href="/register">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Now
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              )}
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 ${
                      location === item.href ? "text-primary" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Authentication */}
                {!isLoading && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Welcome back, {user?.firstName || user?.email}!
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Link 
                            href="/profile" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                            data-testid="mobile-link-profile"
                          >
                            Profile
                          </Link>
                          <Link 
                            href="/settings" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                            data-testid="mobile-link-settings"
                          >
                            Settings
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Button variant="ghost" size="sm" asChild className="justify-start">
                          <Link href="/login" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-login">
                            <LogIn className="w-4 h-4 mr-2" />
                            Sign In
                          </Link>
                        </Button>
                        <Button size="sm" asChild className="justify-start">
                          <Link href="/register" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-register">
                            <UserPlus className="w-4 h-4 mr-2" />
                            Join Now
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};
