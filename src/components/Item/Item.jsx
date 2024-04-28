import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../admin/src/utils/config";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

import { formatDateVN } from "../../utils/formatDate";
import { formatRegion } from "../../utils/formatRegion";

import { toast } from "react-toastify";

///
// import alanBtnInstance from "@alan-ai/alan-sdk-web";
// import { useEffect } from "react";
///
const Item = (props) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token; // Using optional chaining to safely access token
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return `${price?.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const addComparison = async (tourId) => {
    if (!token) {
      // Nếu không có token, chưa đăng nhập, chuyển đến trang đăng nhập
      navigate("/login");
      return; // Dừng thực thi hàm
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

    //lưu trữ  trong Redux store như currentUser.userId
    const userId = currentUser?.id;

    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/favorites/addFavorites`,
        { userId, tourId }, // Gửi cả userId và tourId trong request body
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

  // useEffect(() => {
  //   const alanBtn = alanBtnInstance({
  //     key: "21c1a29fa65de294f9c950d8d003fcaf2e956eca572e1d8b807a3e2338fdd0dc/stage",
  //     onCommand: (commandData) => {
  //       if (commandData.command === "fetchTourDetails") {
  //         // Gửi thông tin cụ thể của tour tới Alan AI
  //         alanBtn.playText(
  //           `Tên tour là ${props.nameTour}, bắt đầu từ ${props.startDate} đến ${props.endDate}. Mã tour là ${props._id}.`,
  //         );
  //       } else if (commandData.command === "fetchTourPrice") {
  //         if (props.promotion && props.price !== props.originalPrice) {
  //           alanBtn.playText(
  //             `Giá khuyến mãi của tour là ${props.price.toLocaleString()} đồng, giá gốc là ${props.originalPrice.toLocaleString()} đồng.`,
  //           );
  //         } else {
  //           alanBtn.playText(
  //             `Giá của tour là ${props.price.toLocaleString()} đồng.`,
  //           );
  //         }
  //       } else if (commandData.command === "fetchPromotionDetails") {
  //         if (props.promotion) {
  //           alanBtn.playText(
  //             `Tour này đang có khuyến mãi, giảm ${props.promotion.discountPercentage}%.`,
  //           );
  //         } else {
  //           alanBtn.playText("Tour này hiện không có khuyến mãi.");
  //         }
  //       } else if (commandData.command === "fetchTourDates") {
  //         alanBtn.playText(
  //           `Tour này bắt đầu từ ngày ${props.startDate} và kết thúc vào ngày ${props.endDate}.`,
  //         );
  //       } else if (commandData.command === "fetchParticipantInfo") {
  //         alanBtn.playText(
  //           `Số chỗ tối đa cho tour này là ${props.maxParticipants}.`,
  //         );
  //       } else if (commandData.command === "bookTour") {
  //         handleBooking();
  //       }
  //     },
  //   });

  //   return () => {
  //     // Dọn dẹp Alan AI khi component bị unmount
  //     alanBtn.deactivate();
  //   };
  // }, [props, handleBooking]);

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
                e.preventDefault(); // Prevent default link action
                e.stopPropagation(); // Stop event propagation
                addFavorite(props._id);
              }}
            />
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
            <p className=" text-xl font-bold text-red-600">
              {props.price !== props.originalPrice && props.promotion ? (
                <>
                  <p className="text-red-600">{formatPrice(props.price)} </p>
                  <p className="text-base text-gray-500 line-through">
                    {formatPrice(props.originalPrice)}
                  </p>
                </>
              ) : (
                formatPrice(props.price)
              )}
            </p>
            <p>
              {" "}
              {props.promotion && props.promotion.discountPercentage > 0 && (
                <div className=" rounded-full bg-red-500 px-3 py-3 text-white">
                  -{props.promotion.discountPercentage}%
                </div>
              )}
            </p>
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
