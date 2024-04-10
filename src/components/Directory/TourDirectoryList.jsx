import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
import Item from "../Item/Item";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const TourDirectory = () => {
  const { tourDirectoryId } = useParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.user.currentUser);

  const fetchToursByDirectory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/tour/getTourDirectory/${tourDirectoryId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setTours(response.data.tours);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToursByDirectory();
  }, [tourDirectoryId]);

  const settings = {
    dots: true,
    infinite: tours.length > 4,
    speed: 500,
    slidesToShow: 4, // Mặc định hiển thị 4 slides trên một màn hình lớn
    slidesToScroll: 1,
    autoplay: tours.length > 4,
    autoplaySpeed: 2000,
    arrows: false, // Tắt mũi tên điều hướng
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: tours.length >= 3 ? 3 : tours.length, // Giảm xuống 3 slides trên màn hình nhỏ hơn
          slidesToScroll: 1,
          infinite: tours.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Giảm xuống 2 slides trên màn hình tablet
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: tours.length > 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Chỉ hiển thị 1 slide trên màn hình điện thoại
          slidesToScroll: 1,
          infinite: tours.length > 1,
        },
      },
    ],
  };

  if (loading) return <p>Đang tải...</p>;
  if (error)
    return (
      <p className="my-32 text-center text-2xl font-bold">
        Xin lỗi Quý khách, danh mục này hiện đang cập nhật tour. Quý khách vui
        lòng chọn danh mục tour khác!!!
      </p>
    );

  return (
    <div className="mx-auto bg-sky-100 ">
      <div className="px-16 py-8 ">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Tours in {tourDirectoryId}
        </h2>
        {tours.length > 0 ? (
          <Slider {...settings}>
            {tours.map((tour) => (
              <Item key={tour._id} {...tour} />
            ))}
          </Slider>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default TourDirectory;
