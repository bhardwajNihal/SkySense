
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


export const Dashboard = () => {

  const { coordinates, isLoading, error, getCurrentLocation } = useCurrentLocation();
  
  const currentLocationQuery = useGetCitynameQuery(coordinates);
  const currentWeatherQuery = useWeatherQuery(coordinates);
  const weatherForecastQuery = useForeCastQuery(coordinates);


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


  if(!currentWeatherQuery.data || !weatherForecastQuery.data){
    return <LoadingSkeleton />
  }

  if(currentLocationQuery.error || weatherForecastQuery.error){
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

      <div className="favourites bg-blue-950 h-16 w-full"></div>


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
     <CurrentWeatherCard 
     weatherData={currentWeatherQuery.data}
     locationData={currentLocationQuery.data}
     />
     <WeatherChartCard forecastData={weatherForecastQuery.data} />
     </div>
      <div className='lg:flex gap-4'>
      <WeatherDetails  weatherData={currentWeatherQuery.data}/>
      <WeatherForecastCard/>
      </div>

    </div>
  )
}
