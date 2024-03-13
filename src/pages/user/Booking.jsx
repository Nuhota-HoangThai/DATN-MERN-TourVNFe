import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const { tour } = location.state || {};

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = `0${date.getDate()}`.slice(-2); // Thêm số 0 phía trước nếu cần
    const month = `0${date.getMonth() + 1}`.slice(-2); // Thêm số 0 phía trước và +1 vì getMonth() trả về từ 0-11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Thông tin mẫu, bạn có thể thay đổi hoặc thêm thông tin từ state hoặc props
  const bookingInfo = {
    customerName: "Nguyễn Văn A",
    phoneNumber: "0123456789",
    email: "email@example.com",
    participants: 4,
    paymentMethod: "Chuyển khoản",
  };

  return (
    <div className="mx-20 mb-8 mt-28 grid grid-cols-2 gap-4 ">
      <div className="bg-slate-50 p-4">
        <h1 className="mb-4 text-xl font-bold">Thông tin tour</h1>
        <div className="overflow-x-auto ">
          <table className="w-full table-auto">
            <tbody className=" text-sm font-light">
              <tr className="  text-sm leading-normal">
                <td className="px-6 py-3 text-left font-medium">Tên tour</td>
                <td className="px-6 py-3 text-left">{tour?.nameTour}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-left  text-sm  font-medium leading-normal">
                  Giá
                </td>
                <td className="px-6 py-3 text-left">{tour?.price} đ</td>
              </tr>
              <tr className="text-sm leading-normal">
                <td className="px-6 py-3 text-left font-medium">
                  Số chỗ trống
                </td>
                <td className="px-6 py-3 text-left">{tour?.maxParticipants}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-left text-sm  font-medium leading-normal">
                  Ngày bắt đầu
                </td>
                <td className="px-6 py-3 text-left">
                  {formatDateVN(tour?.startDate)}
                </td>
              </tr>
              <tr className="text-sm leading-normal">
                <td className="px-6 py-3 text-left font-medium">
                  Ngày kết thúc
                </td>
                <td className="px-6 py-3 text-left">
                  {formatDateVN(tour?.endDate)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-slate-50 p-4">
        <h1 className="mb-4 text-xl font-bold">Thông tin đặt tour</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <tbody className="text-sm font-light">
              <tr>
                <td className="px-6 py-3 text-left font-medium">
                  Tên khách hàng
                </td>
                <td className="px-6 py-3 text-left">
                  {bookingInfo.customerName}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-left font-medium">
                  Số điện thoại
                </td>
                <td className="px-6 py-3 text-left">
                  {bookingInfo.phoneNumber}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-left font-medium">Email</td>
                <td className="px-6 py-3 text-left">{bookingInfo.email}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-left font-medium">
                  Số người tham gia
                </td>
                <td className="px-6 py-3 text-left">
                  {bookingInfo.participants}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-left font-medium">
                  Phương thức thanh toán
                </td>
                <td className="px-6 py-3 text-left">
                  {bookingInfo.paymentMethod}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booking;
