import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>Voho.</h3>
                    <p>Premium 2BHK Serviced Apartments in Bhimavaram.</p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h4>Contact</h4>
                        <p>+91 98765 43210</p>
                        <p>stay@voho.in</p>
                    </div>
                    <div className="link-group">
                        <h4>Location</h4>
                        <p>Bhimavaram, Andhra Pradesh</p>
                        <a href="https://www.google.com/maps/search/Bhimavaram" target="_blank" rel="noopener noreferrer" className="map-link">View on Map</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Voho Apartments. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
