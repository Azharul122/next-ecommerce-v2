"use client";
import Link from "next/link";
import React, { useContext } from "react";
import WishContext from "../Context/Provider/WishListContext";

const WishList = () => {
  const { wish, addToWishList, deleteProductFromLocalWishList } =
    useContext(WishContext);

  return (
    <div>
      <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
        <div>
          {wish?.wishItems?.map((ci) => (
            <div
              key={ci.productId}
              className="flex flex-wrap lg:flex-row gap-5  mb-4 border-b pb-3"
            >
              <div className="w-full lg:w-2/5 xl:w-2/4">
                <div className="">
                  <figure className="flex leading-5">
                    <div>
                      <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                        <img className="" src={ci.image} alt="Title" />
                      </div>
                    </div>
                    <figcaption className="ml-3">
                      <p>
                        <Link href={"#"} className="hover:text-blue-600">
                          {ci.name}
                        </Link>
                      </p>
                      <p className="mt-1 text-gray-400">
                        {" "}
                        Category: {ci.category}
                      </p>
                      <Link
                        className="text-violet-600"
                        href={`/products/${ci.productId}`}
                      >
                        See details
                      </Link>
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className="w-24">
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                  <button
                    className={` px-4 py-2 inline-block text-white  border border-transparent rounded-md hover:bg-blue-700`}
                  >
                    <i className="fa fa-shopping-cart mr-2"></i>
                    Add to cart
                  </button>
                </div>
              </div>
              <div>
                <div className="leading-5">
                  <p className="text-gray-400"> ${ci.price} / per item </p>
                </div>
              </div>
              <div className="flex-auto">
                <div className="float-right">
                  <button
                    onClick={() => deleteProductFromLocalWishList(ci.productId)}
                    className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <hr className="my-4" />
        </div>
      </article>
    </div>
  );
};

export default WishList;
