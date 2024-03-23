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

  const [bookingData, setBookingData] = useState({
    tourId: tour?._id,
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfInfants: 0,

    // priceOfAdults: 0,
    // priceForChildren: 0,
    // priceForInfants: 0,
    // priceTotal: 0,

    surcharge: 0,
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
  }, [token, id]); // `navigate` removed from dependencies because it's not used inside useEffect

  const [totalAmount, setTotalAmount] = useState(tour?.price || 0);

  useEffect(() => {
    // Tinh tong tien
    const calculateTotalAmount = () => {
      const totalAdultAmount = tour?.price * bookingData.numberOfAdults;
      const totalChildAmount =
        tour?.priceForChildren * bookingData.numberOfChildren || 0;
      const totalInfantAmount =
        tour?.priceForInfants * bookingData.numberOfInfants || 0;

      const totalAdditionalFees =
        tour?.additionalFees * bookingData.numberOfAdults || 0;

      const calculatedTotal =
        totalAdultAmount +
        totalChildAmount +
        totalInfantAmount +
        totalAdditionalFees;

      setTotalAmount(calculatedTotal);
    };

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
          <div>
            <label
              htmlFor="numberOfAdults"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Số người lớn:
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
              Số trẻ em:
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
          <div>
            <label
              htmlFor="numberOfInfants"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Số trẻ em:
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
                Tổng giá người lớn:
              </label>
              <p className="text-lg font-semibold">
                {(tour?.price * bookingData.numberOfAdults).toLocaleString()} đ
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tổng giá khách (2-12 tuổi):
              </label>
              <p className="text-lg font-semibold">
                {(
                  tour?.priceForChildren * bookingData.numberOfChildren
                ).toLocaleString()}{" "}
                đ
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tổng giá khách (dưới 2 tuổi):
              </label>
              <p className="text-lg font-semibold">
                {(
                  tour?.priceForInfants * bookingData.numberOfInfants
                ).toLocaleString()}{" "}
                đ
              </p>
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
          </div>

          <div className="border-t-2">
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Tổng tiền:
            </label>
            <p className="text-lg font-bold text-red-600">
              {totalAmount?.toLocaleString()} đ
            </p>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Đặt tour
          </button>
        </form>
      </div>
      {/********************************************/}
    </div>
  );
};

export default Booking;
