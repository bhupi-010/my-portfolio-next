"use client";
import "./nav.css";
import React, { useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiBook, BiMessageSquareDetail, BiFile } from "react-icons/bi";
const Nav = () => {
  const [activeNav, setActiveNav] = useState("#");
  return (
    <nav>
      <a
        href="#"
        onClick={() => setActiveNav("#")}
        className={activeNav === "#" ? "active" : ""}
        aria-label="Go to Home"
        aria-current={activeNav === "#" ? "page" : undefined}
      >
        <AiOutlineHome />
      </a>
      <a
        href="#about"
        onClick={() => setActiveNav("#about")}
        className={activeNav === "#about" ? "active" : ""}
        aria-label="Go to About Me"
        aria-current={activeNav === "#about" ? "page" : undefined}
      >
        <AiOutlineUser />
      </a>
      <a
        href="#experience"
        onClick={() => setActiveNav("#experience")}
        className={activeNav === "#experience" ? "active" : ""}
        aria-label="Go to Experience"
        aria-current={activeNav === "#experience" ? "page" : undefined}
      >
        <BiBook />
      </a>
      <a
        href="#portfolio"
        onClick={() => setActiveNav("#portfolio")}
        className={activeNav === "#portfolio" ? "active" : ""}
        aria-label="Go to Portfolio"
        aria-current={activeNav === "#portfolio" ? "page" : undefined}
      >
        <BiFile />
      </a>

      <a
        href="#contact"
        onClick={() => setActiveNav("#contact")}
        className={activeNav === "#contact" ? "active" : ""}
        aria-label="Go to Contact"
        aria-current={activeNav === "#contact" ? "page" : undefined}
      >
        <BiMessageSquareDetail />
      </a>
    </nav>
  );
};

export default Nav;
