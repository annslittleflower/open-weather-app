import { useState, useEffect, useCallback } from "react";
import { Input, Button } from "@/ui";
import HistoryItem from "./components/HistoryItem";
import WeatherInfo from "./components/WeatherInfo";
import { Popup } from "@/ui";
import useWeatherData from "./api";

const DELETE_TIMEOUT = 3000;

const Weather = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get("city");

  const [cityInputValue, setCityInputValue] = useState(cityParam || "");
  const [city, setCity] = useState("");

  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const { data: weatherData, isError } = useWeatherData(city || "");

  console.log("weatherData", weatherData);
  console.log("isError", isError);

  const [citiesForDeletion, setCitiesForDeletion] = useState<string[]>([]);

  const historyToDisplay = searchHistory.filter(
    (s) => !citiesForDeletion.includes(s)
  );

  const handleBatchDelete = useCallback(() => {
    if (!citiesForDeletion.length) return;

    const updatedHistory = searchHistory.filter(
      (c) => !citiesForDeletion.includes(c)
    );

    const isCurrentCityRemoved = citiesForDeletion.includes(city);

    setSearchHistory(updatedHistory);
    setCitiesForDeletion([]);

    if (isCurrentCityRemoved) {
      const url = new URL(window.location.href);
      url.searchParams.delete("city");
      history.pushState({}, "", url);
      setCity("");
      setCityInputValue("");
    }

    if (updatedHistory.length && isCurrentCityRemoved) {
      const url = new URL(window.location.href);
      url.searchParams.set("city", updatedHistory[0]);
      history.pushState({}, "", url);
      setCity(updatedHistory[0]);
      setCityInputValue(updatedHistory[0]);
    }
  }, [citiesForDeletion, searchHistory, city]);

  useEffect(() => {
    if (cityParam) {
      console.log("i am called");
      setCity(cityParam);
      setSearchHistory([cityParam]);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleBatchDelete();
    }, DELETE_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [citiesForDeletion, handleBatchDelete]);

  const handleDeleteCity = (c: string) => {
    setCitiesForDeletion((prev) => [c, ...prev]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cityInputValue) return;
    const url = new URL(window.location.href);
    url.searchParams.set("city", cityInputValue);
    history.pushState({}, "", url);

    setCity(cityInputValue);

    setSearchHistory((prev) => [cityInputValue, ...prev]);
  };

  const handleUndo = (c: string) => {
    setCitiesForDeletion(citiesForDeletion.filter((item) => item !== c));
  };

  const handleSetCity = (c: string) => {
    setCity(c);
    setCityInputValue(c);
  };

  return (
    <div className="m-4">
      <form
        onSubmit={handleSubmit}
        className="header gap-1 flex lg:justify-start lg:pl-[25%] justify-center"
      >
        <Input
          placeholder="enter your city"
          autoFocus
          className="text-lg min-w-0 w-[100%] lg:w-[auto]"
          value={cityInputValue}
          onChange={(e) => setCityInputValue(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 focus:bg-gray-400"
        >
          search
        </Button>
      </form>

      <div className="mb-8 flex justify-center mt-4 lg:mt-16 gap-8 lg:gap-32 max-w-[80rem] flex-col-reverse lg:flex-row">
        {weatherData ? <WeatherInfo weatherData={weatherData} /> : null}
        {historyToDisplay.length ? (
          <div className="flex gap-4  lg:max-h-[calc(80vh-16px)]  overflow-auto flex-row lg:flex-col">
            {historyToDisplay.map((c) => (
              <HistoryItem
                key={c}
                city={c}
                setCity={handleSetCity}
                deleteCity={handleDeleteCity}
              />
            ))}
          </div>
        ) : null}
      </div>
      <Popup citiesForDeletion={citiesForDeletion} handleUndo={handleUndo} />
    </div>
  );
};

export default Weather;
