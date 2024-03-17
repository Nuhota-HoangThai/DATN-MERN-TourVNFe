import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import Item from "../../components/Item/Item";

const ToursList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tour/getAllTours`);
        setTours(response.data);
      } catch (error) {
        console.error("There was a problem fetching the tours:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="mt-28">
      <h1>Tất cả các tours</h1>
      <div className="mb-8">
        <div className="">
          <div className=" mx-24 ">
            {tours.map((item, i) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursList;
