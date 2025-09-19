import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthContext/AuthContext";
import logo from "../assets/expiration-date.png"

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((err) => console.error(err));
  };

  // Navbar Links
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-semibold" : "hover:text-green-500"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/fridge"
          className={({ isActive }) =>
            isActive ? "text-green-500 font-semibold" : "hover:text-green-500"
          }
        >
          Fridge
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/add-food"
              className={({ isActive }) =>
                isActive ? "text-green-500 font-semibold" : "hover:text-green-500"
              }
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-items"
              className={({ isActive }) =>
                isActive ? "text-green-500 font-semibold" : "hover:text-green-500"
              }
            >
              My Items
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-black text-white shadow-sm px-4">
      {/* Navbar Start (Dropdown for small screen) */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 text-black rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl flex items-center gap-2">
  <img src={logo} alt="logo" className="h-8" />
  <p className=" hidden font-bold lg:block">
    <span className="text-green-400">Food</span>
    <span className="text-red-500">Expiry</span>
    <span className="text-green-400">Tracker</span>
  </p>
</NavLink>

      </div>

     
      

      
      <div className="navbar-end">
        <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
        {user ? (
          <>
<div className="flex items-center gap-3">

  <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
    <div className="avatar">
      <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img
          src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="User Avatar"
        />
      </div>
    </div>
  </div>

 
  <button onClick={handleLogOut} className="btn btn-outline">
    Log Out
  </button>
</div>

          </>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
            <NavLink to="/register" className="btn btn-outline">
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
