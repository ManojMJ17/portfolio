import type { SiteConfig } from "./types";
import { personal } from "./personal";

export const siteConfig: SiteConfig = {
  title: `${personal.fullName} — ${personal.roleLine1} ${personal.roleLine2}`,
  description: personal.tagline,
};
