import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const layout = ({children}) => {
    return (
        <div>
            <Navbar />
            <main className="flex-grow flex flex-col">{children}</main>
            <Footer />
        </div>
    );
};

export default layout;