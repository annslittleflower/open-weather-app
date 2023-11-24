import { useQuery } from "@tanstack/react-query";

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const useWeatherData = (city: string) => {
  const result = useQuery({
    queryKey: ["weatherData", city],
    queryFn: () =>
      fetch(
        `https://api.openweathermap.org/data/3.0/onecall?appid=${
          import.meta.env.VITE_API_URL
        }`
      )
  });

  return result;
};

export default useWeatherData;
