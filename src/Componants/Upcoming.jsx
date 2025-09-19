import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const Upcoming = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/nearly-expiry")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Nearly Expiry Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {foods.map((food, index) => {
          const daysLeft = Math.ceil(
            (new Date(food.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
          );

          return (
            <motion.div
              key={food._id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className={`relative border rounded-xl shadow-lg overflow-hidden transition-transform duration-300 cursor-pointer
                ${daysLeft <= 2 ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"}
                hover:scale-105
              `}
            >
             
              <span
                className={`absolute top-2 right-2 px-3 py-1 text-xs font-bold rounded-full text-white ${
                  daysLeft <= 0
                    ? "bg-gray-800"
                    : daysLeft <= 2
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                {daysLeft <= 0
                  ? "Expired"
                  : daysLeft <= 2
                  ? `Expiring in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`
                  : `Expiring in ${daysLeft} days`}
              </span>

              <img
                src={food.imageUrl}
                alt={food.foodTitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {food.foodTitle}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{food.description}</p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Quantity:</span> {food.quantity}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Category:</span> {food.foodCategory}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Expiry:</span>{" "}
                  {new Date(food.expiryDate).toLocaleDateString()}
                </p>

                <button
                  onClick={() => navigate(`/food/${food._id}`)}
                  className="mt-3 w-full py-2 bg-black text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  See Details
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Upcoming;
