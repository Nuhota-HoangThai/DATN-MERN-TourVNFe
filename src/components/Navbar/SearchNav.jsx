import { useState } from "react";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { IoSearch } from "react-icons/io5";
import "./search-nav.css";
function SearchForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameTour: "",
    startDate: "",
    price: "",
    maxParticipants: "",
  });

  //Định nghĩa các khoảng giá
  const priceRanges = {
    "duoi-1000000": { min: 0, max: 999999 },
    "1000000-5000000": { min: 1000000, max: 4999999 },
    "5000000-10000000": { min: 5000000, max: 9999999 },
    "tren-10000000": { min: 10000000, max: Number.MAX_SAFE_INTEGER },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nameTour, startDate, price, maxParticipants } = formData;

    // Kiểm tra xem người dùng đã nhập tên tour hay chưa
    if (!nameTour.trim()) {
      // trim() được sử dụng để loại bỏ khoảng trắng thừa
      alert("Vui lòng điền tên tour");
      return;
    }

    // Lấy khoảng giá từ priceRanges
    const priceRange = priceRanges[price] || {};

    try {
      const result = await axios.get(
        `${BASE_URL}/tour/search?nameTour=${encodeURIComponent(nameTour)}&startDate=${startDate}&priceMin=${priceRange.min || ""}&priceMax=${priceRange.max || ""}&maxParticipants=${maxParticipants}`,
      );
      navigate("/search", { state: { searchResults: result.data.tours } });
    } catch (error) {
      console.error(error);
      alert("Không có tour phù hợp!!!!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="animated-border flex w-full items-center justify-between"
    >
      <div className="flex w-full items-center">
        <input
          type="text"
          id="nameTour"
          name="nameTour"
          value={formData.nameTour}
          onChange={handleChange}
          placeholder="Tìm chuyến du lịch...."
          className="w-full border-none px-4 py-2 focus:outline-none"
        />
        <button type="submit" className=" p-2 text-lg text-blue-900">
          <IoSearch />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
