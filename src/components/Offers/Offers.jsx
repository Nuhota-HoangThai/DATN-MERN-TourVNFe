import React from "react";
import "./Offers.css";
import ChuaBa from "../../assets/img/ChuaBa.png";

const Offers = () => {
  return (
    <div className="offers mb-8 mx-24">
      <div className="offers-left">
        <h1>Ưu Đãi Dành Riêng Cho Bạn</h1>
        <p>ONLY ON BEST SELLERS PRODUCT</p>
        <button className="">Check Now</button>
      </div>
      <div>
        <img src={ChuaBa} alt="Chua Ba Chau Doc An Giang" />
      </div>
    </div>
  );
};

export default Offers;
