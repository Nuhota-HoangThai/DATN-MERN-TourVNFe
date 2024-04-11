import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../../components/Item/Item";
import { BASE_URL } from "../../utils/config";

import { regionContents } from "../../resources/textRegion";
import Slider from "@mui/material/Slider";

const TourCategory = (props) => {
  const regionContent = regionContents[props.regions];
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [allTour, setAllTour] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    const fetchAllTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tour/getAllTours`);
        setAllTour(response.data.tours);
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
    ? allTour.filter(
        (item) =>
          item.regions === props.regions &&
          item.price >= priceRange.min &&
          item.price <= priceRange.max,
      )
    : [];

  const displayRange = `Hiển thị ${Math.min(
    1,
    filteredProducts.length,
  )}-${Math.min(visibleProducts, filteredProducts.length)} sản phẩm`;

  return (
    <div className="bg-sky-50">
      <div className="mx-10 grid grid-cols-7 gap-3 pt-8">
        <div className="col-span-2">
          <h2 className="text-left text-2xl font-bold text-gray-900">
            {regionContent.title}
          </h2>

          <p className="mt-4 text-left text-lg font-semibold text-gray-900">
            {displayRange}
          </p>
          <div className="my-4 mr-16 rounded-xl bg-white">
            <div className="p-4 py-2">
              <h3 className="mb-5 text-lg font-semibold">Khoảng giá</h3>
              <Slider
                value={[priceRange.min, priceRange.max]}
                onChange={(event, newValue) => {
                  setPriceRange({ min: newValue[0], max: newValue[1] });
                }}
                valueLabelDisplay="auto" // Nhãn giá trị luôn hiện
                valueLabelFormat={(value) => `${value.toLocaleString()} đ`} // Định dạng giá trị nhãn
                min={0}
                max={10000000}
                sx={{
                  color: "#00FFFF", // Màu xanh dương cho thanh kéo
                  "& .MuiSlider-thumb": {
                    color: "#00FFFF", // Màu xanh cho các nút
                  },
                  "& .MuiSlider-track": {
                    color: "#00FFFF", // Màu xanh cho phần đã chọn
                  },
                  "& .MuiSlider-rail": {
                    color: "#bdbdbd", // Màu xám cho phần chưa chọn
                  },
                  // Tùy chỉnh cho nhãn giá trị
                  "& .MuiSlider-valueLabel": {
                    backgroundColor: "rgba(0,255,255)",
                    color: "#FFFFFF", // Màu chữ trắng
                    borderRadius: "4px",
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-5">
          <p className="text-justify text-lg">{regionContent.description}</p>
          <div className="my-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.slice(0, visibleProducts).map((item) => (
              <Item key={item._id} {...item} />
            ))}
          </div>
          {visibleProducts < filteredProducts.length && (
            <div className="mt-6 text-center">
              <button
                onClick={showMoreProducts}
                className="rounded-full bg-blue-600 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Khám phá thêm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourCategory;
