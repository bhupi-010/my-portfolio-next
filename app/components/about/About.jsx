"use client";
import React, { useState, useEffect } from "react";
import "./about.css";
import { FaAward, FaFolderOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
const About = () => {
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about");
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
    <section id="about">
      <h5>Get TO Know</h5>
      <motion.h2
        initial={{ y: -30 }}
        animate={{ y: animateTitle ? 0 : -30 }} // Only animate when in view
        transition={{ delay: 0.2 }}
      >
        About Me
      </motion.h2>
      <div className="container about_container">
        <div className="about_me">
          <div className="about_me-image">
            <Image
              src="/assets/my.jpg"
              alt="me_image"
              layout="responsive" // ✅ Makes the image responsive
              width={1200}
              height={800}
            />
          </div>
        </div>

        <motion.div
          initial={{ x: -300 }}
          animate={{ x: animateTitle ? 0 : -300 }} // Only animate when in view
          transition={{ delay: 0.2 }}
          className="about_content"
        >
          <div className="about_cards">
            <article className="about_card">
              <FaAward className="about_icon" />
              <h5>Experience</h5>
              <small>2+ year experience</small>
            </article>

            <article className="about_card">
              <FaFolderOpen className="about_icon" />
              <h5>Projects</h5>
              <small>10+ projects completed</small>
            </article>
          </div>

          <p>
            I hold a strong foundation in computer science with a focus on
            information technology, specializing in front-end development. My
            journey in web development began with mastering core technologies
            like HTML, CSS, and JavaScript, which led me to explore React, a
            powerful JavaScript library for building modern user interfaces. I
            started my professional career as a Junior React Developer at
            Softosys, where I gained hands-on experience in building and
            optimizing web applications. After a year at Softosys, I joined
            CodeRush for three months, further enhancing my expertise by working
            on dynamic projects. Currently, I have been contributing for over a
            year as a React Developer at UX-Qode, where I have deepened my
            knowledge in front-end development, collaborated on complex
            projects, and refined my problem-solving skills. With nearly three
            years of experience in React and web development, I have developed a
            strong ability to adapt to new technologies quickly. I am a
            proactive team player who thrives on collaboration, constructive
            feedback, and continuous learning. Passionate about building
            scalable and user-friendly applications, I am now eager to take on
            new challenges and contribute to innovative projects that push the
            boundaries of web development.
          </p>
          <div className="button">
            <a href="#contact" className="btn btn-primary">
              Let's Talk
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
