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
import { Sprout, Menu, X, LogIn, UserPlus, ChevronDown, Search, Globe, Users, Calendar, BookOpen, Bell, Star } from "lucide-react";

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
    { href: "/", label: "Home", icon: <Globe className="w-4 h-4" /> },
    { 
      href: "/framework", 
      label: "F-SAMA Framework", 
      icon: <BookOpen className="w-4 h-4" />,
      badge: "10 Elements",
      dropdown: [
        { href: "/framework/farm-power", label: "1. Farm Power", description: "Mechanization technologies and equipment" },
        { href: "/framework/innovative-financing", label: "2. Innovative Financing", description: "Funding mechanisms and models" },
        { href: "/framework/sustainable-systems", label: "3. Sustainable Systems", description: "Environmental sustainability practices" },
        { href: "/framework/mechanization", label: "4. Sustainable Mechanization", description: "Core mechanization principles" },
        { href: "/framework/innovative-systems", label: "5. Innovative Systems", description: "Technology innovation frameworks" },
        { href: "/framework/land-preparation", label: "6. Land Preparation", description: "Soil management and preparation" },
        { href: "/framework/social-sustainability", label: "7. Social Sustainability", description: "Community and social impact" },
        { href: "/framework/human-resources", label: "8. Human Resources", description: "Skills development and training" },
        { href: "/framework/vision-policy-strategy", label: "9. Vision & Policy Strategy", description: "Strategic planning and governance" },
        { href: "/framework/cooperation-networking", label: "10. Cooperation & Networking", description: "Partnerships and collaboration" },
      ]
    },
    { 
      href: "/webinars", 
      label: "Webinars", 
      icon: <Users className="w-4 h-4" />,
      badge: "Live",
      dropdown: [
        { href: "/webinars", label: "All Webinars", description: "Complete webinar library" },
        { href: "/webinars/upcoming", label: "Upcoming Events", description: "Schedule and registration" },
        { href: "/webinars/presentations", label: "Downloads", description: "Presentations and resources" },
      ]
    },
    { href: "/news", label: "News & Events", icon: <Calendar className="w-4 h-4" /> },
    { href: "/resources", label: "Resources", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/about", label: "About", icon: <Users className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <Globe className="w-4 h-4" /> },
  ];

  const quickSearchResults = [
    { title: "F-SAMA Framework", href: "/resources", type: "Document" },
    { title: "Upcoming Webinars", href: "/webinars/upcoming", type: "Events" },
    { title: "Farm Power Solutions", href: "/framework/farm-power", type: "Framework" },
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
        style={{ transform: `scaleX(${scrollProgress / 100})`, transformOrigin: 'left' }}
      />
      
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white text-center py-2 text-sm relative z-50">
        <div className="container mx-auto px-6 flex items-center justify-center gap-2">
          <Star className="w-4 h-4" />
          <span>Join our next webinar on Agricultural Mechanization - Register now!</span>
          <Link href="/webinars/upcoming" className="underline hover:no-underline">
            Learn More
          </Link>
        </div>
      </div>
      
      <header 
        className={`fixed top-8 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-b border-gray-200/50 dark:border-gray-700/50" 
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Sprout className="text-white" size={24} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  AfricaMechanize
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Sustainable Agricultural Mechanization
                </p>
              </div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = location === item.href || (item.dropdown && item.dropdown.some(sub => location === sub.href));
                
                if (item.dropdown) {
                  return (
                    <DropdownMenu key={item.label}>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className={`relative px-4 py-2 h-auto font-medium transition-all duration-300 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 group ${
                            isActive ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-300 hover:text-primary"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            {item.label}
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 ml-1">
                                {item.badge}
                              </Badge>
                            )}
                            <ChevronDown className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                          </div>
                          {isActive && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-80 p-2">
                        <div className="grid gap-1">
                          {item.dropdown.map((dropdownItem) => (
                            <DropdownMenuItem key={dropdownItem.href} asChild className="p-0">
                              <Link 
                                href={dropdownItem.href}
                                className="flex flex-col items-start gap-1 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                <div className="font-medium text-sm">{dropdownItem.label}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 ${
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-gray-700 dark:text-gray-300 hover:text-primary"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Enhanced Controls */}
            <div className="flex items-center space-x-2">
              {/* Search - Simplified version without Dialog */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hidden md:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10"
                    data-testid="button-search"
                  >
                    <Search className="w-4 h-4" />
                    <span className="text-sm">Search</span>
                    <Badge variant="outline" className="text-xs px-2 py-0.5">⌘K</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <div className="font-semibold flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Search AfricaMechanize
                    </div>
                    <div className="text-sm text-gray-500">Find resources and content</div>
                  </div>
                  <div className="p-2">
                    <form onSubmit={handleSearch} className="relative mb-3">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search resources, webinars..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2"
                      />
                    </form>
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400 px-2 py-1">Quick Links</div>
                      {quickSearchResults.map((result, index) => (
                        <Link
                          key={index}
                          href={result.href}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                            <BookOpen className="w-3 h-3 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{result.title}</div>
                            <div className="text-xs text-gray-500">{result.type}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative hidden md:flex">
                    <Bell className="w-4 h-4" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">2</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <div className="font-semibold">Notifications</div>
                    <div className="text-sm text-gray-500">2 new updates</div>
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="font-medium text-sm">New Webinar Available</div>
                      <div className="text-xs text-gray-500">Sustainable Mechanization Trends - Join us live</div>
                      <div className="text-xs text-gray-400 mt-1">2 hours ago</div>
                    </div>
                    <div className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                      <div className="font-medium text-sm">Framework Update</div>
                      <div className="text-xs text-gray-500">F-SAMA Framework v2.1 now available</div>
                      <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

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

          {/* Enhanced Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-b-xl">
              {/* Mobile Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2"
                  />
                </form>
              </div>

              <div className="flex flex-col space-y-1 p-4">
                {navItems.map((item) => {
                  const isActive = location === item.href || (item.dropdown && item.dropdown.some(sub => location === sub.href));
                  
                  if (item.dropdown) {
                    return (
                      <div key={item.label} className="space-y-2">
                        <div className={`flex items-center gap-3 p-3 rounded-lg font-medium ${
                          isActive ? "bg-primary/10 text-primary" : "text-gray-700 dark:text-gray-300"
                        }`}>
                          {item.icon}
                          {item.label}
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 ml-auto">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="ml-6 space-y-1">
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
                      className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
                
                {/* Mobile Authentication */}
                {!isLoading && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-3">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {(user?.firstName?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {user?.firstName || user?.email}
                            </div>
                            <div className="text-xs text-gray-500">
                              Welcome back!
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Link 
                            href="/profile" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5 transition-colors"
                            data-testid="mobile-link-profile"
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </Link>
                          <Link 
                            href="/settings" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5 transition-colors"
                            data-testid="mobile-link-settings"
                          >
                            <Settings className="w-4 h-4" />
                            Settings
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Button variant="ghost" size="sm" asChild className="justify-start h-12">
                          <Link href="/login" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-login">
                            <LogIn className="w-4 h-4 mr-3" />
                            Sign In
                          </Link>
                        </Button>
                        <Button size="sm" asChild className="justify-start h-12">
                          <Link href="/register" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-register">
                            <UserPlus className="w-4 h-4 mr-3" />
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
