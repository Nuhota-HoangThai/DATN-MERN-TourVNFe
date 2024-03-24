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
    infinite: popularTours.length > 3,
    speed: 500,
    slidesToShow: 3, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: popularTours.length > 3,
    autoplaySpeed: 2000,
    arrows: false, // Tắt mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: popularTours.length >= 3 ? 3 : popularTours.length, // Giảm xuống 3 slides trên màn hình nhỏ hơn
          slidesToScroll: 1,
          infinite: popularTours.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Giảm xuống 2 slides trên màn hình tablet
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: popularTours.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Chỉ hiển thị 1 slide trên màn hình điện thoại
          slidesToScroll: 1,
          infinite: popularTours.length > 1,
        },
      },
    ],
  };

  return (
    <div className="mx-24 mt-12  ">
      {popularTours.length > 0 ? (
        <div className="w-full rounded-3xl bg-slate-200 px-4 py-8">
          <div className="text-center">
            <h1 className="mb-1 text-3xl font-bold">
              Tours phổ biến ở miền Trung
            </h1>
            <div className="mx-auto mb-8 h-1 w-1/6 rounded bg-blue-500"></div>{" "}
          </div>
          <div className="ml-20">
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
                  convergeTime={item.convergeTime}
                  startingGate={item.startingGate}
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

export default Popular;
