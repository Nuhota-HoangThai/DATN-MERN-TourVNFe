import { useEffect, useState } from "react";
import Item from "../../Item/Item";
import { BASE_URL } from "../../../utils/config";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Popular = () => {
  const [popularTours, setPopularTours] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tour/getPopularInCentral`)
      .then((data) => setPopularTours(data.data));
  }, []);

  const settings = {
    dots: true,
    infinite: popularTours.length > 4,
    speed: 500,
    slidesToShow: 4, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: popularTours.length > 4,
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
    <div className="mx-20 mt-12 ">
      {popularTours.length > 0 ? (
        <div className="w-full">
          <div className="mb-8 flex items-center justify-center">
            <div className="mr-4 h-0.5 w-full rounded bg-blue-300"></div>
            <h1
              className="w-2/3 px-4 text-center text-2xl font-bold text-blue-800"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
            >
              Tour phổ biến miền Trung
            </h1>
            <div className="ml-4 h-0.5 w-full rounded bg-blue-300"></div>
          </div>
          <div className="">
            <Slider {...settings}>
              {popularTours.map((item) => (
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

export default Popular;
