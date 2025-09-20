import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext/AuthContext";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/expiration-date.png";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-black text-white py-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2 mb-3">
            <img src={logo} alt="Logo" className="h-8" />
            <p className="font-bold text-lg">
              Food<span className="text-red-400">Expiry</span>Tracker
            </p>
          </div>
          <p className="text-gray-300 text-sm">
            Keep track of your food items, never let anything expire, and reduce food waste. Manage your fridge smarter!
          </p>

         
         
        </div>

      
        <div>
          <h3 className="font-semibold mb-3">Useful Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <NavLink to="/" className="hover:text-green-500">Home</NavLink>
            </li>
            <li>
              <NavLink to="/fridge" className="hover:text-green-500">Fridge</NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink to="/add-food" className="hover:text-green-500">Add Food</NavLink>
                </li>
                <li>
                  <NavLink to="/my-items" className="hover:text-green-500">My Items</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

       
        <div className="flex flex-col space-y-5 justify-end text-gray-400 text-sm mt-4 md:mt-0">
             <div className="flex gap-4 mt-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebookF size={20} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <FaYoutube size={20} />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} FoodExpiryTracker. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
