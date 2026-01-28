import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Payment.css';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Lock } from 'lucide-react'; // Import icons

const Payment = () => {
    const location = useLocation();
    const { selectedRoom } = location.state || {};

    // State for Booking Steps
    const [step, setStep] = useState(1);
    const [method, setMethod] = useState('card');

    // Dates & Calculation
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [nights, setNights] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    // Default values
    const roomName = selectedRoom ? selectedRoom.name : "Premium Suite";
    const pricePerNight = selectedRoom ? parseInt(selectedRoom.price) : 4500;
    const image = selectedRoom ? selectedRoom.image : "/src/assets/room1.jpg"; // Fallback image

    useEffect(() => {
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setNights(diffDays > 0 ? diffDays : 1);
        }
    }, [checkIn, checkOut]);

    useEffect(() => {
        setTotalPrice(pricePerNight * nights);
    }, [nights, pricePerNight]);

    return (
        <motion.div
            className="payment-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            <div className={`modal ${step === 1 ? 'modal-wide' : ''} `}> {/* Wider modal for preview if needed */}

                {/* Step 1: Room Preview & Dates */}
                {step === 1 && (
                    <div className="booking-step-1">
                        <div className="room-preview-container">
                            <img src={image} alt={roomName} className="room-preview-img" />
                            <div className="room-preview-info">
                                <h3>{roomName}</h3>
                                <p className="price-tag">₹{pricePerNight} / Night</p>
                            </div>
                        </div>

                        <div className="date-selection-form">
                            <h4>Select Dates</h4>
                            <div className="split">
                                <div className="input_container">
                                    <label className="input_label">Check-In</label>
                                    <div className="input_wrapper">
                                        <Calendar size={14} className="input-icon" />
                                        <input
                                            type="date"
                                            className="input_field with-icon"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input_container">
                                    <label className="input_label">Check-Out</label>
                                    <div className="input_wrapper">
                                        <Calendar size={14} className="input-icon" />
                                        <input
                                            type="date"
                                            className="input_field with-icon"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="purchase--btn" onClick={() => setStep(2)}>
                            Proceed to Payment
                        </button>
                    </div>
                )}


                {/* Step 2: Payment & Identity */}
                {step === 2 && (
                    <div className="booking-step-2">
                        <button className="back-btn" onClick={() => setStep(1)}>
                            <ArrowLeft size={20} />
                        </button>

                        <div className="payment-header-hero">
                            <h1>Payment</h1>
                            <div className="secure-badge">
                                <Lock size={16} className="lock-icon" />
                                <span>Secure Payment</span>
                            </div>
                            <h3 className="total-amount-display">
                                Total Amount ₹{totalPrice.toLocaleString()} <span className="night-count">x {nights} nights</span>
                            </h3>
                        </div>

                        {/* Pagination Dots (Visual Only as per image) */}
                        <div className="pagination-dots">
                            <span className="dot"></span>
                            <span className="dot active"></span>
                            <span className="dot"></span>
                        </div>

                        {/* Method Tabs */}
                        <div className="payment-tabs">
                            <button
                                className={`pay - tab ${method === 'card' ? 'active' : ''} `}
                                onClick={() => setMethod('card')}
                            >
                                Card
                            </button>
                            <button
                                className={`pay - tab ${method === 'upi' ? 'active' : ''} `}
                                onClick={() => setMethod('upi')}
                            >
                                UPI
                            </button>
                            <button
                                className={`pay - tab ${method === 'netbanking' ? 'active' : ''} `}
                                onClick={() => setMethod('netbanking')}
                            >
                                Net Banking
                            </button>
                        </div>

                        <form className="form" onSubmit={(e) => e.preventDefault()}>

                            {/* Common Identity Fields */}
                            <div className="input_container">
                                <label className="input_label">Full Name</label>
                                <input className="input_field" type="text" placeholder="John Doe" required />
                            </div>

                            <div className="split">
                                <div className="input_container">
                                    <label className="input_label">Phone Number</label>
                                    <input className="input_field" type="tel" placeholder="98765 43210" required />
                                </div>
                                <div className="input_container">
                                    <label className="input_label">Email Address</label>
                                    <input className="input_field" type="email" placeholder="john@example.com" />
                                </div>
                            </div>

                            <div className="input_container">
                                <label className="input_label">Aadhar Card Number</label>
                                <input className="input_field" type="text" placeholder="XXXX XXXX XXXX" maxLength="14" required />
                            </div>

                            {/* Method Specific Inputs */}
                            {method === 'card' && (
                                <div className="input_container">
                                    <label className="input_label">Card Number (Mock)</label>
                                    <input className="input_field" type="text" placeholder="0000 0000 0000 0000" />
                                </div>
                            )}

                            {method === 'upi' && (
                                <div className="input_container">
                                    <label className="input_label">UPI ID</label>
                                    <input className="input_field" type="text" placeholder="username@bank" />
                                </div>
                            )}

                            {method === 'netbanking' && (
                                <div className="input_container">
                                    <label className="input_label">Select Bank</label>
                                    <select className="input_field select-field">
                                        <option>HDFC Bank</option>
                                        <option>SBI</option>
                                        <option>ICICI Bank</option>
                                    </select>
                                </div>
                            )}

                            {/* Gold Pay Button */}
                            <button className="pay-confirm-btn">
                                Pay & Confirm
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Payment;
