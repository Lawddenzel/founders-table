import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Founders' Table Namibia — Edition 1",
  description: "The Graveyard of Good Ideas. Thursday, 20 August 2026 · Vinyls Music Café, Windhoek · 18:30 – 21:30. RSVP now — limited to 40 seats.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
