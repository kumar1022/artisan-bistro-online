import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Users, Coffee } from 'lucide-react';
import heroCafe from '@/assets/hero-cafe.jpg';

const About = () => {
  const values = [
    {
      icon: Coffee,
      title: 'Quality First',
      description: 'We source the finest beans from sustainable farms and roast them to perfection in small batches.'
    },
    {
      icon: Heart,
      title: 'Community Focus',
      description: 'Our cafe is a gathering place where neighbors become friends and great conversations flourish.'
    },
    {
      icon: Award,
      title: 'Artisan Crafted',
      description: 'Every drink is carefully crafted by our skilled baristas who are passionate about coffee excellence.'
    },
    {
      icon: Users,
      title: 'Local Support',
      description: 'We proudly partner with local suppliers and support our community through various initiatives.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Head Barista & Co-Founder',
      description: 'With 15 years in the coffee industry, Sarah brings expertise and passion to every cup.'
    },
    {
      name: 'Marco Rodriguez',
      role: 'Roaster & Co-Founder',
      description: 'Marco sources our beans directly from farmers and perfects our signature roasting profiles.'
    },
    {
      name: 'Emma Thompson',
      role: 'Pastry Chef',
      description: 'Emma creates our daily selection of fresh pastries and seasonal treats.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCafe})` }}
        ></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Our Story
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Founded in 2010 with a simple mission: to create the perfect coffee experience 
            that brings people together and brightens their day.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Crafting Excellence Since 2010
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  What started as a small neighborhood coffee shop has grown into a beloved 
                  community hub where coffee lovers gather to enjoy exceptional brews and 
                  meaningful connections.
                </p>
                <p>
                  Our journey began when founders Sarah and Marco discovered their shared 
                  passion for coffee during a trip to Costa Rica. Inspired by the dedication 
                  of local farmers and the rich coffee culture, they decided to bring that 
                  same commitment to quality and community back home.
                </p>
                <p>
                  Today, we continue to honor that vision by sourcing directly from farmers, 
                  roasting in small batches, and training our team to deliver the perfect 
                  cup every time.
                </p>
              </div>
              <div className="mt-8">
                <Button variant="cafe" size="lg">
                  Visit Our Menu
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroCafe}
                alt="Artisan Bistro Interior"
                className="rounded-lg shadow-warm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by our core principles and commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center bg-gradient-card border-border/50 hover:shadow-soft transition-all duration-300">
                  <CardContent className="pt-8">
                    <div className="mb-4 flex justify-center">
                      <div className="p-3 bg-coffee-medium/10 rounded-full">
                        <IconComponent className="h-8 w-8 text-coffee-medium" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind every perfect cup and warm welcome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center bg-gradient-card border-border/50 hover:shadow-warm transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="pt-8">
                  <div className="mb-4">
                    <div className="w-24 h-24 bg-gradient-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-coffee-medium font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;