import { useState, useEffect } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temperature: "",
    description: "",
    visibility: "",
    windSpeed: "",
    humidity: "",
  });
  const [search, setSearch] = useState("Ha Noi");

  useEffect(() => {
    const fetchWeather = async () => {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(search)}&units=metric&appid=e5a6f540e0f4451ec67c55235fc4cb28`;
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.cod !== 200) {
          throw new Error(data.message);
        }
        setWeather({
          city: data.name,
          country: data.sys.country,
          temperature: `${data.main.temp} °C`,
          description: data.weather[0].description,
          visibility: `${data.visibility}m`,
          windSpeed: `${data.wind.speed}m/s`,
          humidity: `${data.main.humidity}%`,
        });
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeather();
  }, [search]);

  return (
    <div className="w-96 rounded-xl bg-green-500 px-6 py-8 text-center text-white shadow-lg">
      <input
        type="text"
        placeholder="Nhập thành phố"
        className="mb-4 w-full rounded-lg p-2 text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h1 className="text-xl font-bold">
        {weather.city}, {weather.country}
      </h1>
      <p className="my-1 text-sm">{weather.description}</p>
      <h2 className="text-3xl font-bold">{weather.temperature}</h2>
      <div className="mt-4 flex justify-around">
        <div className="flex items-center">
          <IoEyeSharp className="mr-1 text-lg" />
          <span>{weather.visibility}</span>
        </div>
        <div className="flex items-center">
          <FaWind className="mr-1 text-lg" />
          <span>{weather.windSpeed}</span>
        </div>
        <div className="flex items-center">
          <WiHumidity className="mr-1 text-lg" />
          <span>{weather.humidity}</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
