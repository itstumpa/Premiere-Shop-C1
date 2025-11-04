import React from 'react';
import TechHero from "../nurui/tech-hero";
import Hero from '../Hero/Hero';
import LatestProducts from '../LatestProducts/LatestProducts';


const LatestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json());



const Home = () => {
      return (
            <div>
                  <Hero />
                 {/* <TechHero /> */}
                 <LatestProducts LatestProductsPromise={LatestProductsPromise} />
            </div>
      );
};

export default Home;