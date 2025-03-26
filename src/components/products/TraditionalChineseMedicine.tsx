import { motion } from "framer-motion";

const chineseProducts = [
  {
    name: "Ginseng Root",
    description: "Boosts energy and immune system.",
    image: "https://media.istockphoto.com/id/1549781688/photo/traditional-medicine.jpg?s=612x612&w=0&k=20&c=xhA7zWI6gLjziV1AaN_isWHoEjpprhk3pkHlin8xauI="
  },
  {
    name: "Goji Berries",
    description: "Rich in antioxidants and good for eyesight.",
    image: "https://media.istockphoto.com/id/1173102152/photo/wolfberry-bowl-on-rustic-wooden-table.jpg?s=612x612&w=0&k=20&c=6OwTFa7YllzXtxRv8dxFvmGwDg_gl7BJaSMaCsOtYcw="
  },
  {
    name: "Reishi Mushroom",
    description: "Supports immune health and stress relief.",
    image: "https://media.istockphoto.com/id/1352464563/photo/dried-lingzhi-mushroom-isolated-on-white-background-with-clipping-path.jpg?s=612x612&w=0&k=20&c=LJD2LDc41u49P_hYBvUWv8iGd1kXl2QWxXWgTBeFc_s="
  },
  {
    name: "Dong Quai",
    description: "Balances hormones and supports blood circulation.",
    image: "https://media.istockphoto.com/id/1281949968/photo/chinese-herbal-medicineplatycodon.jpg?s=612x612&w=0&k=20&c=wyUKDcCkaZmenXZSZ0cpsToUxoS6ktp2Ewl2mqPhO1Q="
  },
  {
    name: "Astragalus Root",
    description: "Boosts immunity and energy levels.",
    image: "https://media.istockphoto.com/id/1255178485/photo/milk-vetch-root-lies-on-white-background.jpg?s=612x612&w=0&k=20&c=HwePcHMmyV0hx5Pnvy0nc5bJLqSbH-oN3gjqPisVamo="
  }
];

const TraditionalChineseMedicine = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1549781688/photo/traditional-medicine.jpg?s=612x612&w=0&k=20&c=xhA7zWI6gLjziV1AaN_isWHoEjpprhk3pkHlin8xauI=')`
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
        <h1 className="text-4xl font-bold mb-6">Traditional Chinese Medicine</h1>
        <p className="text-lg max-w-3xl">
          Traditional Chinese Medicine (TCM) uses ancient herbs and remedies to balance energy, improve health, and promote healing naturally.
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
        {chineseProducts.map((product, index) => (
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

export default TraditionalChineseMedicine;
