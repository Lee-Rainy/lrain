/** 仿 Figma 霓虹拟物音乐播放器 */
"use client";

import {
  Heart,
  Music2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Track = {
  title: string;
  artist: string;
  duration: number;
  mood: string;
};

const track: Track = {
  title: "Neon Bloom",
  artist: "Lrain",
  duration: 248,
  mood: "Chillwave · Night drive",
};

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);
  const [isLooping, setIsLooping] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(36);
  const [volume, setVolume] = useState(72);
  const [lastVolume, setLastVolume] = useState(72);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(track.duration, prev + 1);
        if (next >= track.duration) {
          setIsPlaying(false);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const eqBars = useMemo(
    () => Array.from({ length: 10 }).map((_, i) => i * 90),
    []
  );

  const progressStyle = {
    "--progress": `${(progress / track.duration) * 100}%`,
  } as CSSProperties;

  const volumeStyle = {
    "--progress": `${volume}%`,
  } as CSSProperties;

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(lastVolume || 50);
      return;
    }
    setLastVolume(volume);
    setVolume(0);
  };

  return (
    <div className="neo-player w-full">
      <div className="flex flex-col gap-6">
        <div className="flex gap-5 flex-col">
          <div className="neo-cover">
            <div className="neo-cover__overlay" aria-hidden />
            <div className="neo-eq" aria-hidden>
              {eqBars.map((delay, index) => (
                <span
                  key={delay}
                  className="neo-eq__bar"
                  style={{ animationDelay: `${index * 90}ms` }}
                />
              ))}
            </div>
            <div className="neo-badge">
              <Sparkles size={14} />
              <span>Live</span>
            </div>
            <div className="neo-icon">
              <Music2 size={18} />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">
                  Now playing
                </p>
                <h3 className="text-2xl font-semibold leading-tight">
                  {track.title}
                </h3>
                <p className="text-sm opacity-80">
                  {track.artist} · {track.mood}
                </p>
              </div>
              <button
                aria-label={isFavorite ? "取消喜欢" : "标记喜欢"}
                className={`neo-btn ${isFavorite ? "is-on" : ""}`}
                onClick={() => setIsFavorite((prev) => !prev)}
              >
                <Heart
                  size={18}
                  className={isFavorite ? "fill-[var(--neo-accent)]" : ""}
                />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="neo-chip">Hi-Fi</span>
              <span className="neo-chip">Neomorphism</span>
              <span className="neo-chip">桌面控件</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-[12px] opacity-70">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={track.duration}
            step={1}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="neo-slider"
            style={progressStyle}
            aria-label="播放进度"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              className={`neo-btn ${isShuffling ? "is-on" : ""}`}
              aria-pressed={isShuffling}
              onClick={() => setIsShuffling((prev) => !prev)}
            >
              <Shuffle size={18} />
            </button>
            <button
              className="neo-btn"
              onClick={() => setProgress((prev) => Math.max(0, prev - 10))}
              aria-label="快退 10 秒"
            >
              <SkipBack size={18} />
            </button>
          </div>

          <button
            className="neo-btn neo-btn--primary neo-btn--lg"
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-pressed={isPlaying}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            <span className="text-sm font-semibold">
              {isPlaying ? "暂停" : "播放"}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              className="neo-btn"
              onClick={() =>
                setProgress((prev) => Math.min(track.duration, prev + 10))
              }
              aria-label="快进 10 秒"
            >
              <SkipForward size={18} />
            </button>
            <button
              className={`neo-btn ${isLooping ? "is-on" : ""}`}
              aria-pressed={isLooping}
              onClick={() => setIsLooping((prev) => !prev)}
            >
              <Repeat size={18} />
            </button>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="neo-btn" onClick={toggleMute}>
              {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="neo-slider neo-slider--sm"
              style={volumeStyle}
              aria-label="音量"
            />
            <span className="text-xs opacity-70 w-10 text-right">
              {volume}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
