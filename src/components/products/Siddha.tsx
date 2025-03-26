import { motion } from "framer-motion";

const siddhaProducts = [
  {
    name: "Nilavembu Kudineer",
    description: "Helps with immunity and fever reduction.",
    image: "https://www.kannukutty.in/static/images/1/06125a76-da2d-4ccd-88f3-56d1c96601aa.jpg"
  },
  {
    name: "Amukkara Chooranam",
    description: "Relieves stress and enhances energy.",
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/edible-seed/e/z/o/50-amukkara-kizhangu-ashwagandha-root-50g-1-raw-pouch-original-imagj49pbsdgpvsb.jpeg?q=90&crop=false"
  },
  {
    name: "Ponnimaram Pathru Thailam",
    description: "Treats joint pain and inflammation.",
    image: "https://media.istockphoto.com/id/470012068/photo/capsules.jpg?s=612x612&w=0&k=20&c=lycagZMTIy7TKYTtZ0i_vAtr6SQH3XI9zRQgouS-gkw="
  },
  {
    name: "Thuthuvalai Legiyam",
    description: "Effective for respiratory issues.",
    image: "https://media.istockphoto.com/id/1023624484/photo/image-of-indian-spices-and-its-powder.jpg?s=612x612&w=0&k=20&c=XDdyP8XCFm9aAWel-pq3Of4mziLrJF1d2HOcb2A-jqM="
  },
  {
    name: "Chandanathi Thailam",
    description: "A cooling oil for body heat reduction.",
    image: "https://media.istockphoto.com/id/1745904923/photo/aamchoor-powder-in-a-spoon.jpg?s=612x612&w=0&k=20&c=aalgES7f6J9A26EHLAalQ0GplEhPw4Ur8wOxxifw2TY="
  }
];

const SiddhaPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1225546478/photo/siddha-medicines.jpg?s=612x612&w=0&k=20&c=gNNyXTI3V04UtuZSRm2ITMRsnLOo3A30Z8blAdYAfQ8=')`
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
        <h1 className="text-4xl font-bold mb-6">Siddha Medicine</h1>
        <p className="text-lg max-w-3xl">
          Siddha is an ancient system of medicine rooted in South India that focuses on balancing the
          body's elements using herbs, minerals, and yogic practices for holistic healing.
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
        {siddhaProducts.map((product, index) => (
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

export default SiddhaPage;
