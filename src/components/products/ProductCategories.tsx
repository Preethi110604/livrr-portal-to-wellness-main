import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/utils/animations';
import { ArrowRight } from 'lucide-react';

// Sample images and product paths
const categories = [
  {
    id: 'ayurveda',
    title: 'Ayurveda',
    image: 'https://images.pexels.com/photos/105028/pexels-photo-105028.jpeg',
    description: 'Ancient Indian system of medicine using herbs, diet, and lifestyle practices.',
    path: '/products/ayurveda'
  },
  {
    id: 'homeopathy',
    title: 'Homeopathy',
    image: 'https://images.pexels.com/photos/31218404/pexels-photo-31218404/free-photo-of-calendula-essential-oil-in-sunlit-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Alternative medicine based on the concept that "like cures like" with highly diluted substances.',
    path: '/products/homeopathy'
  },
  {
    id: 'unani',
    title: 'Unani',
    image: 'https://media.istockphoto.com/id/1208785486/photo/macro-of-ayurvedic-medicine-tablets-in-a-wooden-spoon-with-dry-and-green-herbs-on-a-black.jpg?s=612x612&w=0&k=20&c=qwobZIwp79CkShH92ZSHFZJHyeA59WbDpUiH0KQ140k=',
    description: 'Traditional Persian and Arabic system focusing on the balance of bodily humors.',
    path: '/products/unani'
  },
  {
    id: 'siddha',
    title: 'Siddha',
    image: 'https://media.istockphoto.com/id/649182968/photo/turmeric-and-curcumin-used-in-asia-and-is-a-major-part-of-siddha-medicine-it-was-first-used-as.jpg?s=612x612&w=0&k=20&c=61z9BWmtIZB8PhGqd0roCEUv62rrA-3Y6O_1kHFxh2A=',
    description: 'Ancient Tamil medicinal system emphasizing spiritual practices and herbal remedies.',
    path: '/products/siddha'
  },
  {
    id: 'naturopathy',
    title: 'Naturopathy',
    image: 'https://media.istockphoto.com/id/1277145238/photo/large-variety-of-multi-colored-dried-tea-leaves-and-flowers-on-the-table.jpg?s=612x612&w=0&k=20&c=e37c4_5934iFqFcuhTJIMNiW4vCoSvNGw6ZjgzW4COs=',
    description: 'Natural healing methods focusing on diet, lifestyle, and preventative care.',
    path: '/products/naturopathy'
  },
  {
    id: 'tcm',
    title: 'Traditional Chinese Medicine',
    image: 'https://media.istockphoto.com/id/1549781688/photo/traditional-medicine.jpg?s=612x612&w=0&k=20&c=xhA7zWI6gLjziV1AaN_isWHoEjpprhk3pkHlin8xauI=',
    description: 'Ancient Chinese medicinal system using herbs, acupuncture, and holistic practices.',
    path: '/products/traditionalchinesemedicine'
  }
];

const ProductCategories = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.1);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container">
        <h2
          ref={titleRef}
          className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-opacity duration-1000 ${
            titleVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Explore Our Healing Traditions
        </h2>

        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-1000 ${
            cardsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-display font-semibold text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-white/90 mb-4 text-sm">{category.description}</p>

                {/* ✅ Navigate to individual page */}
                <Link
                  to={category.path}
                  className="inline-flex items-center text-sm font-medium text-white hover:text-livrr-green"
                >
                  <span>Explore {category.title}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* If you still want to load component on the same page, you can manage here */}
      {/* <div className="mt-12" ref={contentRef}></div> */}
    </section>
  );
};

export default ProductCategories;
