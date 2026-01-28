import React from 'react';
import { motion } from 'framer-motion';
import './Facilities.css';
import { Wifi, Wind, MapPin, ShieldCheck, Tv, CreditCard } from 'lucide-react';

const facilitiesData = [
    { title: "High-Speed WiFi", icon: <Wifi size={32} strokeWidth={1} />, desc: "Seamless connectivity for work & play" },
    { title: "Climate Control", icon: <Wind size={32} strokeWidth={1} />, desc: "Central AC for year-round comfort" },
    { title: "Prime Location", icon: <MapPin size={32} strokeWidth={1} />, desc: "Heart of Bhimavaram" },
    { title: "Secure Parking", icon: <ShieldCheck size={32} strokeWidth={1} />, desc: "Protected vehicle space" },
    { title: "Smart Entertainment", icon: <Tv size={32} strokeWidth={1} />, desc: "Smart TV & streaming services" },
    { title: "Easy Payment", icon: <CreditCard size={32} strokeWidth={1} />, desc: "All major payment methods" }
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const Facilities = () => {
    return (
        <section id="facilities" className="facilities-section">
            <div className="facilities-container">
                <motion.div
                    className="facilities-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="facilities-eyebrow">Amenities</span>
                    <h2 className="facilities-title">Everything You Need</h2>
                </motion.div>

                <motion.div
                    className="facilities-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {facilitiesData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="facility-card"
                            variants={itemVariants}
                        >
                            <div className="facility-icon">
                                {item.icon}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Facilities;
