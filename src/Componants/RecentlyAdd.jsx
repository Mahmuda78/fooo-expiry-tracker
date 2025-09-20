import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const RecentlyAdd = () => {
  const [foods, setFoods] = useState([]);
  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate());

  useEffect(() => {
    axios.get('https://food-expire-server.vercel.app/foods') 
      .then(res => setFoods(res.data))
      .catch(err => console.error('Error fetching foods:', err));
  }, []);

  

 


  const recentFoods = [...foods].sort((a,b) => new Date(b.addedDate) - new Date(a.addedDate)).slice(0,6);

  const renderFoodCard = (food) => {
    const isExpired = new Date(food.expiryDate) < today;

    return (
      <motion.div
        key={food._id}
        className="card bg-base-100 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <figure>
          <img
            src={food.imageUrl}
            alt={food.title}
            className="w-full h-48 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{food.foodTitle}</h2>
          <p>Category: {food.foodCategory}</p>
          <p>Quantity: {food.quantity}</p>
          {isExpired && <span className="badge badge-error mt-2">Expired</span>}
          <div className="card-actions justify-end mt-3">
            <button className="btn btn-sm btn-neutral">Read More</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="p-6 space-y-16">

      <div>
        <h1 className="text-3xl font-bold mb-6 text-center text-green-500">Recently Added</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentFoods.length > 0 ? recentFoods.map(renderFoodCard) :
            <p className="text-center col-span-full text-gray-500">No recent items.</p>}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdd;
