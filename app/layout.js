import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bhupendra Nath's Portfolio",
  description:
    "Experienced React Developer with a strong foundation in front-end technologies, specializing in building scalable, user-friendly web applications. Passionate about continuous learning and contributing to innovative projects.",
  keywords:
    "Web Developer, Portfolio, React, Next.js, JavaScript, Developer, Bhupendra, Nath, Bhupi, Bhupendra Nath Portfolio, Bhupendra Portfolio, React Portfolio, Next.js Portfolio,mahendranagar",
  author: "Bhupendra Nath",
  url: "https://www.bhupendranath.com.np",
  image:
    "https://media.licdn.com/dms/image/v2/C4E03AQH5AxAPpRiLMQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1649655725812?e=1744243200&v=beta&t=Iv6pikALkCDBArxACYPcUGfZLhnAXDnirQAGCBk4ELM", // Replace with actual social preview image URL
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* SEO Metadata */}
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook & LinkedIn) */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={metadata.image} />
        <meta
          property="og:image:alt"
          content="Bhupendra Nath Portfolio Preview"
        />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta
          name="twitter:image:alt"
          content="Bhupendra Nath Portfolio Preview"
        />

        {/* Canonical URL */}
        <link rel="canonical" href={metadata.url} />

        {/* Social Media Links (Optional) */}
        <link
          rel="me"
          href="https://www.linkedin.com/in/bhupendra-nath-838887233/"
        />
        <link rel="me" href="https://github.com/bhupi-010" />
        <link rel="me" href="https://www.facebook.com/bhupi.000" />
        <link rel="me" href="https://www.instagram.com/i_am_bhupi10" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
