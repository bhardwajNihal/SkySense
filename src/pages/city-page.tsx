
// Now simply extract the location data from the query params and fetch, render weather data

import CurrentWeatherCard from "@/components/cards/currentWeather";
import WeatherChartCard from "@/components/cards/weatherChart";
import WeatherDetails from "@/components/cards/weatherDetails";
import WeatherForecastCard from "@/components/cards/weatherForecast";
import { LoadingSkeleton } from "@/components/loadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useForeCastQuery, useGetCitynameQuery, useWeatherQuery } from "@/customHooks/useWeather";
import { Home, StarIcon } from "lucide-react";
import { useState } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom"


interface newFavouriteType {
  city: string | undefined;
  lat: number;
  lon: number;
  country: string | undefined;
  weather: string | undefined;
  icon: string | undefined;
  temp: number | undefined;
}

export const CityPage = () => {

  const [params] = useSearchParams();
  const [addFavouriteText, setAddFavouriteText] = useState(false);
  const navigate = useNavigate()

  const lat = parseFloat(params.get('lat') || "0");
  const lon = parseFloat(params.get('lon') || "0");

  // console.log(lat, lon);

  // simply fetch the weather and forecast data given the coordinates

  const weatherData = useWeatherQuery({ lat, lon });
  const forecastData = useForeCastQuery({ lat, lon });
  const locationData = useGetCitynameQuery({ lat, lon });

  // State initialized with favourites present in the local storage, if not then with empty array
  const [favourites, setFavourites] = useState(() => {
    const favouriteList = localStorage.getItem('favourites');
    return favouriteList ? JSON.parse(favouriteList) : []
  })

  // check if the selected city is already added to favourites
  function isFavourite() {
    return favourites.some(item => item.lat === lat && item.lon === lon)
  }

  function handleAddToFavourites() {

    const newFavourite: newFavouriteType = {
      city: weatherData.data?.name,
      lat: lat,
      lon: lon,
      country: weatherData.data?.sys.country,
      temp: weatherData.data?.main.temp,
      weather: weatherData.data?.weather[0].description,
      icon: weatherData.data?.weather[0].icon,
    }

    // check if already added to favourites
    let filteredFavourites;
    if(isFavourite()){
      filteredFavourites = favourites.filter(item => item.lat!==lat || item.lon!==lon);
    }
    else{
      filteredFavourites = [...favourites, newFavourite]
    };
    // update the state 
    setFavourites(filteredFavourites);
    // update the localStorage 
    localStorage.setItem("favourites", JSON.stringify(filteredFavourites))

  }

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
      <div 
      className="text-muted-foreground hover:bg-background cursor-pointer rounded p-1 justify-center items-center h-fit w-fit"
      onClick={() => navigate("/")}
      ><Home/></div>
      <div className='lg:flex gap-4 mb-6'>

        <div className="w-full lg:w-[45%] relative">
          <div
            onMouseEnter={() => setAddFavouriteText(true)}
            onMouseLeave={() => setAddFavouriteText(false)}
            onClick={handleAddToFavourites}>
            <StarIcon fill={isFavourite() ? "yellow" : ""} size={"30px"} className="absolute top-0 right-0 m-6 cursor-pointer" />
          </div>
          <Button className={`absolute top-13 text-muted-foreground right-5 ${addFavouriteText ? "" : "hidden"}`} variant="secondary" size={"sm"}>{(isFavourite()) ? "Remove from Favourites" : "Add to Favourites"}</Button>
          <CurrentWeatherCard
            weatherData={weatherData.data}
            locationData={locationData.data}
          />
        </div>
        <WeatherChartCard forecastData={forecastData.data} />
      </div>
      <div className='lg:flex gap-4'>
        <WeatherDetails weatherData={weatherData.data} />
        <WeatherForecastCard forecastData={forecastData.data} />
      </div>
    </div>
  )
}
