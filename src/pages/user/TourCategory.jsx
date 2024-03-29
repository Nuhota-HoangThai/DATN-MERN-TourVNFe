import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../../components/Item/Item";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BASE_URL } from "../../utils/config";
import SearchForm from "../../components/Search/Search";

const TourCategory = (props) => {
  const [allTour, setAllTour] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tour/getAllTours`);
        setAllTour(response.data);
      } catch (error) {
        console.error("There was an error fetching the tours:", error);
      }
    };
    fetchAllTours();
  }, []);

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

  const filteredProducts = allTour
    ? allTour.filter((item) => item.regions === props.regions)
    : [];

  const displayRange = `Hiển thị ${Math.min(
    1,
    filteredProducts.length,
  )}-${Math.min(visibleProducts, filteredProducts.length)} sản phẩm`;

  return (
    <div className="mx-24 mb-8 mt-28">
      <div className="relative flex items-end justify-center text-white ">
        <img
          src={props.banner}
          alt=""
          className="  h-[600px] w-full rounded-3xl  bg-cover bg-center"
        />

        <div className="absolute mb-[-100px] rounded-3xl bg-black bg-opacity-0 ">
          <SearchForm />
        </div>
      </div>
      <div className="mt-20 flex items-center justify-between py-5">
        <p className="text-lg font-semibold">{displayRange}</p>
        <div className="flex items-center rounded-full border border-gray-300 px-3 py-2 text-sm">
          Sắp xếp theo <RiArrowDropDownLine className="ml-2 text-2xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-8 rounded-lg sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.slice(0, visibleProducts).map((item) => (
          <Item key={item._id} {...item} />
        ))}
      </div>
      {visibleProducts < filteredProducts.length && (
        <div className="mb-8 mt-6 text-center">
          <button
            onClick={showMoreProducts}
            className="rounded-full border border-gray-400 px-4 py-2 text-gray-800 transition-colors hover:border-gray-500 hover:text-gray-900"
          >
            Khám phá thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default TourCategory;
