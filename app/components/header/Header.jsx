"use client";
import "./header.css";
import CTA from "./CTA";
import React from "react";
import HeaderSocials from "./HeaderSocials";
import { motion } from "framer-motion";
import Image from "next/image";
const Header = () => {
  return (
    <header id="header">
      <div className="container header_container">
        <motion.h5
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.75 }}
        >
          Hello I'm
        </motion.h5>
        <motion.h1
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Bhupendra Nath
        </motion.h1>
        <motion.h5
          className="text-light"
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.75 }}
        >
          React/Next Developer
        </motion.h5>
        <CTA />

        <HeaderSocials />
        <div className="me">
          <Image
            src="/assets/me1.png"
            alt="Bhupendra Nath Profile Picture"
            width="700"
            height="400"
          />
        </div>
        <motion.a
          initial={{ y: -500 }}
          animate={{ y: 0, rotate: 90 }}
          transition={{ duration: 0.75 }}
          href="#contact"
          className="scroll_down"
        >
          Scroll Down
        </motion.a>
      </div>
    </header>
  );
};

export default Header;
