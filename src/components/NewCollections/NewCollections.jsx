import { useEffect, useState } from "react";
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
    slidesToShow: 3, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: newCollection.length > 3,
    autoplaySpeed: 2000,
    arrows: false, // Tắt mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: newCollection.length >= 3 ? 3 : newCollection.length, // Giảm xuống 3 slides trên màn hình nhỏ hơn
          slidesToScroll: 1,
          infinite: newCollection.length > 3,
          dots: true,
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
    <div className="mx-24 mt-12  ">
      {newCollection.length > 0 ? (
        <div className="w-full rounded-3xl bg-slate-200 px-4 py-8">
          <h1 className="my-1 text-center text-3xl font-bold">
            Tours mới nhất
          </h1>
          <div className="mx-auto mb-8 h-1 w-1/6 rounded bg-blue-500"></div>{" "}
          <div className="ml-20">
            <Slider {...settings}>
              {newCollection.map((item, index) => (
                <div key={index} className="px-2">
                  <Item
                    id={item.id}
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
                </div>
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
