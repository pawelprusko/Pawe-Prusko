import { useEffect, useRef } from 'react';

interface SceneCardProps {
  videoSrc: string;
  title: string;
  desc: string;
}

export default function SceneCard({ videoSrc, title, desc }: SceneCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            // Uruchomienie odtwarzania wideo gdy wejdzie co najmniej do połowy ekranu
            videoRef.current.play().catch(() => {
              // Wyciszenie błędów związanych z autoplay w niektórych przeglądarkach
            });
          } else {
            // Zatrzymanie i reset gdy zniknie z widoku
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-24 group block cursor-pointer">
      <div className="relative aspect-square w-full overflow-hidden bg-text-darker/20 mb-8 rounded-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10 pointer-events-none" />
        <div 
          className="absolute inset-0 mix-blend-overlay opacity-30 z-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, #F3EFE9 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        ></div>
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
        />
      </div>
      
      <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-main mb-6 leading-tight group-hover:text-secondary transition-colors duration-500">
        {title}
      </h3>
      <p className="text-lg text-text-muted leading-relaxed font-sans mb-6">
        {desc}
      </p>
    </div>
  );
}
