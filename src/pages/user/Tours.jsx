import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import Item from "../../components/Item/Item";

import "../styles/tours.css";

import bannerTours from "../../assets/img/bannerNam.png";
import SearchForm from "../../components/Search/Search";

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [visibleTours, setVisibleTours] = useState(8); // Số lượng tours hiển thị ban đầu

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tour/getAllTours`);
        setTours(response.data.tours);
      } catch (error) {
        console.error("There was a problem fetching the tours:", error);
      }
    };
    fetchTours();
  }, []);

  const showAllTours = () => {
    setVisibleTours(tours.length); // Cập nhật số lượng tours được hiển thị thành tổng số tours
  };

  const hideSomeTours = () => {
    setVisibleTours(8); // Đặt lại số lượng tours được hiển thị về 8
  };

  return (
    <div className="bg-sky-50">
      <div className="relative flex items-end justify-center  text-white ">
        <img
          src={bannerTours}
          alt=""
          className="h-[600px] w-full   bg-cover bg-center"
        />

        <div className="absolute  rounded-3xl bg-black bg-opacity-0 ">
          <SearchForm />
        </div>
      </div>
      <div className="my-8 flex items-center justify-center pb-4">
        <div className="mr-4 h-0.5 w-full rounded bg-blue-300"></div>
        <h1
          className="w-2/3 px-4 text-center text-2xl font-bold text-blue-800"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
        >
          Tất cả tour
        </h1>
        <div className="ml-4 h-0.5 w-full rounded bg-blue-300"></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-8 grid grid-cols-4  gap-6">
          {tours.slice(0, visibleTours).map((item) => (
            <Item key={item._id} {...item} />
          ))}
        </div>
        <div className="my-4">
          {visibleTours < tours.length ? (
            <button
              className="w-48 rounded-full border border-black px-6 py-1.5 text-black transition duration-300 hover:font-semibold"
              onClick={showAllTours}
            >
              Xem tất cả
            </button>
          ) : (
            <button
              className="w-48 rounded-full border border-black px-6 py-1.5 text-black transition duration-300 hover:font-semibold"
              onClick={hideSomeTours}
            >
              Ẩn bớt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToursList;
