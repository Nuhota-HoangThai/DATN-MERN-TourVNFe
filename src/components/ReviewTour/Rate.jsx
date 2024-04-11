import { useState } from "react";
// import { useSelector } from "react-redux";

import { IoIosStar } from "react-icons/io";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Rate = ({ bookingId, tourId, userId, onSubmit }) => {
  // const { currentUser } = useSelector((state) => state.user);
  const [image, setImages] = useState([]);
  const [video, setVideo] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      bookingId,
      tourId,
      reviewText,
      image, // thay vì image
      video,
      rating,
      userId,
    });
  };

  const sliderSettings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: image.length > 1,
    autoplay: image.length > 1,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: image.length > 1,
          autoplay: image.length > 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-10 max-w-xl space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
    >
      <div className="grid grid-cols-2">
        {" "}
        <div>
          <label
            htmlFor="file-input"
            className="mb-1 block cursor-pointer text-sm font-medium text-gray-700"
          >
            Thêm hình ảnh
          </label>
          {image.length > 0 ? (
            <Slider {...sliderSettings} className="mb-4">
              {image.map((image, index) => {
                if (image instanceof Blob || image instanceof File) {
                  const imageUrl = URL.createObjectURL(image);
                  return (
                    <div key={index} className="flex justify-center">
                      <img
                        src={imageUrl}
                        alt="Hình ảnh địa điểm"
                        onLoad={() => URL.revokeObjectURL(imageUrl)}
                        className="h-auto max-w-xs rounded-md shadow-sm"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </Slider>
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300">
              <span className="text-sm text-gray-500">Chưa có hình ảnh</span>
            </div>
          )}
          <input
            onChange={(e) => setImages([...e.target.files])}
            type="file"
            name="image"
            id="file-input"
            className="hidden"
            multiple
          />
        </div>
        <div>
          <label
            htmlFor="video-input"
            className="mb-1 block cursor-pointer text-sm font-medium text-gray-700"
          >
            Thêm video
          </label>
          {video.length > 0 ? (
            <video
              controls
              className="max-w-xs rounded-md shadow-sm"
              src={URL.createObjectURL(video[0])}
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300">
              <span className="text-sm text-gray-500">Chưa có video</span>
            </div>
          )}
          <input
            onChange={(e) => setVideo([...e.target.files])}
            type="file"
            name="video"
            id="video-input"
            className="hidden"
            accept="video/*"
          />
        </div>
      </div>

      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Viết đánh giá của bạn ở đây..."
        required
        className="h-24 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        rows="3"
      ></textarea>

      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Điểm đánh giá (0-5)"
          min="0"
          max="5"
          required
          className="w-16 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
        <label htmlFor="rating" className="flex text-sm text-gray-600">
          Điểm đánh giá (1-5 <IoIosStar />)
        </label>
      </div>

      <button
        type="submit"
        className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Gửi đánh giá
      </button>
    </form>
  );
};
export default Rate;
