"use client";
import React, { useState, useEffect } from "react";
import "./portfolio.css";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";

const Portfolio = () => {
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("portfolio");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight;
        setAnimateTitle(isInView);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section id="portfolio">
      <h5>My Recent Works</h5>
      <motion.h2
        initial={{ y: -30 }}
        animate={{ y: animateTitle ? 0 : -30 }} // Only animate when in view
        transition={{ delay: 0.2 }}
      >
        Portfolio
      </motion.h2>

      <motion.div
        initial={{ x: -300 }}
        animate={{ x: animateTitle ? 0 : -300 }}
        transition={{ delay: 0.2 }}
        className="container portfolio_container"
      >
        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <Image
              src="/assets/ai-gen-course.png"
              alt="AI Generated Course - A platform for creating and generating educational courses using artificial intelligence"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2>AI Generated Course</h2>
          <h5>
            AI-Gen-Course is a platform that allows users to easily create and
            generate educational courses using artificial intelligence. By
            simply entering course details like name, duration, number of
            chapters, and specifying if videos are included, Gemini AI generates
            the entire course structure along with relevant YouTube videos for
            each chapter.
          </h5>
          <div className="portfolio_item-cta">
            <button
              className="btn"
              onClick={() =>
                (window.location.href =
                  "https://github.com/your-github-repository")
              }
              aria-label="Visit the GitHub repository for AI Gen Course"
            >
              Github <IoMdCloseCircle fontSize={24} />
            </button>
            <a
              href="https://ai-gen-courses.netlify.app/"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live AI Gen Course"
            >
              Live <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
          </div>
        </article>

        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <Image
              src="/assets/plant-identifier.png"
              alt="plant-identifier image"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2>Plant Identifier</h2>
          <h5>
            This is a plant identifier app that uses Google's Gemini API to
            identify plants. This app is built using Next.js and Tailwind CSS.
          </h5>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/bhupi-010/plant-identifier"
              className="btn"
            >
              Github <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
            <a href="https://identify-plant.netlify.app/" className="btn">
              Live <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
          </div>
        </article>
        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <Image
              src="/assets/qrcode.png"
              alt="QR Code Generator app - generates QR codes from URLs"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2>QR Code Generator</h2>
          <h5>
            This is a QR code generator app that generates QR codes when you
            enter a URL in the input field and click the generate QR code
            button. After generating the QR code, you can download it or print
            it.
          </h5>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/bhupi-010/plant-identifier"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the GitHub repository for QR Code Generator"
            >
              Github <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
            <a
              href="https://identify-plant.netlify.app/"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live QR Code Generator app"
            >
              Live <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
          </div>
        </article>

        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <Image
              src="/assets/farmtech.png"
              alt="FarmTech Innovators platform for agriculture"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2>FarmTech Innovators</h2>
          <h5>
            FarmTech Innovators is a modern agriculture platform built with
            React, Mantine, and TanStack Query. Users can sign in, register, and
            get expert suggestions on crop selection, soil improvement, and
            sustainable farming techniques. With a clean UI and efficient data
            fetching, it delivers a seamless and informative experience.
          </h5>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/bhupi-010/farmtech-innovators"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the GitHub repository for FarmTech Innovators"
            >
              Github <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
            <a
              href="https://farmtech-innovators.netlify.app/"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live FarmTech Innovators platform"
            >
              Live <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
          </div>
        </article>

        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <Image
              src="/assets/ow.jpg"
              alt="Company Website built with Next.js and Tailwind CSS"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2>Company Website</h2>
          <h5>
            The Softosys company website is a fast and modern platform built
            with Next.js, Tailwind CSS. It features a sleek UI and seamless
            navigation. The site showcases company services, insights, and
            contact options with a responsive design. Optimized for performance,
            it ensures a smooth and engaging user experience.
          </h5>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/your-repository-link"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the GitHub repository for the Company Website"
            >
              Github <IoMdCloseCircle fontSize={24} />
            </a>
            <a
              href="https://company-website-live-link.com"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the live demo of the Company Website"
            >
              Live <IoMdCloseCircle fontSize={24} />
            </a>
          </div>
        </article>

        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <Image
              src="/assets/mw.jpg"
              alt="Matrimony Website built with Next.js, Tailwind CSS, and TanStack Query"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2>Matrimony Website</h2>
          <h5>
            The Matrimony website is a modern and responsive platform built with
            Next.js, Tailwind CSS, and TanStack Query. It offers seamless
            navigation, efficient data fetching, and a sleek UI for an enhanced
            user experience. The site enables users to create profiles, search
            for matches, and connect easily. Optimized for performance, it
            ensures a smooth and engaging matchmaking process.
          </h5>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/your-repository-link"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the GitHub repository for the Matrimony Website"
            >
              Github <IoMdCloseCircle fontSize={24} />
            </a>
            <a
              href="https://matrimony-website-live-link.com"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the live demo of the Matrimony Website"
            >
              Live <IoMdCloseCircle fontSize={24} />
            </a>
          </div>
        </article>

        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <Image
              src="/assets/ecommerce.jpg"
              alt="Ecommerce Website built with React, Bootstrap, and Firebase"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2>Ecommerce Website</h2>
          <h5>
            The E-commerce website is a dynamic and responsive platform built
            with React, Bootstrap, and Firebase. It features a sleek UI,
            real-time data updates, and secure authentication. Users can browse
            products, add items to the cart, and complete purchases seamlessly.
            Optimized for speed and scalability, it ensures a smooth shopping
            experience.
          </h5>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/bhupi-010/S-ecom"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the GitHub repository for the Ecommerce Website"
            >
              Github <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
            <a
              href="https://ecommerce-website-live-link.com"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the live demo of the Ecommerce Website"
            >
              Live <IoMdCloseCircle fontSize={24} />
            </a>
          </div>
        </article>

        <article className="portfolio_item">
          <div className="portfolio_item-image">
            <Image
              src="/assets/quotes.jpg"
              alt="Quotes Website built with React and SASS"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h2>Inspired By Quotes</h2>
          <h5>
            The Inspired By Quotes website is a sleek and responsive platform
            built with React and SASS. Users can search for quotes by keywords
            like "life" or "success" and instantly get relevant motivational
            quotes.
          </h5>
          <div className="portfolio_item-cta">
            <a
              href="https://github.com/bhupi-010/inspired-by-quotes"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit the GitHub repository for Inspired By Quotes"
            >
              Github <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
            <a
              href="https://inspired-by-quotes.netlify.app/"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the live demo of Inspired By Quotes"
            >
              Live <IoMdCheckmarkCircle color="green" fontSize={24} />
            </a>
          </div>
        </article>
      </motion.div>
    </section>
  );
};

export default Portfolio;
