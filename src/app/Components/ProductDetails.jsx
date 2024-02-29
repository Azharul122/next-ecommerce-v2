"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import CartContext from "../Context/Provider/CartContext";
const ProductDetails = ({ product }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const { addToCart, cart } = useContext(CartContext);
  const {
    _id,
    name,
    price,
    short_description,
    description,
    category,
    ratings,
    reviews,
    stock,
    Characteristics,
    features,
    details_Image,
  } = product;

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart({
      productId: _id,
      name,
      price,
      image: details_Image[0],
      category,
    });
    return;
  };
  return (
    <div className="py-10">
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border overflow-hidden border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <Image
                  className="object-cover h-[340px] inline-block hover:scale-150 overflow-hidden"
                  src={details_Image[imgIdx]}
                  alt="Product title"
                  width="340"
                  height="340"
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {details_Image.map((dm, idx) => (
                  <a
                    key={idx}
                    onClick={() => setImgIdx(idx)}
                    className={`inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer ${
                      idx == imgIdx ? "border-violet-500 border-2" : ""
                    }`}
                  >
                    <Image
                      className="w-14 h-14"
                      src={dm}
                      alt="Product title"
                      width="500"
                      height="500"
                    />
                  </a>
                ))}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{name}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <StarRatings
                    rating={ratings}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <span className="text-yellow-500">{ratings}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>

                <span className="text-green-500">Verified</span>
              </div>

              <p className="mb-4 font-semibold text-xl">${price}</p>

              <p className="mb-4 text-gray-500">{short_description}</p>
              <p className="mb-4 text-gray-500">{description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  onClick={(e) => handleAddToCart(e)}
                  className={`${
                    cart?.cartItems?.find((wl) => wl?.productId === _id)
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-blue-600"
                  } px-4 py-2 inline-block text-white  border border-transparent rounded-md hover:bg-blue-700`}
                >
                  <i className="fa fa-shopping-cart mr-2"></i>
                  Add to cart
                </button>
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Stock</b>
                  {stock >= 1 ? (
                    <span className="text-green-500 font-bold">inStock</span>
                  ) : (
                    <span className="text-red-500 font-bold">Out of stock</span>
                  )}
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{category}</span>
                </li>
              </ul>
            </main>
          </div>

          {/* <NewReview /> */}
          <hr />

          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Other Customers Reviews
            </h1>
            {/* <Reviews /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
