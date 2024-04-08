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
    <div className="mx-24 mt-12">
      <div>
        <div className="mb-8 flex items-center justify-center">
          <div className="mr-4 h-0.5 w-full rounded bg-blue-300"></div>
          <h1
            className="w-2/3 px-4 text-center text-2xl font-bold text-blue-800"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
          >
            Chương trình khuyến mãi
          </h1>
          <div className="ml-4 h-0.5 w-full rounded bg-blue-300"></div>
        </div>
        <div className="promotions-grid">
          {promotions.map((promotion) => (
            <div
              key={promotion._id}
              className="promotion-card"
              onClick={() => selectTourPromotion(promotion._id)}
            >
              <div
                className="promotion-bg"
                // style={{
                //   backgroundImage: `url(${promotion.imageUrl || "defaultImage.jpg"})`,
                // }}
              >
                <div className="promotion-info">{promotion.namePromotion}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListPromotion;
