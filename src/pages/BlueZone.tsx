
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/utils/animations';
import { useToast } from '@/hooks/use-toast';
import { AudioLines, Video, Heart, Users, TreeDeciduous, Mountain, Sun, ArrowRight, Sparkle, Waves, CloudSun } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlueZone = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Welcome to the Liv Blue",
      description: "Discover the secrets of longevity from the world's longest-living communities.",
    });
    
    // Add subtle animation for background elements
    const animateBackground = () => {
      const elements = document.querySelectorAll('.floating-element');
      elements.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.transform = `translate(${Math.sin(Date.now() * 0.001 + index) * 10}px, ${Math.cos(Date.now() * 0.001 + index) * 10}px)`;
      });
      requestAnimationFrame(animateBackground);
    };
    
    const animationId = requestAnimationFrame(animateBackground);
    return () => cancelAnimationFrame(animationId);
  }, [toast]);

  const handlePlayAudio = (audioId: string) => {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      if (audio.id !== audioId) {
        audio.pause();
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-white relative overflow-hidden">
      {/* Enhanced background elements with animation */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl floating-element transition-transform duration-3000"></div>
      <div className="absolute top-80 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl floating-element transition-transform duration-3000"></div>
      <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-2xl floating-element transition-transform duration-3000"></div>
      <div className="absolute top-60 left-1/3 w-40 h-40 bg-cyan-200/30 rounded-full blur-xl floating-element transition-transform duration-2000"></div>
      <div className="absolute bottom-80 right-1/4 w-56 h-56 bg-sky-300/20 rounded-full blur-2xl floating-element transition-transform duration-2500"></div>
      
      {/* Decorative waves */}
      <div className="absolute top-[25%] left-0 w-full opacity-5 text-blue-600">
        <Waves className="w-full h-20" />
      </div>
      <div className="absolute top-[65%] left-0 w-full opacity-5 text-blue-600 rotate-180">
        <Waves className="w-full h-20" />
      </div>
      
      {/* Additional pulsing circles for immersive effect */}
      <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse-slow floating-element"></div>
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow floating-element" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/5 w-24 h-24 bg-cyan-400/10 rounded-full blur-lg animate-pulse-slow floating-element" style={{animationDelay: '2s'}}></div>
      
      <Navbar />
      
      <main className="pt-24 pb-20 relative z-10">
        <section
          ref={headerRef}
          className="relative overflow-hidden py-20"
        >
          <div 
            className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] 
            bg-cover bg-center opacity-20"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-transparent"></div>
          </div>
          
          <div className={`container transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center max-w-3xl mx-auto">
              <CloudSun className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-pulse" />
              <span className="bg-blue-500/10 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                Living Longer, Living Better
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-blue-800 relative">
                The Liv Blue Experience
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-blue-400 rounded-full"></span>
              </h1>
              
              <p className="text-lg text-gray-700 mb-8">
                Explore the lifestyles, practices, and wisdom of communities where people routinely live beyond 100 years 
                with exceptional health and vitality.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <button 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-300/30 hover:shadow-blue-400/40"
                  onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Video className="h-5 w-5" />
                  <span>Watch Videos</span>
                </button>
                
                <button 
                  className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg shadow-blue-100/30"
                  onClick={() => document.getElementById('audios')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <AudioLines className="h-5 w-5" />
                  <span>Listen to Stories</span>
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-50 to-transparent"></div>
          <div className="absolute -top-10 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-70 floating-element"></div>
          <div className="absolute top-40 left-20 w-16 h-16 bg-blue-200 rounded-full opacity-50 floating-element"></div>
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <Sparkle className="h-10 w-10 text-blue-500 mx-auto mb-2 animate-spin-slow" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-blue-800 mb-4 relative inline-block">
                Why Liv Blue Matter
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-400"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Blue Zones are regions where people live significantly longer and healthier lives. By studying these areas, we can uncover the secrets to longevity.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center hover:shadow-lg transition group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Natural Movement</h3>
                <p className="text-gray-600">People in Blue Zones move naturally throughout their day, not relying on gyms but integrating physical activity into daily life.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center hover:shadow-lg transition group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <TreeDeciduous className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Plant-Rich Diet</h3>
                <p className="text-gray-600">Centenarians in Blue Zones eat a predominantly plant-based diet with minimal processed foods and moderate caloric intake.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center hover:shadow-lg transition group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Strong Communities</h3>
                <p className="text-gray-600">Strong social connections and belonging to faith-based communities are common factors among the world's longest-lived people.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl flex flex-col items-center text-center hover:shadow-lg transition group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Sun className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Sense of Purpose</h3>
                <p className="text-gray-600">People in Blue Zones have a clear sense of purpose that gives meaning to their lives, often continuing to contribute well into their 90s and 100s.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="videos" className="py-20 bg-gradient-to-b from-blue-50 to-white relative">
          <div className="absolute top-20 right-40 w-32 h-32 bg-blue-200/40 rounded-full blur-xl floating-element"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-300/30 rounded-full blur-lg floating-element"></div>
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <Video className="h-10 w-10 text-blue-500 mx-auto mb-2" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-blue-800 mb-4 relative inline-block">
                Liv Blue Videos
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-400"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Watch and learn from the lifestyles of the world's longest-living communities.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card overflow-hidden rounded-xl hover:shadow-lg transition group transform hover:-translate-y-1">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/ff40YiMmVkU" 
                    title="Blue Zone Lifestyle"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition">Secrets of the Blue Zones</h3>
                  <p className="text-gray-600 mb-4">Discover the 9 common diet and lifestyle habits that keep the world's centenarians healthier for longer.</p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden rounded-xl hover:shadow-lg transition group transform hover:-translate-y-1">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/9AThycGCakk" 
                    title="Blue Zone Centenarians" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition">Living to 100+</h3>
                  <p className="text-gray-600 mb-4">Explore how centenarians in the Blue Zones maintain their vitality and health through simple daily practices.</p>
                </div>
              </div>
              
              <div className="glass-card overflow-hidden rounded-xl hover:shadow-lg transition group transform hover:-translate-y-1">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/mryzkO5QWWY" 
                    title="Blue Zone Diet" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition">The Blue Zone Diet</h3>
                  <p className="text-gray-600 mb-4">Learn about the nutritional principles that contribute to longevity in the world's Blue Zones.</p>
                </div>
              </div>
              <div className="glass-card overflow-hidden rounded-xl hover:shadow-lg transition group transform hover:-translate-y-1">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/3pOsx83lUEI" 
                    title="Blue Zone Diet" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition">Longevity Secrets from Women Over 100</h3>
                  <p className="text-gray-600 mb-4">Masters runner Ida Keeling and fellow centenarians share their best tips for a long, healthy life.</p>
                </div>
              </div>
              <div className="glass-card overflow-hidden rounded-xl hover:shadow-lg transition group transform hover:-translate-y-1">
                <div className="aspect-video bg-gray-200 relative">
                  <iframe 
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/9crQhOwlfsg" 
                    title="Blue Zone Diet" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2 group-hover:text-blue-600 transition">Secrets to Healthy Aging from Centenarians</h3>
                  <p className="text-gray-600 mb-4">Centenarians share their wisdom on longevity, while Dr. Maria Carney provides expert insights on aging well.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="audios" className="py-20 bg-white relative overflow-hidden">
          <div className="absolute top-40 left-1/3 w-40 h-40 bg-blue-100/60 rounded-full blur-2xl floating-element"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-blue-200/50 rounded-full blur-xl floating-element"></div>
          
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <AudioLines className="h-10 w-10 text-blue-500 mx-auto mb-2" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-blue-800 mb-4 relative inline-block">
                Liv Blue Audio Stories
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-400"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Listen to the wisdom and experiences of centenarians and longevity experts.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1">
  <h3 className="text-xl font-semibold text-blue-800 mb-4">Wisdom of Centenarians</h3>
  <p className="text-gray-600 mb-4">Listen to the stories and advice from people who have lived beyond 100 years.</p>
  <div className="mb-4 bg-blue-50 p-4 rounded-lg shadow-inner">
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
  <p className="text-sm text-gray-500 italic">Listen to centenarian wisdom on Spotify</p>
</div>


              
<div className="glass-card p-6 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1">
  <h3 className="text-xl font-semibold text-blue-800 mb-4">Expert Insights on Blue Zones</h3>
  <p className="text-gray-600 mb-4">Hear from researchers and experts who study the Blue Zones phenomenon.</p>
  <div className="mb-4 bg-blue-50 p-4 rounded-lg shadow-inner">
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
  <p className="text-sm text-gray-500 italic">Listen to Expert Insights on Spotify</p>
</div>
              
              
              <div className="glass-card p-6 rounded-xl hover:shadow-lg transition transform hover:-translate-y-1">
  <h3 className="text-xl font-semibold text-blue-800 mb-4">Traditional Blue Zone Music</h3>
  <p className="text-gray-600 mb-4">Traditional music from regions known for their longevity and healthy lifestyles.</p>
  <div className="mb-4 bg-blue-50 p-4 rounded-lg shadow-inner">
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
  <p className="text-sm text-gray-500 italic">Listen to Traditional Music on Spotify</p>
</div>

            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-15"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"></div>
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Mountain className="h-12 w-12 text-blue-500 mx-auto mb-6 animate-bounce-slow" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-blue-800 mb-6">Join Our Waitlist to Experience Liv Blue</h2>
              <p className="text-lg text-gray-700 mb-10 leading-relaxed">
                Become part of a community dedicated to incorporating Liv Blue principles into modern life. 
                Sign up today to be among the first to access our exclusive Liv Blue experiences, expert consultations, and customized longevity resources.
              </p>
              
              <Link 
                to="/#waitlist" 
                className="button-primary group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-300/30 hover:scale-105 transform duration-300"
              >
                <span>Join the Waitlist for  Liv Blue Experience</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Floating elements for visual appeal */}
          <div className="absolute bottom-10 left-10 w-20 h-20 rounded-full border-2 border-blue-200 opacity-40 floating-element"></div>
          <div className="absolute top-20 right-[10%] w-16 h-16 rounded-full border border-blue-300 opacity-30 floating-element"></div>
          <div className="absolute bottom-40 right-20 w-12 h-12 rounded-full bg-blue-100 opacity-60 floating-element"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlueZone;
