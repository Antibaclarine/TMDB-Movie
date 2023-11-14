'use client'
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar-lg py-6 bg-black">
     <div className="items-center space-x-8 ml-[60%]  ">
              <ul className="navbar-nav flex items-center gap-8 ml-60 ">
                <li className="nav-item">
                  <a className="nav-link text-white text-lg" href="">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white text-lg" href="">
                    My List
                  </a>
                </li>
                <li className="nav-item">
                  <button className="bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring focus:bg-yellow-300 text-lg mr-20 w-[70%]" type="button">
                    <a className="nav-link active text-black text-lg" href="/sign Up">
                      Sign Up
                    </a>
                  </button>
                </li>
              </ul>
              </div>
    </div>
  );
};
export default Navbar;