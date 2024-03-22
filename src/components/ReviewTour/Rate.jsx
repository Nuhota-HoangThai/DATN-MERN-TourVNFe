import { useState } from "react";
// import { useSelector } from "react-redux";

import { IoIosStar } from "react-icons/io";

const Rate = ({ bookingId, tourId, userId, onSubmit }) => {
  // const { currentUser } = useSelector((state) => state.user);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      bookingId,
      tourId,
      reviewText,
      rating,
      userId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 rounded border border-blue-500 bg-white p-5 px-6 shadow-2xl"
    >
      {/* Hiển thị tên người dùng */}
      {/* <div className="mb-2 text-lg font-semibold">
        Đánh giá bởi: {userId.name}
      </div> */}
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Viết đánh giá của bạn ở đây..."
        required
        className="w-full rounded-md border border-black px-5 py-2 shadow-sm"
        rows="4"
      ></textarea>
      <div className="flex items-center space-x-3">
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Điểm đánh giá (0-5)"
          min="0"
          max="5"
          required
          className="w-20 rounded-md border border-black px-5 py-2 shadow-xl"
        />
        <label htmlFor="rating" className="flex text-gray-600">
          Điểm đánh giá (1-5 <IoIosStar />)
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Gửi đánh giá
      </button>
    </form>
  );
};
export default Rate;
