import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jai Kumar | Developer Story — Interactive 3D Portfolio",
  description:
    "Jai Kumar — Full-stack developer crafting scalable web apps and intelligent software systems. An immersive 3D journey through code, creativity, and craft.",
  keywords: [
    "Jai Kumar",
    "developer portfolio",
    "full-stack developer",
    "React",
    "Next.js",
    "3D portfolio",
    "interactive portfolio",
  ],
  authors: [{ name: "Jai Kumar" }],
  openGraph: {
    title: "Jai Kumar | Developer Story",
    description:
      "An immersive 3D journey through code, creativity, and craft.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
