
import { Button } from '@/components/ui/button'
import { SlRefresh } from "react-icons/sl";
import { useCurrentLocation } from '@/customHooks/useCurrentLocation';
import { LoadingSkeleton } from '@/components/loadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IoAlertCircleOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { useForeCastQuery, useGetCitynameQuery, useWeatherQuery } from '@/customHooks/useWeather';
import { RefreshCcw } from 'lucide-react';
import CurrentWeatherCard from '@/components/cards/currentWeather';
import WeatherChartCard from '@/components/cards/weatherChart';
import WeatherDetails from '@/components/cards/weatherDetails';
import WeatherForecastCard from '@/components/cards/weatherForecast';
import { useTheme } from '@/components/Theme-provider';
import { MdClear } from "react-icons/md";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface favouriteItemType{
  city: string | undefined;
  lat: number;
  lon: number;
  country: string | undefined;
  weather: string | undefined;
  icon: string | undefined;
  temp: number ;
}


export const Dashboard = () => {

  const { coordinates, isLoading, error, getCurrentLocation } = useCurrentLocation();
  const { theme } = useTheme();
  const currentLocationQuery = useGetCitynameQuery(coordinates);
  const currentWeatherQuery = useWeatherQuery(coordinates);
  const weatherForecastQuery = useForeCastQuery(coordinates);
  const navigate = useNavigate()

  const [favourites, setFavourites] = useState(() => {
    const favouriteList = localStorage.getItem('favourites');
    return favouriteList ? JSON.parse(favouriteList) : []
  })

  function removeFavourites(lat: number, lon: number) {
    const filteredFavs = favourites.filter((item:favouriteItemType) => item.lat !== lat && item.lon !== lon);
    setFavourites(filteredFavs);
    localStorage.setItem("favourites", JSON.stringify(filteredFavs))
  }

  function handleRefresh() {
    getCurrentLocation();
    //refetch the weather data, react-query inbuilt method 
    currentLocationQuery.refetch();
    currentWeatherQuery.refetch();
    weatherForecastQuery.refetch();
  }


  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) return (
    <div>
      <Alert>
        <IoAlertCircleOutline />
        <AlertTitle className='mb-4'>Location Error!</AlertTitle>
        <AlertDescription>
          {error}
          <Button onClick={getCurrentLocation} variant={"outline"} className='mt-4'>
            <CiLocationOn />
            <span>Turn On Location</span>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )

  // an edge case - if coordinates are not provided
  if (!coordinates) {
    return <div>
      <Alert>
        <IoAlertCircleOutline />
        <AlertTitle className='mb-4'>Location Required!</AlertTitle>
        <AlertDescription>
          <p>Please Enable Location to see you Current Weather!</p>
          <Button onClick={getCurrentLocation} variant={"outline"} className='mt-4'>
            <CiLocationOn />
            <span>Turn On Location</span>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  }


  if (!currentWeatherQuery.data || !weatherForecastQuery.data) {
    return <LoadingSkeleton />
  }

  if (currentLocationQuery.error || weatherForecastQuery.error) {
    return <div>
      <Alert>
        <IoAlertCircleOutline />
        <AlertTitle className='mb-4'>Error!</AlertTitle>
        <AlertDescription>
          <p>Error Fetching Weather Data! Please Try Again!</p>
          <Button onClick={handleRefresh} variant={"outline"} className='mt-4'>
            <RefreshCcw />
            <span>Retry</span>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  }

  return (
    <div>

      {favourites && favourites.length>0 &&<div>
        <h2 className='text-lg'>Favourites</h2>
        <div className="favourites h-24 w-full p-2 flex gap-4 overflow-hidden overflow-x-auto whitespace-nowrap scrollbar-thin">
          {favourites.map((item:favouriteItemType) =>
            <div
              key={`${item.lat}-${item.lon}`}
              className={`${theme !== 'dark' ? "border border-gray-300" : "border border-gray-800"} bg-background h-full min-w-64 rounded-lg flex cursor-pointer relative`}
              onClick={() => navigate(`/city/${item.city}?lat=${item.lat}&lon=${item.lon}`)}
            >
              <div className="temp w-2/3 h-full flex flex-col justify-center items-start pl-4">
                <h2>{item.city}<span className='text-xs text-muted-foreground'> . {item.country}</span></h2>
                <div className="temp text-3xl flex gap-2 items-center">{Math.floor(item.temp)}° <span className='text-xs text-muted-foreground'>{item.weather}</span></div>
              </div>
              <div className="weatherh-full w-1/3 flex flex-col ml-[-10px] items-center justify-center text-muted-foreground">
                <img src={`https://openweathermap.org/img/wn/${item.icon}@4x.png`} className='text-sm' alt="" />
              </div>
              <MdClear onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                removeFavourites(item.lat, item.lon);
              }}
                className='text-muted-foreground absolute top-0 right-0 text-lg m-1 cursor-pointer z-50' />
            </div>)}

        </div>
      </div>}


      <div className="current-location">

        <div className="topbar flex justify-between items center my-2">

          <h2 className='text-lg'>My Location</h2>
          <Button
            className='cursor-pointer'
            variant={"outline"}
            size={'sm'}
            onClick={handleRefresh}
            disabled={currentWeatherQuery.isFetching || weatherForecastQuery.isFetching}
          ><SlRefresh className={`${currentWeatherQuery.isFetching ? 'animate-spin' : ''}`} /></Button>
        </div>

      </div>



      <div className='lg:flex gap-4 mb-6'>
        <div className='w-full lg:w-[45%]'>
          <CurrentWeatherCard
            weatherData={currentWeatherQuery.data}
            locationData={currentLocationQuery.data}
          />
        </div>
        <WeatherChartCard forecastData={weatherForecastQuery.data} />
      </div>
      <div className='lg:flex gap-4'>
        <WeatherDetails weatherData={currentWeatherQuery.data} />
        <WeatherForecastCard forecastData={weatherForecastQuery.data} />
      </div>



    </div>
  )
}
