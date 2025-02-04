"use client";
import React, { useRef, useState, useEffect } from "react";
import "./contact.css";
import { FiMail } from "react-icons/fi";
import { RiMessengerFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
const Contact = () => {
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("contact");
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
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_han0s2b",
        "template_650daal",
        form.current,
        "WFWD19f2aJh0879Mp"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <motion.h2
        initial={{ y: -30 }}
        animate={{ y: animateTitle ? 0 : -30 }} // Only animate when in view
        transition={{ delay: 0.2 }}
      >
        Contact Me
      </motion.h2>
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: animateTitle ? 0 : -500 }} // Only animate when in view
        transition={{ delay: 0.2 }}
        className="container contact_container"
      >
        <div className="contact_options">
          <article className="contact_option" aria-labelledby="email-option">
            <FiMail className="contact_option-icon" />
            <h4 id="email-option">Email</h4>
            <h5>nathbhupi10@gmail.com</h5>
            <a
              href="mailto:nathbhupi10@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send an email to nathbhupi10@gmail.com"
            >
              Send an email
            </a>
          </article>

          <article
            className="contact_option"
            aria-labelledby="messenger-option"
          >
            <RiMessengerFill className="contact_option-icon" />
            <h4 id="messenger-option">Messenger</h4>
            <h5>Bhupendra Nath</h5>
            <a
              href="https://m.me/bhupi.000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send a message to Bhupendra Nath on Messenger"
            >
              Send a message on Messenger
            </a>
          </article>

          <article className="contact_option" aria-labelledby="whatsapp-option">
            <FaWhatsapp className="contact_option-icon" />
            <h4 id="whatsapp-option">Whatsapp</h4>
            <h5>+9779865599757</h5>
            <a
              href="https://api.whatsapp.com/send?phone=+9779865599757"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send a message to +9779865599757 on WhatsApp"
            >
              Send a message on WhatsApp
            </a>
          </article>
        </div>

        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            id=""
            rows="7"
            placeholder="Your Message"
            required
          />

          <button
            type="submit"
            aria-label="Send Message"
            title="Click to send your message"
            className="btn btn-primary"
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
