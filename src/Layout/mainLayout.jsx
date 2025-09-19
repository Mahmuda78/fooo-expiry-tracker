import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Componants/Footer';
import Header from '../Componants/Header';

const mainLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default mainLayout;