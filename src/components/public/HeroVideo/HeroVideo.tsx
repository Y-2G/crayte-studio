"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./HeroVideo.module.css";

interface HeroVideoProps {
  videoSrc: string;
  posterSrc?: string;
  /** ループ再生前の待機時間（秒）。0の場合は即座にループ */
  loopDelay?: number;
  children: React.ReactNode;
}

export function HeroVideo({
  videoSrc,
  posterSrc,
  loopDelay = 0,
  children,
}: HeroVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video load success
  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  // Handle video load error
  const handleError = () => {
    setHasError(true);
    console.warn("Video failed to load, falling back to gradient background");
  };

  // Handle video ended - replay with delay
  const handleEnded = useCallback(() => {
    if (videoRef.current) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      }, loopDelay * 1000);
    }
  }, [loopDelay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsLoaded(false);
      setHasError(false);
    };
  }, []);

  // loopDelay が 0 の場合は loop 属性を使用（より効率的）
  const shouldUseNativeLoop = loopDelay === 0;

  return (
    <section className={styles.container}>
      {/* Fallback gradient background */}
      <div
        className={`${styles.fallback} ${isLoaded && !hasError ? styles.hidden : ""}`}
      />

      {/* Video background */}
      {!hasError && (
        <video
          ref={videoRef}
          className={`${styles.video} ${isLoaded ? styles.visible : ""}`}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop={shouldUseNativeLoop}
          muted
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onLoadedData={handleCanPlay}
          onError={handleError}
          onEnded={!shouldUseNativeLoop ? handleEnded : undefined}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay for text readability */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
