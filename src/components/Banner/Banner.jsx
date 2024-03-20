import {} from "react";

import "./banner.css";

import SearchForm from "../Search/Search";
import bannerHome from "../../assets/img/bannerHome.jpg";

const Banner = () => {
  return (
    <div className="relative mx-24  mt-28 flex  items-end justify-center  text-white ">
      <img
        src={bannerHome}
        alt=""
        className="  h-[600px] w-full rounded-3xl  bg-cover bg-center"
      />
      <div className="absolute  rounded-3xl bg-black bg-opacity-0 ">
        <div className="vivu3mien mb-36 pl-40 text-5xl ">
          <p>Chào mừng bạn đến với</p>
          <p className="vivu3mien mt-10  text-7xl ">ViVu3Mien</p>
        </div>
        <SearchForm />
      </div>
    </div>
  );
};

export default Banner;
