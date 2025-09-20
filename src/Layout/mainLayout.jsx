import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Componants/Footer';
import Header from '../Componants/Header';

const mainLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className="max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default mainLayout;