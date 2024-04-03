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
    return <div className="empty">Không có sản phẩm khuyến mãi</div>;
  }

  return (
    <div className="promotions-container mx-24 mt-12 rounded-3xl bg-gray-100">
      <div>
        <h1 className="title text-3xl font-bold">Ưu đãi</h1>
        <div className="divider"></div>
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
