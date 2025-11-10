// import React from 'react';
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

// import useAxios from '../hooks/useAxios';

const CreateProduct = () => {
  const { user } = useAuth();
  // const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const handleCreateAProduct = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;
    console.log(title, image, price_min, price_max);

    const newProduct = {
      title,
      image,
      price_max,
      price_min,
      email: user.email,
      seller_name: user.displayName,
    };
    // 1st detail option
    // axios.post('https://smart-deals-server-alpha.vercel.app/products', newProduct)
    // .then (data =>{
    //       console.log(data.data)
    //       if(data.data.insertedId){
    //             Swal.fire({
    //                         title: "Good job!",
    //                         text: "Your Product has been Created!",
    //                         icon: "success",
    //                       });
    //       }
    // })

    // 2nd components Option
    axiosSecure.post("products", newProduct).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          title: "Good job!",
          text: "Your Product has been Created!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-20">
      <form onSubmit={handleCreateAProduct} className="space-y-1">
        <fieldset className="fieldset space-y-1">
          <label className="label text-sm font-medium">Name</label>
          <input
            type="text"
            name="title"
            className="input input-bordered h-8 text-sm"
          />
          <label className="label text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            className="input input-bordered h-8 text-sm"
          />
          <label className="label text-sm font-medium">Min Price</label>
          <input
            type="number"
            required
            className="input input-bordered h-8 text-sm"
            name="price_min"
            placeholder="Your minimum Bid (Only type number)"
          />
          <label className="label text-sm font-medium">Max price</label>
          <input
            type="number"
            required
            className="input input-bordered h-8 text-sm"
            name="price_max"
            placeholder="Your maximum Bid (Only type number)"
          />
          <button className="btn btn-neutral btn-sm w-full mt-4">
            Create A Product
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateProduct;
