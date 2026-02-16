"use client";

import { useEffect, useState } from "react";

const LOADER_DURATION_MS = 3200;
const ECG_SEGMENT_WIDTH = 220;
const ECG_SEGMENTS = 12;

function createEcgPoints() {
  const points: string[] = [];

  for (let index = 0; index < ECG_SEGMENTS; index += 1) {
    const offset = index * ECG_SEGMENT_WIDTH;
    points.push(
      `${offset + 0},110`,
      `${offset + 54},110`,
      `${offset + 68},140`,
      `${offset + 84},36`,
      `${offset + 104},184`,
      `${offset + 130},74`,
      `${offset + 148},128`,
      `${offset + 168},110`,
      `${offset + 220},110`,
    );
  }

  return points.join(" ");
}

const ECG_POINTS = createEcgPoints();

export default function HeartbeatLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsFadingOut(true);
    }, LOADER_DURATION_MS - 300);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, LOADER_DURATION_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`heartbeat-loader ${isFadingOut ? "heartbeat-loader--hidden" : ""}`}
      aria-live="polite"
      aria-label="Loading website"
      role="status"
    >
      <div className="heartbeat-loader__content">
        <svg className="heartbeat-loader__ecg" viewBox="0 0 2640 220" preserveAspectRatio="none" aria-hidden="true">
          <polyline className="heartbeat-loader__trace heartbeat-loader__trace--base" points={ECG_POINTS} />
          <polyline className="heartbeat-loader__trace heartbeat-loader__trace--glow" points={ECG_POINTS} />
        </svg>
      </div>
    </div>
  );
}
