import { motion } from "framer-motion";

const unaniProducts = [
  {
    name: "Roghan Badam Shirin",
    description: "Pure almond oil for hair and skin.",
    image: "https://media.istockphoto.com/id/1203023316/photo/migdal-on-a-white-isolated-background-food-nuts-for-your-website-design-theme-of-cooking-and.jpg?s=612x612&w=0&k=20&c=TWVAyzFpONlQNz6iApDCf4ZXh1Jp7PCmG-z-KrS-Pf8="
  },
  {
    name: "Khamira Marwareed",
    description: "Strengthens the heart and mind.",
    image: "https://media.istockphoto.com/id/1203976614/photo/maca-powder-and-capsules-in-a-closeup.jpg?s=612x612&w=0&k=20&c=uqRjFZ0nbeSbNnyWao0Ge6YUn7QNvJ36CVE4yoN1vyo="
  },
  {
    name: "Majun Arad Khurma",
    description: "Boosts energy and vitality.",
    image: "https://media.istockphoto.com/id/1495152325/photo/pills-on-the-dark-background.jpg?s=612x612&w=0&k=20&c=hVx5sm7QPKubTNiVL0mOwaw2qJQtDaI1AjhGAjC8d2s="
  },
  {
    name: "Habb-e-Musaffi",
    description: "Blood purifier for skin problems.",
    image: "https://media.istockphoto.com/id/1484979121/photo/medication-pill-tablets.jpg?s=612x612&w=0&k=20&c=ij4AyDbxRmL-Y4i8QcPoqqd97tuQjYVA2zOMpJbXK3M="
  },
  {
    name: "Safoof Mohazzil",
    description: "Helps with weight management.",
    image: "https://cdn.pixabay.com/photo/2020/03/21/04/00/shrimp-4952609_640.jpg"
  }
];

const UnaniPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/649182968/photo/turmeric-and-curcumin-used-in-asia-and-is-a-major-part-of-siddha-medicine-it-was-first-used-as.jpg?s=612x612&w=0&k=20&c=61z9BWmtIZB8PhGqd0roCEUv62rrA-3Y6O_1kHFxh2A=')`
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
        <h1 className="text-4xl font-bold mb-6">Unani Medicine</h1>
        <p className="text-lg max-w-3xl">
          Unani medicine is a traditional system of healing that utilizes natural herbs, minerals, and
          dietary practices to maintain health and treat illnesses by balancing the four humors of the
          body.
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
        {unaniProducts.map((product, index) => (
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

export default UnaniPage;
