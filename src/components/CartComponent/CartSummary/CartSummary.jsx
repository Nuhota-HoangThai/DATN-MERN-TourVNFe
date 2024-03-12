import React from "react";

const CartSummary = ({
  calculateAdultPrice,
  calculateChildrenPrice,
  calculateSubtotal,
  calculateTotal,
}) => {
  return (
    <div className="lg:w-2/3 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Tổng cộng</h2>
      <div className="flex justify-between mb-4">
        <span>Tổng giá người lớn:</span>
        <span>{calculateAdultPrice().toLocaleString()} đ</span>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <p>Tổng giá trẻ em </p>
          <p>(Trẻ em được giảm 20% giá/khách):</p>
        </div>
        <span>{calculateChildrenPrice().toLocaleString()} đ</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Tổng tiền:</span>
        <span>{calculateSubtotal().toLocaleString()} đ</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Phí phụ thu (5% tổng tiền):</span>
        <span>{(calculateSubtotal() * 0.05).toLocaleString()} đ</span>
      </div>
      <hr />
      <div className="flex justify-between mt-4">
        <span className="font-bold">Tổng thanh toán:</span>
        <span className="font-bold">{calculateTotal().toLocaleString()} đ</span>
      </div>
    </div>
  );
};

export default CartSummary;
