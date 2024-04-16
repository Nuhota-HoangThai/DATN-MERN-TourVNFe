import { useState, useEffect } from "react";
import "../styles/weather.css";

const Forecast = () => {
  const [forecast, setForecast] = useState([]);
  const [cityDetails, setCityDetails] = useState({});
  const [city, setCity] = useState("Can Tho");
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=e5a6f540e0f4451ec67c55235fc4cb28&units=metric`,
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setForecast(data.list);
          setCityDetails({
            name: data.city.name,
            country: data.city.country,
            coordinates: data.city.coord,
            population: data.city.population,
          });
        } else {
          throw new Error(data.message || "Error fetching data");
        }
      } catch (error) {
        console.error("Failed to fetch forecast data:", error);
      }
    };

    fetchForecast();
  }, [city]);

  const handleFilter = (list) => {
    return list.filter((item) => {
      const itemDate = new Date(item.dt * 1000).toISOString().substring(0, 10);
      const itemTime = new Date(item.dt * 1000).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return itemDate === date && (!time || itemTime === time);
    });
  };

  const getWeatherIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clouds":
        return "🌥️";
      case "rain":
        return "🌧️";
      case "clear":
        return "☀️";
      default:
        return "🌍";
    }
  };

  const getBackgroundClass = (main) => {
    switch (main.toLowerCase()) {
      case "clouds":
        return "bg-cloudy";
      case "rain":
        return "bg-rainy";
      case "clear":
        return "bg-clear-sky";
      default:
        return "bg-default";
    }
  };

  return (
    <div
      className={`w-full ${forecast[0] ? getBackgroundClass(forecast[0].weather[0].main) : "bg-default"}`}
    >
      <div className="weather-container my-4">
        <div className="mb-4">
          <input
            className="input-text"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Nhập địa điểm"
          />
          <input
            className="input-text mt-2"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="input-text mt-2"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <h3 className="title">Thời tiết</h3>
          <p className="description">
            Tỉnh/Tp: <span className="value">{cityDetails.name}</span>
          </p>
          <p className="description">
            Quốc gia: <span className="value">{cityDetails.country}</span>
          </p>
          <p className="description">
            Tọa độ: Vĩ độ{" "}
            <span className="value">{cityDetails.coordinates?.lat}</span>, Kinh
            độ <span className="value">{cityDetails.coordinates?.lon}</span>
          </p>
          <p className="description">
            Dân số: <span className="value">{cityDetails.population}</span>
          </p>
        </div>
        <ul>
          {handleFilter(forecast).map((item, index) => (
            <li key={index} className="detail">
              <span className="weather-icon">
                {getWeatherIcon(item.weather[0].main)}
              </span>
              <span>
                <span className="font-bold">
                  {" "}
                  {new Date(item.dt * 1000).toLocaleTimeString()}
                </span>{" "}
                - Nhiệt độ:{" "}
                <span className="font-bold">{item.main.temp}°C</span>, Nhiệt độ
                cao nhất:{" "}
                <span className="font-bold">{item.main.temp_max}°C</span> - Thời
                tiết: <span className="font-bold">{item.weather[0].main}</span>{" "}
                - Độ ẩm:{" "}
                <span className="font-bold"> {item.main.humidity}%</span> -
                Không khí:{" "}
                <span className="font-bold">
                  {" "}
                  {item.weather[0].description}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Forecast;
