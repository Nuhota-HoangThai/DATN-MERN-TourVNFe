import { useEffect, useState } from "react";
import Item from "../../Item/Item";
import { BASE_URL } from "../../../utils/config";

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
    slidesToShow: popularTours.length >= 3 ? 3 : popularTours.length,
    slidesToScroll: 1,
    autoplay: popularTours.length > 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: popularTours.length >= 2 ? 2 : popularTours.length,
          slidesToScroll: 1,
          infinite: popularTours.length > 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: popularTours.length > 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: popularTours.length > 1,
        },
      },
    ],
  };

  return (
    <div>
      {popularTours.length > 0 ? (
        <div className="mb-8">
          <h1 className="mb-0.5 pl-24 text-left font-semibold text-gray-800 md:text-2xl">
            Tour phổ biến miền Trung
          </h1>
          <div className="mx-24 mb-5 border-b-2 border-blue-950"></div>
          <div className="">
            <div className=" mx-24 ">
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
      ) : (
        <p className=""></p>
      )}
    </div>
  );
};

export default Popular;
