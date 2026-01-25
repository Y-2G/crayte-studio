"use client";

import { useState, useEffect } from "react";
import styles from "./HeroVideo.module.css";

interface HeroVideoProps {
  videoSrc: string;
  posterSrc?: string;
  children: React.ReactNode;
}

export function HeroVideo({ videoSrc, posterSrc, children }: HeroVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Handle video load success
  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  // Handle video load error
  const handleError = () => {
    setHasError(true);
    console.warn("Video failed to load, falling back to gradient background");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsLoaded(false);
      setHasError(false);
    };
  }, []);

  return (
    <section className={styles.container}>
      {/* Fallback gradient background */}
      <div
        className={`${styles.fallback} ${isLoaded && !hasError ? styles.hidden : ""}`}
      />

      {/* Video background */}
      {!hasError && (
        <video
          className={`${styles.video} ${isLoaded ? styles.visible : ""}`}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onLoadedData={handleCanPlay}
          onError={handleError}
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
