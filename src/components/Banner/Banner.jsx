import {} from "react";

import "./banner.css";

import bannerHome from "../../assets/img/bannerHome.jpg";

import SearchForm from "../Search/Search";
import SidebarSearch from "../Search/SidebarSearch";
import SearchBillForm from "../Search/SearchBill";

const Banner = () => {
  return (
    <div className="relative  flex items-end justify-center  text-white ">
      <img
        src={bannerHome}
        alt=""
        className="h-[600px] w-full bg-cover bg-center"
      />
      <div className="absolute  rounded-3xl bg-black bg-opacity-0 ">
        <div className="mb-[-50px] mr-[-30px] flex justify-end">
          <div>
            <SearchBillForm />
          </div>
          <SidebarSearch />
        </div>
        <SearchForm />
      </div>
    </div>
  );
};

export default Banner;
