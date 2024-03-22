import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const Booking = () => {
  const { token, id } = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const { tour } = location.state || {};
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    tourId: tour?._id,
    numberOfAdults: 1,
    numberOfChildren: 0,

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
  }, [navigate, token]);

  ////
  const [totalAmount, setTotalAmount] = useState(tour?.price || 0);
  const [adultPrice, setAdultPrice] = useState(tour?.price);
  const [childPrice, setChildPrice] = useState(tour?.priceForChildren);
  const [infantPrice, setInfantPrice] = useState(tour?.priceForInfants);
  const [surcharge, setSurcharge] = useState(tour?.additionalFees);

  useEffect(() => {
    // Updated calculation to include children, infants, and surcharges
    const calculatedTotal =
      bookingData.numberOfAdults * adultPrice +
      bookingData.numberOfChildren * childPrice +
      // Assuming you might add numberOfInfants in bookingData
      (bookingData.numberOfInfants || 0) * infantPrice +
      (surcharge || 0); // Assuming surcharge is a fixed amount; adjust logic as needed
    setTotalAmount(calculatedTotal);
  }, [
    bookingData.numberOfAdults,
    bookingData.numberOfChildren,
    bookingData.numberOfInfants, // Assuming you add this
    adultPrice,
    childPrice,
    infantPrice,
    surcharge,
  ]);

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
            totalAmount: totalAmount,
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

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return <p>Đang tải trang...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  return (
    <div className="mx-4 mb-8 mt-10 grid grid-cols-1 gap-4 md:mx-20 md:mt-28 md:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Thông tin tour
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <tbody>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Tên tour
                </th>
                <td className="px-6 py-4">{tour?.nameTour}</td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Giá
                </th>
                <td className="px-6 py-4">{tour?.price} đ</td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Số chỗ trống
                </th>
                <td className="px-6 py-4">{tour?.maxParticipants}</td>
              </tr>
              <tr className="border-b bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Ngày bắt đầu
                </th>
                <td className="px-6 py-4">{formatDateVN(tour?.startDate)}</td>
              </tr>
              <tr className="bg-white">
                <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  Ngày kết thúc
                </th>
                <td className="px-6 py-4">{formatDateVN(tour?.endDate)}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-20 p-6">
            <label className="mb-4 block text-2xl font-semibold text-gray-800">
              Chi tiết giá
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Hạng mục
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Số lượng
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Đơn giá
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4">Người lớn</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bookingData.numberOfAdults}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {adultPrice} đ
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bookingData.numberOfAdults * adultPrice} đ
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4">Trẻ em</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bookingData.numberOfChildren}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {childPrice} đ
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bookingData.numberOfChildren * childPrice} đ
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4">Trẻ sơ sinh</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {bookingData.numberOfInfants || 0}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {infantPrice} đ
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {(bookingData.numberOfInfants || 0) * infantPrice} đ
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4">Phụ phí</td>
                    <td className="whitespace-nowrap px-6 py-4">—</td>
                    <td className="whitespace-nowrap px-6 py-4">—</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {surcharge} đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">
              Tổng tiền:
            </label>
            <p className="text-lg font-semibold">{totalAmount} đ</p>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Đặt tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
