import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

import TourBooking from "../../components/BookingComponent/TourBooking";

const Booking = () => {
  const { token, id } = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const { tour } = location.state || {};
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(tour?.price || 0);

  const [surcharge, setTotalAdditionalFees] = useState(
    tour?.additionalFees || 0,
  );
  const [bookingData, setBookingData] = useState({
    tourId: tour?._id,
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfYoungChildren: 0,
    numberOfInfants: 0,

    priceOfAdults: 0 || tour.price,
    priceForChildren: 0 || tour.priceForChildren,
    priceForInfants: 0 || tour.priceForInfants,
    priceForYoungChildren: 0 || tour.priceForYoungChildren,

    additionalInformation: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/getUserById/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setUserProfile(data.user);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, id]);

  // Tinh phi phu thu
  const calculateTotalFees = () => {
    const totalAdditionalFees =
      tour?.additionalFees * bookingData.numberOfAdults || 0;

    setTotalAdditionalFees(totalAdditionalFees);
  };

  // Tinh tong tien
  const calculateTotalAmount = () => {
    const totalAdultAmount = tour?.price * bookingData.numberOfAdults;
    const totalChildAmount =
      tour?.priceForChildren * bookingData.numberOfChildren || 0;

    const totalYoungChildren =
      tour?.priceForYoungChildren * bookingData.numberOfYoungChildren || 0;

    const totalInfantAmount =
      tour?.priceForInfants * bookingData.numberOfInfants || 0;

    const totalAdditionalFees =
      tour?.additionalFees * bookingData.numberOfAdults || 0;

    const calculatedTotal =
      totalAdultAmount +
      totalChildAmount +
      totalYoungChildren +
      totalInfantAmount +
      totalAdditionalFees;

    setTotalAmount(calculatedTotal);
  };

  useEffect(() => {
    calculateTotalFees();
    calculateTotalAmount();
  }, [bookingData, tour]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Vui lòng đăng nhập để đặt tour!!!");
    } else {
      try {
        await axios.post(
          `${BASE_URL}/booking/createBooking`,
          {
            ...bookingData,
            totalAmount,
            surcharge,
            bookingDate: new Date(),
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );
        alert("Đặt tour thành công!");
        navigate("/thanks");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addOrderVNPay = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/booking/payment_vnpay_url`,
        { totalAmount, surcharge },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      window.location.href = res.data.vnpUrl;
      return true;
    } catch (error) {
      return false;
    }
  };

  if (loading) {
    return <p>Đang tải trang...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  return (
    <div className="mx-4 mb-8 mt-10 grid grid-cols-1 gap-4 md:mx-20 md:mt-28 md:grid-cols-2">
      <TourBooking />
      {/********************************************/}
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Thông tin đặt tour
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor=""
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Người đặt:
            </label>
            <input
              type="text"
              value={userProfile.name}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Địa chỉ:
            </label>
            <input
              type="text"
              value={userProfile.address}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Số điện thoại:
            </label>
            <input
              type="tel"
              value={userProfile.phone}
              onChange={handleChange}
              required
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="numberOfAdults"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Số người lớn (trên 16 tuổi):
              </label>
              <input
                type="number"
                name="numberOfAdults"
                id="numberOfAdults"
                value={bookingData.numberOfAdults}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="numberOfChildren"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Số khách (6-16 tuổi):
              </label>
              <input
                type="number"
                name="numberOfChildren"
                id="numberOfChildren"
                value={bookingData.numberOfChildren}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="numberOfAdults"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Số khách (3-6 tuổi):
              </label>
              <input
                type="number"
                name="numberOfYoungChildren"
                id="numberOfYoungChildren"
                value={bookingData.numberOfYoungChildren}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="numberOfInfants"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Số khách (dưới 3 tuổi):
              </label>
              <input
                type="number"
                name="numberOfInfants"
                id="numberOfInfants"
                value={bookingData.numberOfInfants}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="additionalInformation"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Thông tin thêm:
            </label>
            <textarea
              name="additionalInformation"
              id="additionalInformation"
              value={bookingData.additionalInformation}
              onChange={handleChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tổng giá khách (trên 16 tuổi):
              </label>
              <p className="text-lg font-semibold">
                {(tour?.price * bookingData.numberOfAdults).toLocaleString()} đ
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tổng giá khách (6-16 tuổi):
              </label>
              <p className="text-lg font-semibold">
                {(
                  tour?.priceForChildren * bookingData.numberOfChildren
                ).toLocaleString()}
                đ
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tổng giá khách (3-6 tuổi):
              </label>
              <p className="text-lg font-semibold">
                {(
                  tour?.priceForYoungChildren *
                  bookingData.numberOfYoungChildren
                ).toLocaleString()}
                đ
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tổng giá khách (dưới 3 tuổi):
              </label>
              <p className="text-lg font-semibold">
                {(
                  tour?.priceForInfants * bookingData.numberOfInfants
                ).toLocaleString()}
                đ
              </p>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Phí phụ thu:
            </label>
            <p className="text-lg font-semibold">
              {(
                tour?.additionalFees * bookingData.numberOfAdults
              ).toLocaleString()}
              đ
            </p>
          </div>
          <div className="flex justify-between border-t-2">
            <p className="mb-2 block text-lg font-medium text-gray-900">
              Tổng tiền:
            </p>
            <p className="text-xl font-bold text-red-600">
              {totalAmount?.toLocaleString()} đ
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button" // Chú ý sử dụng type="button" để ngăn chặn nút này submit form
              onClick={handleSubmit} // Xử lý submit form để thanh toán bình thường
              className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Đặt tour
            </button>
            <button
              type="button" // Sử dụng onClick để gọi hàm thanh toán qua VNPay
              onClick={addOrderVNPay} // Gọi hàm addOrderVNPay khi nút này được nhấn
              className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Thanh toán VNPAY
            </button>
          </div>
        </form>
      </div>
      {/********************************************/}
    </div>
  );
};

export default Booking;
