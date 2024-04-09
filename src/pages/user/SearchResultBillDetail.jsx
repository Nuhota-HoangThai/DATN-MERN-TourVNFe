import { useLocation } from "react-router-dom";

import { formatDateVN } from "../../utils/formatDate";
import {
  paymentStatusMapping,
  paymentStatusMethod,
  translateStatus,
} from "../../utils/formatStatus";

const SearchResultBillDetail = () => {
  const location = useLocation(); // Sử dụng useLocation để lấy trạng thái
  const billData = location.state?.billData; // Lấy dữ liệu hóa đơn từ trạng thái được chuyển qua

  // Kiểm tra nếu không có billData thì hiển thị thông báo
  if (!billData) {
    return <div>Không tìm thấy thông tin hóa đơn</div>;
  }

  return (
    <div className="mt-32">
      <h2>Thông tin hóa đơn của quý khách</h2>

      <div id="billDetailsContent" className="p-8">
        <p className="mt-5 text-lg ">Mã hóa đơn: {billData._id}</p>
        {billData && (
          <div className="">
            <div className="my-5 bg-slate-50 p-4">
              <p>Mã đặt tour: {billData.booking?._id}</p>
              <p>Tổng tiền thanh toán: {billData.totalCost}</p>
              <p>
                Trạng thái thanh toán:{" "}
                <span className="">
                  {paymentStatusMapping(billData?.paymentStatusBill)}
                </span>
              </p>
              <p className="mt-1.5 ">
                Phương thức thanh toán:{" "}
                <span className="">
                  {paymentStatusMethod(billData?.paymentMethod)}
                </span>
              </p>
              <p>Ngày Xuất: {formatDateVN(new Date(billData.issuedDate))}</p>
              <p>Ghi Chú (Công ty dành cho bạn): {billData.notesBill}</p>
            </div>{" "}
            <div className="">
              <div className="flex gap-8 bg-slate-50">
                <div className=" p-4 ">
                  <div className="font-semibold">
                    Người đặt:{" "}
                    <span className="font-normal">
                      {billData?.user?.name || "N/A"}
                    </span>
                  </div>
                  <div className="font-semibold">
                    Email:{" "}
                    <span className="font-normal">
                      {billData?.user?.email || "N/A"}
                    </span>
                  </div>
                  <div className="font-semibold">
                    Số căn cước công dân:{" "}
                    <span className="font-normal">
                      {billData?.user?.cccd || "N/A"}
                    </span>
                  </div>
                  <div className="mt-1.5 font-semibold">
                    Số điện thoại:{" "}
                    <span className="font-normal">
                      {billData?.user?.phone || "N/A"}
                    </span>
                  </div>
                  <div className="mt-1.5 font-semibold">
                    Địa chỉ người đặt:{" "}
                    <span className="font-normal">
                      {billData?.user?.address || "N/A"}
                    </span>
                  </div>
                </div>
                <div className=" p-4 ">
                  <div className="font-semibold">
                    Mã tour:{" "}
                    <span className="font-normal">
                      {billData?.tour?._id || "N/A"}
                    </span>
                  </div>
                  <div className="mt-1.5 font-semibold">
                    Tour:{" "}
                    <span className="font-normal">
                      {billData?.tour?.nameTour || "N/A"}
                    </span>
                  </div>
                  <div className="mt-1.5 font-semibold">
                    Giá khách (trên 16 tuổi):{" "}
                    <span className="font-normal">
                      {billData?.adultPriceBill?.toLocaleString() || 0} đ
                    </span>
                  </div>
                  <div className="mt-1.5 font-semibold">
                    Giá khách (6-16 tuổi):{" "}
                    <span className="font-normal">
                      {billData?.childPriceBill?.toLocaleString() || 0} đ
                    </span>
                  </div>
                  <div className="mt-1.5 font-semibold">
                    Giá khách (3-6 tuổi):{" "}
                    <span className="font-normal">
                      {billData?.youngChildrenPriceBill?.toLocaleString() || 0}{" "}
                      đ
                    </span>
                  </div>
                  <div className="mt-1.5 font-semibold">
                    Giá khách (dưới 3 tuổi):{" "}
                    <span className="font-normal">
                      {billData?.infantPriceBill?.toLocaleString() || 0} đ
                    </span>
                  </div>
                </div>
              </div>
              <div className="my-5 bg-slate-50 p-4">
                <div className="font-semibold">
                  Ngày đặt:{" "}
                  <span className="font-normal">
                    {formatDateVN(billData?.bookingDateBill) || "N/A"}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Số lượng khách (trên 16):{" "}
                  <span className="font-normal">
                    {billData?.numberOfAdultsBill || 0}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Số lượng khách (6-16 tuổi):{" "}
                  <span className="font-normal">
                    {billData?.numberOfChildrenBill || 0}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Số lượng khách (3-6 tuổi):{" "}
                  <span className="font-normal">
                    {billData?.numberOfYoungChildrenBill || 0}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Số lượng khách (dưới 3 tuổi):{" "}
                  <span className="font-normal">
                    {billData?.numberOfInfantsBill || 0}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Phí phụ thu:{" "}
                  <span className="font-normal">
                    {billData?.surchargeBill?.toLocaleString() || 0} đ
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Tổng tiền:{" "}
                  <span className="font-normal">
                    {billData?.totalCost?.toLocaleString()} đ
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Trạng thái đặt tour:{" "}
                  <span className="font-normal">
                    {translateStatus(billData?.statusBill)}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Trạng thái thanh toán:{" "}
                  <span className="font-normal">
                    {paymentStatusMapping(billData?.paymentStatusBill)}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Thông tin thêm:{" "}
                  <span className="font-normal">
                    {billData?.additionalInformation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultBillDetail;
