import { formatDateVN, formatDateVNWithTime } from "../../../utils/formatDate";
import { formatRegion } from "../../../utils/formatRegion";
import { formatPrice } from "../../../utils/formatPrice";

const TourComparison = ({ allTour = [], cartItems }) => {
  // Lọc ra các tour trong giỏ hàng từ allTour dựa vào cartItems
  const toursInCart = allTour?.filter((tour) => cartItems[tour._id]);

  // Chọn ra 2 tour đầu tiên trong giỏ hàng để so sánh
  const toursToCompare = toursInCart?.slice(0, 2);

  // Hàm tính điểm cho từng tour dựa trên các tiêu chí
  const evaluateTour = (tour) => {
    // Giả sử: 50 điểm cho giá thấp, 30 điểm cho đánh giá cao, 20 điểm cho số chỗ còn trống
    const priceScore = tour.originalPrice - tour.price;
    const ratingScore = tour.rating ? tour.rating * 10 : 0;
    const availabilityScore = tour.maxParticipants * 2;
    return priceScore + ratingScore + availabilityScore;
  };

  // Đưa ra gợi ý
  const recommendation = () => {
    if (toursToCompare.length < 2) return null;
    const scores = toursToCompare.map(evaluateTour);
    const recommendedIndex = scores[0] > scores[1] ? 0 : 1;
    return toursToCompare[recommendedIndex];
  };

  const recommendedTour = recommendation();

  return (
    <>
      {toursToCompare?.length >= 2 ? (
        <div className="compare-section mx-auto mb-6 mt-8 w-full">
          <h2 className="my-4 text-center text-xl font-bold text-gray-800">
            Bảng so sánh
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-sm uppercase leading-normal ">
                  <th className="rounded-tl-lg px-6 py-3 text-left ">
                    Thông tin
                  </th>
                  <th className="px-6 py-3 text-left">Tour 1</th>
                  <th className="rounded-tr-lg px-6 py-3 text-left">Tour 2</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light text-gray-600">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Loại tour
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left  text-black"
                    >
                      {tour?.tourType?.typeName}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Danh mục tour
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left  text-black"
                    >
                      {tour?.tourDirectory?.directoryName}
                    </td>
                  ))}
                </tr>
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
                      {tour.price !== tour.originalPrice && tour.promotion ? (
                        <>
                          <span className="text-red-600">
                            {formatPrice(tour.price)}
                          </span>{" "}
                          <span className="text-base text-gray-500 line-through">
                            {formatPrice(tour.originalPrice)}
                          </span>
                        </>
                      ) : (
                        formatPrice(tour.price)
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Giá khách (6-16 tuổi):
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {tour.priceForChildren !==
                        tour.originalPriceForChildren && tour.promotion ? (
                        <>
                          <span className="text-red-600">
                            {formatPrice(tour.priceForChildren)}
                          </span>{" "}
                          <span className="text-base text-gray-500 line-through">
                            {formatPrice(tour.originalPriceForChildren)}
                          </span>
                        </>
                      ) : (
                        formatPrice(tour.priceForChildren)
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Giá khách (3-6 tuổi):
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {tour.priceForYoungChildren !==
                        tour.originalPriceForYoungChildren && tour.promotion ? (
                        <>
                          <span className="text-red-600">
                            {formatPrice(tour.priceForYoungChildren)}
                          </span>{" "}
                          <span className="text-base text-gray-500 line-through">
                            {formatPrice(tour.originalPriceForYoungChildren)}
                          </span>
                        </>
                      ) : (
                        formatPrice(tour.priceForYoungChildren)
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-3 text-left font-bold">
                    Giá khách (dưới 3 tuổi):
                  </td>
                  {toursToCompare.map((tour) => (
                    <td
                      key={tour._id}
                      className="px-6 py-3 text-left text-black"
                    >
                      {tour.priceForInfants !== tour.originalPriceForInfants &&
                      tour.promotion ? (
                        <>
                          <span className="text-red-600">
                            {formatPrice(tour.priceForInfants)}
                          </span>{" "}
                          <span className="text-base text-gray-500 line-through">
                            {formatPrice(tour.originalPriceForInfants)}
                          </span>
                        </>
                      ) : (
                        formatPrice(tour.priceForInfants)
                      )}
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
          {/* Hiển thị gợi ý */}
          <div className="my-4 bg-sky-50 text-center">
            <h2 className="text-xl font-semibold">Gợi ý cho bạn</h2>
            <p>
              Chúng tôi khuyên bạn nên chọn{" "}
              <strong>{recommendedTour?.nameTour}</strong> vì nó có lợi thế hơn
              về giá cả và các tiện ích đi kèm.
            </p>
          </div>
        </div>
      ) : (
        <div className="my-10 text-center">
          <h2 className="text-xl font-semibold">
            {/* Không có tour nào để so sánh */}
          </h2>
        </div>
      )}
    </>
  );
};

export default TourComparison;
