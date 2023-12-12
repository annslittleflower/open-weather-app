import { useState, useEffect, useCallback } from 'react';
import useWeatherData from './api';

const DELETE_TIMEOUT = 3000;

const useWeather = () => {
  const cityParam = new URLSearchParams(window.location.search).get('city');

  const [cityInputValue, setCityInputValue] = useState(cityParam || '');
  const [city, setCity] = useState(cityParam || '');

  const [searchHistory, setSearchHistory] = useState<string[]>(
    cityParam ? [cityParam] : []
  );

  const [citiesForDeletion, setCitiesForDeletion] = useState<string[]>([]);

  const {
    data: weatherData,
    isLoading,
    error: loadingError,
  } = useWeatherData(city || '');

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
      url.searchParams.delete('city');
      window.history.pushState({}, '', url);
      setCity('');
      setCityInputValue('');
    }

    if (updatedHistory.length && isCurrentCityRemoved) {
      const url = new URL(window.location.href);
      url.searchParams.set('city', updatedHistory[0]);
      window.history.pushState({}, '', url);
      setCity(updatedHistory[0]);
      setCityInputValue(updatedHistory[0]);
    }
  }, [citiesForDeletion, searchHistory, city]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleBatchDelete();
    }, DELETE_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [handleBatchDelete]);

  const handleDeleteCity = (c: string) => {
    setCitiesForDeletion((prev) => [c, ...prev]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cityInputValue) return;
    const url = new URL(window.location.href);
    url.searchParams.set('city', cityInputValue);
    window.history.pushState({}, '', url);

    setCity(cityInputValue);

    const isCurrentCityInHistory = searchHistory.includes(cityInputValue);

    if (isCurrentCityInHistory) {
      const newHistory = searchHistory.filter((c) => c !== cityInputValue);
      setSearchHistory([cityInputValue, ...newHistory]);
      setCityInputValue('');

      return;
    }

    setSearchHistory((prev) => [cityInputValue, ...prev]);
    setCityInputValue('');
  };

  const handleUndo = (c: string) => {
    setCitiesForDeletion(citiesForDeletion.filter((item) => item !== c));
  };

  const handleSetCity = (c: string) => {
    setCity(c);
    setCityInputValue(c);
  };

  return {
    weatherData,
    isLoading,
    loadingError,
    cityInputValue,
    historyToDisplay,
    citiesForDeletion,
    setCityInputValue,
    handleDeleteCity,
    handleSubmit,
    handleUndo,
    handleSetCity,
  };
};

export default useWeather;
