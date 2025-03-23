
// Now simply extract the location data from the query params and fetch, render weather data

import CurrentWeatherCard from "@/components/cards/currentWeather";
import WeatherChartCard from "@/components/cards/weatherChart";
import WeatherDetails from "@/components/cards/weatherDetails";
import WeatherForecastCard from "@/components/cards/weatherForecast";
import { LoadingSkeleton } from "@/components/loadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForeCastQuery, useGetCitynameQuery, useWeatherQuery } from "@/customHooks/useWeather";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom"

export const CityPage = () => {

  const [params] = useSearchParams();

  const lat = parseFloat(params.get('lat') || "0");
  const lon = parseFloat(params.get('lon') || "0");

  console.log(lat, lon);
  
  // simply fetch the weather and forecast data given the coordinates

  const weatherData = useWeatherQuery({lat,lon});
  const forecastData = useForeCastQuery({lat,lon});
  const locationData = useGetCitynameQuery({lat,lon});
  

  if (!weatherData.data || !forecastData.data) {
    return <LoadingSkeleton />
  }

  if (weatherData.error || forecastData.error) {
    return <div>
      <Alert>
        <IoAlertCircleOutline />
        <AlertTitle className='mb-4'>Error!</AlertTitle>
        <AlertDescription>
          <p>Error Fetching Weather Data! Please Try Again!</p>
        </AlertDescription>
      </Alert>
    </div>
  }


  return (
    <div>
      <div className='lg:flex gap-4 mb-6'>
        <CurrentWeatherCard
          weatherData={weatherData.data}
          locationData={locationData.data}
        />
        <WeatherChartCard forecastData={forecastData.data} />
      </div>
      <div className='lg:flex gap-4'>
        <WeatherDetails weatherData={weatherData.data} />
        <WeatherForecastCard forecastData={forecastData.data} />
      </div>
    </div>
  )
}
