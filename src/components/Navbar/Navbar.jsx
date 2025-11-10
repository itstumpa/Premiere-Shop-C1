import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
    const { user, logOut } = useAuth(); 
    const navigate = useNavigate();

// logout 
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/"); // redirect to home page
      })
      .catch((error) => console.error("Logout error:", error));
    };
  
    // links should be outside function 
      const links = (
      <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/allproducts'>All Products</NavLink></li>
      {
        user && <>
        
        
        <li><NavLink to="/myproducts">My Products</NavLink></li>
        <li><NavLink to="/mybids">My Bids</NavLink></li>
        <li><NavLink to="/createproduct">Create Product</NavLink></li>
        </>

      }
      </>


      )
      return (
            <div className='bg-base-100 shadow-sm'>
                  <div className="navbar px-6  max-w-10/12 mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl font-bold">Premiere<span className='text-[#5754E8] font-black '>Shop</span></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end ">

   <ul className='flex '>
  {user ? (
    <>
      <li className='menu'>
       
        <NavLink to="/logout"  
        onClick={handleLogout}>
          Logout</NavLink>
      </li>
    </>
  ) : (
    <>
      <li className='menu'>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li className='menu'>
        <NavLink to="/login">Login</NavLink>
      </li>
      
    </>
  )}
</ul>

    

  </div>
</div>
            </div>
      );
};

export default Navbar;