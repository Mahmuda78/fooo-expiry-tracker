import React, { use } from 'react';
import { motion } from 'framer-motion';

const ExtraSection = ({ foodPromise }) => {
    const foods = use(foodPromise);
  const now = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(now.getDate() + 5);

  const nearlyExpiry = foods.filter(food => {
    const expDate = new Date(food.expiryDate);
    return expDate >= now && expDate <= fiveDaysLater;
  });

  if (nearlyExpiry.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Almost Expiring Soon</h2>
        <p className="text-gray-500">No items are expiring in the next 5 days!</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-500">
        Almost Expiring Soon
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {nearlyExpiry.map(food => (
          <motion.div
            key={food.id || food._id}
            className="card bg-gradient-to-b from-red-50 to-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <figure>
              
              <h1 className=" text-4xl text-start pt-4 font-semibold"> {food.foodTitle}</h1>
            </figure>
            <div className="card-body">
              <h3 className="card-title font-bold text-lg">{food.title}</h3>
              <p className="text-gray-600">
                Expiry Date: {new Date(food.expiryDate).toLocaleDateString()}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm bg-green-500">Use Soon</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExtraSection;
