"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StatsCounter.module.css";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  gradient?: string;
}

interface StatsCounterProps {
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  {
    value: 150,
    suffix: "+",
    label: "プロジェクト",
    gradient: "linear-gradient(135deg, #FF1493 0%, #9370DB 50%, #00BFFF 100%)",
  },
  {
    value: 98,
    suffix: "%",
    label: "リピート率",
    gradient: "linear-gradient(135deg, #9370DB 0%, #00BFFF 50%, #FF1493 100%)",
  },
  {
    value: 10,
    suffix: "Y+",
    label: "業界経験",
    gradient: "linear-gradient(135deg, #00BFFF 0%, #FF1493 50%, #9370DB 100%)",
  },
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

function StatItem({ value, suffix, label, gradient }: Stat) {
  const { count, ref } = useCountUp(value);
  const displayValue = `${count}${suffix || ""}`;
  const fullValue = `${value}${suffix || ""}`;

  return (
    <div className={styles.statItem} ref={ref}>
      <div
        className={styles.statValue}
        aria-label={`${fullValue} ${label}`}
        style={gradient ? { "--stat-gradient": gradient } as React.CSSProperties : undefined}
      >
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
