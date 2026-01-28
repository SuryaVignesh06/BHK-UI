import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Splash Screen Timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showSplash && (
                    <motion.div
                        className="splash-screen"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.img
                            src="/src/assets/logo.png"
                            alt="VOHO"
                            className="splash-logo"
                            layoutId="logo-img"
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Logo - No background at top, circular on scroll */}
            {!showSplash && (
                <motion.div
                    className={`floating-logo ${scrolled ? 'scrolled' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <a href="/">
                        <motion.img
                            src="/src/assets/logo.png"
                            alt="VOHO"
                            className="floating-logo-img"
                            layoutId="logo-img"
                        />
                    </a>
                </motion.div>
            )}

            {/* Navbar with only links on right */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <div className="nav-links-right">
                        <a href="#home" className="nav-link-item">Home</a>
                        <a href="#about" className="nav-link-item">About</a>
                        <a href="#gallery" className="nav-link-item">Gallery</a>
                        <a href="#apartments" className="nav-link-item">Rooms</a>
                        <a href="#contact" className="nav-link-item">Contact</a>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
