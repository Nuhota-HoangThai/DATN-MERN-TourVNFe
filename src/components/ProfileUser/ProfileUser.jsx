import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/getUserById`, {
          headers: { Authorization: "Bearer " + currentUser.token },
        });
        setUserProfile(data.user);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, currentUser]);

  const translateRole = (role) => {
    const roles = {
      admin: "Quản trị viên",
      customer: "Khách hàng",
      company: "Công ty",
      guide: "Hướng dẫn viên",
    };
    return roles[role] || "Không xác định";
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mx-auto mt-20 max-w-4xl p-5">
      <div className="mt-10 rounded-lg bg-white p-6 shadow-2xl">
        <h1 className="mb-4 text-2xl font-semibold">Thông tin cá nhân</h1>
        <div className="space-y-3">
          <p>
            <strong className="font-medium">Tên: </strong> {userProfile.name}
          </p>
          <p>
            <strong className="font-medium">Email: </strong> {userProfile.email}
          </p>
          <p>
            <strong className="font-medium">Số Điện Thoại: </strong>{" "}
            {userProfile.phone}
          </p>
          <p>
            <strong className="font-medium">Địa chỉ: </strong>{" "}
            {userProfile.address}
          </p>
          <p>
            <strong className="font-medium">Vai trò: </strong>
            {translateRole(userProfile.role)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
