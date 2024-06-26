import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import upload from "../../assets/img/upload.png";
import { useSelector } from "react-redux";
import axios from "axios";

import { toast } from "react-toastify";

const UpdateUser = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    image: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    cccd: "",
    dob: "",
    sex: "",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(upload); // Chỉ lưu một URL hình ảnh

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/getUserById/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        //const data = res.data;
        //console.log(data);
        setUserData(data.user);

        if (data.user.image && typeof data.user.image === "string") {
          setPreviewImage(`${BASE_URL}/${data.user.image.replace(/\\/g, "/")}`); // Update the state with a single image URL
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id, token]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    if (image) {
      formData.append("image", image); // "image" phải trùng với tên trường dùng trong backend
    }

    try {
      await axios.put(`${BASE_URL}/user/update_user/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      toast("Cập nhật thông tin người dùng thành công.");
      navigate("/profile");
    } catch (error) {
      toast("Cập nhật thông tin người dùng thất bại!!!.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-center text-lg font-medium leading-6 text-gray-900">
            Cập nhật thông tin
          </h1>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="flex justify-center">
              <label
                htmlFor="file-input"
                className="flex cursor-pointer items-center gap-4"
              >
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <input
                  onChange={handleImageChange}
                  type="file"
                  name="image"
                  id="file-input"
                  className="hidden h-12 w-12"
                />
                <svg
                  className="h-2 w-2 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 2a1 1 0 011 1v.5l-4 4l-3-3l-4 4V5h10zM4 5a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z"></path>
                </svg>
              </label>
            </div>
            <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Tên
                <input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  placeholder="Tên"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </label>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
                <input
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  placeholder="Email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </label>
              <label
                htmlFor="cccd"
                className="block text-sm font-medium text-gray-700"
              >
                Số căn cước công dân
                <input
                  id="cccd"
                  name="cccd"
                  value={userData.cccd}
                  onChange={(e) =>
                    setUserData({ ...userData, cccd: e.target.value })
                  }
                  placeholder="Số căn cước công dân"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </label>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Số điện thoại
                <input
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  placeholder="Số điện thoại"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </label>
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-700"
              >
                Giới tính
                <input
                  type="text"
                  id="sex"
                  name="sex"
                  value={userData.sex}
                  onChange={(e) =>
                    setUserData({ ...userData, sex: e.target.value })
                  }
                  placeholder="Giới tính"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </label>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Ngày sinh
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData({ ...userData, dob: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </label>
            </div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ
              <input
                id="address"
                name="address"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                placeholder="Địa chỉ"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </label>
            <button
              type="submit"
              className="mt-5 w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
