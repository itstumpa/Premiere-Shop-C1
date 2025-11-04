import React from "react";
import { NavLink } from "react-router";

const Hero = () => {
  return (
    <div className="hero bg-linear-to-r from-[#FFE6FD] to-[#E0F8F5]
 h-[60vh]">
      <div className="hero-content text-center flex flex-col items-center justify-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>

        {/* ✅ Centered Search Bar */}
        
        <div className="flex items-center justify-center w-[600px] mx-auto rounded-full overflow-hidden border border-gray-200 shadow-2xl mb-8 bg-white">
          <input
            type="text"
            placeholder="Search For Products, Categories..."
            className="flex-1 px-4 py-3 outline-none border-none bg-gray-100 text-gray-800"
          />
          <button className="px-5 py-3 bg-[#5754E8]  text-white font-semibold transition-colors duration-300">
            🔍
          </button>
        </div>

        {/* ✅ Buttons */}
        <div className="space-x-4">
          <NavLink to="/myproducts">
            <button className="btn btn-primary">Watch all Products</button>
          </NavLink>
          <button className="btn border border-indigo-600">
            Post a Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
