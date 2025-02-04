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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* SEO Metadata */}
        <meta
          name="keywords"
          content="Web Developer, Portfolio, React, Next.js, JavaScript, Developer,Bhupendra,Nath,Bhupi,Bhupendra Nath Portfolio,Bhupendra Portfolio"
        />
        <meta name="author" content="Bhupendra Nath" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Bhupendra Nath's Portfolio" />
        <meta
          property="og:description"
          content="Explore the portfolio of Bhupendra Nath, a web developer specializing in React and Next.js."
        />
        <meta property="og:url" content="https://www.bhupendranath.com.np" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.bhupendranath.com.np" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
