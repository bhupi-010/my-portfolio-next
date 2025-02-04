import "./footer.css";
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <a href="#" className="footer_logo">
        Bhupendra Nath
      </a>
      <ul className="permalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
        <li>
          <a href="#portfolio">Portfolio</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="footer_socials">
        <a href="https://www.facebook.com/bhupi.000/">
          <BsFacebook />
        </a>
        <a href="https://www.instagram.com/i_am_bhupi10/">
          <BsInstagram />
        </a>
      </div>
      <div className="footer_copyright">
        <small>&copy; Bhupendra.All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
