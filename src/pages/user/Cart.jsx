import {} from "react";

import TourComparison from "../../components/CartComponent/TourComparison/TourComparison";
import CartItems from "../../components/CartComponent/CartItems/CartItems";

const Cart = () => {
  return (
    <div className="my-5">
      <TourComparison />
      <CartItems />
    </div>
  );
};

export default Cart;
