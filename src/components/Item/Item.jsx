import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../admin/src/utils/config";
import { FaStar, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const Item = (props) => {
  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const renderRating = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} color={i <= rating ? "#ffc107" : "#e4e5e9"} />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="w-full md:w-96 lg:w-96 rounded-2xl border shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out relative bg-white">
      <Link
        to={`/tour/${props.id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="block relative"
      >
        {Array.isArray(props.image) && props.image.length > 0 && (
          <>
            <img
              className="w-full h-48 object-cover rounded-t-lg"
              src={`${BASE_URL}/${props.image[0].replace(/\\/g, "/")}`}
              alt="Tour Main Image"
            />

            <button className="absolute top-2 left-2 p-2 rounded-full bg-white shadow-md hover:shadow-lg text-red-500 hover:bg-red-100 transition-all">
              <FaRegHeart />
            </button>
          </>
        )}
        <div className="px-6 pb-16 pt-4 ">
          <p className="text-xl font-semibold mb-3 hover:text-gray-600 transition-colors overflow-hidden line-clamp-2">
            {props.nameTour}
          </p>
          <p className="text-red-600 text-lg font-medium mb-1">
            {props.price} đ
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p>
              <span>Khu vực: </span>
              <span className="font-medium">{props.regions}</span>
            </p>
            <p>
              <span>Chỗ trống: </span>
              <span className="font-medium">{props.maxParticipants}</span>
            </p>
            <p>
              <span>Ngày khởi hành: </span>
              <span className="font-medium">
                {formatDateVN(props.startDate)}
              </span>
            </p>
            <p>
              <span>Ngày kết thúc: </span>
              <span className="font-medium">{formatDateVN(props.endDate)}</span>
            </p>
          </div>
        </div>
      </Link>

      <div className="absolute bottom-2 left-3 right-0 bg-white p-3 flex justify-between items-center">
        <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded hover:bg-blue-800 transition-colors">
          <FaShoppingCart className="mr-2" />
          Đặt hàng
        </button>
        <div className="absolute top-4 right-3 flex">
          {renderRating(props.rating)}
        </div>
      </div>
    </div>
  );
};

export default Item;
