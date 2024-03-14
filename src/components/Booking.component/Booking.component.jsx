import React from "react";

const BookingForm = ({
  bookingData,
  handleChange,
  handleSubmit,
  totalAmount,
}) => {
  return (
    <div className="bg-slate-50 p-4">
      <h1 className="mb-4 text-xl font-bold">Thông tin đặt tour</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numberOfAdults">Số người lớn:</label>
          <input
            type="number"
            name="numberOfAdults"
            id="numberOfAdults"
            value={bookingData.numberOfAdults}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numberOfChildren">Số trẻ em:</label>
          <input
            type="number"
            name="numberOfChildren"
            id="numberOfChildren"
            value={bookingData.numberOfChildren}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="additionalInformation">Thông tin thêm:</label>
          <textarea
            name="additionalInformation"
            id="additionalInformation"
            value={bookingData.additionalInformation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tổng tiền:</label>
          <p>{totalAmount} đ</p>
        </div>
        <button type="submit">Đặt tour</button>
      </form>
    </div>
  );
};

export default BookingForm;
