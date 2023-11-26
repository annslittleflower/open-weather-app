import { useState, useEffect, useCallback } from "react";
import { Input, Button } from "@/ui";
import HistoryItem from "./components/HistoryItem";
import WeatherInfo from "./components/WeatherInfo";
import { Popup } from "@/ui";
// import useWeatherData from "./query";

const DELETE_TIMEOUT = 3000;

const Weather = () => {
  const [city, setCity] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "London",
    "Lviv",
    "kyiv",
    "sam",
    "dean"
  ]);
  const [citiesForDeletion, setCitiesForDeletion] = useState<string[]>([]);

  const historyToDisplay = searchHistory.filter(
    (s) => !citiesForDeletion.includes(s)
  );

  console.log("historyToDisplay", historyToDisplay);

  console.log("citiesForDeletion tim", citiesForDeletion);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get("city");
    if (cityParam) {
      setCity(cityParam);
    }
  }, []);

  const handleBatchDelete = useCallback(() => {
    if (!citiesForDeletion.length) return;
    console.log("fire delete operation!");
    console.log("fire citiesForDeletion", citiesForDeletion);

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
    }

    if (updatedHistory.length && isCurrentCityRemoved) {
      const url = new URL(window.location.href);
      url.searchParams.set("city", updatedHistory[0]);
      history.pushState({}, "", url);
      setCity(updatedHistory[0]);
    }
  }, [citiesForDeletion, searchHistory, city]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleBatchDelete();
    }, DELETE_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [citiesForDeletion, handleBatchDelete]);

  const handleDeleteCity = (c: string) => {
    console.log("fff");

    setCitiesForDeletion((prev) => [c, ...prev]);
  };

  const handleSearch = () => {
    if (!city) return;
    const url = new URL(window.location.href);
    url.searchParams.set("city", city);
    history.pushState({}, "", url);

    setSearchHistory((prev) => [city, ...prev]);
  };

  const handleUndo = (c: string) => {
    setCitiesForDeletion(citiesForDeletion.filter((item) => item !== c));
  };

  return (
    <div className="m-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="header gap-1 flex lg:justify-start lg:pl-[25%] justify-center"
      >
        <Input
          placeholder="enter your city"
          autoFocus
          className="text-lg min-w-0 w-[100%] lg:w-[auto]"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 focus:bg-gray-400"
        >
          search
        </Button>
      </form>

      <div className="mb-8 flex justify-center mt-4 lg:mt-16 gap-8 lg:gap-32 max-w-[80rem] flex-col-reverse lg:flex-row">
        {city ? <WeatherInfo city={city} /> : null}
        {historyToDisplay.length ? (
          <div className="flex gap-4  lg:max-h-[calc(80vh-16px)]  overflow-auto flex-row lg:flex-col">
            {historyToDisplay.map((c) => (
              <HistoryItem
                key={c}
                city={c}
                setCity={setCity}
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
