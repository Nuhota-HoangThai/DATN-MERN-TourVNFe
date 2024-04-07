import { useEffect, useState } from "react";
import Item from "../Item/Item";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/tour/getNewCollection`).then((response) => {
      //console.log(response.data);
      setNewCollection(response.data); // Sửa từ data thành response.data
    });
  }, []);

  const settings = {
    dots: false,
    infinite: newCollection.length > 4,
    speed: 500,
    slidesToShow: 4, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: newCollection.length > 4,
    autoplaySpeed: 2000,
    arrows: false, // Tắt mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: newCollection.length >= 3 ? 3 : newCollection.length, // Giảm xuống 3 slides trên màn hình nhỏ hơn
          slidesToScroll: 1,
          infinite: newCollection.length > 3,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Giảm xuống 2 slides trên màn hình tablet
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: newCollection.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Chỉ hiển thị 1 slide trên màn hình điện thoại
          slidesToScroll: 1,
          infinite: newCollection.length > 1,
        },
      },
    ],
  };

  return (
    <div className="mx-20 mt-28">
      {newCollection.length > 0 ? (
        <div className="w-full">
          <div className="mb-8 flex items-center justify-center">
            <div className="mr-4 h-0.5 w-full rounded bg-blue-300"></div>
            <h1
              className="w-2/3 px-4 text-center text-2xl font-bold text-blue-800"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
            >
              Tour mới nhất
            </h1>
            <div className="ml-4 h-0.5 w-full rounded bg-blue-300"></div>
          </div>{" "}
          <div className="">
            <Slider {...settings}>
              {newCollection.map((item) => (
                <Item
                  key={item._id} // Đừng quên prop key khi render list
                  {...item}
                  // id={item.id}
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
        <p className="text-center"></p>
      )}
    </div>
  );
};

export default NewCollections;
