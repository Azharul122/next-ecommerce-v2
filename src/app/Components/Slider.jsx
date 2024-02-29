"use client";
import slider1 from "@/app/Assets/Slider_Image/slider_1.jpg";
import slider2 from "@/app/Assets/Slider_Image/slider_2.jpg";
import slider3 from "@/app/Assets/Slider_Image/slider_3.jpg";
import slider4 from "@/app/Assets/Slider_Image/slider_4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";
import Image from "next/image";

const Slider = () => {
  const slider = [
    {
      id: 1,
      title: "Spring / Summer 2023",
      description: "Men's Collection",
      image: slider1,
      effect: "",
      btnTitle: "Shop new collection",
    },
    {
      id: 2,
      title: "Add a some color to your Look!",
      description: "Pink is a New Black!",
      image: slider2,
      effect: "",
      btnTitle: "Shop pink items",
    },
    {
      id: 3,
      title: "Accessories collection",
      description: "New Trendy Bags",
      image: slider3,
      effect: "",
      btnTitle: "Shop new collection",
    },
    {
      id: 4,
      title: "Seven Vital",
      description: "Premium CBD Products",
      image: slider4,
      effect: "",
      btnTitle: "View all CBD products",
    },
  ];
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop
      effect="fade"
      autoplay
      navigation
      modules={[EffectFade, Autoplay, Navigation]}
      className=""
    >
      {slider.map((slide) => (
        <SwiperSlide
          className=""
          key={slide.id}
          // style={{ backgroundImage: slide.image }}
        >
          <div className="singleSlide relative xl:h-[80vh] xs:h-[35vh] sm:h-[50vh] md:h-[60vh] lg-[70vh] text-white">
            <Image alt="" src={slide.image} className="h-full" />
            <div className="absolute top-0 h-full w-full z-10">
              <div className="flex flex-col justify-center items-center h-full gap-3">
                <p className="sm:text-lg md:text-xl xl:text-2xl  drop-shadow-xl">
                  {slide.title}
                </p>
                <p className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl">
                  {slide.description}
                </p>
                <button className="px-3 py-1 bg-[#6b26b7] text-white sm:text-sm md:text-lg">
                  {slide.btnTitle}
                </button>
              </div>
            </div>
            <div className="overlay absolute h-full w-full top-0 bg-[rgba(0,0,0,0.2)]"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
