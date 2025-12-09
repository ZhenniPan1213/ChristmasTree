import React, { useState, useRef, useEffect } from 'react';

export const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((e) => console.error("Audio play failed", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
        }
    };

    return (
        <div className="absolute top-4 left-4 z-50 select-none font-sans"
            style={{ transform: "scale(0.75)", transformOrigin: "top left" }}>
            {/* Main Case */}
            <div className="relative w-80 h-32 bg-neutral-800 rounded-lg border-t-2 border-l-2 border-neutral-700 border-b-4 border-r-4 border-neutral-900 shadow-2xl flex items-center p-3 gap-3 overflow-hidden">
                {/* Wood Texture Simulation using gradients */}
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 12px),
                                 linear-gradient(to bottom, #4a4a4a, #2a2a2a)`
                    }}
                />

                <audio ref={audioRef} src="/music/ChristmasList.mp3" loop />

                {/* Left Section: Display & Controls */}
                <div className="flex-1 flex flex-col justify-between h-full py-1 z-10">
                    {/* Display / Paper Note */}
                    <div className="relative bg-[#e0e0d0] p-2 rounded shadow-sm border border-[#c0c0b0] transform -rotate-1 mb-2">
                        <div className="text-[10px] font-bold text-gray-800 leading-tight tracking-wider font-mono">
                            <div className="truncate">Track: Christmas List</div>
                            <div className="mt-0.5 truncate">Artist: Anson Seabra</div>
                        </div>
                        {/* Tape effect */}

                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between px-2">
                        {/* Volume */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-neutral-400 font-bold">-</span>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-16 h-1.5 bg-neutral-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neutral-300 [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:bg-white"
                            />
                            <span className="text-[10px] text-neutral-400 font-bold">+</span>
                        </div>

                        {/* Play/Pause Button */}
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 flex items-center justify-center bg-neutral-800 rounded-full border-2 border-neutral-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] active:shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] active:translate-y-px text-neutral-400 hover:text-white hover:border-neutral-500 transition-all"
                        >
                            {isPlaying ? (
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Section: Speaker */}
                <div className="relative w-24 h-24 shrink-0 rounded-full bg-neutral-900 border-[3px] border-neutral-700 shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] flex items-center justify-center group overflow-hidden z-10">
                    {/* Grille mesh effect */}
                    <div className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: 'radial-gradient(#666 1px, transparent 1px)',
                            backgroundSize: '3px 3px'
                        }}
                    ></div>

                    {/* Speaker Cone (animates) */}
                    <div
                        className={`w-16 h-16 bg-black rounded-full shadow-[0_0_10px_rgba(0,0,0,0.8)] border border-neutral-800 ${isPlaying ? 'animate-speaker-pulse' : ''}`}
                    >
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-neutral-800 to-black opacity-80"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
