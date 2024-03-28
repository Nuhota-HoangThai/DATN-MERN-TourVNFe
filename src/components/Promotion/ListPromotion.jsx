import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ListPromotion = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  // const [selectedTourPromotionId, setSelectedTourPromotionId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/tourPromotion/getAllPromotion`,
          {
            // headers: {
            //   Authorization: "Bearer " + token,
            // },
          },
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, [token]);

  const selectTourPromotion = (id) => {
    navigate(`/tourPromotion/${id}`);
  };

  if (isLoading) {
    return <div className="text-center text-lg">Đang tải...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <h1>Chương trình Khuyến mãi</h1>
      {promotions.map((promotion) => (
        <div
          key={promotion._id}
          className="flex h-64 items-center justify-center rounded-lg bg-cover bg-center text-lg font-semibold text-white shadow-md"
          onClick={() => selectTourPromotion(promotion._id)}
        >
          <div className="rounded-lg bg-black bg-opacity-50 p-4">
            {promotion.namePromotion}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListPromotion;
