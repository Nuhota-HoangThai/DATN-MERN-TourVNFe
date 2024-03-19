import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import Item from "../../components/Item/Item";

import bannerTours from "../../assets/img/bannerTours.jpg";

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
    <div className="mx-24 mt-28">
      <img src={bannerTours} alt="" className="h-[600px] w-full rounded-3xl" />
      <h1 className="my-8 text-center text-3xl font-bold">Tất cả các tours</h1>
      <div className="flex flex-col items-center">
        <div className="mb-8 grid grid-cols-3 gap-8">
          {tours.slice(0, visibleTours).map((item, i) => (
            <Item
              key={i}
              _id={item._id}
              image={item.image}
              nameTour={item.nameTour}
              price={item.price}
              regions={item.regions}
              maxParticipants={item.maxParticipants}
              startDate={item.startDate}
              endDate={item.endDate}
            />
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
