import { useEffect, useState } from "react";

import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useSelector } from "react-redux";

import TourComparison from "../../components/CartComponent/TourComparison/TourComparison";
import CartItems from "../../components/CartComponent/CartItems/CartItems";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { toast } from "react-toastify";
const Cart = () => {
  const [allTour, setAllTour] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      axios.get(`${BASE_URL}/tour/getAllTours`).then((res) => {
        setAllTour(res.data.tours);
      });

      if (currentUser) {
        axios
          .get(`${BASE_URL}/cart/getCart`, {
            headers: { Authorization: "Bearer " + currentUser.token },
          })
          .then((res) => {
            setCartItems(res.data);
          });
      }
    } else {
      toast("Bạn chưa đăng nhập.");
    }
  }, [currentUser]);

  return (
    <PerfectScrollbar>
      <div className="my-5 h-[600px] max-w-6xl">
        <TourComparison
          setAllTour={setAllTour}
          allTour={allTour}
          setCartItems={setCartItems}
          cartItems={cartItems}
        />
        <CartItems
          cartItems={cartItems}
          setCartItems={setCartItems}
          allTour={allTour}
        />
      </div>
    </PerfectScrollbar>
  );
};

export default Cart;
