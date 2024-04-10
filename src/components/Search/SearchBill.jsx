import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate
import { BASE_URL } from "../../utils/config";
import { CiSearch } from "react-icons/ci";

const SearchBillForm = () => {
  const [billId, setBillId] = useState("");
  const navigate = useNavigate(); // Sử dụng useNavigate

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const showForm = queryParams.get("showForm") === "true";

  // Hàm xử lý khi submit form
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!billId) {
      alert("Vui lòng nhập mã hóa đơn");
      return;
    }

    try {
      const { data } = await axios.get(`${BASE_URL}/bill/search/${billId}`);
      // Chuyển hướng người dùng đến trang chi tiết hóa đơn với ID hóa đơn
      navigate(`/bill-details/${billId}`, { state: { billData: data } });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="mb-16 mr-5 w-[1150px] rounded-2xl bg-white shadow-2xl">
      {showForm ? (
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap items-center justify-between gap-8 rounded-lg  px-16 py-6"
        >
          <input
            type="text"
            value={billId}
            onChange={(e) => setBillId(e.target.value)}
            placeholder="Nhập mã hóa đơn của Quý khách"
            className="flex-grow border-4 border-blue-900 px-4 py-2 text-xl  focus:outline-none"
          />
          <div className="">
            <button type="submit" className="">
              <CiSearch className="w-8  text-3xl" />
            </button>
          </div>
        </form>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default SearchBillForm;
