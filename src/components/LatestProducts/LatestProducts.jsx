import React from 'react';
import { use } from 'react';
import Product from '../Product/Product';
import { NavLink } from 'react-router';

const LatestProducts = ({LatestProductsPromise}) => {
      const products = use(LatestProductsPromise);
      console.log(products)
      return (
            <div className='bg-base-200'>
                  <h2 className="text-4xl font-bold text-center pt-12 mb-5">Recent <span className='text-[#5754E8]'>Products</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 max-w-10/12 mx-auto gap-6'>
                  {
                        products.map(product => 
                        <Product 
                              key={product._id}
                              product={product}
                        /> )
                  }
            </div>
            <div className='pb-32'>
            <NavLink to={`/`}>
              <button className="btn btn-primary text-center flex justify-center mx-auto mt-14 ">Show All</button>
            </NavLink>
        </div>
            </div>
      );
};

export default LatestProducts;