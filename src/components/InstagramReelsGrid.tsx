import React, { useState, useEffect, useRef } from 'react';
import { Instagram, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface InstagramReelsGridProps {
  instagramHandle?: string;
  instagramUrl?: string;
}

export const InstagramReelsGrid: React.FC<InstagramReelsGridProps> = ({
  instagramHandle = '@shivanigraphics_',
  instagramUrl = 'https://www.instagram.com/shivanigraphics_?utm_source=ig_web_button_share_sheet&vrfl=ZDNlZDc0MzIxNw=='
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [dbReels, setDbReels] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'instagram_reels'), (snapshot) => {
      const list = snapshot.docs.map(doc => doc.data());
      setDbReels(list);
    }, (err) => {
      console.error('Error fetching Instagram reels from Firestore:', err);
    });
    return () => unsub();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const defaultReels = [
    { 
      title: 'Shivani Graphics Konica Minolta High-Speed Run (#DdUG5jOz9CB)', 
      views: '54.2K', 
      likes: '5.1K', 
      img: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=600&q=80', 
      url: 'https://www.instagram.com/reel/DdUG5jOz9CB/?utm_source=ig_web_copy_link' 
    },
    { 
      title: 'Bulk Visiting Cards Lamination & Die-Cut', 
      views: '38.9K', 
      likes: '3.8K', 
      img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80', 
      url: 'https://www.instagram.com/reel/DdUG5jOz9CB/?utm_source=ig_web_copy_link' 
    },
    { 
      title: 'Outdoor Star Flex & Glow Sign Board Setup', 
      views: '42.6K', 
      likes: '4.2K', 
      img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80', 
      url: 'https://www.instagram.com/reel/DdUG5jOz9CB/?utm_source=ig_web_copy_link' 
    },
    { title: '5-Min Visiting Cards Press Run', views: '24.5K', likes: '1.8K', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80', url: instagramUrl },
    { title: 'Outdoor Flex Banner Wholesale', views: '18.2K', likes: '1.2K', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80', url: instagramUrl },
    { title: '3D Acrylic LED Signage Making', views: '42.1K', likes: '3.5K', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80', url: instagramUrl },
    { title: 'Custom Mugs & T-Shirt Printing', views: '15.9K', likes: '950', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80', url: instagramUrl },
    { title: 'Rubber Stamps in 60 Minutes', views: '11.4K', likes: '820', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', url: instagramUrl },
    { title: 'Corporate ID Card Lanyards', views: '19.8K', likes: '1.4K', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80', url: instagramUrl }
  ];

  const reelsToDisplay = dbReels.length > 0 ? dbReels : defaultReels;

  return (
    <section className="px-4 sm:px-6 max-w-7xl mx-auto py-6">
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 border border-purple-900/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-bold border border-pink-500/30">
                <Instagram className="w-3.5 h-3.5" />
                <span>{instagramHandle}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold transition-colors cursor-pointer border border-white/20"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-pink-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Let's Connect on Insta</h2>
            <p className="text-xs text-purple-200">
              Watch behind-the-scenes of our Konica Minolta digital printing press, visiting card embossing, and bulk flex banner dispatches at Shivani Graphics.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl border border-white/20">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Slide Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Slide Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:opacity-95 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" />
              <span>Visit Page</span>
            </a>
          </div>
        </div>

        {/* Horizontal Slider / Carousel showing 3 reels at a time */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reelsToDisplay.map((reel, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[240px] sm:w-[280px]"
            >
              <a
                href={reel.url || instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-slate-900 border border-slate-800 shadow-xl transition-all duration-300 hover:scale-[1.03] hover:border-pink-500/50 block"
              >
                <img
                  src={reel.img}
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Default Bottom Gradient Badge */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Instagram className="w-3 h-3" /> {idx === 0 ? '★ Featured Reel' : `Reel #${idx + 1}`}
                  </span>
                  <h4 className="font-extrabold text-xs text-white line-clamp-2 mt-0.5">{reel.title}</h4>
                </div>

                {/* Hover Blur Overlay Layer with Micro-interaction */}
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center text-white shadow-lg animate-pulse">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-xs text-white">{reel.title}</p>
                    <p className="text-[10px] text-purple-200">▶ {reel.views} Views · {reel.likes} Likes</p>
                  </div>
                  <span className="px-3.5 py-2 bg-white text-slate-900 font-black text-[11px] rounded-xl shadow-lg transition-transform hover:scale-105 inline-block">
                    Check out this reel
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="pt-1 text-center flex items-center justify-center gap-4 text-xs">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-pink-400 hover:text-pink-300 underline underline-offset-4 inline-flex items-center gap-1"
          >
            <span>Check out more reels ({instagramHandle})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
