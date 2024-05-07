import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

function ProcessVNPay() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = currentUser?.token;

  useEffect(() => {
    if (searchParams?.get("vnp_ResponseCode") != "00") {
      axios
        .patch(
          `${BASE_URL}/booking/${searchParams?.get("bookingId")}/cancel`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        )
        .then(() => {
          navigate("/payment-failure");
        })
        .catch((err) => {
          console.error("Loi huy tour", err);
        });
    } else {
      navigate("/thanks");
    }
  }, []);

  return <h1>Đang xử lý...</h1>;
}

export default ProcessVNPay;
