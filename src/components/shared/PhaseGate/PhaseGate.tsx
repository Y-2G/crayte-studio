"use client";

import { useSyncExternalStore } from "react";
import styles from "./PhaseGate.module.css";

interface PhaseGateProps {
  children: React.ReactNode;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem("phase") === "end";
}

function getServerSnapshot() {
  return false;
}

export function PhaseGate({ children }: PhaseGateProps) {
  const isEnd = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (isEnd) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>404 Not Found.</h1>
        <p className={styles.message}>
          お探しのページが見つかりませんでした。
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
