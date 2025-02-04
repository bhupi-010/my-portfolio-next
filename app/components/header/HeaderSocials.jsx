"use client";
import React from "react";
import { BsLinkedin, BsGithub, BsFacebook } from "react-icons/bs";
import { motion } from "framer-motion";
const HeaderSocials = () => {
  return (
    <div className="header_socials">
      <motion.a
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75 }}
        href="https://www.linkedin.com/in/bhupendra-nath-838887233/"
      >
        <BsLinkedin />
      </motion.a>
      <motion.a
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75 }}
        href="https://github.com/bhupi-010"
      >
        <BsGithub />{" "}
      </motion.a>
      <motion.a
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75 }}
        href="https://www.facebook.com/bhupi.000"
      >
        <BsFacebook />
      </motion.a>
    </div>
  );
};

export default HeaderSocials;
