'use client';

import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  threshold?: number;
  rootMargin?: string;
};

// Fires once: flips to true the first time the element crosses `threshold`,
// then disconnects — a single re-render per element instead of one per
// intersection change, for callers that only need a one-way reveal trigger
// (e.g. mounting a video when its card scrolls into view).
export const useInView = <T extends HTMLElement>({
  threshold = 0.3,
  rootMargin = '0px',
}: UseInViewOptions = {}) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return { ref, inView };
};
