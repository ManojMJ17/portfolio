"use client";

import { ArrowLeft } from "@geist-ui/icons";

// Outline counterpart to Button.tsx — same pill shape and sizing rhythm, but a
// plain color transition on hover rather than the primary's rising-fill effect.
const GhostButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-center gap-2 px-8 py-4 xl:px-7 xl:py-5
        rounded-[4rem] border border-black-50/40 text-black-200 uppercase
        transition-colors duration-300 hover:border-black-200 hover:bg-black-200/5
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-200"
    >
      <ArrowLeft
        size={18}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
      <span className="font-regular font-semibold text-[1rem] md:text-[1.1rem] xl:text-[1.2rem]">
        {label}
      </span>
    </button>
  );
};

export default GhostButton;
