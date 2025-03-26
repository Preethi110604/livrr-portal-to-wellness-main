import { motion } from "framer-motion";

const naturopathyProducts = [
  {
    name: "Aloe Vera Juice",
    description: "Good for digestion and skin health.",
    image: "https://media.istockphoto.com/id/1254597255/photo/aloe-vera-for-drinking-on-wood-table.jpg?s=612x612&w=0&k=20&c=GEFyhoLeNJAqVj4ASAUvFQNtE0p5bbOSi9tuXeaHjL4="
  },
  {
    name: "Wheatgrass Powder",
    description: "Rich in nutrients and detoxifying properties.",
    image: "https://media.istockphoto.com/id/1422550916/photo/barley-grass-green-powder-in-wooden-bowl-with-wooden-spoon-and-green-sprouts-on-white.jpg?s=612x612&w=0&k=20&c=BH4mX3_FUbariv-RzrNdPWNxNAJXshyQTeavLuaMo74="
  },
  {
    name: "Spirulina Tablets",
    description: "A powerful antioxidant and immune booster.",
    image: "https://media.istockphoto.com/id/1336503088/photo/spirulina-maca-and-moringa-powder-and-pills.jpg?s=612x612&w=0&k=20&c=isuk_wyaCcPzK2M3LahIR5A9gTT7bea3JACBauRXv3o="
  },
  {
    name: "Moringa Capsules",
    description: "Rich in vitamins and minerals for overall health.",
    image: "https://media.istockphoto.com/id/1206323575/photo/organic-nutritional-moringa-moringa-oleifera.jpg?s=612x612&w=0&k=20&c=7ylpOCwShF4Kz6htBvZMGCz_UxC2oV8OL3n35sm-cDk="
  },
  {
    name: "Flaxseed Oil",
    description: "Supports heart health and digestion.",
    image: "https://media.istockphoto.com/id/1177630853/photo/ffax-seed-oil-and-flax-seeds.jpg?s=612x612&w=0&k=20&c=XOT-P2tX_6TYUJ1Tv7ph67kT6aES4UBUHWcFyLjDktg="
  }
];

const Naturopathy = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1277145238/photo/large-variety-of-multi-colored-dried-tea-leaves-and-flowers-on-the-table.jpg?s=612x612&w=0&k=20&c=e37c4_5934iFqFcuhTJIMNiW4vCoSvNGw6ZjgzW4COs=')`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <motion.div
        className="relative text-white p-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold mb-6">Naturopathy Medicine</h1>
        <p className="text-lg max-w-3xl">
          Naturopathy is a holistic approach to wellness that focuses on natural remedies, including
          herbs, nutrition, and lifestyle practices, to support the body's healing abilities.
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
        {naturopathyProducts.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-black">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Naturopathy;
