export const formatPrice = (price) => {
  return `${price?.toLocaleString("vi-VN", { style: "currency", currency: "VND", minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};
