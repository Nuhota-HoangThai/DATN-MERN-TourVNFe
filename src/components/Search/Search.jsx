import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    distance: "",
    maxGroupSize: "",
  });
  const [tours, setTours] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryString = Object.keys(searchParams)
        .map(
          (key) =>
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(searchParams[key])
        )
        .join("&");
      const response = await fetch(`${BASE_URL}/searchTour?${queryString}`);
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="w-[1000px] mx-auto p-4 ">
      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-row space-x-4  ">
          <input
            type="text"
            name="name"
            placeholder="Tên tour"
            value={searchParams.name}
            onChange={handleChange}
            className=" px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 transition  flex-grow"
          />
          <input
            type="number"
            name="distance"
            placeholder="Điểm đến"
            value={searchParams.distance}
            onChange={handleChange}
            className=" px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 transition flex-grow"
          />
          <input
            type="number"
            name="maxGroupSize"
            placeholder="Số lượng khách"
            value={searchParams.maxGroupSize}
            onChange={handleChange}
            className=" px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 transition  flex-grow"
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors  duration-150 flex-shrink-0"
          >
            Tìm kiếm
          </button>
        </form>
        <div className="mt-6">
          {tours.length > 0 ? (
            <ul>
              {tours.map((tour) => (
                <li key={tour.id} className="border-b py-2">
                  {tour.name} - {tour.distance}km - Max group:{" "}
                  {tour.maxGroupSize}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500 text-center">No tours found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
