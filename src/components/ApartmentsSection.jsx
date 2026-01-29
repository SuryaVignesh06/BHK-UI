import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApartmentCard from './ApartmentCard';
import ApartmentModal from './ApartmentModal';
import './ApartmentsSection.css';

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

const apartments = [
    {
        id: 1,
        name: 'The Royal Suite',
        price: '3,500',
        description: 'Spacious 2BHK with premium wood finishings and city view. Features a modern kitchen, comfortable living area, and elegant bedroom spaces designed for relaxation.',
        image: bhk5,
        images: [bhk5, bhk1, bhk2],
        amenities: ['WiFi', 'AC', 'Kitchen', 'Balcony']
    },
    {
        id: 2,
        name: 'Modern Comfort Flat',
        price: '3,200',
        description: 'Contemporary design with smart lighting and open kitchen. Perfect for couples or small families seeking modern amenities in a cozy setting.',
        image: bhk6,
        images: [bhk6, bhk3, bhk4],
        amenities: ['WiFi', 'AC', 'Work Desk', 'Parking']
    },
    {
        id: 3,
        name: 'Cozy Family Haven',
        price: '3,000',
        description: 'Perfect for families, warm lighting and large living area. Includes spacious bedrooms, a fully equipped kitchen, and a comfortable dining space.',
        image: bhk7,
        images: [bhk7, bhk9, bhk10],
        amenities: ['WiFi', 'AC', 'TV', 'Laundry']
    },
    {
        id: 4,
        name: 'Executive Stay',
        price: '4,000',
        description: 'Luxury finishing for business travelers with dedicated workspace. Features premium furnishings, high-speed internet, and a peaceful environment for productivity.',
        image: bhk8,
        images: [bhk8, bhk11, bhk12],
        amenities: ['WiFi', 'AC', 'Meeting Area', 'View']
    }
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
};

const ApartmentsSection = () => {
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [modalMode, setModalMode] = useState('details');

    const openModal = (apartment, mode) => {
        setSelectedApartment(apartment);
        setModalMode(mode);
    };

    return (
        <section id="apartments" className="apartments-section">
            <div className="apartments-container">
                <motion.div
                    className="apartments-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="apartments-eyebrow">Accommodations</span>
                    <h2 className="apartments-title">Our Spaces</h2>
                    <p className="apartments-subtitle">
                        Curated selection of premium 2BHK apartments, each designed for comfort.
                    </p>
                </motion.div>

                <motion.div
                    className="apartments-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {apartments.map((apt) => (
                        <ApartmentCard
                            key={apt.id}
                            apartment={apt}
                            onViewDetails={() => openModal(apt, 'details')}
                            onBook={() => openModal(apt, 'booking')}
                        />
                    ))}
                </motion.div>
            </div>

            {selectedApartment && (
                <ApartmentModal
                    apartment={selectedApartment}
                    mode={modalMode}
                    onClose={() => setSelectedApartment(null)}
                />
            )}
        </section>
    );
};

export default ApartmentsSection;
