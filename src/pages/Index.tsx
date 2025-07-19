import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coffee, Star, MapPin, Clock, ArrowRight, Heart } from 'lucide-react';
import heroCafe from '@/assets/hero-cafe.jpg';
import coffeeHero from '@/assets/coffee-hero.jpg';
import pastries from '@/assets/pastries.jpg';

const Index = () => {
  const featuredItems = [
    {
      name: 'Artisan Espresso',
      description: 'Rich, bold espresso with notes of dark chocolate',
      price: '$4.50',
      image: coffeeHero
    },
    {
      name: 'Fresh Croissants',
      description: 'Buttery, flaky croissants baked fresh daily',
      price: '$3.50',
      image: pastries
    },
    {
      name: 'Honey Lavender Latte',
      description: 'Smooth espresso with local honey and lavender',
      price: '$5.75',
      image: coffeeHero
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'The best coffee in town! The atmosphere is so welcoming and the staff really knows their craft.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      text: 'I come here every morning before work. Their pastries are incredible and the coffee is always perfect.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      text: 'A true neighborhood gem. Great place to work or catch up with friends.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCafe})` }}
        ></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gold text-coffee-dark text-sm px-4 py-2">
              Est. 2010 • Artisan Crafted
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-foreground leading-tight">
              Welcome to<br />
              <span className="text-gold">Artisan Bistro</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Where exceptional coffee meets warm hospitality. Experience handcrafted beverages, 
              fresh pastries, and a community that feels like home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gold" size="xl" className="shadow-warm">
                <Link to="/menu">
                  Explore Our Menu <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            <Button asChild variant="outline" size="xl" className="bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20">
              <Link to="/reservations">
                Book a Table
              </Link>
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-coffee-medium/10 rounded-full">
                  <Coffee className="h-8 w-8 text-coffee-medium" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Premium Coffee</h3>
              <p className="text-muted-foreground">
                Ethically sourced beans roasted to perfection by our expert team.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-coffee-medium/10 rounded-full">
                  <Heart className="h-8 w-8 text-coffee-medium" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Made with Love</h3>
              <p className="text-muted-foreground">
                Every drink and pastry is crafted with passion and attention to detail.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-coffee-medium/10 rounded-full">
                  <MapPin className="h-8 w-8 text-coffee-medium" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Community Hub</h3>
              <p className="text-muted-foreground">
                A welcoming space where neighbors gather and friendships bloom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Featured Favorites</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the items that keep our customers coming back for more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <Card key={index} className="group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-2 bg-gradient-card border-border/50">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-coffee-dark transition-colors">
                      {item.name}
                    </CardTitle>
                    <span className="text-lg font-bold text-coffee-medium">
                      {item.price}
                    </span>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="warm" size="lg">
              <Link to="/order">
                Order Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our amazing community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background/10 backdrop-blur-sm border-primary-foreground/20 text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-primary-foreground/90 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-gold">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-card rounded-lg p-8 md:p-12 border border-border/50 shadow-warm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Visit Us Today</h2>
                <p className="text-muted-foreground mb-6">
                  Located in the heart of downtown, we're easy to find and always ready to welcome you 
                  with a perfect cup of coffee and a warm smile.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-coffee-medium" />
                    <span className="text-foreground">123 Coffee Street, Downtown</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-coffee-medium" />
                    <span className="text-foreground">Mon-Fri: 6AM-8PM • Weekends: 7AM-9PM</span>
                  </div>
                </div>

                <Button asChild variant="cafe" size="lg">
                  <Link to="/contact">
                    Get Directions <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <img
                  src={heroCafe}
                  alt="Cafe Interior"
                  className="rounded-lg shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
