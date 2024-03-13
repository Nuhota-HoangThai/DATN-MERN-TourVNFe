import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../admin/src/utils/config";
import { FaStar, FaRegHeart } from "react-icons/fa";

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
        <FaStar key={i} color={i <= rating ? "#ffc107" : "#e4e5e9"} />,
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border bg-white shadow-xl transition-shadow duration-300 ease-in-out hover:shadow-2xl md:w-96 lg:w-96">
      <Link
        to={`/tour/${props._id}`}
        onClick={() => window.scrollTo(0, 0)}
        className="relative block"
      >
        {Array.isArray(props.image) && props.image.length > 0 && (
          <>
            <img
              className="h-48 w-full rounded-t-lg object-cover"
              src={`${BASE_URL}/${props.image[0].replace(/\\/g, "/")}`}
              alt="Tour Main Image"
            />

            <button className="absolute left-2 top-2 rounded-full bg-white p-2 text-red-500 shadow-md transition-all hover:bg-red-100 hover:shadow-lg">
              <FaRegHeart />
            </button>
          </>
        )}
        <div className="px-6 pb-16 pt-4 ">
          <p className="mb-3 line-clamp-2 overflow-hidden text-xl font-semibold transition-colors hover:text-gray-600">
            {props.nameTour}
          </p>
          <p className="mb-1 text-lg font-medium text-red-600">
            {props.price} đ
          </p>
          <div className="mb-4 grid grid-cols-2 gap-4">
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

      <div className="absolute bottom-2 left-3 right-0 flex items-center justify-between bg-white p-3">
        <button className="flex items-center justify-center rounded bg-blue-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800">
          Đặt hàng
        </button>
        <div className="absolute right-3 top-4 flex">
          {renderRating(props.rating)}
        </div>
      </div>
    </div>
  );
};

export default Item;
