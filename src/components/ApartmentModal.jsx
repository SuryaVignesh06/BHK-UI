import React, { useState } from 'react';
import './ApartmentModal.css';

const ApartmentModal = ({ apartment, onClose }) => {
    const [step, setStep] = useState(1);
    const [dates, setDates] = useState({ checkIn: '', checkOut: '' });

    if (!apartment) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <div className="modal-grid">
                    {/* Left: Details */}
                    <div className="modal-details">
                        <div className="modal-gallery">
                            <img src={apartment.image} alt={apartment.name} />
                            {/* Carousel controls could go here */}
                        </div>

                        <div className="detail-text">
                            <h2>{apartment.name}</h2>
                            <p className="description">{apartment.description}</p>

                            <h3>Amenities</h3>
                            <div className="amenities-grid">
                                {apartment.amenities.map(item => (
                                    <div key={item} className="amenity-item">
                                        <span className="amenity-icon">•</span> {item}
                                    </div>
                                ))}
                                <div className="amenity-item"><span className="amenity-icon">•</span> Hot Water</div>
                                <div className="amenity-item"><span className="amenity-icon">•</span> Power Backup</div>
                                <div className="amenity-item"><span className="amenity-icon">•</span> 24x7 Support</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking Flow */}
                    <div className="modal-booking">
                        {step === 1 && (
                            <div className="booking-step step-1">
                                <h3>Select Dates</h3>
                                <div className="price-tag">
                                    <span>₹{apartment.price}</span> / night
                                </div>

                                <div className="date-inputs">
                                    <div className="input-group">
                                        <label>Check In</label>
                                        <input type="date" onChange={e => setDates({ ...dates, checkIn: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Check Out</label>
                                        <input type="date" onChange={e => setDates({ ...dates, checkOut: e.target.value })} />
                                    </div>
                                </div>

                                <button className="primary-btn" onClick={() => setStep(2)}>
                                    Continue to Guests
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="booking-step step-2">
                                <h3>Guest Details</h3>
                                <div className="form-group">
                                    <input type="text" placeholder="Full Name" />
                                    <input type="email" placeholder="Email Address" />
                                    <input type="tel" placeholder="Phone Number" />
                                </div>

                                <div className="step-actions">
                                    <button className="back-btn" onClick={() => setStep(1)}>Back</button>
                                    <button className="primary-btn" onClick={() => setStep(3)}>Proceed to Pay</button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="booking-step step-3">
                                <h3>Payment</h3>
                                <div className="secure-badge">🔒 Secure Payment</div>
                                <div className="payment-summary">
                                    <div className="summary-row">
                                        <span>Total Amount</span>
                                        <span>₹{apartment.price} x 2 nights</span>
                                    </div>
                                </div>

                                <input type="text" placeholder="Card Number (Mock)" className="card-input" />

                                <div className="step-actions">
                                    <button className="back-btn" onClick={() => setStep(2)}>Back</button>
                                    <button className="primary-btn pay-btn" onClick={() => alert('Booking Confirmed! (Mock)')}>
                                        Pay & Confirm
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="step-indicators">
                            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
                            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
                            <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentModal;
