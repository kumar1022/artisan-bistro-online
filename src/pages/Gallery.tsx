import { Card, CardContent } from '@/components/ui/card';

const Gallery = () => {
  // Sample gallery images - in a real app, these would come from a database
  const galleryImages = [
    {
      id: 1,
      title: 'Coffee Art',
      category: 'Beverages',
      image: '/src/assets/coffee-hero.jpg'
    },
    {
      id: 2,
      title: 'Cafe Interior',
      category: 'Ambiance',
      image: '/src/assets/hero-cafe.jpg'
    },
    {
      id: 3,
      title: 'Fresh Pastries',
      category: 'Food',
      image: '/src/assets/pastries.jpg'
    },
    // Add more images as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take a look at our beautiful cafe, delicious food, and warm atmosphere
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coming Soon Section */}
      <div className="text-center mt-12 p-8 bg-secondary/20 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">More Photos Coming Soon</h2>
        <p className="text-muted-foreground">
          We're constantly updating our gallery with new photos of our dishes, events, and cafe atmosphere. 
          Follow us on social media for the latest updates!
        </p>
      </div>
    </div>
  );
};

export default Gallery;