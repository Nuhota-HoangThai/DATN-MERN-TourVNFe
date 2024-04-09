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
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto my-8  mt-28 px-4">
      <h2 className="mb-2 text-center text-2xl font-semibold">
        Tours in {tourDirectoryId}
      </h2>
      {tours.length > 0 ? (
        <Slider {...settings}>
          {tours.map((tour) => (
            <Item key={tour._id} {...tour} />
          ))}
        </Slider>
      ) : (
        <p>No tours available for this directory.</p>
      )}
    </div>
  );
};

export default TourDirectory;
