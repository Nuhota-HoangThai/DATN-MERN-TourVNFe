import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/config";
import calculateAvgRating from "../../utils/avgRating";

function ReviewForm({ tour }) {
  const { token } = useSelector((state) => state.user.currentUser);
  const [reviews, setReviews] = useState([]);
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/review/${tour._id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setReviews(response.data.reviews);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [tour, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      const response = await axios.post(
        `${BASE_URL}/review/${tour._id}`,
        {
          reviewText,
          rating: tourRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Review submitted successfully!");
      setReviews((prevReviews) => [...prevReviews, response.data.data]);
      reviewMsgRef.current.value = "";
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const { avgRating } = calculateAvgRating(reviews);

  return (
    <div className="mx-auto  max-w-4xl p-4">
      <div className="text-lg font-semibold">
        {avgRating ? `${avgRating} (${reviews.length})` : "Not rated yet"}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              className={`rounded-full p-2 text-white transition-all duration-150 ease-in-out ${tourRating === rating ? "bg-blue-600" : "bg-gray-400"} hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              onClick={() => setTourRating(rating)}
            >
              {rating}
            </button>
          ))}
        </div>
        <textarea
          ref={reviewMsgRef}
          placeholder="Share your thoughts!"
          className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 space-y-4">
        {isLoading ? (
          <p>Loading reviews...</p>
        ) : (
          reviews?.map((review, index) => (
            <div
              className="rounded border border-gray-300 p-4 shadow-sm"
              key={index}
            >
              <p className="text-sm text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(review.createdAt))}
              </p>
              <span className="block font-medium">{review.rating} Stars</span>
              <p className="mt-2">{review.reviewText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewForm;
