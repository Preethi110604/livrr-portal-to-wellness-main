import { motion } from "framer-motion";

const homeopathyProducts = [
  {
    name: "Arnica Montana",
    description: "Used for pain relief and inflammation.",
    image: "https://media.istockphoto.com/id/991887152/photo/homeopathy-and-cooking-with-arnica.jpg?s=612x612&w=0&k=20&c=4VWFHd8cQVGfJiNq1LLoAZgbc95NwrHAxBdXpzhUEaE="
  },
  {
    name: "Belladonna",
    description: "Helps with fever and inflammation.",
    image: "https://media.istockphoto.com/id/1213748735/photo/beautiful-large-red-amaryllis-flowers.jpg?s=612x612&w=0&k=20&c=zDyzgWOz1Pg3i4obROFs84gSVZ1yp178riqWICpOiBs="
  },
  {
    name: "Nux Vomica",
    description: "Supports digestion and relieves nausea.",
    image: "https://media.istockphoto.com/id/1064521914/photo/unnanhyakuyaku-madeira-vine-okawakame-akazakazura-propagule.jpg?s=612x612&w=0&k=20&c=qXVyyq0p3DsLqFM5_U5yxin3xu4D9q_FP_CxnAjJtZs="
  },
  {
    name: "Rhus Tox",
    description: "Beneficial for arthritis and joint pain.",
    image: "https://media.istockphoto.com/id/950010320/photo/drupes-of-a-staghorn-sumac.jpg?s=612x612&w=0&k=20&c=1djS84217TOct14Mcf463MFF4T4KEi7NCkKJ1Xjf_as="
  },
  {
    name: "Sulphur",
    description: "Treats skin conditions and allergies.",
    image: "https://media.istockphoto.com/id/1214127619/photo/purified-sulfur-powder-on-a-white-acrylic-background.jpg?s=612x612&w=0&k=20&c=ZYaeA59lJDoxuxS3M6T_U4KkXLBqaeXq_iW1tIZLVyY="
  }
];

const HomeopathyPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/31218404/pexels-photo-31218404/free-photo-of-calendula-essential-oil-in-sunlit-garden-setting.jpeg?auto=compress&cs=tinysrgb&w=600')`
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
        <h1 className="text-4xl font-bold mb-6">Homeopathy</h1>
        <p className="text-lg max-w-3xl">
          Homeopathy is a holistic system of medicine that uses highly diluted substances to trigger
          the body’s natural healing responses. It is safe, gentle, and effective for treating various
          ailments.
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
        {homeopathyProducts.map((product, index) => (
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

export default HomeopathyPage;
