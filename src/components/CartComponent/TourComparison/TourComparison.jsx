const TourComparison = ({ allTour = [], cartItems }) => {
  // Lọc ra các tour trong giỏ hàng từ allTour dựa vào cartItems
  const toursInCart = allTour?.filter((tour) => cartItems[tour._id]);

  // Chọn ra 2 tour đầu tiên trong giỏ hàng để so sánh
  const toursToCompare = toursInCart?.slice(0, 2);

  //định dạng ngày tháng năm
  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateVNWithTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes} ngày ${day}/${month}/${year} `;
  };

  const formatRegion = (region) => {
    switch (region) {
      case "mn":
        return "miền Nam";
      case "mb":
        return "miền Bắc";
      case "mt":
        return "miền Trung";
      default:
        return "Không xác định";
    }
  };
  return (
    <div className="container mx-auto my-8 rounded-lg bg-white p-4 px-10 shadow-lg">
      {toursToCompare.length >= 2 ? (
        <div className="compare-section mx-auto w-full">
          <h2 className="my-4 text-center text-2xl font-bold text-gray-800">
            Bảng so sánh
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-blue-100 text-sm uppercase leading-normal text-gray-600">
                  <th className="rounded-tl-lg px-6 py-3 text-left">
                    Thông tin
                  </th>
                  <th className="px-6 py-3 text-left">Tour 1</th>
                  <th className="rounded-tr-lg px-6 py-3 text-left">Tour 2</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-gray-600">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Tên
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left  text-black"
                    >
                      {tour.nameTour}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Giá
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {tour.price.toLocaleString()} đ/khách
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Khu vực
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {formatRegion(tour.regions)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Ngày khởi hành
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {formatDateVN(tour.startDate)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Ngày kết thúc
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {formatDateVN(tour.endDate)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Nơi khởi hành
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {tour.startingGate}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Thời gian tập trung
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {formatDateVNWithTime(tour.convergeTime)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Chỗ còn trống
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {tour.maxParticipants}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="my-10 text-center">
          <h2 className="text-xl font-semibold">
            Không có tour nào để so sánh
          </h2>
        </div>
      )}
    </div>
  );
};

export default TourComparison;
