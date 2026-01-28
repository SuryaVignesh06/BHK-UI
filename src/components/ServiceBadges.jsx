import React from 'react';
import './ServiceBadges.css';

const badges = [
    { icon: '🕒', text: '24×7 Guest Support' },
    { icon: '🚿', text: 'Hot Water 24/7' },
    { icon: '📶', text: 'Free High-Speed WiFi' },
    { icon: '⚡', text: 'Instant Confirmation' },
];

const ServiceBadges = () => {
    return (
        <div className="service-badges">
            {badges.map((badge, index) => (
                <div key={index} className="badge-item">
                    <span className="badge-icon">{badge.icon}</span>
                    <span className="badge-text">{badge.text}</span>
                </div>
            ))}
        </div>
    );
};

export default ServiceBadges;
