import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Doctor {
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  photo: string;
  background: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Shashank",
    specialization: "Naturopathy Specialist",
    experience: 6,
    rating: 4,
    photo: "https://media.istockphoto.com/id/2190085120/photo/smiling-indian-man-doctor-wearing-white-coat-stylish-eyeglasses-bearded-male-looking-at-camera.jpg?s=612x612&w=0&k=20&c=kxBjLKaNXl_C4bAKFkvwxz2REDv2Wt6FHnk84HlgZlI=",
    background: "https://st3.depositphotos.com/7893620/18115/i/450/depositphotos_181152860-stock-photo-dried-peppermint-glass-jar-bunch.jpg",
  },
  {
    name: "Dr. Ramesh Iyer",
    specialization: "Ayurvedic Specialist",
    experience: 10,
    rating: 4,
    photo: "https://media.istockphoto.com/id/1281068770/photo/cute-smiling-indian-doctor-or-surgeon-in-black-uniform-with-stethoscope-on-gray-background.jpg?s=612x612&w=0&k=20&c=DeeQapVOTliKIeG3njc58HAdEp0jgRKWJhTbb_16aa8=",
    background: "https://img.freepik.com/fotos-premium/ayurveda-fondo-simbolo-india_1279562-9399.jpg",
  },
  {
    name: "Dr. Meera Sharma",
    specialization: "Nutritionist",
    experience: 7,
    rating: 5,
    photo: "https://media.istockphoto.com/id/1270790502/photo/medical-concept-of-indian-beautiful-female-doctor-with-note-book.jpg?s=612x612&w=0&k=20&c=5r5tCLSnYHKiPNaHn4hu-e4u_-3eat_8PRdmEQgkmVM=",
    background: "https://t3.ftcdn.net/jpg/02/53/37/66/360_F_253376670_EkFc7GimrHHaHoY7rKbKLYIYVzBMdwHh.jpg",
  },
  {
    name: "Dr. Arvind Rao",
    specialization: "Naturopath",
    experience: 5,
    rating: 4,
    photo: "https://media.istockphoto.com/id/926223172/photo/portrait-of-indian-man-doctor.jpg?s=612x612&w=0&k=20&c=AUd6qCeU-l-iqeDiIebgHUHRwO9I4QKtkrNlSqTQmDI=",
    background: "https://st3.depositphotos.com/7893620/18115/i/450/depositphotos_181152860-stock-photo-dried-peppermint-glass-jar-bunch.jpg",
  },
];

const LiverAI = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat">
      <Navbar />
      <main className="pt-28 pb-20 bg-white/80 backdrop-blur-md">
        <div className="container max-w-5xl mx-auto px-4">
          <Link to="/" className="flex items-center gap-2 text-livrr-green hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-6 text-livrr-green-dark text-center">
            Our Doctors
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                className="p-6 border rounded-lg shadow-lg flex items-center bg-white bg-cover bg-center transition-transform hover:scale-105"
                style={{ backgroundImage: `url(${doctor.background})` }}
              >
                {/* Circular Doctor Image */}
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Doctor Info */}
                <div className="bg-white/90 p-4 rounded-md ml-6">
                  <h2 className="text-2xl font-semibold text-livrr-green-dark">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p className="text-gray-500">Experience: {doctor.experience} years</p>
                  <p className="text-yellow-500">{"⭐".repeat(doctor.rating)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiverAI;
