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
        url: "https://media.licdn.com/dms/image/v2/C4E03AQH5AxAPpRiLMQ/profile-displayphoto-shrink_1200_630/profile-displayphoto-shrink_1200_630/0/1649655725812?e=1744243200&v=beta&t=Iv6pikALkCDBArxACYPcUGfZLhnAXDnirQAGCBk4ELM",
        width: 1200,
        height: 630,
        alt: "Bhupendra Nath - React Developer",
        type: "image/jpeg",
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
              image:
                "https://media.licdn.com/dms/image/v2/C4E03AQH5AxAPpRiLMQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1649655725812?e=1744243200&v=beta&t=Iv6pikALkCDBArxACYPcUGfZLhnAXDnirQAGCBk4ELM",
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
