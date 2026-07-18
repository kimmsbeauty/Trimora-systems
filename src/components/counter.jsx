"use client";

import { useEffect, useRef, useState } from "react";

// Animates 0 -> target once, the first time it scrolls into view.
// requestAnimationFrame-based, no dependency. `suffix` renders after the
// number (e.g. "+"); for non-numeric stats, callers should render static
// text instead of this component.
export function Counter({ target, suffix = "", duration = 1200, className = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            function tick(now) {
              const progress = Math.min((now - start) / duration, 1);
              setValue(Math.round(progress * target));
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
