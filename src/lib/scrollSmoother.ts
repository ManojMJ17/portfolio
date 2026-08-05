import gsap from "gsap";

interface ScrollSmootherInstance {
  scrollTo: (target: string | number | Element, smooth?: boolean) => void;
}

interface ScrollSmootherStatic {
  get: () => ScrollSmootherInstance | null | undefined;
}

declare global {
  interface Window {
    ScrollSmoother?: ScrollSmootherStatic;
  }
}

const getScrollSmootherStatic = (): ScrollSmootherStatic | undefined =>
  window.ScrollSmoother ??
  (gsap as unknown as { ScrollSmoother?: ScrollSmootherStatic }).ScrollSmoother;

// Scrolls to an in-page hash, preferring the active ScrollSmoother instance
// (when the desktop smoother is mounted) and falling back to native scrolling.
// A bare "#" (used for "back to top" links) isn't a valid CSS selector, so it's
// treated as a scroll-to-top instead of being passed to querySelector.
export const scrollToHash = (hash: string) => {
  const isTop = hash === "#";
  const smoother = getScrollSmootherStatic()?.get();

  if (smoother) {
    smoother.scrollTo(isTop ? 0 : hash, true);
  } else if (isTop) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }

  window.history.pushState(null, "", hash);
};
