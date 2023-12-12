import { Input, Button, Popup } from '@/common/ui';
import HistoryItem from './components/HistoryItem';
import WeatherInfo from './components/WeatherInfo';
import useWeather from './useWeather';

const Weather = () => {
  const {
    weatherData,
    isLoading,
    loadingError,
    handleSubmit,
    handleSetCity,
    handleUndo,
    handleDeleteCity,
    citiesForDeletion,
    historyToDisplay,
    cityInputValue,
    setCityInputValue,
  } = useWeather();

  return (
    <div className="m-4">
      <form
        onSubmit={handleSubmit}
        className="header gap-1 flex  justify-center"
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
          className="bg-blue-200 hover:bg-blue-400 focus:hover:bg-blue-400"
        >
          search
        </Button>
      </form>

      <div className="mb-8 flex justify-center mt-4 lg:mt-16 gap-8 lg:gap-32  flex-col-reverse lg:flex-row">
        {weatherData ? <WeatherInfo weatherData={weatherData} /> : null}
        {isLoading ? (
          <div className="min-w-[20rem]">loading weather...</div>
        ) : null}
        {loadingError ? (
          <div className="min-w-[20rem]">{loadingError.message}</div>
        ) : null}
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
