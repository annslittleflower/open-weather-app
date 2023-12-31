import {
  IconTemperature,
  IconSunHigh,
  IconCloud,
  IconDroplet,
  IconWind,
  IconSnowflake
} from '@tabler/icons-react';

import { WeatherData } from '../api';

type Props = {
  weatherData: WeatherData;
};

const WeatherInfo = ({
  weatherData: {
    city,
    currentTemp,
    minTemp,
    maxTemp,
    isClouds,
    isRainy,
    isSunny,
    isSnow,
    windSpeed,
  },
}: Props) => (
  <div
    className="max-w-[32rem] min-w-[16rem] w-full text-xl"
    data-testid="w-info"
  >
    <div className="text-3xl">
      weather in
      {city}
      :
    </div>
    <br />
    <br />
    <div className="flex  w-[16rem] justify-between pb-4 mb-4 gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          Current

          {' '}
          <IconTemperature />
          <div>
            {currentTemp}
            °
          </div>
        </div>
        <div>

          {isSunny || isClouds || isRainy || isSnow ? (
            <div className="flex  ml-4 gap-4">
              {isSunny && <IconSunHigh />}
              {isClouds && <IconCloud />}
              {isRainy && <IconDroplet />}
              {isSnow && <IconSnowflake />}
            </div>
          ) : null}
        </div>
      </div>
    </div>

    <div className="flex   pb-4 mb-4 gap-4">
      <div className="flex items-center">
        min/max
        <IconTemperature />
      </div>
      <div>
        {minTemp}
        ° /
        {maxTemp}
        °
      </div>
    </div>
    <div className="flex   pb-4 mb-4 gap-4">
      <div className="flex items-center">
        Wind speed
        {' '}
        <IconWind className="ml-2" />
      </div>
      <div>
        {windSpeed}
        {' '}
        km/h
      </div>
    </div>
  </div>
);

export default WeatherInfo;
