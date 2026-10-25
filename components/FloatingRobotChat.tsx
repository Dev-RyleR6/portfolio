"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RobotHead, type RobotHeadState } from "robot-heads";

const INACTIVITY_TIMEOUT_MS = 5000;
const THROTTLE_ACTIVITY_MS = 150;

export function FloatingRobotChat() {
  const [state, setState] = useState<RobotHeadState>("happy");
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityTimeRef = useRef<number>(Date.now());
  const currentStateRef = useRef<RobotHeadState>("happy");

  // Keep ref in sync to avoid unnecessary re-subscriptions
  useEffect(() => {
    currentStateRef.current = state;
  }, [state]);

  const setSleeping = useCallback(() => {
    setState("sleeping");
    currentStateRef.current = "sleeping";
  }, []);

  const resetActivity = useCallback(() => {
    const now = Date.now();
    const wasSleeping = currentStateRef.current === "sleeping";

    // If sleeping, wake up immediately
    if (wasSleeping) {
      setState("happy");
      currentStateRef.current = "happy";
    }

    // Throttle timer resetting during continuous cursor movement
    if (wasSleeping || now - lastActivityTimeRef.current > THROTTLE_ACTIVITY_MS) {
      lastActivityTimeRef.current = now;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(setSleeping, INACTIVITY_TIMEOUT_MS);
    }
  }, [setSleeping]);

  useEffect(() => {
    // Start initial 5-second idle timer
    timerRef.current = setTimeout(setSleeping, INACTIVITY_TIMEOUT_MS);

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "pointermove",
    ] as const;

    const onActivity = () => {
      resetActivity();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) clearTimeout(timerRef.current);
        setSleeping();
      } else {
        resetActivity();
      }
    };

    activityEvents.forEach((event) => {
      window.addEventListener(event, onActivity, { passive: true });
    });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, onActivity);
      });
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [resetActivity, setSleeping]);

  const handleRobotClick = () => {
    resetActivity();
    setIsOpen((prev) => !prev);
  };

  if (isDismissed) return null;

  const isSleeping = state === "sleeping";

  return (
    <aside
      className={`floating-robot-chat ${isSleeping ? "is-sleeping" : "is-active"}`}
      aria-label="Interactive portfolio robot assistant"
    >
      {/* Speech bubble / Interactive popover */}
      <div
        className={`floating-robot-chat__bubble ${isOpen ? "is-open" : ""}`}
        role="dialog"
        aria-hidden={!isOpen}
      >
        <div className="floating-robot-chat__bubble-header">
          <span className="floating-robot-chat__bubble-title">
            {isSleeping ? "Zzz... Resting" : "Ryle's Bot Buddy 👋"}
          </span>
          <button
            type="button"
            className="floating-robot-chat__close"
            onClick={() => setIsOpen(false)}
            aria-label="Close assistant popover"
          >
            ×
          </button>
        </div>

        <p className="floating-robot-chat__bubble-text">
          {isSleeping
            ? "I dozed off after 5 seconds of inactivity. Move your mouse or scroll to wake me up into a happy state!"
            : "I'm happy and tracking your movement! Looking to discuss backend systems, AI vision, or full-stack web builds?"}
        </p>

        <div className="floating-robot-chat__bubble-actions">
          <Link
            href="/contact"
            className="floating-robot-chat__action-btn"
            onClick={() => setIsOpen(false)}
          >
            Start a project →
          </Link>
          <Link
            href="/robot"
            className="floating-robot-chat__sub-link"
            onClick={() => setIsOpen(false)}
          >
            Playground
          </Link>
          <button
            type="button"
            className="floating-robot-chat__dismiss-btn"
            onClick={() => setIsDismissed(true)}
          >
            Dismiss
          </button>
        </div>
      </div>

      {/* Floating Robot Trigger Anchor */}
      <div className="floating-robot-chat__anchor">
        <button
          type="button"
          className="floating-robot-chat__btn"
          onClick={handleRobotClick}
          aria-expanded={isOpen}
          aria-label={
            isSleeping
              ? "Robot assistant is sleeping. Click to open message."
              : "Robot assistant is happy. Click to open message."
          }
          title={isSleeping ? "Zzz... (Sleeping) Click to open" : "Happy! Click to open"}
        >
          <RobotHead
            shape="hexagon"
            state={state}
            color="#2f8f58"
            trimColor="#c4c9d2"
            size={84}
            interactive={true}
            antenna={true}
            floorShadow={true}
          />
        </button>

        {/* Status indicator dot */}
        <span
          className={`floating-robot-chat__status ${
            isSleeping ? "status--sleeping" : "status--happy"
          }`}
          aria-hidden="true"
        >
          {isSleeping ? "Zzz" : "●"}
        </span>
      </div>
    </aside>
  );
}
