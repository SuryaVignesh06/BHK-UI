import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

import bhk1 from '../assets/bhk1.jpeg';
import bhk2 from '../assets/bhk2.jpeg';
import bhk3 from '../assets/bhk3.jpeg';
import bhk4 from '../assets/bhk4.jpeg';
import bhk5 from '../assets/bhk5.jpeg';
import bhk6 from '../assets/bhk6.jpeg';
import bhk7 from '../assets/bhk7.jpeg';
import bhk8 from '../assets/bhk8.jpeg';
import bhk9 from '../assets/bhk9.jpeg';
import bhk10 from '../assets/bhk10.jpeg';
import bhk11 from '../assets/bhk11.jpeg';
import bhk12 from '../assets/bhk12.jpeg';
import bhk14 from '../assets/bhk14.jpeg';

// User's BHK images
const galleryImages = [
    { id: 1, src: bhk1, alt: "Gallery 1" },
    { id: 2, src: bhk2, alt: "Gallery 2" },
    { id: 3, src: bhk3, alt: "Gallery 3" },
    { id: 4, src: bhk4, alt: "Gallery 4" },
    { id: 5, src: bhk5, alt: "Gallery 5" },
    { id: 6, src: bhk6, alt: "Gallery 6" },
    { id: 7, src: bhk7, alt: "Gallery 7" },
    { id: 8, src: bhk8, alt: "Gallery 8" },
    { id: 9, src: bhk9, alt: "Gallery 9" },
    { id: 10, src: bhk10, alt: "Gallery 10" },
    { id: 11, src: bhk11, alt: "Gallery 11" },
    { id: 12, src: bhk12, alt: "Gallery 12" },
    { id: 13, src: bhk14, alt: "Gallery 13" }
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const Gallery = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const displayedImages = isMobile && !showAll ? galleryImages.slice(0, 6) : galleryImages;

    return (
        <section id="gallery" className="gallery-section">
            <div className="gallery-container">
                <motion.div
                    className="gallery-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="gallery-eyebrow">Gallery</span>
                    <h2 className="gallery-title">Our Spaces</h2>
                </motion.div>

                <motion.div
                    className="gallery-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {displayedImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            className={`gallery-item gallery-item-${index + 1}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index % 4 * 0.1 }}
                            layout
                        >
                            <img src={image.src} alt={image.alt} />
                            <div className="gallery-overlay">
                                <span className="gallery-number">{String(index + 1).padStart(2, '0')}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {isMobile && (
                    <motion.div
                        className="gallery-actions"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            className="view-more-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'View Less' : 'View More'}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
