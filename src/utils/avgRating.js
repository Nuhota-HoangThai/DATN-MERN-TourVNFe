const calculateAvgRating = (reviews) => {
  // Ensure reviews is treated as an empty array if it's not provided or not an array
  const validReviews = Array.isArray(reviews) ? reviews : [];

  // Calculate total rating
  const totalRating = validReviews.reduce((acc, item) => acc + item.rating, 0);

  // Calculate average rating; handle the case where totalRating is 0 by returning an empty string
  const avgRating =
    totalRating === 0 ? "" : (totalRating / validReviews.length).toFixed(); // Always calculate the average if totalRating is not 0

  return {
    totalRating,
    avgRating,
  };
};

export default calculateAvgRating;
