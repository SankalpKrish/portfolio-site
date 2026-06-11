import { useState, useEffect } from "react";

const links = [
  { label: "GitHub", url: "https://github.com/SankalpKrish", icon: "/icon-github.svg" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/sankalp-krish", icon: "/icon-linkedin.svg" },
  { label: "X (Twitter)", url: "https://x.com/SankalpKrish", icon: "/icon-x.svg" },
];

export default function ProfileCard() {
  const [opacity, setOpacity] = useState(100);
  const [sliderVisible, setSliderVisible] = useState(true);

  useEffect(() => {
    if (sliderVisible) return;
    const handler = () => setSliderVisible(true);
    window.addEventListener("mousemove", handler, { once: true });
    return () => window.removeEventListener("mousemove", handler);
  }, [sliderVisible]);

  return (
    <div className={`min-h-screen bg-black flex flex-col items-center justify-center p-4 ${!sliderVisible ? "cursor-none" : ""}`}>
      <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/60 w-full max-w-lg">
        <div className="bg-[#2B2B2B] px-4 py-3 flex items-center">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
        </div>

        <div className="bg-mountain-bg bg-cover bg-center bg-[#1a1a2e] min-h-[500px] flex items-center justify-center p-6">
          <div
            className="w-full max-w-sm bg-white/25 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-black/30 p-8 text-center transition-[opacity,transform] duration-100 ease-linear will-change-[opacity,transform]"
            style={{
              opacity: opacity / 100,
              transform: `scale(${0.97 + (opacity / 100) * 0.03})`,
              pointerEvents: opacity === 0 ? "none" : "auto",
            }}
          >
              <h1 className="text-[#F7F4EB] text-3xl font-bold tracking-tight mb-2">
                Sankalp Krish
              </h1>
              <p className="text-[#B5B9C8] text-sm mb-8">Under Development</p>

              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 border border-white/20 text-[#F7F4EB] font-bold rounded-lg py-3 px-4 hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <img src={link.icon} alt="" className="w-4 h-4" />
                    {link.label}
                  </a>
                ))}
              </div>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 transition-[opacity,transform,backdrop-filter] duration-500 ease-in-out will-change-[opacity,transform,backdrop-filter] bg-white/15 border border-white/20 rounded-full px-4 py-2 flex items-center gap-3 ${
          sliderVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        style={{
          backdropFilter: sliderVisible ? "blur(24px)" : "blur(0px)",
        }}
      >
          <span className="text-[10px] text-white/60 font-mono">{opacity}%</span>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-24 h-1 appearance-none bg-white/20 rounded-full cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-3
              [&::-moz-range-thumb]:h-3
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
          />
          <button
            onClick={() => setSliderVisible(false)}
            className="text-white/50 hover:text-white/80 transition-colors text-xs leading-none ml-1"
            aria-label="Hide slider"
          >
            ✕
          </button>
      </div>
    </div>
  );
}
