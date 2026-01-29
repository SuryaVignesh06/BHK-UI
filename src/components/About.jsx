import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import aboutImage from '../assets/bhk4.jpeg';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="about-container">
                <motion.div
                    className="about-image-wrapper"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img
                        src={aboutImage}
                        alt="Luxury Interior"
                        className="about-img"
                    />
                </motion.div>

                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <span className="section-eyebrow">Our Story</span>
                    <h2 className="section-title">
                        A Space Designed<br />
                        <em>for Living</em>
                    </h2>
                    <p className="section-text">
                        Welcome to VOHO, where premium comfort meets traditional Bhimavaram hospitality.
                        Our spaces are curated to offer a sanctuary of calm, featuring state-of-the-art
                        amenities wrapped in sophisticated design.
                    </p>
                    <p className="section-text">
                        Every corner is crafted with your peace in mind—from our soundproof
                        interiors to our attentive service.
                    </p>
                    <a href="#apartments" className="about-cta">
                        Discover Our Apartments
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
