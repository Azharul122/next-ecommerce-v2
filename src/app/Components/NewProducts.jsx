"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BsCart, BsHeart, BsHeartFill } from "react-icons/bs";
import { TfiMore } from "react-icons/tfi";
import CartContext from "../Context/Provider/CartContext";
import WishContext from "../Context/Provider/WishListContext";
import { LuLoader } from "react-icons/lu";
import Loading from "../loading";
import SkeletonProduct from "./SkeletonProduct";

const NewProducts = () => {
  const { addToWishList, wish, deleteProductFromLocalWishList } =
    useContext(WishContext);
  const { addToCart, cart } = useContext(CartContext);
  const [newProducts, setNewProducts] = useState([]);
  // const [sortedProducts, setSortedProducts] = useState([]);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleMouseHove = (index) => {
    return setHover(index);
  };
  const handleMouseLeave = () => {
    return setHover(null);
  };

  useEffect(() => {
    // Fetch data

    axios
      .get("http://localhost:3000/api/products/all-products")
      .then((data) => {
        // Set newProducts in the state
        setNewProducts(data.data.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const wishlist = null;

  if (loading) {
    return <Loading />;
  }

  const handleAddToCart = (event, id, name, price, image, category) => {
    event.preventDefault();
    addToCart({
      productId: id,
      name,
      price,
      image,
      category,
    });

    return;
  };
  const handleAddToWishList = (event, id, name, price, image, category) => {
    const existInWishList = wish?.wishItems?.find((wl) => wl?.productId == id);

    console.log(id);

    if (!existInWishList) {
      addToWishList({
        productId: id,
        name,
        price,
        image,
        category,
      });
    } else {
      deleteProductFromLocalWishList(id);
    }
    event.preventDefault();
  };

  return (
    <div>
      <div className="w-[96%] md:w-[90%] mx-auto">
        <div className="title text-3xl text-center py-10">WHAT&apos;S NEW</div>

        <div className="products">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {loading && <SkeletonProduct cards={2}/>}
            {newProducts && newProducts.sort((a, b) => (a.createdAt = b.createdAt))
              .slice(0, 9)
              .map((product, idx) => (
                <Link
                  className="card cursor-pointer px-2 pt-2 pb-20 border border-gray-200 overflow-hidden relative "
                  onMouseOver={() => handleMouseHove(idx)}
                  onMouseLeave={handleMouseLeave}
                  href={`/products/${product?._id}`}
                  key={product._id}
                >
                  <img
                    alt={"hello"}
                    src={
                      hover == idx
                        ? product.details_Image[0]
                        : product.details_Image[1]
                    }
                    className="transition-transform duration-500 transform hover:scale-110"
                  />

                  <div className="absolute bottom-1">
                    <p>{product.name}</p>
                    <p>${product.price}</p>
                  </div>

                  <button
                    // disabled={cart?.cartItems?.find(
                    //   (wl) => wl?.productId === product._id
                    // )}
                    onClick={(e) =>
                      handleAddToCart(
                        e,
                        product?._id,
                        product.name,
                        product.price,
                        product.details_Image[0],
                        product.category
                      )
                    }
                    className=" z-10 cursor-pointer absolute top-2 right-0 px-2 bg-[rgba(127,0,255,0.4)] rounded-tl-3xl rounded-bl-3xl py-1 "
                  >
                    <BsCart
                      className={`text-xl font-bold 
                      ${
                        cart?.cartItems?.find(
                          (wl) => wl?.productId === product._id
                        )
                          ? "text-red-500 cursor-not-allowed"
                          : ""
                      }
                  `}
                    />
                  </button>
                  {/* <div className="cursor-pointer absolute top-10 right-0 px-2 bg-[rgba(127,0,255,0.3)] rounded-tl-3xl rounded-bl-3xl py-1">
                <BsHeart className="text-xl font-bold text-white" />
              </div> */}
                  <button
                    // disabled={wish?.wishItems?.find(
                    //   (wl) => wl?.productId === product._id
                    // )}
                    onClick={(e) =>
                      handleAddToWishList(
                        e,
                        product?._id,
                        product.name,
                        product.price,
                        product.details_Image[0],
                        product.category
                      )
                    }
                    className="cursor-pointer absolute top-10 right-0 px-2 bg-[rgba(127,0,255,0.3)] rounded-tl-3xl rounded-bl-3xl py-1"
                  >
                    {wish?.wishItems?.find(
                      (wl) => wl?.productId === product._id
                    ) ? (
                      <BsHeartFill className="text-xl font-bold text-red-600" />
                    ) : (
                      <BsHeart className="text-xl font-bold text-white" />
                    )}
                  </button>
                </Link>
              ))}
            <Link
              href={"/allProducts"}
              style={{
                backgroundImage:
                  "url('https://www.bhmpics.com/downloads/professional-photo-backgrounds/49.professional-backgrounds-for-websites3-2.jpg')",
              }}
              className="cursor-pointer px-2 pt-2 pb-20 border border-gray-200 overflow-hidden relative"
            >
              <div className="absolute left-0 top-0 flex justify-center items-center h-full w-full ">
                <div className="flex gap-2 items-center ">
                  <p className="uppercase text-[rgba(127,0,255,0.8)] font-bold">
                    View More
                  </p>
                  <TfiMore className="-rotate-45 text-[rgba(127,0,255,0.8)]" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
