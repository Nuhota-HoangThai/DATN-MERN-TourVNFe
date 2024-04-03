import { useState } from "react";
// import { useSelector } from "react-redux";

import { IoIosStar } from "react-icons/io";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Rate = ({ bookingId, tourId, userId, onSubmit }) => {
  // const { currentUser } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);
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

  const sliderSettings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    infinite: images.length > 1,
    autoplay: images.length > 1,
    autoplaySpeed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: images.length > 1,
          autoplay: images.length > 1,
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
      className="w-full space-y-4 rounded border border-blue-500 bg-white p-5 px-6 shadow-2xl"
    >
      {" "}
      <div className="ml-5">
        <div className="mb-4 text-center ">
          <label htmlFor="file-input" className="my-2 cursor-pointer ">
            {images.length > 0 ? (
              <Slider {...sliderSettings} className="mx-5 mb-5">
                {images.map((image, index) => {
                  if (image instanceof Blob || image instanceof File) {
                    const imageUrl = URL.createObjectURL(image);
                    return (
                      <div key={index}>
                        <img
                          className="border border-black"
                          src={imageUrl}
                          alt="Hình ảnh địa điểm"
                          onLoad={() => URL.revokeObjectURL(imageUrl)}
                          style={{
                            width: "600px",
                            height: "250px",
                            marginTop: "30px",
                          }}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </Slider>
            ) : (
              <div className="mt-8 border border-black">
                <h1 className="py-36">Thêm hình ảnh</h1>
              </div>
            )}
          </label>
          <input
            onChange={(e) => {
              setImages([...e.target.files]);
            }}
            type="file"
            name="image"
            id="file-input"
            className="hidden "
            multiple
          />
        </div>
        {/**/}
        <div className="mb-4 text-center">
          <label htmlFor="video-input" className="cursor-pointer">
            {video.length > 0 ? (
              <video
                className="mx-5 border border-black"
                controls
                src={URL.createObjectURL(video[0])}
                alt="Video preview"
                style={{
                  width: "525px",
                  height: "250px",
                  marginTop: "30px",
                }}
              />
            ) : (
              <div className="mt-10 border border-black">
                <h1 className="py-36 text-center">Thêm video</h1>
              </div>
            )}
          </label>
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
