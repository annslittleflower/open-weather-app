import { useQuery } from "@tanstack/react-query";
// old api ?
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=813de8d0c3d0e1521e5186d98b2ede55

// new api ?
// `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`

export type WeatherData = {
  city: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  isSunny: boolean;
  isRainy: boolean;
  isClouds: boolean;
  isSnow: boolean;
  windSpeed: number;
};

const useWeatherData = (city: string) => {
  const result = useQuery({
    enabled: !!city,
    queryKey: ["weatherData", city],
    queryFn: async () => {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${
          import.meta.env.VITE_API_URL
        }`
      );

      if (!geoResponse.ok) {
        throw new Error("something is wrong, try later");
      }

      const geoData = await geoResponse.json();

      const weatherData: WeatherData = {
        city,
        currentTemp: geoData.main.temp,
        minTemp: geoData.main.temp_min,
        maxTemp: geoData.main.temp_max,
        isSunny: geoData.weather[0].main === "Clear",
        isRainy: geoData.weather[0].main === "Rain",
        isClouds: geoData.weather[0].main === "Clouds",
        isSnow: geoData.weather[0].main === "Snow",
        windSpeed: geoData.wind.speed
      };

      return weatherData;
    }
  });

  return result;
};

export default useWeatherData;
