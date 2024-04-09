import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function ListTourDirectories() {
  const { token } = useSelector((state) => state.user.currentUser);

  const [tourDirectories, setTourDirectories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const fetchTourDirectories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/tourDirectory/getAllTourDirectories`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      setTourDirectories(data.tourDirectories);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTourDirectories();
  }, []);

  const selectTourDirectory = (id) => {
    navigate(`/tourDirectory/${id}`);
  };

  if (isLoading) {
    return <div className="mt-5 text-center">Đang tải...</div>;
  }

  if (error) {
    return <div className="mt-5 text-center text-red-500">Lỗi: {error}</div>;
  }

  return (
    <div className="bg-sky-100">
      <div className="flex items-center justify-center py-4">
        <div className="mr-4 h-0.5 w-full rounded bg-blue-300"></div>
        <h1
          className="w-2/3 px-4 text-center text-2xl font-bold text-blue-800"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.2)" }}
        >
          Danh mục tour
        </h1>
        <div className="ml-4 h-0.5 w-full rounded bg-blue-300"></div>
      </div>
      {tourDirectories.length > 0 ? (
        <div className="mx-24 grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tourDirectories.map((tourDirectory) => (
            <div
              key={tourDirectory._id}
              className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
              onClick={() => selectTourDirectory(tourDirectory._id)}
            >
              <div
                key={tourDirectory._id}
                className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
                onClick={() => selectTourDirectory(tourDirectory._id)}
              >
                {tourDirectory.image ? (
                  <img
                    src={`${BASE_URL}/${tourDirectory.image.replace(/\\/g, "/")}`}
                    alt="tourDirectory"
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center bg-gray-100">
                    <p className="text-center text-gray-500">
                      Không có hình ảnh
                    </p>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
                  <p className="text-lg font-semibold text-white">
                    {tourDirectory.directoryName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-center text-gray-500">
          Không có danh mục tour nào!
        </p>
      )}
    </div>
  );
}

export default ListTourDirectories;
