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
    <div className="group block cursor-pointer">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-text-darker/20 mb-4 rounded-none">
        {/* Gradient ukryty na prośbę: 
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10 pointer-events-none" /> 
        */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out"
        />
      </div>
      
      <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-secondary mb-3 leading-tight group-hover:text-[#886944] transition-colors duration-500">
        {title}
      </h3>
      <p className="text-lg text-text-muted leading-relaxed font-sans mb-0">
        {desc}
      </p>
    </div>
  );
}
