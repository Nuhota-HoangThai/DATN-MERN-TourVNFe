import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../utils/config";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN);
        if (!token) {
          setError("Authentication token is not available.");
          setLoading(false);
          navigate("/login");
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;

        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              import.meta.env.VITE_AUTH_TOKEN
            )}`,
          },
        };

        const { data } = await axios.get(
          `${BASE_URL}/user/getUserById/${userId}`,
          config
        );

        setUserProfile(data.user);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-4xl mt-20 mx-auto p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
        <h1 className="text-2xl font-semibold mb-4">Thông tin cá nhân</h1>
        <div className="space-y-3">
          <p>
            <strong className="font-medium">Tên:</strong> {userProfile.name}
          </p>
          <p>
            <strong className="font-medium">Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong className="font-medium">Số Điện Thoại:</strong>{" "}
            {userProfile.phone}
          </p>
          <p>
            <strong className="font-medium">Địa chỉ:</strong>{" "}
            {userProfile.address}
          </p>
          <p>
            <strong className="font-medium">Vai trò:</strong> {userProfile.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
