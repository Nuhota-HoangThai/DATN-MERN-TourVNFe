import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

import TourBooking from "../../components/BookingComponent/TourBooking";

import { formatPrice } from "../../utils/formatPrice";

import { toast } from "react-toastify";

const Booking = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;

  const location = useLocation();
  const { tour } = location.state || {};
  const navigate = useNavigate();
  console.log(tour);
  const [totalAmount, setTotalAmount] = useState(tour?.price || 0);

  const [surcharge, setTotalAdditionalFees] = useState(
    tour?.additionalFees || 0,
  );
  const [bookingData, setBookingData] = useState({
    tourId: tour?._id,
    numberOfAdults: 1,
    numberOfChildren: 0,
    numberOfYoungChildren: 0,
    singleRoomNumber: 0,

    priceOfAdults: 0 || tour.price,
    priceForChildren: 0 || tour.priceForChildren,
    priceForYoungChildren: 0 || tour.priceForYoungChildren,
    surcharge: 0 || tour.additionalFees,
    additionalInformation: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    address: "",
    cccd: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      const userId = currentUser?.id;
      if (!userId) {
        toast("ID người dùng bị thiếu");
        return;
      }
      try {
        const { data } = await axios.get(
          `${BASE_URL}/user/getUserById/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );

        setUserProfile(data.user);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  // Tinh phi phu thu
  const calculateTotalFees = () => {
    const totalAdditionalFees =
      tour?.additionalFees * bookingData.singleRoomNumber || 0;

    setTotalAdditionalFees(totalAdditionalFees);
  };

  // Tinh tong tien
  const calculateTotalAmount = () => {
    const totalAdultAmount = tour?.price * bookingData.numberOfAdults;
    const totalChildAmount =
      tour?.priceForChildren * bookingData.numberOfChildren || 0;

    const totalYoungChildren =
      tour?.priceForYoungChildren * bookingData.numberOfYoungChildren || 0;

    const totalAdditionalFees =
      tour?.additionalFees * bookingData.singleRoomNumber || 0;

    const calculatedTotal =
      totalAdultAmount +
      totalChildAmount +
      totalYoungChildren +
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
      toast("Vui lòng đăng nhập để đặt tour!!!");
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
        setError(null);
        toast("Đặt tour thành công!");
        navigate("/thanks");
      } catch (error) {
        setError(error);
        toast(error);
      }
    }
  };

  const addOrderVNPay = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/booking/payment_vnpay_url`,
        { ...bookingData, totalAmount, surcharge, bookingDate: new Date() },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (res.data.code === "00") {
        window.location.href = res.data.vnpUrl; // Chuyển hướng để thanh toán
      } else {
        toast("Không thể tạo URL thanh toán, vui lòng thử lại");
      }
    } catch (error) {
      setError(error);
      toast("Lỗi khi tạo đơn hàng: " + error);
    }
  };

  if (loading) {
    return <p>Đang tải trang...</p>;
  }

  return (
    <div className="mx-4 my-8 grid grid-cols-1 gap-4 md:mx-20  md:grid-cols-2">
      <TourBooking />
      {/********************************************/}
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Thông tin đặt tour
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                htmlFor=""
                className="mb-2  text-sm font-medium text-gray-900"
              >
                Người đặt:
              </label>
              <input
                type="text"
                value={userProfile.name}
                onChange={handleChange}
                required
                className=" w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="mb-2  text-sm font-medium text-gray-900"
              >
                Địa chỉ:
              </label>
              <input
                type="text"
                value={userProfile.address}
                onChange={handleChange}
                required
                className=" w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {" "}
            <div>
              <label
                htmlFor=""
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Căn cước công dân:
              </label>
              <input
                type="number"
                value={userProfile.cccd}
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
              {tour.tourType._id === "661689edb0caba81f9b831c0" ? (
                <p className="text-red-500">
                  Tour này không dành cho người dưới 16 tuổi
                </p>
              ) : (
                <>
                  <input
                    type="number"
                    name="numberOfChildren"
                    id="numberOfChildren"
                    value={bookingData.numberOfChildren}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {" "}
              <label
                htmlFor="numberOfAdults"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Số khách dưới 6 tuổi:
              </label>
              {tour.tourType._id === "661689edb0caba81f9b831c0" ||
              tour.tourType._id === "661689fab0caba81f9b831c6" ? (
                <p className="text-red-500">
                  Tour này không dành cho người dưới 6 tuổi
                </p>
              ) : (
                <>
                  <input
                    type="number"
                    name="numberOfYoungChildren"
                    id="numberOfYoungChildren"
                    value={bookingData.numberOfYoungChildren}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  />
                </>
              )}
            </div>

            <div>
              <label
                htmlFor="singleRoomNumber"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Số lượng phòng đơn:
              </label>
              <input
                type="number"
                name="singleRoomNumber"
                id="singleRoomNumber"
                value={bookingData.singleRoomNumber}
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
                {formatPrice(tour?.price * bookingData.numberOfAdults)}
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tổng giá khách (6-16 tuổi):
              </label>
              {tour.tourType._id === "661689edb0caba81f9b831c0" ? (
                <p className="text-red-500">Không dành cho độ tuổi này</p>
              ) : (
                <p className="text-lg font-semibold">
                  {formatPrice(
                    tour?.priceForChildren * bookingData.numberOfChildren,
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Tổng giá khách dưới 6 tuổi:
              </label>
              {tour.tourType._id === "661689edb0caba81f9b831c0" ||
              tour.tourType._id === "661689fab0caba81f9b831c6" ? (
                <p className="text-red-500">
                  Tour này không dành cho độ tuổi này
                </p>
              ) : (
                <p className="text-lg font-semibold">
                  {formatPrice(
                    tour?.priceForYoungChildren *
                      bookingData.numberOfYoungChildren,
                  ) || 0}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-900">
                Phí phụ thu (phòng đơn):
              </label>
              <p className="text-lg font-semibold">
                {formatPrice(
                  tour?.additionalFees * bookingData.singleRoomNumber,
                )}
              </p>
            </div>
          </div>

          <div className="flex justify-between border-t-2">
            <p className="mb-2 block text-lg font-medium text-gray-900">
              Tổng tiền:
            </p>
            <p className="text-xl font-bold text-red-600">
              {formatPrice(totalAmount)}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Đặt tour
            </button>
            <button
              type="button"
              onClick={addOrderVNPay}
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
