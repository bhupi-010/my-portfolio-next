import "./globals.css";
export const metadata = {
  title: "Bhupendra Nath",
  description:
    "Experienced React Developer specializing in Next.js, React, and front-end technologies, passionate about creating user-friendly web applications.",
  keywords:
    "React Developer, Next.js Developer, Frontend Developer, JavaScript Developer, Web Developer Nepal, Portfolio Website, Next.js Portfolio, React Portfolio, Software Engineer, UI/UX Developer, Full Stack Developer, Web Development Services, Bhupendra Nath, Bhupendra Portfolio, Frontend Engineer, JavaScript Expert, Mahendranagar Developer, Freelance Web Developer, Remote Developer, Tailwind CSS, React.js Expert, Next.js Freelancer",
  author: "Bhupendra Nath",
  generator: "Next.js",
  applicationName: "Bhupendra Nath",
  metadataBase: new URL("https://www.bhupendranath.com.np"),

  alternates: {
    canonical: "https://www.bhupendranath.com.np",
  },

  openGraph: {
    type: "profile",
    url: "https://www.bhupendranath.com.np",
    title: "Bhupendra Nath - React Developer",
    description:
      "Experienced React Developer specializing in Next.js, React, and front-end technologies. Explore my portfolio to learn more about my projects and skills.",
    siteName: "Bhupendra Nath",
    locale: "en_US",
    images: [
      {
        url: "https://www.bhupendranath.com.np/profile.png",
        width: 512,
        height: 512,
        alt: "Bhupendra Nath - React Developer",
        type: "image/png",
      },
    ],
    profile: {
      firstName: "Bhupendra",
      lastName: "Nath",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bhupendra Nath",
              jobTitle: "React Developer",
              url: "https://www.bhupendranath.com.np",
              image: "https://www.bhupendranath.com.np/profile.png",
              sameAs: [
                "https://www.linkedin.com/in/bhupendra-nath-838887233/",
                "https://github.com/bhupi-010",
                "https://www.facebook.com/bhupi.000",
                "https://www.instagram.com/i_am_bhupi10",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
