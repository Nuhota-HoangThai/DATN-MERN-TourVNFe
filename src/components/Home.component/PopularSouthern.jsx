import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../Item/Item";
import { BASE_URL } from "../../utils/config";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularSouthern = () => {
  const [popularSouthernTours, setPopularSouthernTours] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tour/getPopularInSouthern`)
      .then((response) => setPopularSouthernTours(response.data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const settings = {
    dots: false,
    infinite: popularSouthernTours.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: popularSouthernTours.length > 4,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            popularSouthernTours.length >= 3 ? 3 : popularSouthernTours.length,
          slidesToScroll: 1,
          infinite: popularSouthernTours.length > 3,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: popularSouthernTours.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: popularSouthernTours.length > 1,
        },
      },
    ],
  };

  return (
    <div className="bg-sky-50">
      {popularSouthernTours.length > 0 ? (
        <div className="py-6 sm:mx-10 lg:mx-20">
          <div className="flex items-center justify-center pb-4">
            <div className="hidden h-0.5 w-full rounded bg-blue-300 sm:mr-4 sm:block"></div>
            <h1
              className="w-full px-4 text-center text-xl font-bold text-blue-800 sm:text-2xl lg:text-3xl"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
            >
              Tour phổ biến miền Nam
            </h1>
            <div className="hidden h-0.5 w-full rounded bg-blue-300 sm:ml-4 sm:block"></div>
          </div>
          <Slider {...settings}>
            {popularSouthernTours.map((item) => (
              <Item key={item._id} {...item} />
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-center text-xl text-blue-800">Không có dữ liệu</p>
      )}
    </div>
  );
};

export default PopularSouthern;
