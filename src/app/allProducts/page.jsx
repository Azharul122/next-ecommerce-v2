"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { BsCart, BsHeart, BsHeartFill } from "react-icons/bs";
import { TfiMore } from "react-icons/tfi";
import StarRatings from "react-star-ratings";
import CartContext from "../Context/Provider/CartContext";

const AllProducts = () => {
  const [hover, setHover] = useState(null);
  const [products, setProducts] = useState([]);
  let [page, setPage] = useState(1);
  let [limit, setLimit] = useState(4);
  const [avialibility, setAvialibility] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(5);
  const [price, setPrice] = useState(100);
  const [sortQuery, setSortQuery] = useState([]);
  console.log(avialibility, category);
  const {addToCart,cart}=useContext(CartContext)
  // Grant Filter
  let filterProducts = [...sortQuery].filter(
    (product) =>
      (!category || product.category == category) &&
      (!avialibility || product.stock >= 10) &&
      (!rating || product.ratings <= rating) &&
      (!price || product.price <= price)
  );

  useEffect(() => {
    axios
      .get("/api/products/all-products")
      .then((data) => {
        setProducts(data?.data.data), setSortQuery(data?.data.data);
      })
      .catch((Error) => console.log(Error));

    //   const nineNewProducts=newProducts.slice(0,9)
    //   setNewProducts(nineNewProducts)
  }, []);

  const handleMouseLeave = () => {
    return setHover(null);
  };
  const handleMouseHove = (index) => {
    return setHover(index);
  };

  const wishlist = null;

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

  // Pagination

  const totalProduct = filterProducts?.length;
  let pageCount = Math.ceil(totalProduct / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  let numbers = [];
  for (let index = 1; index <= pageCount; index++) {
    numbers.push(index);
  }

  // const pageNumbers = Array.from(
  //   { length: pageCount },
  //   (_, index) => index + 1
  // );

  let slicedProducts = [...filterProducts].slice(startIndex, endIndex);
  // console.log(slicedProducts);

  // Page limit set
  const pageLimits = [];
  for (let index = 1; index <= pageCount; index++) {
    pageLimits.push(4 * index);
  }

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const categoryCounts = uniqueCategories.reduce((acc, category) => {
    const count = products.filter(
      (product) => product.category === category
    ).length;
    acc[category] = count;
    return acc;
  }, {});

  let queryParams;
  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    if (typeof window !== "undefined") {
      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) return true;
      return false;
    }
  }

  const handleSort = (value) => {
    if (value == "lwo_to_high") {
      const lth = [...filterProducts].sort((a, b) => a.price - b.price);
      setSortQuery(lth);
    } else if (value == "high_to_low") {
      const lth = [...filterProducts].sort((a, b) => b.price - a.price);
      setSortQuery(lth);
    } else if (value == "sort_by_date") {
      const lth = [...filterProducts].sort(
        (a, b) => new Date(b.createedAt) - new Date(a.createedAt)
      );
      setSortQuery(lth);
    } else if (value == "sor_by_popular") {
      const lth = [...filterProducts].sort((a, b) => b.isPopular - a.isPopular);
      setSortQuery(lth);
    }
  };

  // <option value="lwo_to_high">Price low to high</option>
  // <option value="high_to_low">Price High to low</option>
  // <option value="sort_by_date">Sort by date</option>
  // <option value="sor_by_popular">Sort by popular</option>
  return (
    <div>
      <div className="allproducts w-[96%] md:w-[90%] mx-auto">
        <div className="title text-3xl text-center py-10">All Products</div>
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-1 ">
            {/* Price filter */}
            <div className="rounded priceRange flex flex-col gap-2 bg-[#f2f4f8] px-3 py-3 mb-4 shadow-lg">
              <div className="text-center">Price Range</div>
              <hr className="border-violet-200" />
              <input
                type="range"
                className="text-violet-500 border-violet-500 ring-violet-500"
                min={1}
                max={100}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p>Price under:${price}</p>
            </div>
            {/* Products avialibility */}
            <div className="rounded priceRange flex flex-col gap-2 bg-[#f2f4f8] px-3 py-3 mb-4 shadow-lg">
              <div className="text-center">Avialibility</div>
              <hr className="border-violet-200" />
              <div className="p">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="instock"
                    id="instock"
                    onChange={() => setAvialibility("inStock")}
                  />
                  <p>In stock</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="instock"
                    id="instock"
                    onChange={() => setAvialibility("preOrder")}
                  />
                  <p>Pre order</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    onChange={() => setAvialibility("upComming")}
                    type="radio"
                    name="instock"
                    id="instock"
                  />
                  <p>Upcomming</p>
                </div>
              </div>
            </div>
            {/* Category filter */}
            <div className="rounded priceRange flex flex-col gap-2 bg-[#f2f4f8] px-3 py-3 mb-4 shadow-lg">
              <div className="text-center">Category</div>
              <hr className="border-violet-200" />
              <div className="p">
                {Object.entries(categoryCounts).map(([category, count]) => (
                  <div className="flex items-center gap-2" key={category}>
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      id=""
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <p>
                      {category}
                      {`(${count})`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Rating */}
            <div className="rounded priceRange flex flex-col gap-2 bg-[#f2f4f8] px-3 py-3 mb-4 shadow-lg">
              <div className="text-center">Ratings</div>
              <hr className="border-violet-200" />
              <div className="p">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      name="ratings"
                      type="radio"
                      value={rating}
                      className="h-4 w-4"
                      defaultChecked={checkHandler("ratings", `${rating}`)}
                      onChange={(e) => setRating(e.target.value)}
                    />
                    <span className="ml-2 text-gray-500">
                      {" "}
                      <StarRatings
                        rating={rating}
                        starRatedColor="#ffb829"
                        numberOfStars={rating}
                        starDimension="20px"
                        starSpacing="2px"
                        name="rating"
                      />{" "}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="productsHeader py-3 px-1 bg-[#f2f4f8] mb-4 shadow-lg rounded">
              <div className="flex items-center justify-between">
                <p>All</p>
                <select
                  onChange={(e) => handleSort(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block px-3 py-2    outline-none"
                >
                  <option value="all">Default</option>
                  <option value="lwo_to_high">Price low to high</option>
                  <option value="high_to_low">Price High to low</option>
                  <option value="sort_by_date">Sort by date</option>
                  <option value="sor_by_popular">Sort by popular</option>
                </select>
                <select
                  onChange={(e) => setLimit(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block px-3 py-2    outline-none"
                >
                  <option value="4">Default</option>
                  {pageLimits.map((pl, index) => (
                    <option value={pl} key={index}>
                      {pl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="py-2 px-1 bg-[#f2f4f8] shadow-lg rounded">
              <div className="grid grid-cols-4 gap-2">
                {slicedProducts.map((product, idx) => (
                  <Link
                    className="card cursor-pointer px-2 pt-2 pb-20 border border-gray-200 overflow-hidden relative "
                    onMouseOver={() => handleMouseHove(idx)}
                    onMouseLeave={handleMouseLeave}
                    href={`products/${product?._id}`}
                    key={product._id}
                  >
                    <img
                      alt={"hello"}
                      layout="fill"
                      src={
                        hover == idx
                          ? product.details_Image[0]
                          : product.details_Image[1]
                      }
                      className="transition-transform duration-500 transform hover:scale-110"
                    />

                    <div className="absolute bottom-1 w-full ">
                      <p>{product.name}</p>
                      <div className="flex justify-between items-center pr-4 w-full">
                        <p>${product.price}</p>
                        <div className="flex items-center gap-1">
                          <StarRatings
                            rating={product.retings}
                            starRatedColor="#ffb829"
                            numberOfStars={product.retings}
                            starDimension="13px"
                            starSpacing="2px"
                            name="rating"
                          />
                          <p>{`(${product.reviews?.length})`}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={cart?.cartItems?.find(
                        (wl) => wl?.productId === product._id
                      )}
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
                      className="z-10 cursor-pointer absolute top-2 right-0 px-2 bg-[rgba(127,0,255,0.4)] rounded-tl-3xl rounded-bl-3xl py-1 "
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
                    <div className="cursor-pointer absolute top-10 right-0 px-2 bg-[rgba(127,0,255,0.3)] rounded-tl-3xl rounded-bl-3xl py-1">
                      {wishlist?.find(
                        (wl) => wl?.product._id === product._id
                      ) ? (
                        <BsHeartFill className="text-xl font-bold text-red-600" />
                      ) : (
                        <BsHeart className="text-xl font-bold text-white" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center items-center gap-2 py-10">
                <button
                  onClick={() => setPage(page - 1)}
                  className={`px-3 py-1  shadow-lg bg-[#fff] ${
                    page == 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"
                  }`}
                  disabled={page == 1}
                >
                  Previous
                </button>
                {numbers?.map((pageNumer, idx) => (
                  <button
                    onClick={() => setPage(pageNumer)}
                    className={`px-3 py-1  shadow-lg ${
                      page == idx + 1
                        ? "bg-violet-500 hover:bg-[#6B26B6] text-white font-bold"
                        : "bg-[#fff]"
                    }`}
                    key={pageNumer}
                  >
                    {pageNumer}
                  </button>
                ))}
                <button
                  onClick={() => setPage(page + 1)}
                  className={`px-3 py-1  shadow-lg bg-[#fff] ${
                    page == pageCount
                      ? "opacity-50 cursor-not-allowed"
                      : "opacity-100"
                  }`}
                  disabled={page == pageCount}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
