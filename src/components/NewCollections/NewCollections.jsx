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
    infinite: newCollection.length > 1,
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
    <div className="my-24 flex justify-center">
      {newCollection.length > 0 ? (
        <div className="w-full max-w-6xl px-4">
          <h1 className="my-8 text-center text-3xl font-bold">
            Tours mới nhất
          </h1>
          {/* <div className="mb-5 border-b-2 border-blue-900"></div> */}
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
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default NewCollections;
