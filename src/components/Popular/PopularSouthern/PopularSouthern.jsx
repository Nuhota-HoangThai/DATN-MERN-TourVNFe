import { useEffect, useState } from "react";
import Item from "../../Item/Item";
import { BASE_URL } from "../../../utils/config";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularSouthern = () => {
  const [popularSouthernTours, setPopularSouthernTours] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/tour/getPopularInSouthern`)
      .then((response) => response.json())
      .then((data) => setPopularSouthernTours(data));
  }, []);

  const settings = {
    dots: true,
    infinite: popularSouthernTours.length > 1,
    speed: 500,
    slidesToShow:
      popularSouthernTours.length >= 3 ? 3 : popularSouthernTours.length,
    slidesToScroll: 1,
    autoplay: popularSouthernTours.length > 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            popularSouthernTours.length >= 2 ? 2 : popularSouthernTours.length,
          slidesToScroll: 1,
          infinite: popularSouthernTours.length > 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: popularSouthernTours.length > 1,
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
    <div>
      {popularSouthernTours.length > 0 ? (
        <div className="mb-8">
          <h1 className="mb-0.5 pl-24 text-left font-semibold text-gray-800 md:text-2xl">
            Tour phổ biến miền Nam
          </h1>
          <div className="mx-24 mb-5 border-b-2 border-blue-950"></div>
          <div className=" px-24">
            <div className="">
              <Slider {...settings}>
                {popularSouthernTours.map((item, i) => (
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
        <p></p>
      )}
    </div>
  );
};

export default PopularSouthern;
