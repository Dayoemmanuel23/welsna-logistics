import { useState, useRef } from "react";
import { Play } from "lucide-react";

import VIDEO_SRC from "../welsna/Welsnaltd.mp4";
export default function CompanyVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <section className="bg-navy py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-700 uppercase tracking-[0.2em] text-cyan-accent">Watch Us</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-700 text-white mt-3 mb-10">
          See Welsna in Action
        </h2>
        <div className="relative max-w-[900px] mx-auto rounded-2xl overflow-hidden shadow-2xl group">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="w-full h-auto object-cover"
            controls
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          {!playing && (
            <button
              onClick={togglePlay}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-navy/40 backdrop-blur-sm"
            >
              <span className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                <Play className="w-8 h-8 text-navy ml-1" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}