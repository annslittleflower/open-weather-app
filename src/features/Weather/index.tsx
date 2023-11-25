import useWeatherData from "./query";
import { Input, Button } from "@/ui";
import HistoryItem from "./components/HistoryItem";
import WeatherInfo from "./components/WeatherInfo";

const Weather = () => {
  return (
    <div className="m-4">
      <div className="header gap-1 flex justify-center">
        <Input
          placeholder="enter your city"
          autoFocus
          className="text-lg min-w-0"
        />
        <Button className="bg-gray-300 hover:bg-gray-400 focus:bg-gray-400">
          search
        </Button>
      </div>

      <div className="my-8 flex justify-between">
        <WeatherInfo />
        <div className="flex gap-4 flex-col">
          <HistoryItem />
          <HistoryItem />
          <HistoryItem />
          <HistoryItem />
          <HistoryItem />
        </div>
      </div>
    </div>
  );
};

export default Weather;
