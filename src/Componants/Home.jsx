import React from 'react';
import Banner from './Banner';

import Upcoming from './Upcoming';
import Expired from './Expired';
import DashboardExtras from './DashboardExtras';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
           
            <Upcoming></Upcoming>
            <Expired></Expired>

            <DashboardExtras></DashboardExtras>
        </div>
    );
};

export default Home;