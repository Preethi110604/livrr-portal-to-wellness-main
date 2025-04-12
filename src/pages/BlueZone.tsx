import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../animations/blue-zone.json";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionData = [
  {
    title: "Welcome to the Liv Blue",
    desc: "Discover the secrets of longevity from the world’s longest-living communities.",
    video: "/video/istockphoto-1203380028-640_adpp_is.mp4",
  },
  {
    title: "The Liv Blue Experience",
    desc: "Explore the lifestyle and wisdom of those who live past 100 in great health.",
    video: "/video/1583096-uhd_4096_2160_24fps.mp4",
  },
  {
    title: "Join the Movement",
    desc: "Be a part of the longevity revolution. Get tips and stories delivered to you.",
    video: "/video/18420-292228405_medium.mp4",
  },
];

const BlueZone = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showWatchMode, setShowWatchMode] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      const sections = gsap.utils.toArray(".zone-section");
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const video = el.querySelector("video");
        gsap.fromTo(
          video,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top center",
              end: "bottom center",
              scrub: true,
              onLeaveBack: () => gsap.to(video, { opacity: 0 }),
            },
          }
        );
      });
    }
  }, [showIntro]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      {showIntro && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <Lottie animationData={animationData} loop={false} className="w-64 h-64" />
        </div>
      )}

      {showWatchMode && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center space-y-6 p-4">
          <button
            onClick={() => setShowWatchMode(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>
          <VideoGallery />
        </div>
      )}

      {!showIntro &&
        sectionData.map((section, index) => (
          <div
            key={index}
            className="zone-section relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-[1] opacity-0 transition-opacity duration-1000"
            >
              <source src={section.video} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/60 z-[-1]" />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-6xl font-bold">{section.title}</h2>
              <p className="mt-6 text-xl max-w-2xl mx-auto text-white/80">{section.desc}</p>

              {index === 0 && (
                <div className="mt-10 flex flex-wrap gap-4 justify-center">
                  <button
                    className="bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-700"
                    onClick={() => scrollToSection(videoRef)}
                  >
                    🎮 Watch Videos
                  </button>
                  <button
                    className="bg-white text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100"
                    onClick={() => setShowWatchMode(true)}
                  >
                    🎧 Watch Mode
                  </button>
                  <button
                    className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600"
                    onClick={() => scrollToSection(audioRef)}
                  >
                    🎤 Listen Audio
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        ))}

      {!showIntro && <VideoSection ref={videoRef} />}
      {!showIntro && <AudioSection ref={audioRef} />}
    </div>
  );
};

const videoList = [
  {
    url: "https://www.youtube.com/embed/ff40YiMmVkU",
    title: "Secrets of the Blue Zones",
    desc: "Discover the 9 common diet and lifestyle habits that keep the world's centenarians healthier for longer.",
  },
  {
    url: "https://www.youtube.com/embed/9AThycGCakk",
    title: "Living to 100+",
    desc: "Explore how centenarians in the Blue Zones maintain their vitality and health through simple daily practices.",
  },
  {
    url: "https://www.youtube.com/embed/mryzkO5QWWY",
    title: "The Blue Zone Diet",
    desc: "Learn about the nutritional principles that contribute to longevity in the world's Blue Zones.",
  },
  {
    url: "https://www.youtube.com/embed/3pOsx83lUEI",
    title: "Longevity Secrets from Women Over 100",
    desc: "Masters runner Ida Keeling and fellow centenarians share their best tips for a long, healthy life.",
  },
  {
    url: "https://www.youtube.com/embed/9crQhOwlfsg",
    title: "Secrets to Healthy Aging from Centenarians",
    desc: "Centenarians share their wisdom on longevity, while Dr. Maria Carney provides expert insights on aging well.",
  },
];

const VideoGallery = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
    {videoList.map((video, i) => (
      <iframe
        key={i}
        src={video.url}
        title={video.title}
        className="w-full aspect-video rounded-xl shadow-lg"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    ))}
  </div>
);

const VideoSection = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const combinedRef = (node: HTMLDivElement) => {
    inViewRef(node);
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLDivElement>).current = node;
  };

  return (
    <section ref={combinedRef} className="py-24 px-4 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videoList.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.3, duration: 1 }}
            className="rounded-xl overflow-hidden shadow-xl bg-gray-900"
          >
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-1">{video.title}</h3>
              <p className="text-white/70 text-sm">{video.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

const AudioSection = React.forwardRef<HTMLDivElement, {}>((_, ref) => {
  return (
    <section ref={ref} className="py-24 px-4 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-blue-800">Liv Blue Audio Stories</h2>
        <p className="text-gray-600 mt-2">Listen to the wisdom and experiences of centenarians and longevity experts.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-xl bg-blue-50">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Wisdom of Centenarians</h3>
          <p className="text-gray-600 mb-4">Listen to the stories and advice from people who have lived beyond 100 years.</p>
          <iframe
            src="https://open.spotify.com/embed/episode/1fYEsYC8XJ2sJVNUWCZIXc?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="glass-card p-6 rounded-xl bg-blue-50">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Expert Insights on Blue Zones</h3>
          <p className="text-gray-600 mb-4">Hear from researchers and experts who study the Blue Zones phenomenon.</p>
          <iframe
            src="https://open.spotify.com/embed/episode/59fNJUdpZ5vleULGEGfYcs?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="glass-card p-6 rounded-xl bg-blue-50">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Traditional Blue Zone Music</h3>
          <p className="text-gray-600 mb-4">Traditional music from regions known for their longevity and healthy lifestyles.</p>
          <iframe
            src="https://open.spotify.com/embed/track/36QssngiWlZ9iFeGhNa5Dj?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
});

export default BlueZone;