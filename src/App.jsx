import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Payment from './components/Payment';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
