import { geocodingResponseType, weatherDataType } from '@/API/types'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Wind } from 'lucide-react';
import { LuDroplets } from "react-icons/lu";
import { useTheme } from '../Theme-provider';




interface currentWeatherProps {
    weatherData: weatherDataType,
    locationData?: geocodingResponseType[] | null
}

const CurrentWeatherCard = ({ weatherData, locationData }: currentWeatherProps) => {

    // console.log("weather : ", weatherData);
    // console.log("location : ", locationData);
    const {theme} = useTheme()


    return (
        <div
            className={`h-80 w-full lg:w-[100%] mb-4 bg-background ${theme==='light'?"border border-gray-300":""} rounded-lg py-8 px-4 sm:p-6`}>

            <div className="location-info w-full h-1/4">

                <h2 className='text-4xl font-semibold tracking-tighter'>{locationData && locationData[0].name}</h2>

                <div className='flex'>
                    {locationData && locationData[0].state && <span className='text-muted-foreground'>{locationData[0].state}, </span>}
                    <div className='text-muted-foreground ml-1'>{locationData && locationData[0].country && locationData[0].country}</div>
                </div>
            </div> 

            <div className='flex w-full h-3/4'>
                <div className="weather-info w-2/3 h-full pt-6">

                    <div className='sm:flex items-center gap-4'>
                        <div className="temp text-7xl">{Math.round(weatherData.main.temp)}°</div>

                        <div className='my-2 sm:my-0'>
                            <div className="feels-like text-muted-foreground">Feels like {Math.round(weatherData.main.feels_like)}°</div>
                            <div className="min-max flex gap-2">
                                <div className="min flex text-blue-600 items-center">
                                    <FaArrowDown className='text-sm' /> {Math.round(weatherData.main.temp_min)}°
                                </div>
                                <div className="max flex text-red-600 items-center">
                                    <FaArrowUp className='text-sm' /> {Math.round(weatherData.main.temp_max)}°
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex sm:mt-6 gap-4 sm:gap-8'>
                        <div className="humidity flex items-center gap-1">
                            <div className="icon text-blue-600"><LuDroplets /></div>
                            <div className="text text-xs">
                                <h2>Humidity</h2>
                                <h3 className='text-muted-foreground'>{weatherData.main.humidity}%</h3>
                            </div>
                        </div>
                        <div className="wind-speed flex items-center gap-1">
                            <div className="icon text-blue-600"><Wind /></div>
                            <div className="text text-xs">
                                <h2>Wind Speed</h2>
                                <h3 className='text-muted-foreground'>{weatherData.wind.speed}m/s</h3>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="icon flex flex-col items-center justify-center text-muted-foreground">
                    <img className=' sm:mt-[-100px]' src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt="" />
                    <div className="text text-center mt-[-25px]">{weatherData.weather[0].description}</div>
                </div>
            </div>

        </div>
    )
}

export default CurrentWeatherCard