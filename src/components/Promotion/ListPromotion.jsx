import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
//import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./list-promotion.css";

const ListPromotion = () => {
  //const {  } = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/tourPromotion/getAllPromotion`,
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const selectTourPromotion = (id) => {
    navigate(`/tourPromotion/${id}`);
  };

  if (isLoading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (promotions.length === 0) {
    return <div className="empty"></div>;
  }

  return (
    <div className="bg-sky-100">
      <div className="w-full py-6">
        <div className="flex items-center justify-center pb-4">
          <div className="mr-4 h-0.5 w-full rounded bg-blue-300"></div>
          <h1
            className="w-2/3 px-4 text-center text-2xl font-bold text-blue-800"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
          >
            Chương trình khuyến mãi
          </h1>
          <div className="ml-4 h-0.5 w-full rounded bg-blue-300"></div>
        </div>
        <div className="mx-24 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promotion) => (
            <div
              key={promotion._id}
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
              onClick={() => selectTourPromotion(promotion._id)}
            >
              <div className="relative">
                {promotion.image ? (
                  <img
                    src={`${BASE_URL}/${promotion.image.replace(/\\/g, "/")}`}
                    alt="promotion"
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                    <p className="text-center text-gray-500">
                      Không có hình ảnh
                    </p>
                  </div>
                )}
                <div className="absolute bottom-0 w-full bg-white bg-opacity-80 px-4 py-2">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {promotion.namePromotion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPromotion;
