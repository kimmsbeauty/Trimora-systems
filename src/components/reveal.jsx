"use client";

import { useEffect, useRef, useState } from "react";

// Shared scroll-reveal wrapper: fades + slides an element up once, the
// first time it's ~20% visible. Same vanilla IntersectionObserver pattern
// already used in mobile-action-bar.jsx / section-tracker.jsx -- no
// animation library needed. `delay` (ms) staggers siblings in a list.
// Respects prefers-reduced-motion automatically via the global
// transition-duration override in globals.css.
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
