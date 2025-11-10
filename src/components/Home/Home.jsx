import Hero from "../Hero/Hero";
import LatestProducts from "../LatestProducts/LatestProducts";

const LatestProductsPromise = fetch(
  "https://smart-deals-server-alpha.vercel.app/latest-products"
).then((res) => res.json());

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
