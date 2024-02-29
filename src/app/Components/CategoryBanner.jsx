import Image from "next/image";
import React from "react";
import image1 from "@/app/Assets/Slider_Image/slider_1.jpg";
import image4 from "@/app/Assets/Slider_Image/slider_4.jpg";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const CategoryBanner = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 py-5 overflow-hidden">
        <div className="xs:h-[200px] sm:h-[220px] md:h-[250px] lg:h-[300px] w-full relative">
          <Image src={image1} alt="" className="h-full w-full" />
          <div className="absolute h-full  top-0 w-full">
            <div className="flex flex-col justify-center h-full gap-5 pl-5">
              <p className="text-white text-xl">Men`&apos;`s Fashion</p>
              <div className="text-center py-2 w-[190px] bg-[#6b26b7] rounded-3xl flex items-center gap-2 justify-center text-white">
                <Link href={"/"} className="">
                  Shop Category
                </Link>
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
        <div className="xs:h-[200px] sm:h-[220px] md:h-[250px] lg:h-[300px] relative">
          <Image src={image4} alt="" className="h-full w-full" />
          <div className="absolute h-full  top-0 w-full bg-[rgba(0,0,0,0.2)]">
            <div className="flex flex-col justify-center h-full gap-5 pl-5">
              <p className="text-white text-xl">CBD products</p>
              <div className="text-center py-2 w-[190px] bg-[#6b26b7] rounded-3xl flex items-center gap-2 justify-center text-white">
                <Link href={"/"} className="">
                  Shop Category
                </Link>
                <FaArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBanner;
