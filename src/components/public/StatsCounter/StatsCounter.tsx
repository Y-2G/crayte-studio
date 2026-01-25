"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatsCounter.module.css";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

interface StatsCounterProps {
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  { value: 150, suffix: "+", label: "プロジェクト" },
  { value: 98, suffix: "%", label: "リピート率" },
  { value: 10, suffix: "年+", label: "業界経験" },
];

function useCountUp(end: number, duration: number = 1500) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // For reduced motion, jump to end immediately
      const targetValue = prefersReducedMotion ? end : Math.floor(progress * end);
      setCount(targetValue);

      if (progress < 1 && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isVisible, end, duration]);

  return { count, ref };
}

function StatItem({ value, suffix, label }: Stat) {
  const { count, ref } = useCountUp(value);
  const displayValue = `${count}${suffix || ""}`;
  const fullValue = `${value}${suffix || ""}`;

  return (
    <div className={styles.statItem} ref={ref}>
      <div className={styles.statValue} aria-label={`${fullValue} ${label}`}>
        {displayValue}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export function StatsCounter({ stats = defaultStats, className }: StatsCounterProps) {
  return (
    <section className={`${styles.statsSection} ${className || ""}`} aria-label="実績統計">
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatItem key={`${stat.label}-${index}`} {...stat} />
        ))}
      </div>
    </section>
  );
}
