import React from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

// User's BHK images (bhk1-14, no bhk13)
const galleryImages = [
    { id: 1, src: "/src/assets/bhk1.jpeg", alt: "Gallery 1" },
    { id: 2, src: "/src/assets/bhk2.jpeg", alt: "Gallery 2" },
    { id: 3, src: "/src/assets/bhk3.jpeg", alt: "Gallery 3" },
    { id: 4, src: "/src/assets/bhk4.jpeg", alt: "Gallery 4" },
    { id: 5, src: "/src/assets/bhk5.jpeg", alt: "Gallery 5" },
    { id: 6, src: "/src/assets/bhk6.jpeg", alt: "Gallery 6" },
    { id: 7, src: "/src/assets/bhk7.jpeg", alt: "Gallery 7" },
    { id: 8, src: "/src/assets/bhk8.jpeg", alt: "Gallery 8" },
    { id: 9, src: "/src/assets/bhk9.jpeg", alt: "Gallery 9" },
    { id: 10, src: "/src/assets/bhk10.jpeg", alt: "Gallery 10" },
    { id: 11, src: "/src/assets/bhk11.jpeg", alt: "Gallery 11" },
    { id: 12, src: "/src/assets/bhk12.jpeg", alt: "Gallery 12" },
    { id: 13, src: "/src/assets/bhk14.jpeg", alt: "Gallery 13" }
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
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            className={`gallery-item gallery-item-${index + 1}`}
                            variants={itemVariants}
                        >
                            <img src={image.src} alt={image.alt} />
                            <div className="gallery-overlay">
                                <span className="gallery-number">{String(index + 1).padStart(2, '0')}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Gallery;
