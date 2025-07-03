"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaInstagram size={18} />,
    name: "Instagram",
    color: "bg-gradient-to-br from-pink-500 to-purple-600",
    path: "https://www.instagram.com/",
  },
  {
    icon: <FaFacebook size={18} />,
    name: "Facebook",
    color: "bg-blue-600",
    path: "https://www.facebook.com/",
  },
  {
    icon: <FaYoutube size={18} />,
    name: "YouTube",
    color: "bg-red-600",
    path: "https://www.youtube.com/",
  },
  {
    icon: <FaLinkedin size={18} />,
    name: "LinkedIn",
    color: "bg-blue-700",
    path: "https://www.linkedin.com/",
  },
];

export default function ContactCTASection() {
  return (
    <section className="bg-light">
      {/* Contact CTA */}
      <div className="w-full pt-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto text-center border-b border-gray-200 pb-10"
        >
          <h3 className="text-4xl font-bold text-gray-7 mb-4">
            Ready to <span className="text-accent">transform</span> your
            workflow?
          </h3>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Our specialists are available to provide expert guidance.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/support#contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-md transition-colors font-medium text-lg"
            >
              Contact Our Staff
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Social Links */}
      <div className="w-full pt-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-4xl mx-auto text-center pb-16"
        >
          <h3 className="text-3xl font-bold text-gray-7 mb-3">
            <span className="text-primary">Connect</span> With Us
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Follow for exclusive content and professional insights
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} flex items-center gap-2 px-5 py-3 rounded-lg text-white font-medium text-sm shadow-sm hover:shadow-md transition-all`}
                  aria-label={`Follow on ${link.name}`}
                >
                  {link.icon}
                  {link.name}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
