import {} from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tours from "./pages/user/Tours";
import TourCategory from "./pages/user/TourCategory";
import TourDetail from "./pages/user/TourDetail";
import Cart from "./pages/user/Cart";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import Footer from "./components/Footer/Footer";

//import banner
import mienbac from "./assets/img/banner_mb.png";
import mientrung from "./assets/img/banner_home.png";
import miennam from "./assets/img/banner_biendao.png";
import Thanks from "./pages/user/Thanks";
import UserOrder from "./components/UserOrder/UserOrder";
import ProfileUser from "./components/ProfileUser/ProfileUser";
import Booking from "./pages/user/Booking";
//import TourComparison from "./components/CartComponent/TourComparison/TourComparison";
import CartItems from "./components/CartComponent/CartItems/CartItems";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Tours />} />
          <Route
            path="/mn"
            element={<TourCategory banner={miennam} regions="mn" />}
          />
          <Route
            path="/mt"
            element={<TourCategory banner={mientrung} regions="mt" />}
          />
          <Route
            path="/mb"
            element={<TourCategory banner={mienbac} regions="mb" />}
          />
          <Route path="/tour/:tourId" element={<TourDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route
            path="/userOrder"
            element={
              <Profile>
                <UserOrder />
              </Profile>
            }
          />
          <Route
            path="/profile"
            element={
              <Profile>
                <ProfileUser />
              </Profile>
            }
          />
          <Route
            path="/comparison"
            element={
              <Profile>
                <CartItems />
              </Profile>
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
