// Purely decorative — a faint grid, a soft glow behind the numeral, and a
// handful of slow-floating particles, all at near-invisible opacity. Every
// value below is a static literal so Tailwind can pick it up at build time.
const PARTICLES = [
  "top-[18%] left-[12%] size-[3px] [animation-delay:0s] [animation-duration:7s]",
  "top-[72%] left-[8%] size-[2px] [animation-delay:1.2s] [animation-duration:9s]",
  "top-[25%] left-[88%] size-[2px] [animation-delay:0.6s] [animation-duration:8s]",
  "top-[80%] left-[85%] size-[3px] [animation-delay:2s] [animation-duration:10s]",
  "top-[50%] left-[95%] size-[2px] [animation-delay:1.6s] [animation-duration:7.5s]",
  "top-[10%] left-[50%] size-[2px] [animation-delay:0.3s] [animation-duration:8.5s]",
];

const NotFoundBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden
        [transform:translate3d(calc(var(--nf-mx,0)*-16px),calc(var(--nf-my,0)*-10px),0)]
        transition-transform duration-300 ease-out"
    >
      {/* Soft grid, faded toward the edges */}
      <div
        data-parallax="grid"
        className="absolute inset-0 opacity-[0.05]
          [background-image:linear-gradient(to_right,var(--color-black-50)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-black-50)_1px,transparent_1px)]
          [background-size:64px_64px]
          [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />

      {/* Glow behind the numeral */}
      <div
        data-parallax="glow"
        className="animate-nf-glow absolute left-1/2 top-[38%] h-[420px] w-[420px]
          -translate-x-1/2 -translate-y-1/2 rounded-full bg-black-50/20 blur-[120px]
          md:h-[560px] md:w-[560px]"
      />

      {/* Floating particles */}
      {PARTICLES.map((position) => (
        <span
          key={position}
          className={`animate-nf-float absolute rounded-full bg-black-200/20 ${position}`}
        />
      ))}
    </div>
  );
};

export default NotFoundBackground;
