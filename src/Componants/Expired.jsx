import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Expired = () => {
  const [expiredFoods, setExpiredFoods] = useState([]);

  useEffect(() => {
    axios.get('https://food-expire-server.vercel.app/expired')
      .then(res => setExpiredFoods(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
        <h1 className='text-2xl text-center font-bold text-red-500'> Expired Food </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {expiredFoods.map(food => (
        <div 
          key={food._id} 
          className="relative rounded-lg p-4 shadow-lg bg-gradient-to-b from-white to-red-50 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={food.imageUrl}
            alt={food.title}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h3 className="font-bold text-lg text-gray-800">{food.title}</h3>
          <p className="text-sm text-gray-600">Category: {food.category}</p>
          <p className="text-sm text-gray-600">Quantity: {food.quantity}</p>
          <p className="text-sm text-gray-600">
            Expiry Date: {new Date(food.expiryDate).toLocaleDateString()}
          </p>
          <span className="absolute top-2 right-4 bg-red-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-pulse">
            Expired
          </span>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Expired;
