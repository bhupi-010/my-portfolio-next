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
        href="https://linkedin.com"
      >
        <BsLinkedin />
      </motion.a>
      <motion.a
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75 }}
        href="http://github.com"
      >
        <BsGithub />{" "}
      </motion.a>
      <motion.a
        initial={{ y: -500 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75 }}
        href="http://facebook.com"
      >
        <BsFacebook />
      </motion.a>
    </div>
  );
};

export default HeaderSocials;
