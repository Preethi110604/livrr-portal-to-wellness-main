import { motion } from "framer-motion";

const ayurvedaProducts = [
  {
    name: "Ashwagandha Powder",
    description: "Boosts immunity and reduces stress.",
    image: "https://media.istockphoto.com/id/1684694377/photo/commonly-known-as-ashwagandha-is-an-important-medicinal-plant-that-has-been-used-in-ayurved.jpg?s=612x612&w=0&k=20&c=MMZClWMSh4biqSY0Rjm5HDhqWVRIX-mnm2Dy5hYuP8c="
  },
  {
    name: "Triphala Churna",
    description: "Aids digestion and detoxifies the body.",
    image: "https://media.istockphoto.com/id/991001808/photo/indian-ayurvedic-triphala-churan-or-trifala-powder-is-an-ancient-medicine-for-bowel-movement.jpg?s=612x612&w=0&k=20&c=lMQX7qv__1u1GCrB27-7q5Ddojjr8V95xIdmN2w7pAc="
  },
  {
    name: "Brahmi Capsules",
    description: "Enhances memory and cognitive function.",
    image: "https://media.istockphoto.com/id/476056382/photo/tablets-with-a-plant-close-up.jpg?s=612x612&w=0&k=20&c=1LSFrFtGRAfjpM3X0wEhtuaToBoihSIkqS1Jc1Ie6ng="
  },
  {
    name: "Neem Oil",
    description: "Improves skin health and fights acne.",
    image: "https://media.istockphoto.com/id/1321144561/photo/neem-oil-in-bottle-and-neem-leaf-with-twig-on-wooden-background.jpg?s=612x612&w=0&k=20&c=_dNcitwcofCx3iimFZ6UNN0oAKdJ0RfPghl6UN8KP88="
  },
  {
    name: "Chyawanprash",
    description: "Rich in antioxidants for overall wellness.",
    image: "https://media.istockphoto.com/id/860217280/photo/indian-fresh-gooseberry-juice-or-stock-photo-of-amla-juice-selective-focus.jpg?s=612x612&w=0&k=20&c=NGe4AisjGEouFX8jGMwjkknWbvPZ4IKrLBstcv7yePE="
  }
];

const AyurvedaPage = () => {
  return (
    <div className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/105028/pexels-photo-105028.jpeg')`
      }}>
      {/* Overlay for shadow effect */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <motion.div 
        className="relative text-white p-10"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-6">Ayurveda</h1>
        <p className="text-lg max-w-3xl">
          Ayurveda is an ancient Indian medical system using herbs, diet, and lifestyle practices
          to balance the body, mind, and spirit for optimal health and wellness.
        </p>
      </motion.div>

      {/* Product Section */}
      <motion.div
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.3 } }
        }}
      >
        {ayurvedaProducts.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img src={product.image} alt={product.name} className="rounded-lg mb-4 w-full h-48 object-cover" />
            <h3 className="text-xl font-semibold text-black">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AyurvedaPage;
