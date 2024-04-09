import { useState } from "react";
import { BASE_URL } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SearchForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nameTour: "",
    startDate: "",
    price: "",
    maxParticipants: "",
  });

  // Định nghĩa các khoảng giá
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
    const { nameTour, startDate, price, maxParticipants } = formData; // Destructuring để lấy giá trị từ formData

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
    <div className=" mb-8 flex justify-center rounded-2xl bg-white shadow-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap items-center justify-between gap-8 rounded-lg  px-16 py-12"
      >
        <div className="flex min-w-[160px] flex-1 flex-col rounded-lg border-2 border-blue-900 px-2 py-1">
          <label htmlFor="nameTour" className="mb-2 border-b-2 font-bold">
            Tên tour
          </label>
          <input
            type="text"
            id="nameTour"
            name="nameTour"
            value={formData.nameTour}
            onChange={handleChange}
            placeholder="Chuyến du lịch"
            className="w-full px-2 py-1"
          />
        </div>

        <div className="flex min-w-[160px] flex-1 flex-col rounded-lg border-2 border-blue-900 px-2 py-1">
          <label htmlFor="startDate" className="mb-2 border-b-2 font-bold">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-2 py-1"
          />
        </div>

        <div className="flex min-w-[160px] flex-1 flex-col rounded-lg border-2 border-blue-900 px-2 py-1">
          <label htmlFor="price" className="mb-2 border-b-2 font-bold">
            Khoảng giá
          </label>
          <select
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-2 py-1"
          >
            <option value="">Chọn khoảng giá</option>
            <option value="duoi-1000000">Dưới 1.000.000</option>
            <option value="1000000-5000000">1.000.000 - 5.000.000</option>
            <option value="5000000-10000000">5.000.000 - 10.000.000</option>
            <option value="tren-10000000">Trên 10.000.000</option>
          </select>
        </div>

        <div className="flex min-w-[160px] flex-1 flex-col rounded-lg  border-2 border-blue-900 px-2 py-1">
          <label
            htmlFor="maxParticipants"
            className="mb-2 border-b-2 font-bold"
          >
            Số người tối đa
          </label>
          <input
            type="number"
            id="maxParticipants"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            placeholder="Số chỗ muốn đặt"
            className="w-full px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="min-w-[160px] rounded-lg border bg-blue-900 px-12 py-6 text-lg font-bold text-white"
        >
          Tìm kiếm
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
