import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Coffee, User, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Gallery', href: '/gallery' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Coffee className="h-8 w-8 text-coffee-medium group-hover:text-coffee-dark transition-colors" />
            <span className="font-bold text-xl text-foreground group-hover:text-coffee-dark transition-colors">
              Artisan Bistro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-coffee-medium",
                  isActive(item.href)
                    ? "text-coffee-dark border-b-2 border-coffee-medium"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/order">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order
              </Link>
            </Button>
            <Button variant="warm" size="sm" asChild>
              <Link to="/reservations">Reserve Table</Link>
            </Button>
            {user ? (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/account">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    isActive(item.href)
                      ? "text-coffee-dark bg-secondary"
                      : "text-muted-foreground hover:text-coffee-medium hover:bg-secondary/50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/order">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Order Online
                  </Link>
                </Button>
                <Button variant="warm" className="w-full" asChild>
                  <Link to="/reservations">Reserve Table</Link>
                </Button>
                {user ? (
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/account">
                      <User className="h-4 w-4 mr-2" />
                      My Account
                    </Link>
                  </Button>
                ) : (
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/auth">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;