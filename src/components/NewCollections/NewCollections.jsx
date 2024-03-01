import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import { BASE_URL } from "../../utils/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/tour/getNewCollection`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data); // Log để kiểm tra dữ liệu
        setNewCollection(data);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: newCollection.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
    <div className="mb-8 px-24">
      <h1 className="text-gray-800  text-2xl font-semibold mb-1">
        Tour mới nhất
      </h1>
      <div className="border-b-2 border-blue-950 mb-5"></div>
      <div className="">
        <Slider {...settings}>
          {newCollection.map((item, index) => (
            <div key={index} className="">
              <Item
                id={item.id}
                image={item.image}
                nameTour={item.nameTour}
                price={item.price}
                regions={item.regions}
                maxParticipants={item.maxParticipants}
                startDate={item.startDate}
                endDate={item.endDate}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewCollections;
