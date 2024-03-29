import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import Item from "../../components/Item/Item";

import "../styles/tours.css";

import bannerTours from "../../assets/img/bannerTours.jpg";
import SearchForm from "../../components/Search/Search";

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [visibleTours, setVisibleTours] = useState(6); // Số lượng tours hiển thị ban đầu

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tour/getAllTours`);
        setTours(response.data);
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
    setVisibleTours(6); // Đặt lại số lượng tours được hiển thị về 6
  };

  return (
    <div className="mx-24  mt-28">
      <div className="relative flex items-end justify-center  text-white ">
        <img
          src={bannerTours}
          alt=""
          className="  h-[600px] w-full rounded-3xl  bg-cover bg-center"
        />

        <div className="absolute mb-[-100px] rounded-3xl bg-black bg-opacity-0 ">
          <SearchForm />
        </div>
      </div>
      <h1 className="my-1 mt-24 text-center text-3xl font-bold">
        Tất cả các tours
      </h1>{" "}
      <div className="mx-auto mb-8 h-1 w-1/6 rounded bg-blue-500"></div>
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
