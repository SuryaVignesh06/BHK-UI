import React, { useState } from 'react';
import './BookingBar.css';
import { Link } from 'react-router-dom';

const BookingBar = () => {
    const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
    const [guests, setGuests] = useState(1);

    return (
        <div className="booking-bar-banner">
            <div className="booking-field">
                <label>Check In</label>
                <input
                    type="date"
                    value={dates.checkIn}
                    onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                />
            </div>

            <div className="booking-field">
                <label>Check Out</label>
                <input
                    type="date"
                    value={dates.checkOut}
                    onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                />
            </div>

            <div className="booking-field">
                <label>Guests</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4+ Adults</option>
                </select>
            </div>

            <Link to="/payment" className="book-link-wrapper">
                <button className="book-btn-rect">
                    CHECK AVAILABILITY
                </button>
            </Link>
        </div>
    );
};

export default BookingBar;
