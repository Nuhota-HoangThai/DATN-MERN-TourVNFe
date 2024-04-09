import {} from "react";

import "./banner.css";

import SearchForm from "../Search/Search";
import bannerHome from "../../assets/img/bannerHome.jpg";

const Banner = () => {
  return (
    <div className="relative  flex items-end justify-center  text-white ">
      <img
        src={bannerHome}
        alt=""
        className="h-[600px] w-full bg-cover bg-center"
      />
      <div className="absolute  rounded-3xl bg-black bg-opacity-0 ">
        {/* <div className="norican-regular mb-28 pl-40 text-5xl ">
          <p>Khám phá mỗi góc Việt Nam, </p>
          <p className="mt-2">trải nghiệm mỗi chuyến đi cùng</p>
          <p className="norican-regular mt-16  text-7xl text-white ">
            ViVu3Mien
          </p>
        </div> */}
        <SearchForm />
      </div>
    </div>
  );
};

export default Banner;
