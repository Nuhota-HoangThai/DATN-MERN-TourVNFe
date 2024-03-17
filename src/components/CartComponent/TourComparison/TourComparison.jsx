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

  return (
    <div className="container mx-auto my-5 p-4 px-10">
      {toursToCompare.length >= 2 && (
        <div className="compare-section mx-auto w-full">
          <h2 className="my-8 text-center text-2xl font-bold">So sánh Tour</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                  <th className="px-6 py-3 text-left ">Thông tin</th>
                  <th className="px-6 py-3 text-left">Tour 1</th>
                  <th className="px-6 py-3 text-left">Tour 2</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-gray-600">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Tên
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="px-6 py-3 text-left">
                      {tour.nameTour}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Giá
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="px-6 py-3 text-left">
                      {tour.price.toLocaleString()} đ/khách
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Ngày khởi hành
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="px-6 py-3 text-left">
                      {formatDateVN(tour.startDate)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Ngày kết thúc
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="px-6 py-3 text-left">
                      {formatDateVN(tour.endDate)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Chỗ còn trống
                  </td>
                  {toursToCompare.map((tour) => (
                    <td key={tour._id} className="px-6 py-3 text-left">
                      {tour.maxParticipants}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourComparison;
