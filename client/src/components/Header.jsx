import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useApp } from "../contexts/AppContext";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./auth/UserMenu";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import {
  Sprout,
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  Search,
  Globe,
  Users,
  Calendar,
  BookOpen,
  Bell,
  Star,
} from "lucide-react";

export const Header = () => {
  const [location] = useLocation();
  const { mobileMenuOpen, setMobileMenuOpen, scrollProgress } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
    { href: "/legacy-content", label: "Legacy Resources", badge: "42 Resources" },
    {
      href: "/framework",
      label: "Framework",
      dropdown: [
        { href: "/framework/farm-power", label: "Farm Power" },
        {
          href: "/framework/innovative-financing",
          label: "Innovative Financing",
        },
        {
          href: "/framework/sustainable-systems",
          label: "Sustainable Systems",
        },
        {
          href: "/framework/mechanization",
          label: "Sustainable Mechanization",
        },
        {
          href: "/framework/social-sustainability",
          label: "Social Sustainability",
        },
        { href: "/framework/human-resources", label: "Human Resources" },
      ],
    },
    {
      href: "/webinars",
      label: "Webinars",
      dropdown: [
        { href: "/webinars", label: "All Webinars" },
        { href: "/webinars/upcoming", label: "Upcoming" },
        { href: "/webinars/presentations", label: "Downloads" },
      ],
    },
    { href: "/news", label: "News" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const quickSearchResults = [
    { title: "F-SAMA Framework", href: "/resources", type: "Document" },
    { title: "Upcoming Webinars", href: "/webinars/upcoming", type: "Events" },
    {
      title: "Farm Power Solutions",
      href: "/framework/farm-power",
      type: "Framework",
    },
    { title: "Latest Newsletter", href: "/resources", type: "Publication" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/resources?search=${encodeURIComponent(searchTerm)}`;
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary z-50 transform-gpu transition-transform duration-300"
        style={{
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: "left",
        }}
      />

      {/* Compact Announcement Bar */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white text-center py-1 text-xs relative z-40">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
          <span>
            Join our next webinar on Agricultural Mechanization - Register now!
          </span>
          <Link
            href="/webinars/upcoming"
            className="underline hover:no-underline"
          >
            Learn More
          </Link>
        </div>
      </div>

      <header
        className={`fixed top-6 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-gray-200/50 dark:border-gray-700/50"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
        }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Compact Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                <Sprout className="text-white" size={20} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AfricaMechanize
                </h1>
              </div>
            </Link>

            {/* Compact Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive =
                  location === item.href ||
                  (item.dropdown &&
                    item.dropdown.some((sub) => location === sub.href));

                if (item.dropdown) {
                  return (
                    <DropdownMenu key={item.label}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`font-medium ${
                            isActive
                              ? "text-primary"
                              : "text-gray-700 dark:text-gray-300 hover:text-primary"
                          }`}
                        >
                          {item.label}
                          <ChevronDown className="ml-1 h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        {item.dropdown.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.href} asChild>
                            <Link
                              href={dropdownItem.href}
                              className="cursor-pointer"
                            >
                              {dropdownItem.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Compact Controls */}
            <div className="flex items-center space-x-1">
              {/* Search - Desktop only */}
              <Button
                variant="ghost"
                size="sm"
                className="hidden xl:flex"
                onClick={() => (window.location.href = "/resources")}
                data-testid="button-search"
              >
                <Search className="w-4 h-4" />
              </Button>

              <LanguageToggle />
              <ThemeToggle />

              {/* Authentication */}
              {!isLoading && (
                <div className="hidden lg:flex items-center space-x-1">
                  {isAuthenticated ? (
                    <UserMenu />
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        data-testid="button-header-login"
                      >
                        <Link href="/login">
                          <LogIn className="w-4 h-4 lg:mr-1" />
                          <span className="hidden xl:inline">Sign In</span>
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        asChild
                        data-testid="button-header-register"
                      >
                        <Link href="/register">
                          <UserPlus className="w-4 h-4 lg:mr-1" />
                          <span className="hidden xl:inline">Join</span>
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
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* Improved Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
              <div className="max-h-[70vh] overflow-y-auto">
                {/* Mobile Search */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <Link
                    href="/resources"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Search className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Search Resources
                    </span>
                  </Link>
                </div>

                <div className="p-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive =
                      location === item.href ||
                      (item.dropdown &&
                        item.dropdown.some((sub) => location === sub.href));

                    if (item.dropdown) {
                      return (
                        <div key={item.label} className="space-y-1">
                          <div
                            className={`p-3 rounded-lg font-medium ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {item.label}
                          </div>
                          <div className="ml-4 space-y-1">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`block p-2 rounded-md text-sm transition-colors ${
                                  location === subItem.href
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/5"
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block p-3 rounded-lg font-medium transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  {/* Mobile Authentication */}
                  {!isLoading && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-2">
                      {isAuthenticated ? (
                        <div className="space-y-2">
                          <div className="p-3 bg-primary/5 rounded-lg">
                            <div className="font-medium text-sm">
                              {user?.firstName || user?.email}
                            </div>
                          </div>
                          <Link
                            href="/profile"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5 transition-colors"
                            data-testid="mobile-link-profile"
                          >
                            Profile
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link
                            href="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block p-3 text-center bg-primary text-white rounded-lg font-medium"
                            data-testid="mobile-button-login"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/register"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block p-3 text-center border border-primary text-primary rounded-lg font-medium"
                            data-testid="mobile-button-register"
                          >
                            Join Now
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};
