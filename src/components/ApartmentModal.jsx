import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ApartmentModal.css';

const ApartmentModal = ({ apartment, onClose, mode = 'details' }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isBooked, setIsBooked] = useState(false);
    const [currentMode, setCurrentMode] = useState(mode);
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [bookingData, setBookingData] = useState({
        checkIn: '',
        checkOut: '',
        name: '',
        phone: '',
    });
    const [bookingId, setBookingId] = useState('');

    if (!apartment) return null;

    const images = apartment.images || [apartment.image];

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    const calculateNights = () => {
        if (bookingData.checkIn && bookingData.checkOut) {
            const start = new Date(bookingData.checkIn);
            const end = new Date(bookingData.checkOut);
            const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            return diff > 0 ? diff : 1;
        }
        return 1;
    };

    const nights = calculateNights();
    const pricePerNight = parseInt(apartment.price.replace(/,/g, ''));
    const totalPrice = pricePerNight * nights;

    const handleBooking = () => {
        const id = 'VOHO' + Date.now().toString().slice(-8);
        setBookingId(id);
        setIsBooked(true);
    };

    const downloadReceipt = () => {
        const receipt = `
========================================
           VOHO APARTMENTS
         BOOKING CONFIRMATION
========================================

Booking ID: ${bookingId}
Date: ${new Date().toLocaleDateString('en-IN')}

Guest: ${bookingData.name}
Phone: ${bookingData.phone}

Property: ${apartment.name}
Check-in: ${bookingData.checkIn}
Check-out: ${bookingData.checkOut}
Duration: ${nights} night(s)

TOTAL PAID: Rs.${totalPrice.toLocaleString()}

Thank you for choosing VOHO!
========================================
        `;
        const blob = new Blob([receipt], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `VOHO_Receipt_${bookingId}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const isFormValid = bookingData.checkIn && bookingData.checkOut && bookingData.name && bookingData.phone;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div
                className="modal-content booking-modal"
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <button className="close-btn-top" onClick={onClose}><X size={22} /></button>

                <div className="booking-layout">
                    {/* Left: Images */}
                    <div className="booking-images">
                        <div className="image-carousel">
                            <button className="carousel-btn prev" onClick={prevImage}>
                                <ChevronLeft size={24} />
                            </button>
                            <img src={images[currentImageIndex]} alt={apartment.name} />
                            <button className="carousel-btn next" onClick={nextImage}>
                                <ChevronRight size={24} />
                            </button>
                        </div>
                        <div className="carousel-dots">
                            {images.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`carousel-dot ${idx === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentImageIndex(idx)}
                                />
                            ))}
                        </div>

                        {/* Property Info under images */}
                        <div className="property-summary">
                            <h3>{apartment.name}</h3>
                            <p className="property-price">Rs.{apartment.price} / night</p>
                        </div>

                        {/* Book Now button under image (only in details mode) */}
                        {currentMode === 'details' && !isBooked && (
                            <button
                                className="book-btn-below"
                                onClick={() => setCurrentMode('booking')}
                            >
                                Book Now
                            </button>
                        )}
                    </div>

                    {/* Right: Details or Payment */}
                    <div className="booking-payment">
                        <AnimatePresence mode="wait">
                            {/* Details Mode */}
                            {currentMode === 'details' && !isBooked && (
                                <motion.div
                                    key="details"
                                    className="details-view"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h2 className="details-title">{apartment.name}</h2>
                                    <p className="details-price">Rs.{apartment.price} / night</p>

                                    <div className="details-section">
                                        <h4>About</h4>
                                        <p>{apartment.description}</p>
                                    </div>

                                    <div className="details-section">
                                        <h4>Amenities</h4>
                                        <div className="amenities-tags">
                                            {apartment.amenities.map(item => (
                                                <span key={item} className="amenity-chip">{item}</span>
                                            ))}
                                            <span className="amenity-chip">Hot Water</span>
                                            <span className="amenity-chip">Power Backup</span>
                                            <span className="amenity-chip">24x7 Support</span>
                                        </div>
                                    </div>

                                    <button
                                        className="book-btn"
                                        onClick={() => setCurrentMode('booking')}
                                    >
                                        Book This Room
                                    </button>
                                </motion.div>
                            )}

                            {/* Booking Mode */}
                            {currentMode === 'booking' && !isBooked && (
                                <motion.div
                                    key="form"
                                    className="payment-form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h3 className="payment-title">Book Your Stay</h3>

                                    <div className="price-box">
                                        <span className="price-value">Rs.{apartment.price}</span>
                                        <span className="price-unit">/ night</span>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-field">
                                            <label>Check-in</label>
                                            <input
                                                type="date"
                                                value={bookingData.checkIn}
                                                onChange={e => setBookingData({ ...bookingData, checkIn: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label>Check-out</label>
                                            <input
                                                type="date"
                                                value={bookingData.checkOut}
                                                onChange={e => setBookingData({ ...bookingData, checkOut: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-field">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            value={bookingData.name}
                                            onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            value={bookingData.phone}
                                            onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
                                        />
                                    </div>

                                    {bookingData.checkIn && bookingData.checkOut && (
                                        <div className="total-box">
                                            <div className="total-row">
                                                <span>Rs.{pricePerNight.toLocaleString()} x {nights} nights</span>
                                                <span className="total-amount">Rs.{totalPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Payment Method Selection */}
                                    <div className="payment-methods">
                                        <label className="payment-method-label">Payment Method</label>
                                        <div className="payment-options">
                                            <button
                                                className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('upi')}
                                            >
                                                UPI
                                            </button>
                                            <button
                                                className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('card')}
                                            >
                                                Card
                                            </button>
                                            <button
                                                className={`payment-option ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                                                onClick={() => setPaymentMethod('netbanking')}
                                            >
                                                Net Banking
                                            </button>
                                        </div>

                                        {/* Payment Details based on method */}
                                        <div className="payment-details">
                                            {paymentMethod === 'upi' && (
                                                <div className="form-field">
                                                    <label>UPI ID</label>
                                                    <input
                                                        type="text"
                                                        placeholder="yourname@upi"
                                                    />
                                                </div>
                                            )}

                                            {paymentMethod === 'card' && (
                                                <>
                                                    <div className="form-field">
                                                        <label>Card Number</label>
                                                        <input
                                                            type="text"
                                                            placeholder="1234 5678 9012 3456"
                                                            maxLength="19"
                                                        />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-field">
                                                            <label>Expiry</label>
                                                            <input
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                maxLength="5"
                                                            />
                                                        </div>
                                                        <div className="form-field">
                                                            <label>CVV</label>
                                                            <input
                                                                type="password"
                                                                placeholder="***"
                                                                maxLength="3"
                                                            />
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {paymentMethod === 'netbanking' && (
                                                <div className="form-field">
                                                    <label>Select Bank</label>
                                                    <select className="bank-select">
                                                        <option value="">Choose your bank</option>
                                                        <option value="sbi">State Bank of India</option>
                                                        <option value="hdfc">HDFC Bank</option>
                                                        <option value="icici">ICICI Bank</option>
                                                        <option value="axis">Axis Bank</option>
                                                        <option value="kotak">Kotak Mahindra Bank</option>
                                                        <option value="pnb">Punjab National Bank</option>
                                                        <option value="bob">Bank of Baroda</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        className="book-btn"
                                        onClick={handleBooking}
                                        disabled={!isFormValid}
                                    >
                                        {isFormValid ? `Pay Rs.${totalPrice.toLocaleString()}` : 'Fill all details'}
                                    </button>

                                    <p className="secure-text">Secure booking - Your data is protected</p>
                                </motion.div>
                            )}

                            {/* Success View */}
                            {isBooked && (
                                <motion.div
                                    key="success"
                                    className="success-view"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: "spring", duration: 0.5 }}
                                >
                                    <motion.div
                                        className="success-check"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                    >
                                        <Check size={40} />
                                    </motion.div>

                                    <h3 className="success-heading">Booking Confirmed</h3>
                                    <p className="booking-id-text">Booking ID: <strong>{bookingId}</strong></p>

                                    <div className="receipt-card">
                                        <h4>Receipt</h4>
                                        <div className="receipt-line">
                                            <span>Property</span>
                                            <span>{apartment.name}</span>
                                        </div>
                                        <div className="receipt-line">
                                            <span>Guest</span>
                                            <span>{bookingData.name}</span>
                                        </div>
                                        <div className="receipt-line">
                                            <span>Check-in</span>
                                            <span>{bookingData.checkIn}</span>
                                        </div>
                                        <div className="receipt-line">
                                            <span>Check-out</span>
                                            <span>{bookingData.checkOut}</span>
                                        </div>
                                        <div className="receipt-line total">
                                            <span>Total Paid</span>
                                            <span>Rs.{totalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button className="download-receipt-btn" onClick={downloadReceipt}>
                                        <Download size={16} /> Download Receipt
                                    </button>

                                    <button className="done-btn" onClick={onClose}>
                                        Done
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ApartmentModal;
