import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApartmentCard from './ApartmentCard';
import ApartmentModal from './ApartmentModal';
import './ApartmentsSection.css';

const apartments = [
    {
        id: 1,
        name: 'The Royal Suite',
        price: '3,500',
        description: 'Spacious 2BHK with premium wood finishings and city view. Features a modern kitchen, comfortable living area, and elegant bedroom spaces designed for relaxation.',
        image: '/src/assets/bhk5.jpeg',
        images: ['/src/assets/bhk5.jpeg', '/src/assets/bhk1.jpeg', '/src/assets/bhk2.jpeg'],
        amenities: ['WiFi', 'AC', 'Kitchen', 'Balcony']
    },
    {
        id: 2,
        name: 'Modern Comfort Flat',
        price: '3,200',
        description: 'Contemporary design with smart lighting and open kitchen. Perfect for couples or small families seeking modern amenities in a cozy setting.',
        image: '/src/assets/bhk6.jpeg',
        images: ['/src/assets/bhk6.jpeg', '/src/assets/bhk3.jpeg', '/src/assets/bhk4.jpeg'],
        amenities: ['WiFi', 'AC', 'Work Desk', 'Parking']
    },
    {
        id: 3,
        name: 'Cozy Family Haven',
        price: '3,000',
        description: 'Perfect for families, warm lighting and large living area. Includes spacious bedrooms, a fully equipped kitchen, and a comfortable dining space.',
        image: '/src/assets/bhk7.jpeg',
        images: ['/src/assets/bhk7.jpeg', '/src/assets/bhk9.jpeg', '/src/assets/bhk10.jpeg'],
        amenities: ['WiFi', 'AC', 'TV', 'Laundry']
    },
    {
        id: 4,
        name: 'Executive Stay',
        price: '4,000',
        description: 'Luxury finishing for business travelers with dedicated workspace. Features premium furnishings, high-speed internet, and a peaceful environment for productivity.',
        image: '/src/assets/bhk8.jpeg',
        images: ['/src/assets/bhk8.jpeg', '/src/assets/bhk11.jpeg', '/src/assets/bhk12.jpeg'],
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
