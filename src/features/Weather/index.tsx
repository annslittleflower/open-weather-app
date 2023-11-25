import { useState, useEffect } from "react";
import { Input, Button } from "@/ui";
import HistoryItem from "./components/HistoryItem";
import WeatherInfo from "./components/WeatherInfo";
import useWeatherData from "./query";

const Weather = () => {
  const [city, setCity] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get("city");
    if (cityParam) {
      setCity(cityParam);
    }
  }, []);

  const handleSearch = () => {
    if (!city) return;
    const url = new URL(window.location.href);
    url.searchParams.set("city", city);
    history.pushState({}, "", url);
  };

  return (
    <div className="m-4">
      <div className="header gap-1 flex lg:justify-start lg:pl-[25%] justify-center">
        <Input
          placeholder="enter your city"
          autoFocus
          className="text-lg min-w-0 w-[100%] lg:w-[auto]"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          className="bg-gray-300 hover:bg-gray-400 focus:bg-gray-400"
        >
          search
        </Button>
      </div>

      <div className="mb-8 flex justify-center mt-4 lg:mt-16 gap-8 lg:gap-32 max-w-[80rem] flex-col-reverse lg:flex-row">
        <WeatherInfo city={city} />
        <div className="flex gap-4   lg:max-h-[calc(80vh-16px)]  overflow-auto flex-row lg:flex-col">
          <HistoryItem city="duni" setCity={setCity} />
          <HistoryItem city="london" setCity={setCity} />
          <HistoryItem city="texas" setCity={setCity} />
          <HistoryItem city="paris" setCity={setCity} />
          <HistoryItem city="kyiv" setCity={setCity} />
        </div>
      </div>
    </div>
  );
};

export default Weather;
