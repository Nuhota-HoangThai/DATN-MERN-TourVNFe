import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const { tour } = location.state || {};

  return (
    <div className="mt-40">
      <h1>Thông tin tour: {tour?.nameTour}</h1>
      <p className="pl-16 text-red-500 font-medium">{tour.price} đ</p>
    </div>
  );
};

export default Booking;
