"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import styles from "./FixedHeader.module.css";

import { LuUser2, LuSearch } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";

import { FaTimes } from "react-icons/fa";
import { BsCart3, BsHeart } from "react-icons/bs";

import NavLink from "./NavLink";
import CartContext from "../Context/Provider/CartContext";
import WishContext from "../Context/Provider/WishListContext";

const Header = () => {
  const { cart } = useContext(CartContext);
  const { wish } = useContext(WishContext);
  const [searchQeury,setSearchQeury]=useState("")
  const header = [
    {
      Title: "Home",
      Link: "/",
    },
    {
      Title: "News",
      Link: "/news",
    },
    {
      Title: "Category",
      Link: "/category",
    },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchBarShow, setSearchBarShow] = useState(false);
  const [navbarShow, setNavbarShow] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`w-full  ${isScrolled ? "mb-[155px]" : "mb-[100px]"} relative`}
    >
      <div className="top_header bg-[#6b26b7] py-3 text-white">
        <div className="w-[98%] md:w-[90%] mx-auto">
          <div className="flex justify-center md:justify-between items-center overflow-hidden">
            <p className="sm:text-xs">
              <span className="font-bold sm:text-xs">HOTLINE:</span> +01 023 345
              678
            </p>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full border-gray-400 border-[1px] flex items-center justify-center">
                  <p className="text-xs">!</p>
                </div>

                <p className="sm:text-xs">ABOUT BRAND</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full border-gray-400 border-[1px] flex items-center justify-center">
                  <p className="text-xs">?</p>
                </div>
                <p className="sm:text-xs">FAQ</p>
              </div>
              <div className="flex items-center gap-1">
                <CiMail className="text-lg" />
                <p className="sm:text-xs">CONTACT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div
        className={`shadow-2xl w-full  ${styles.fixedHeader} ${
          isScrolled ? styles.showHeader : ""
        }`}
      >
        <div
          className={`header_conatiner w-[96%] md:w-[90%] mx-auto  h-[100px] `}
        >
          <div className="flex justify-between items-center h-full">
            <Link href={"/"}>
              <Image
                width={100}
                height={40}
                className="text-white"
                src="https://the7.io/brand-shop/wp-content/uploads/sites/103/2021/11/sevenshoplogo.svg"
                alt=""
              />
            </Link>
            <div className="hidden  md:flex items-center gap-2 text-[#999999]">
              {header.map((head) => (
                <NavLink
                  className="bg-slate-200"
                  text={head.Title}
                  key={head.Title}
                  href={head.Link}
                >
                  {head.Title}
                </NavLink>
              ))}
            </div>
            <div className="serachInputContainer  relative hidden md:block">
              <input
                onChange={(e) => setSearchQeury(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-200  outline-1 outline-[#6b26b7]"
                type="text"
                placeholder="Search products..."
              />
              <span className={`absolute bg-[#6b26b7] top-1/2 -translate-y-1/2 right-1 px-4 py-[6px] rounded-full ${searchQeury?"cursor-pointer":"opacity-50 cursor-not-allowed"}`}>
                <LuSearch className={`text-xl  text-white`}/>
              </span>
            </div>
            <div
              style={{ backgroundColor: "hsla(0, 0%, 100%, 0.6)" }}
              className={`absolute  px-2 py-8 top-28 z-20  shadow-xl ${
                searchBarShow ? "block" : "hidden"
              }`}
            >
              <div className="relative w-full">
                <div className="absolute -top-7 right-1">
                  <FaTimes
                    onClick={() => setSearchBarShow(false)}
                    className=" text-xl hover:rotate-180 "
                  />
                </div>
              </div>
              <div className={`serachInputContainer  relative `}>
                <input
                  className="px-4 py-2 rounded-full border border-gray-200  outline-1 outline-[#6b26b7]"
                  type="text"
                  placeholder="Search products..."
                />
                <span className="absolute bg-[#6b26b7] top-1/2 -translate-y-1/2 right-1 px-4 py-[6px] rounded-full">
                  <LuSearch className="text-xl cursor-pointer text-white " />
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <LuSearch
                onClick={() => setSearchBarShow(true)}
                className="text-xl cursor-pointer text-[#999999] md:hidden"
              />
              <div className="relative">
                <Link className="" href={"/wishlist"}>
                  <BsHeart className=" text-xl cursor-pointer text-[#999999]" />
                </Link>
                <div className="absolute -top-2 -left-2 z-10 w-[16px] h-[16px] bg-[#6b26b7] text-white rounded-full text-[10px] flex items-center justify-center">
                  {wish?.wishItems?.length || 0}
                </div>
              </div>

              <Link href={"/login"}>
                <LuUser2 className="text-xl cursor-pointer text-[#999999]" />
              </Link>
              <div className="relative">
                <Link href={"/product-cart"}>
                  <BsCart3 className="text-xl cursor-pointer text-[#999999]" />
                </Link>
                <div className="absolute -top-2 -left-2 z-10 w-[16px] h-[16px] bg-[#6b26b7] text-white rounded-full text-[10px] flex items-center justify-center">
                  {cart?.cartItems?.length || 0}
                </div>
              </div>

              <GiHamburgerMenu
                onClick={() => setNavbarShow(!navbarShow)}
                className="text-xl cursor-pointer text-[#999999] md:hidden"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile NagItems */}
      <div
        className={`absolute text-white top-0 w-[250px]  h-[100vh] bg-[#6b26b7] z-50 px-3 py-24 duration-500 ${
          navbarShow ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative w-full ">
          <div className="absolute -top-20 w-full ">
            <div className="relative flex justify-between items-center w-full">
              <Link href={"/"}>
                <Image
                  width={100}
                  height={40}
                  className="text-white"
                  src="https://the7.io/brand-shop/wp-content/uploads/sites/103/2021/11/sevenshoplogo.svg"
                  alt=""
                />
              </Link>
              <FaTimes
                onClick={() => setNavbarShow(false)}
                className="text-white text-xl hover:rotate-180 "
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col  gap-4 ">
          {header.map((head) => (
            <NavLink
              className="text-white"
              text={head.Title}
              key={head.Title}
              href={head.Link}
            >
              {head.Title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
