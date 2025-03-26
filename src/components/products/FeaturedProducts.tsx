
import React from 'react';
import { ArrowRight } from 'lucide-react';

const featuredProducts = [
  {
    name: "Organic Superfood Mix",
    // price: "$24.99",
    rating: 4.9,
    image: "https://media.istockphoto.com/id/1018199524/photo/salad-mix-plate-shot-from-above-on-rustic-wooden-table.jpg?s=612x612&w=0&k=20&c=8D0bnbOYN-JMEZcxAdI8RjIuNRpx7UCFbjqWv4qCBGs=",
    tag: "Bestseller"
  },
  {
    name: "Longevity Support Complex",
    // price: "$39.99",
    rating: 4.8,
    image: "https://media.istockphoto.com/id/471065689/photo/smiling-medical-staff-support-smiling-elderly-female-patient.jpg?s=612x612&w=0&k=20&c=LW9q37sPBd2bgH1uxWd3WS8HS5MtNLN_luHR-aIqlm4=",
    tag: "New"
  },
  {
    name: "Premium Yoga Set",
    // price: "$89.99",
    rating: 4.7,
    image: "https://cdn.pixabay.com/photo/2021/10/19/11/29/yoga-6723306_640.jpg",
    tag: "Popular"
  },
  {
    name: "Natural Sleep Aid",
    // price: "$19.99",
    rating: 4.9,
    image: "https://cdn.pixabay.com/photo/2017/07/25/09/10/people-2537324_640.jpg",
    tag: "Essential"
  }
];

const FeaturedProducts = () => {
  return (
    <section id="featured" className="py-20 bg-gradient-to-b from-white to-livrr-beige/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Our most popular and highly-rated products for optimal wellness
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.name}
              className="reveal glass-card rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500";
                    console.log(`Failed to load image: ${product.image}`);
                  }}
                />
                
                <div className="absolute top-4 right-4 bg-livrr-green text-white text-xs font-medium px-3 py-1 rounded-full">
                  {product.tag}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-livrr-green-dark">{product.name}</h3>
                  {/* <span className="font-bold text-livrr-green">{product.price}</span> */}
                </div>
                
                <div className="flex items-center">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`} 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-livrr-gray-dark">{product.rating}/5.0</span>
                </div>
                
                <a href="/waitlist" className="mt-4 w-full button-primary text-sm py-2 block text-center">
                  Join Waitlist
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#waitlist" className="button-secondary group">
            <span className="flex items-center gap-2">
              Join Waitlist for Early Access
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
