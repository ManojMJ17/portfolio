import type { NavLink } from "./types";

// Single source of truth for the "Contact" destination — referenced by the
// primary nav and reused as the Hero CTA button so the label/href never drift apart.
export const contactLink: NavLink = { name: "Contact", link: "#contact" };

export const navLinks: NavLink[] = [
  { name: "Services", link: "#services" },
  { name: "Works", link: "#works" },
  { name: "About", link: "#about" },
  contactLink,
];

// Extra entry shown only in the footer's menu list, pointing back to the top of the page.
export const footerHomeLink: NavLink = { name: "Home", link: "#" };
