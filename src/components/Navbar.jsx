import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showSplash, setShowSplash] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

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
                            src={logoImg}
                            alt="VOHO"
                            className="splash-logo"
                            layoutId="logo-img"
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Logo */}
            {!showSplash && (
                <motion.div
                    className={`floating-logo ${scrolled ? 'scrolled' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <a href="/">
                        <motion.img
                            src={logoImg}
                            alt="VOHO"
                            className="floating-logo-img"
                            layoutId="logo-img"
                        />
                    </a>
                </motion.div>
            )}

            {/* Navbar */}
            <nav className={`navbar ${scrolled || isMobileMenuOpen ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Desktop Links */}
                    <div className="nav-links-right">
                        <a href="#home" className="nav-link-item">Home</a>
                        <a href="#about" className="nav-link-item">About</a>
                        <a href="#gallery" className="nav-link-item">Gallery</a>
                        <a href="#apartments" className="nav-link-item">Rooms</a>
                        <a href="#contact" className="nav-link-item">Contact</a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="mobile-menu-toggle" onClick={toggleMenu}>
                        {isMobileMenuOpen ? (
                            <X size={28} color={scrolled || isMobileMenuOpen ? "#ffffff" : "#ffffff"} />
                        ) : (
                            <Menu size={28} color={scrolled ? "#ffffff" : "#ffffff"} />
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mobile-nav-links">
                            <a href="#home" onClick={closeMenu}>Home</a>
                            <a href="#about" onClick={closeMenu}>About</a>
                            <a href="#gallery" onClick={closeMenu}>Gallery</a>
                            <a href="#apartments" onClick={closeMenu}>Rooms</a>
                            <a href="#contact" onClick={closeMenu}>Contact</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
