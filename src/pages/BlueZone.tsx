import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const BlueZoneIntro = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const textRef = useRef(null);
  const discoverTextRef = useRef(null);
  const nextTextRef = useRef(null);
  const experienceTextRef = useRef(null);
  const carouselRef = useRef(null);
  const audioRef = useRef(null);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [showCarousel, setShowCarousel] = useState(true); // State to manage the carousel visibility
  const [showAudio, setShowAudio] = useState(false); // State for the audio section visibility
  const [progress, setProgress] = useState(0); // Track video progress

  const backgroundVideos = [
    '/video/1448735-uhd_4096_2160_24fps.mp4',
    '/video/18056308-uhd_3840_2160_30fps.mp4',
    '/video/5028340-uhd_4096_2160_30fps.mp4',
    '/video/1583096-uhd_4096_2160_24fps.mp4', // New background video after carousel
  ];

  const videoList = [
    {
      url: 'https://www.youtube.com/embed/ff40YiMmVkU',
      title: 'Secrets of the Blue Zones',
      desc: 'Discover the 9 common diet and lifestyle habits that keep the world’s centenarians healthier for longer.',
    },
    {
      url: 'https://www.youtube.com/embed/9AThycGCakk',
      title: 'Living to 100+',
      desc: 'Explore how centenarians in the Blue Zones maintain their vitality and health through simple daily practices.',
    },
    {
      url: 'https://www.youtube.com/embed/mryzkO5QWWY',
      title: 'The Blue Zone Diet',
      desc: 'Learn about the nutritional principles that contribute to longevity in the world’s Blue Zones.',
    },
    {
      url: 'https://www.youtube.com/embed/3pOsx83lUEI',
      title: 'Longevity Secrets from Women Over 100',
      desc: 'Masters runner Ida Keeling and fellow centenarians share their best tips for a long, healthy life.',
    },
    {
      url: 'https://www.youtube.com/embed/9crQhOwlfsg',
      title: 'Secrets to Healthy Aging from Centenarians',
      desc: 'Centenarians share their wisdom on longevity, while Dr. Maria Carney provides expert insights on aging well.',
    },
  ];

  const audioList = [
    {
      title: "Wisdom of Centenarians",
      desc: "Stories and advice from people who’ve lived over 100 years.",
      src: "https://open.spotify.com/embed/episode/1fYEsYC8XJ2sJVNUWCZIXc?utm_source=generator",
    },
    {
      title: "Expert Insights on Blue Zones",
      desc: "Researchers and experts discuss longevity.",
      src: "https://open.spotify.com/embed/episode/59fNJUdpZ5vleULGEGfYcs?utm_source=generator",
    },
    {
      title: "Traditional Blue Zone Music",
      desc: "Traditional music from long-living regions.",
      src: "https://open.spotify.com/embed/track/36QssngiWlZ9iFeGhNa5Dj?utm_source=generator",
    },
  ];

  const renderWords = (text: string) =>
    text.split(' ').map((word, index) => (
      <span key={index} className="inline-block mx-1">
        {word}
      </span>
    ));

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentVideo((prev) => (prev + 1) % videoList.length);
    } else {
      setCurrentVideo((prev) => (prev - 1 + videoList.length) % videoList.length);
    }
  };

  const updateProgress = () => {
    const video = videoRefs.current[currentVideo];
    if (video) {
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(progressPercent);

      // Check if the progress reaches 100% to switch the video
      if (progressPercent >= 100) {
        setCurrentVideo((prev) => (prev + 1) % videoList.length);
        setProgress(0); // Reset progress for the next video
      }
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll('span');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: true,
          pin: true,
        },
      });

      tl.to(imageRef.current, { scale: 1.3, ease: 'power2.out', duration: 1 });
      tl.fromTo(words, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.2 }, '-=0.5');
      tl.to(videoRefs.current[0], { opacity: 1, duration: 1 }, '+=0.5');
      tl.to([textRef.current, discoverTextRef.current], { opacity: 0, duration: 1 }, '+=1');
      tl.to(nextTextRef.current, { opacity: 1, duration: 1 });
      tl.to(nextTextRef.current, { opacity: 0, duration: 1 }, '+=1.5');
      tl.to(experienceTextRef.current, { opacity: 1, duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const transitions = [6000, 9000, 12000, 25000]; // Updated transitions for the videos
  
    transitions.forEach((time, index) => {
      setTimeout(() => {
        // Fade out the current video and fade in the next one
        if (videoRefs.current[index]) gsap.to(videoRefs.current[index], { opacity: 0 });
        if (videoRefs.current[index + 1]) gsap.to(videoRefs.current[index + 1], { opacity: 1 });
  
        // When the third video ends (index 2), display the video carousel
        if (index === 2) {
          gsap.to(experienceTextRef.current, { opacity: 0 }); // Fade out the experience text
          gsap.to(carouselRef.current, { opacity: 1 }); // Show the carousel
        }
  
        // Hide the carousel after the fourth video ends (index 3)
        if (index === 3) {
          gsap.to(carouselRef.current, { opacity: 0 }); // Hide the carousel
          setShowAudio(true); // Show the audio section after the fourth video
        }
      }, time);
    });
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoList.length);
    }, 30000); // Auto transition every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: `url(/src/assets/ChatGPT-Image-Apr-21_-2025_-09_38_53-PM.webp)` }}
      />
      {backgroundVideos.map((src, index) => (
        <video
          key={index}
          ref={(el) => (videoRefs.current[index] = el!)}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 z-10"
          src={src}
          autoPlay
          muted
          loop
          playsInline
        />
      ))}

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 ref={textRef} className="text-4xl md:text-6xl font-bold mb-4 leading-tight opacity-100">
          {renderWords('Welcome to Livv Blue')}
        </h1>
        <p ref={discoverTextRef} className="text-lg md:text-2xl mt-2 opacity-100">
          Discover the secrets of longevity beneath the waves.
        </p>
      </div>

      <div
        ref={nextTextRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center text-white px-6 opacity-0 pointer-events-none"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore the Depths</h2>
        <p className="text-lg md:text-xl max-w-xl mx-auto">
          Begin your journey into the world’s Blue Zones, where life flows effortlessly and longevity is a way of life.
        </p>
      </div>

      <div
        ref={experienceTextRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-center text-white px-6 opacity-0 pointer-events-none"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The Liv Blue Experience</h2>
        <p className="text-lg md:text-xl max-w-xl mx-auto">
          Explore the lifestyle and wisdom of those who live past 100 in great health.
        </p>
      </div>

      {showCarousel && (
        <div
          ref={carouselRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 pointer-events-auto px-4"
        >
          <div className="bg-black/70 rounded-xl p-4 w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentVideo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <iframe
                  title={`Video ${currentVideo}`}
                  className="w-full h-64 md:h-96 rounded-xl"
                  src={videoList[currentVideo].url}
                  frameBorder="0"
                  allowFullScreen
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                  <p className="text-white text-center">{videoList[currentVideo].desc}</p>
                </div>
                <div className="absolute bottom-5 left-5 flex justify-between w-full">
                  <button
                    className="text-white bg-black/70 p-2 rounded"
                    onClick={() => handleSwipe('right')}
                  >
                    Prev
                  </button>
                  <button
                    className="text-white bg-black/70 p-2 rounded"
                    onClick={() => handleSwipe('left')}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {showAudio && (
        <div ref={audioRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 opacity-100">
          <div className="bg-black/70 rounded-xl p-4 w-full max-w-2xl">
            <h2 className="text-white text-3xl mb-6">Audio Experience</h2>
            {audioList.map((audio, index) => (
              <div key={index} className="mb-4">
                <iframe
                  className="w-full h-20"
                  src={audio.src}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
                <div className="text-white mt-2 text-center">
                  <h3 className="font-semibold">{audio.title}</h3>
                  <p>{audio.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlueZoneIntro;
