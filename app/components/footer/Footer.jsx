import "./footer.css";
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      {/* Logo */}
      <a
        href="/"
        className="footer_logo"
        aria-label="Go to Bhupendra Nath's homepage"
      >
        Bhupendra Nath
      </a>

      {/* Navigation Links */}
      <ul className="permalinks">
        <li>
          <a href="/" aria-label="Go to Home">
            Home
          </a>
        </li>
        <li>
          <a href="#about" aria-label="Learn more About me">
            About
          </a>
        </li>
        <li>
          <a href="#experience" aria-label="View my Experience">
            Experience
          </a>
        </li>
        <li>
          <a href="#portfolio" aria-label="Check out my Portfolio">
            Portfolio
          </a>
        </li>
        <li>
          <a href="#contact" aria-label="Contact me">
            Contact
          </a>
        </li>
      </ul>

      {/* Social Media Links */}
      <div className="footer_socials">
        <a
          href="https://www.facebook.com/bhupi.000/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow me on Facebook"
        >
          <BsFacebook />
        </a>
        <a
          href="https://www.instagram.com/i_am_bhupi10/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow me on Instagram"
        >
          <BsInstagram />
        </a>
      </div>

      {/* Copyright Notice */}
      <div className="footer_copyright">
        <small>
          &copy; {new Date().getFullYear()} Bhupendra Nath. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
