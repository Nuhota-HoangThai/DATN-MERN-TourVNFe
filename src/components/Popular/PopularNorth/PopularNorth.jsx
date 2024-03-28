import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../../Item/Item";
import { BASE_URL } from "../../../utils/config";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularNorth = () => {
  const [popularNorthTours, setPopularNorthTours] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tour/getPopularInNorth`)
      .then((data) => setPopularNorthTours(data.data));
    // .then((response) => response.json())
  }, []);

  const settings = {
    dots: true,
    infinite: popularNorthTours.length > 3,
    speed: 500,
    slidesToShow: 3, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: popularNorthTours.length > 3,
    autoplaySpeed: 2000,
    arrows: false, // Tắt mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            popularNorthTours.length >= 3 ? 3 : popularNorthTours.length, // Giảm xuống 3 slides trên màn hình nhỏ hơn
          slidesToScroll: 1,
          infinite: popularNorthTours.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Giảm xuống 2 slides trên màn hình tablet
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: popularNorthTours.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Chỉ hiển thị 1 slide trên màn hình điện thoại
          slidesToScroll: 1,
          infinite: popularNorthTours.length > 1,
        },
      },
    ],
  };
  return (
    <div className="mx-24  mt-28 ">
      {popularNorthTours.length > 0 ? (
        <div className="w-full  rounded-3xl bg-slate-200 px-4 py-8">
          <h1 className="my-1 text-center text-3xl font-bold">
            Tours phổ biến ở miền Bắc
          </h1>
          <div className="mx-auto mb-8 h-1 w-1/6 rounded bg-blue-500"></div>{" "}
          <div className="ml-20">
            {" "}
            <Slider {...settings}>
              {popularNorthTours.map((item) => (
                <Item
                  key={item._id} // Đừng quên prop key khi render list
                  {...item}
                  // key={i}
                  // _id={item._id}
                  // image={item.image}
                  // nameTour={item.nameTour}
                  // price={item.price}
                  // regions={item.regions}
                  // maxParticipants={item.maxParticipants}
                  // startDate={item.startDate}
                  // endDate={item.endDate}
                  // convergeTime={item.convergeTime}
                  // startingGate={item.startingGate}
                />
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <p className=""></p>
      )}
    </div>
  );
};

export default PopularNorth;
