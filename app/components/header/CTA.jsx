import React from "react";
import { motion } from "framer-motion";
const CTA = () => {
  return (
    <div className="cta">
      <motion.a
        href="/assets/CV.pdf"
        className="btn"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        Download CV
      </motion.a>
      <motion.a
        href="#contact"
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
