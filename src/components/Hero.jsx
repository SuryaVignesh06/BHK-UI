import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Hero.css';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import VideoModal from './VideoModal';
import videoSource from '../assets/bhkv.mp4';

const heroSlides = [
    {
        image: "/src/assets/bhk1.jpeg",
    },
    {
        image: "/src/assets/bhk2.jpeg",
    },
    {
        image: "/src/assets/bhk3.jpeg",
    }
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-section" id="home">
            <div className="hero-bg-container">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`hero-bg-slide ${index === currentImageIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                ))}
                <div className="hero-overlay"></div>
            </div>

            <Navbar />

            <div className="hero-content-container">
                <motion.div
                    className="hero-text-wrapper"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 2.2 }}
                >
                    <p className="hero-tagline">Welcome to</p>
                    <h1 className="hero-heading">
                        Premium 2BHK Living
                    </h1>
                    <p className="hero-subheading">
                        in Bhimavaram
                    </p>

                    <motion.button
                        className="hero-cta-btn"
                        onClick={() => setShowVideo(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Explore Our Spaces
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
            >
                <span>Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>

            <VideoModal
                isOpen={showVideo}
                onClose={() => setShowVideo(false)}
                videoSrc={videoSource}
            />
        </div>
    );
};

export default Hero;
