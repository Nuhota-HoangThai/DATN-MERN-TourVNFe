import React from "react";

const CartSummary = ({
  calculateAdultPrice,
  calculateChildrenPrice,
  calculateSubtotal,
  calculateTotal,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg lg:w-2/3">
      <h2 className="mb-4 text-xl font-semibold">Tổng cộng</h2>
      <div className="mb-4 flex justify-between">
        <span>Tổng giá người lớn:</span>
        <span>{calculateAdultPrice().toLocaleString()} đ</span>
      </div>
      <div className="mb-4 flex justify-between">
        <div>
          <p>Tổng giá trẻ em </p>
          <p>(Trẻ em được giảm 20% giá/khách):</p>
        </div>
        <span>{calculateChildrenPrice().toLocaleString()} đ</span>
      </div>
      <div className="mb-4 flex justify-between">
        <span>Tổng tiền:</span>
        <span>{calculateSubtotal().toLocaleString()} đ</span>
      </div>
      <div className="mb-4 flex justify-between">
        <span>Phí phụ thu (5% tổng tiền):</span>
        <span>{(calculateSubtotal() * 0.05).toLocaleString()} đ</span>
      </div>
      <hr />
      <div className="mt-4 flex justify-between">
        <span className="font-bold">Tổng thanh toán:</span>
        <span className="font-bold">{calculateTotal().toLocaleString()} đ</span>
      </div>
    </div>
  );
};

export default CartSummary;
