import { useRef } from "react";
import { BsArrowLeft } from "react-icons/bs"; // Importing the back arrow icon
import { useLoaderData } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { use } from "react";

const ProductDetails = () => {
  const product = useLoaderData();
  const {_id: productId}= useLoaderData();
  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);
  const {
    _id,
    title,
    price_min,
    created_at,
    seller_contact,
    seller_image,
    location,
    seller_name,
    email,
    status,
    category,
    image,
    condition,
    usage,
    price_max,
    description,
  } = product;

  const handlebidModalOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    console.log(productId, name, email, bid);
    bidModalRef.current.close();

    const newBid ={
      product: productId,
      buyer_name: name,
      buyer_email: email,
      bid_price: bid,
      status: status,
      buyer_contact: seller_contact,
    }
    fetch('http://localhost:3000/bids', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'

      },
      body: JSON.stringify(newBid)

    })
    .then(res => res.json())
    .then(data => {
      console.log('after placing bid', data)
    })
  };

  return (
    <div className="pt-20 bg-base-200">
      <div className=" max-w-6xl mx-auto px-10 font-sans ">
        <div className="  grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Image Placeholder */}
            <div className="bg-slate-200 rounded-xl max-h-[410px]  w-full flex items-center justify-center ">
              {/* You can place an <img /> tag here */}
              <img
                className="max-h-[410px] rounded-xl w-full"
                src={image}
                alt=""
              />
            </div>

            {/* Product Description Card */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-md p-4 mb-12">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                Product Description
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-slate-500">Condition : </p>
                  <p className="font-semibold text-slate-700">{condition}</p>
                </div>
                <div>
                  <p className="text-slate-500">Usage Time :</p>
                  <p className="font-semibold text-slate-700">{usage}</p>
                </div>
              </div>
              <hr className="my-4" />
              <p className="text-slate-600 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <a
              href="/"
              className="flex items-center gap-2 text-slate-600 font-semibold hover:text-slate-900 transition-colors"
            >
              <BsArrowLeft />
              Back To Products
            </a>

            <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>

            <span className="bg-purple-100 text-[#5754E8] text-xs font-medium px-3 py-1 rounded-full self-start">
              {category}
            </span>

            {/* Price Card */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <p className="text-3xl font-bold text-green-600">
                ${price_min}- ${price_max}
              </p>
              <p className="text-slate-500 text-sm mt-1">Price starts from</p>
            </div>

            {/* Product Details Card */}
            <div className="bg-white rounded-xl shadow-md p-5 space-y-1 text-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Product Details
              </h2>
              <p>
                <span className="font-semibold text-slate-700">
                  Product ID:
                </span>{" "}
                <span className="text-slate-600">{_id}</span>
              </p>
              <p>
                <span className="font-semibold text-slate-700">Posted:</span>{" "}
                <span className="text-slate-600">{created_at}</span>
              </p>
            </div>

            {/* Seller Information Card */}
            <div className="bg-white rounded-xl shadow-md p-4 space-y-2 text-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                Seller Information
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-200">
                  {/* {seller_image} */}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{seller_name}</p>
                  <p className="text-slate-500">{email}</p>
                </div>
              </div>
              <p>
                <span className="font-semibold text-slate-700">Location:</span>{" "}
                <span className="text-slate-600">{location}</span>
              </p>
              <p>
                <span className="font-semibold text-slate-700">Contact:</span>{" "}
                <span className="text-slate-600">{seller_contact}</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Status:</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-md">
                  {status}
                </span>
              </div>
            </div>

            {/* Buy Button */}
            <button
              onClick={handlebidModalOpen}
              className="w-full bg-[#4d4afc] text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-[#5754E8] transition-colors focus:outline-none focus:ring-2 focus:bg-[#3330e3] focus:ring-offset-2 mb-12"
            >
              I Want Buy This Product
            </button>
            {/* close button start  */}
            <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box relative p-4 sm:p-6 bg-white rounded-lg">
    
    {/* Close Button */}
    <div className="absolute top-2 right-2">
      <form method="dialog">
        <button
          className="text-gray-500 hover:text-gray-700 text-xl font-bold leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </form>
    </div>

    <h3 className="font-bold text-lg mb-1">Give me the best offer!</h3>
    <p className="text-sm text-gray-600 mb-3">
      Offer something the seller cannot resist
    </p>

    <form onSubmit={handleBidSubmit} className="space-y-1">
      <fieldset className="fieldset space-y-1">
        <label className="label text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered h-8 text-sm"
          readOnly
          defaultValue={user?.displayName}
        />
        <label className="label text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="input input-bordered h-8 text-sm"
          readOnly
          defaultValue={user?.email}
        />
        <label className="label text-sm font-medium">Bid</label>
        <input
          type="text"
          className="input input-bordered h-8 text-sm"
          name="bid"
          placeholder="Your Bid"
        />
        <button className="btn btn-neutral btn-sm w-full mt-4">
          Place Your Bid
        </button>
      </fieldset>
    </form>
  </div>
</dialog>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
