import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import { BASE_URL } from "../../utils/config";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Popular = () => {
  const [popularTours, setPopularTours] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/tour/getPopularInCentral`)
      .then((response) => response.json())
      .then((data) => setPopularTours(data));
  }, []);

  const settings = {
    dots: true,
    infinite: popularTours.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-8">
      <h1 className="text-left pl-24 mb-0.5 text-gray-800 md:text-2xl font-semibold">
        Tour phổ biến miền Trung
      </h1>
      <div className="border-b-2 mx-24 border-blue-950 mb-5"></div>
      <div className=" px-24">
        <div className="">
          <Slider {...settings}>
            {popularTours.map((item, i) => (
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
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Popular;
