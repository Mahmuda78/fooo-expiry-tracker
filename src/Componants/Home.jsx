import React from 'react';
import Banner from './Banner';
import NearlyExpiryFoods from './NearlyExpiryFoods';
import Upcoming from './Upcoming';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
           
            <Upcoming></Upcoming>
        </div>
    );
};

export default Home;