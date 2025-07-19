import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import coffeeHero from '@/assets/coffee-hero.jpg';
import pastries from '@/assets/pastries.jpg';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'tea', name: 'Tea' },
    { id: 'pastries', name: 'Pastries' },
    { id: 'meals', name: 'Meals' }
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Artisan Espresso',
      description: 'Rich, bold espresso with notes of dark chocolate and caramel',
      price: '$4.50',
      category: 'coffee',
      image: coffeeHero,
      featured: true,
      dietary: ['vegan']
    },
    {
      id: 2,
      name: 'Honey Lavender Latte',
      description: 'Smooth espresso with steamed milk, local honey, and dried lavender',
      price: '$5.75',
      category: 'coffee',
      image: coffeeHero,
      dietary: ['vegetarian']
    },
    {
      id: 3,
      name: 'Earl Grey Supreme',
      description: 'Premium Earl Grey blend with bergamot and cornflower petals',
      price: '$3.25',
      category: 'tea',
      image: coffeeHero,
      dietary: ['vegan', 'gluten-free']
    },
    {
      id: 4,
      name: 'Fresh Croissants',
      description: 'Buttery, flaky croissants baked fresh daily',
      price: '$3.50',
      category: 'pastries',
      image: pastries,
      dietary: ['vegetarian']
    },
    {
      id: 5,
      name: 'Avocado Toast',
      description: 'Sourdough toast topped with smashed avocado, cherry tomatoes, and hemp seeds',
      price: '$8.95',
      category: 'meals',
      image: pastries,
      dietary: ['vegan', 'healthy']
    },
    {
      id: 6,
      name: 'Chocolate Muffin',
      description: 'Double chocolate muffin with Belgian chocolate chips',
      price: '$4.25',
      category: 'pastries',
      image: pastries,
      dietary: ['vegetarian']
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const getDietaryColor = (dietary: string) => {
    const colors: { [key: string]: string } = {
      'vegan': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'vegetarian': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'gluten-free': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'healthy': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    };
    return colors[dietary] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Discover our carefully curated selection of artisan coffee, premium teas, 
            fresh pastries, and wholesome meals.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "warm" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="transition-all duration-200"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-warm transition-all duration-300 transform hover:-translate-y-1 bg-gradient-card border-border/50">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {item.featured && (
                    <Badge className="absolute top-3 left-3 bg-gold text-coffee-dark">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-coffee-dark transition-colors">
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
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.dietary.map((diet) => (
                      <Badge key={diet} variant="outline" className={getDietaryColor(diet)}>
                        {diet}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="warm" size="sm" className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;