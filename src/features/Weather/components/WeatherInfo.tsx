import {
  IconTemperature,
  IconSunHigh,
  IconCloud,
  IconDroplet,
  IconWind
} from "@tabler/icons-react";

type Props = {
  city: string;
};

const WeatherInfo = ({ city }: Props) => {
  return (
    <div className="max-w-[32rem] min-w-[16rem] text-xl">
      <div className="text-3xl">weather in {city}:</div>
      <br />
      <br />
      <div className="flex border-b-2 border-gray-300 justify-between pb-4 mb-4 gap-4">
        <div className="flex items-center">
          Current <IconTemperature />
        </div>
        <div>30°</div>
      </div>
      <div className="flex border-b-2 border-gray-300 justify-end pb-4 mb-4 gap-4">
        <IconSunHigh />
        <IconCloud />
        <IconDroplet />
      </div>
      <div className="flex border-b-2 border-gray-300 justify-between pb-4 mb-4 gap-4">
        <div className="flex items-center">
          min/max
          <IconTemperature />
        </div>
        <div>40°/44°</div>
      </div>
      <div className="flex border-b-2 border-gray-300 justify-between pb-4 mb-4 gap-4">
        <div className="flex items-center">
          Wind speed <IconWind className="ml-2" />
        </div>
        <div>3 km/h</div>
      </div>
    </div>
  );
};

export default WeatherInfo;
