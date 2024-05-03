import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../admin/src/utils/config";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

import { formatDateVN } from "../../utils/formatDate";
import { formatRegion } from "../../utils/formatRegion";

import { toast } from "react-toastify";

const Item = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return price
      ? `${price.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
      : "";
  };

  const isPromotionActive = () => {
    const now = new Date();
    return (
      props.promotion &&
      new Date(props.promotion.startDatePromotion) <= now &&
      new Date(props.promotion.endDatePromotion) >= now
    );
  };

  const addComparison = async (tourId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        `${BASE_URL}/cart/addToCart`,
        { itemId: tourId },
        { headers: { Authorization: "Bearer " + token } },
      );
      toast("Thêm vào so sánh thành công");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addFavorite = async (tourId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    const userId = currentUser?.id;
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    try {
      await axios.post(
        `${BASE_URL}/favorites/addFavorites`,
        { userId, tourId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast("Tour đã được thêm vào yêu thích!");
    } catch (error) {
      toast("Tour này đã được thêm vào yêu thích!");
    }
  };

  const handleBooking = () => {
    navigate("/booking", { state: { tour: props } });
  };

  return (
    <div className="group relative w-full overflow-hidden border border-gray-200 bg-white shadow-md transition duration-300 ease-in-out hover:shadow-lg md:w-80">
      <Link
        to={`/tour/${props._id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="block"
      >
        {Array.isArray(props.image) && props.image.length > 0 && (
          <div className="relative">
            <img
              className="h-56 w-full object-cover transition duration-300 ease-in-out group-hover:scale-110"
              src={`${BASE_URL}/${props.image[0].replace(/\\/g, "/")}`}
              alt="Tour Main Image"
            />
            <CiHeart
              className="absolute left-1 top-1 cursor-pointer rounded-full bg-sky-50 text-3xl text-white hover:text-red-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addFavorite(props._id);
              }}
            />
            {isPromotionActive() && (
              <div className="absolute right-1 top-1 rounded-full bg-red-500 px-3 py-1 text-xs text-white">
                -{props.promotion.discountPercentage}%
              </div>
            )}
          </div>
        )}
        <div className="p-4">
          <p className="text-base text-blue-900">
            {formatDateVN(props.startDate)} - {formatDateVN(props.endDate)}
          </p>
          <p className="mt-1 truncate text-lg font-bold text-blue-950 hover:text-blue-600">
            {props.nameTour}
          </p>
          <p className="mt-1 text-base text-blue-900">
            Mã tour: <span className="font-medium">{props._id}</span>
          </p>
          <p className="mt-3 text-base text-blue-900">
            Khu vực:
            <span className="font-medium"> {formatRegion(props.regions)}</span>
          </p>
          <p className="mt-3 text-base text-blue-900">
            Nơi khởi hành:
            <span className="font-medium"> {props.startingGate}</span>
          </p>
          <div className="mt-2 flex justify-between">
            {isPromotionActive() ? (
              <>
                <p className="text-xl font-bold text-red-600">
                  {formatPrice(props.price)}
                </p>
              </>
            ) : (
              <p className="text-xl font-bold text-red-600">
                {formatPrice(props.price)}
              </p>
            )}
            {props.price !== props.originalPrice && (
              <p className="text-gray-500 line-through">
                {formatPrice(props.originalPrice)}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="">
        <div className="mx-4">
          <button
            onClick={handleBooking}
            className="my-2 w-full rounded bg-gradient-to-r from-blue-800 to-blue-950 py-2 text-center text-white transition duration-300 hover:from-blue-950 hover:to-blue-800"
          >
            Đặt ngay
          </button>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-sm font-semibold text-blue-900">
            Số chỗ còn:{" "}
            <span className="text-lg"> {props.maxParticipants}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => addComparison(props._id)}
              className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-blue-800"
            >
              <IoIosAddCircleOutline className="text-lg" /> So sánh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
