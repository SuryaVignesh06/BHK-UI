import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="contact-eyebrow">Contact</span>
                    <h2 className="contact-title">Get in Touch</h2>
                    <p className="contact-text">
                        Thinking of visiting Bhimavaram? Let us handle your stay with care and attention.
                    </p>

                    <div className="contact-details">
                        <div className="contact-item">
                            <Phone size={18} strokeWidth={1.5} />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="contact-item">
                            <Mail size={18} strokeWidth={1.5} />
                            <span>bookings@voho.in</span>
                        </div>
                        <div className="contact-item">
                            <MapPin size={18} strokeWidth={1.5} />
                            <span>SRKR Marg, Bhimavaram</span>
                        </div>
                    </div>
                </motion.div>

                <motion.form
                    className="contact-form"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="form-group">
                        <input type="text" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" required />
                    </div>
                    <div className="form-group">
                        <textarea placeholder="Message or Special Requests" rows="4"></textarea>
                    </div>
                    <button type="submit" className="submit-btn">
                        Send Message
                    </button>
                </motion.form>
            </div>

            {/* Footer Bar */}
            <div className="footer-bar">
                <p>© 2024 VOHO. All rights reserved.</p>
            </div>
        </section>
    );
};

export default Contact;
