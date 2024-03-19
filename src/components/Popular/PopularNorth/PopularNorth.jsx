import { useEffect, useState } from "react";
import Item from "../../Item/Item";
import { BASE_URL } from "../../../utils/config";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularNorth = () => {
  const [popularNorthTours, setPopularNorthTours] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/tour/getPopularInNorth`)
      .then((response) => response.json())
      .then((data) => setPopularNorthTours(data));
  }, []);

  const settings = {
    dots: true,
    infinite: popularNorthTours.length > 1,
    speed: 500,
    slidesToShow: popularNorthTours.length >= 3 ? 3 : popularNorthTours.length,
    slidesToScroll: 1,
    autoplay: popularNorthTours.length > 1,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            popularNorthTours.length >= 2 ? 2 : popularNorthTours.length,
          slidesToScroll: 1,
          infinite: popularNorthTours.length > 2,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: popularNorthTours.length > 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: popularNorthTours.length > 1,
        },
      },
    ],
  };

  return (
    <div className="mb-24 mt-8 flex justify-center">
      {popularNorthTours.length > 0 ? (
        <div className="w-full max-w-6xl px-4">
          <h1 className="my-8 text-center text-3xl font-bold">
            Tours phổ biến ở miền Bắc
          </h1>
          {/* <div className="mx-24 mb-5 border-b-2 border-blue-950"></div> */}

          <Slider {...settings}>
            {popularNorthTours.map((item, i) => (
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
      ) : (
        <p className=""></p>
      )}
    </div>
  );
};

export default PopularNorth;
