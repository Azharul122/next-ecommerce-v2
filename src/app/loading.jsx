"use client";
import React, {  useLayoutEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  useLayoutEffect(() => {
    // Disable scroll when the Loading component mounts
   document.body.classList.add("no-scroll")

    // Enable scroll when the Loading component unmounts
    return () => {
      document.body.classList.remove("no-scroll")
    };
  }, []);
  return (
    <div
      style={{ backgroundColor: "hsla(0, 0%, 100%, 1)" }}
      className="absolute z-50 flex justify-center items-center top-0 w-full h-screen overflow-x-hidden"
    >
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loading;
