import { NavLink } from "react-router";

const Product = ({product}) => {
  const { _id, title, price_min, image, price_max } = product;
  return (
    <div>
      <div className="card bg-base-100 shadow-sm">
        <figure className="px-4 pt-4">
          <img src={image} alt="Shoes" className="rounded-xl h-70 w-full" />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
          <p className="text-[#5754E8]">
            price: ${price_min} - {price_max}
          </p>
          <div className="card-actions ">
            <NavLink to={`/productdetails/${_id}`} className={'w-full'}>
              <button className="btn btn-primary text-center w-full">View Details</button>
            </NavLink>
          </div>
        </div>
      </div>
        
    </div>
  );
};

export default Product;
