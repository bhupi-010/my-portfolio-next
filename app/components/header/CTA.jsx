import React from "react";
import { motion } from "framer-motion";
const CTA = () => {
  return (
    <div className="cta">
      <motion.a
        href="/assets/CV.pdf"
        className="btn"
        rel="noreferrer"
        target="_blank" // Opens the link in a new tab
        aria-label="Download CV"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        Download CV
      </motion.a>
      <motion.a
        href="#contact"
        rel="noreferrer"
        aria-label="Go to Contact me"
        className="btn btn-primary"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 0.5 }}
      >
        Let's Talk
      </motion.a>
    </div>
  );
};

export default CTA;
