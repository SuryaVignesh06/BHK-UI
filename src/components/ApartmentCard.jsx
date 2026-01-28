import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ApartmentCard.css';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const ApartmentCard = ({ apartment, onClick }) => {
    return (
        <motion.div
            className="apartment-card"
            variants={cardVariants}
            onClick={onClick}
        >
            <div className="card-image-wrapper">
                <img src={apartment.image} alt={apartment.name} />
                <div className="card-overlay">
                    <span className="view-details">View Details</span>
                </div>
            </div>

            <div className="card-content">
                <h3 className="card-title">{apartment.name}</h3>
                <p className="card-price">From ₹{apartment.price} / night</p>

                <Link
                    to="/payment"
                    state={{ selectedRoom: apartment }}
                    className="card-cta"
                    onClick={(e) => e.stopPropagation()}
                >
                    Book Now
                </Link>
            </div>
        </motion.div>
    );
};

export default ApartmentCard;
