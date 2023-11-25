import { useQuery } from "@tanstack/react-query";

// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=813de8d0c3d0e1521e5186d98b2ede55

// standard, metric and imperial units are available
// &units={units}

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// Snapshot the previous value
// const previousTodos = queryClient.getQueryData(todoListOptions.queryKey)

// queryClient.ensureQueryData
// ensureQueryData is an asynchronous function that can be used to get an existing query's cached data. If the query does not exist, queryClient.fetchQuery will be called and its results returned.

// tsx
// const data = await queryClient.ensureQueryData({ queryKey, queryFn })

// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

// https://openweathermap.org/api/geocoding-api

const useWeatherData = (city: string) => {
  const result = useQuery({
    queryKey: ["weatherData", city],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?appid=${
          import.meta.env.VITE_API_URL
        }`
      );
      if (!response.ok) {
        throw new Error("something is wrong, try later");
      }
      return response.json();
    }
  });

  return result;
};

export default useWeatherData;
