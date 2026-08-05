import type { Metadata } from "next";
import NotFound from "@/sections/NotFound";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist, or it may have been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
