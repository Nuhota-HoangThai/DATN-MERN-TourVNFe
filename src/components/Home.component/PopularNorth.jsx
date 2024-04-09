import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../Item/Item";
import { BASE_URL } from "../../utils/config";

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
    dots: false,
    infinite: popularNorthTours.length > 4,
    speed: 500,
    slidesToShow: 4, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: popularNorthTours.length > 4,
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
          dots: false,
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
    <div className="bg-sky-50">
      {popularNorthTours.length > 0 ? (
        <div className="w-full py-6">
          <div className="flex items-center justify-center pb-4">
            <div className="mr-4 h-0.5 w-full rounded bg-blue-300"></div>
            <h1
              className="w-2/3 px-4 text-center text-2xl font-bold text-blue-800"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
            >
              Tour phổ biến miền Bắc
            </h1>
            <div className="ml-4 h-0.5 w-full rounded bg-blue-300"></div>
          </div>
          <div className="">
            <Slider {...settings}>
              {popularNorthTours.map((item) => (
                <Item key={item._id} {...item} />
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
