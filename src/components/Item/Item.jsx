import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../admin/src/utils/config";
import axios from "axios";
import { useSelector } from "react-redux";

import { IoIosAddCircleOutline } from "react-icons/io";

const Item = (props) => {
  const { token } = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  // const formatDateVN = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };
  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatRegion = (region) => {
    switch (region) {
      case "mn":
        return "miền Nam";
      case "mb":
        return "miền Bắc";
      case "mt":
        return "miền Trung";
      default:
        return "Không xác định";
    }
  };

  // add comparisons
  const addComparison = async (tourId) => {
    if (token) {
      axios
        .post(
          `${BASE_URL}/cart/addToCart`,
          {
            itemId: tourId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        )
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          alert("Thêm vào so sánh thành công");
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleBooking = () => {
    navigate("/booking", { state: { tour: props } });
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg md:w-80">
      <Link
        to={`/tour/${props._id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="block"
      >
        {Array.isArray(props.image) && props.image.length > 0 && (
          <div className="relative">
            <img
              className="h-56 w-full rounded-t-xl object-cover"
              src={`${BASE_URL}/${props.image[0].replace(/\\/g, "/")}`}
              alt="Tour Main Image"
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
          <p className="mt-3 text-base  text-blue-900">
            Nơi khởi hành:
            <span className="font-medium"> {props.startingGate}</span>
          </p>
          <p className="mt-2 text-xl font-bold text-red-600">{props.price} đ</p>
        </div>
      </Link>
      <div className="">
        <div className="mx-4">
          <button
            onClick={handleBooking}
            className=" my-2 w-full rounded bg-gradient-to-r from-blue-800 to-blue-950  py-2  text-center text-white"
          >
            Đặt ngay
          </button>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-sm font-semibold text-blue-900">
            Số chỗ còn:
            <span className="text-lg "> {props.maxParticipants}</span>
          </p>
          <button
            onClick={() => addComparison(props._id)}
            className="flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-blue-800"
          >
            <IoIosAddCircleOutline className="text-lg " /> So sánh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
