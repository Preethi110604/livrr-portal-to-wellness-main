
import React from 'react';

const dietProducts = [
  {
    name: "Keto Diet Box",
    description: "Complete meal essentials for 7 days of keto-friendly eating",
    // price: "$149.99",
    image: "https://cdn.pixabay.com/photo/2019/01/12/16/21/breakfast-3928800_640.jpg",
    tag: "Popular",
    category: "Diet Plan"
  },
  {
    name: "Plant-Based Protein Pack",
    description: "Organic plant proteins for vegetarians and vegans",
    // price: "$89.99",
    image: "https://media.istockphoto.com/id/1340663810/photo/purchase-healthy-clean-food-for-vegetarians.jpg?s=612x612&w=0&k=20&c=wbzXGbajh9fQtG7MCp-wFwKJD-Insfy_2OdC7M4SAbs=",
    tag: "Bestseller",
    category: "Diet Plan"
  },
  {
    name: "Low-Carb Essentials",
    description: "Carb-conscious foods for managed weight loss",
    // price: "$119.99",
    image: "https://media.istockphoto.com/id/1096945386/photo/keto-diet-foods.jpg?s=612x612&w=0&k=20&c=V2pKy2Nt-O-hjahV-5AIJjEEp6wtgrCKD_pLyDtgQds=",
    tag: "New",
    category: "Diet Plan"
  },
  {
    name: "Meal Planning Consultation",
    description: "Personalized nutrition guidance for your health goals",
    // price: "$79.99",
    image: "https://media.istockphoto.com/id/1140134131/photo/healthy-nutrition-expert-making-weekly-meal-plan-for-client.jpg?s=612x612&w=0&k=20&c=_4xQAJ9umXUywWnqvMvoxZa4kYhZCrb7GPPr9rEJktw=",
    tag: "Essential",
    category: "Diet Plan"
  },
  {
    name: "7-Day Balanced Meal Plan",
    description: "Complete weekly meal plan with shopping list and recipes",
    // price: "$59.99",
    image: "https://media.istockphoto.com/id/1425395859/photo/notepad-with-inscription-meal-plan-on-yellow-background-and-containers-with-food.jpg?s=612x612&w=0&k=20&c=tr8c0xsdHuD2YQYeUdjZ2mNK1lkG2pbc2623XmrEF00=",
    tag: "New",
    category: "Diet Plan"
  },
  {
    name: "Health Coach Consultation",
    description: "One-on-one session with a certified nutrition expert",
    // price: "$99.99",
    image: "https://media.istockphoto.com/id/2154184023/photo/young-female-on-online-therapy-with-psychologist-psychotherapist.jpg?s=612x612&w=0&k=20&c=1cD3otHO_QLZA3z5rvZwlnoHWBz7_u9TlwSAKfaO8vY=",
    tag: "Premium",
    category: "Diet Plan"
  }
];

const DietProducts = () => {
  return (
    <section id="diet-plans" className="py-20 bg-gradient-to-b from-livrr-beige/10 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">Diet-Based Products</h2>
          <p className="section-subtitle">
            Specially curated diet plans and products to support your nutritional needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dietProducts.map((product, index) => (
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
                
                <div className="absolute bottom-4 left-4 bg-livrr-beige/80 backdrop-blur-sm text-livrr-green-dark text-xs font-medium px-3 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-livrr-green-dark">{product.name}</h3>
                  {/* <span className="font-bold text-livrr-green">{product.price}</span> */}
                </div>
                
                <p className="text-livrr-gray-dark text-sm mb-4">{product.description}</p>
                
                <a href="/waitlist" className="w-full button-primary text-sm py-2 block text-center">
                  Join Waitlist
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DietProducts;
