import { useState } from "react";

const ReviewForm = ({ bookingId, tourId, onSubmit }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ bookingId, tourId, reviewText, rating });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 bg-white p-5 px-6 shadow-2xl"
    >
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Viết đánh giá của bạn ở đây..."
        required
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label htmlFor="rating" className="text-gray-600">
          Điểm đánh giá (0-5)
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
export default ReviewForm;
