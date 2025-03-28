import React from "react";
import { useState } from "react";
import axios from "axios";

export const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_KEY
        }`
      );
      setWeather(response);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] p-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🌤️ Weather App
        </h1>

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#facc15] transition"
        />

        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={getData}
            className="bg-[#facc15] text-gray-900 px-5 py-2.5 rounded-md font-semibold hover:bg-[#eab308] transition duration-200"
          >
            Search
          </button>

          <button
            onClick={() => setCity("")}
            className="bg-gray-400 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-gray-500 transition duration-200"
          >
            Reset
          </button>
        </div>

        {weather && (
          <div className="mt-6 bg-[#f8fafc] p-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-[#1e3a8a]">
              {weather.data.name}
            </h2>
            <p className="text-gray-600 text-lg">
              ☁️ {weather.data.weather[0].description}
            </p>
            <p className="text-gray-700 text-lg mt-2">
              🌡 Temperature:{" "}
              <span className="text-[#facc15] font-bold">
                {(weather.data.main.temp - 273.15).toFixed(2)}°C
              </span>
            </p>
            <p className="text-gray-700 text-lg">
              💨 Wind Speed:{" "}
              <span className="text-[#2563eb] font-bold">
                {weather.data.wind.speed} m/s
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
