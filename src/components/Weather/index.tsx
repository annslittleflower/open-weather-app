import useWeatherData from "./query";

const Weather = () => {
  const res = useWeatherData("lviv");

  console.log(res);

  return (
    <div>
      <div>awd</div>
      hello weather
    </div>
  );
};

export default Weather;
