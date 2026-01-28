import React from 'react';
import Hero from './Hero';
import About from './About';
import Gallery from './Gallery';
import ApartmentsSection from './ApartmentsSection';
import Facilities from './Facilities';
import Contact from './Contact';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <About />
            <Gallery />
            <ApartmentsSection />
            <Facilities />
            <Contact />
        </div>
    );
};

export default Home;
