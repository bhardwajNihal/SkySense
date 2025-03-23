// Component consisting weather details of upcoming 5 days 

import { forecastDataType, weatherConditionType } from "@/API/types"
import { format } from "date-fns"
import { useTheme } from "../Theme-provider";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { LuDroplets, LuWind } from "react-icons/lu";

interface WeatherForecastProps {
    forecastData: forecastDataType
}

interface forecastType {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: weatherConditionType;
}

const WeatherForecastCard = ({ forecastData }: WeatherForecastProps) => {

    // extract the daily forecast data, out of 3hourly data
    const forecasts = forecastData.list.reduce((acc, forecast) => {

        const dateKey = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");   //format the date in form - yyyy-MM-dd

        // check if accumulator already have the data
        // if so update the min and max temp by comparing to previous data
        // if not , add a new entry to the accumulator
        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: forecast.dt,
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0]
            }
        } else {
            acc[dateKey].temp_min = Math.min(acc[dateKey].temp_min, forecast.main.temp_min);
            acc[dateKey].temp_max = Math.max(acc[dateKey].temp_max, forecast.main.temp_max)
        }

        return acc;
    }, {} as Record<string, forecastType>)      //This line is the initial value we pass to the reduce() function. It sets up an empty object ({}) and tells TypeScript what type of data we expect inside it.


    // forecasts data is in the form of object, we need to convert it to array in order to map it 
    const forecastDataArray = Object.values(forecasts).slice(1, 6);      // 1 value excluded as it consists todays data only
    const { theme } = useTheme()
    // console.log(forecastDataArray);


    return (
        <div
            className={`h-auto w-full lg:w-1/2 ${theme === "dark" ? "" : "border border-gray-300"} rounded-lg flex flex-col gap-2 p-4 bg-background `}>

            <h2>5-Day Forecast</h2>

            {forecastDataArray.map((data) => (
                <div key={data.date} className={`card h-fit sm:flex justify-between items-center ${theme === "dark" ? "border border-gray-700" : "border border-gray-300"} text-xs sm:text-sm p-2 rounded-lg`}>
                    <div className="flex sm:flex-col gap-2">
                        <p>{format(new Date(data.date * 1000), "EEE, MMM d")}</p>
                        <p className="text-muted-foreground">{data.weather.description}</p>
                    </div>

                    <div className="flex mt-4 sm:mt-0 justify-between gap-10 ">
                        <div className="flex gap-4">
                            <span className="text-blue-600 flex items-center"><FaArrowDown />{Math.round(data.temp_min)}°</span>
                            <span className="text-red-600 flex items-center"><FaArrowUp />{Math.round(data.temp_max)}°</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1"><LuDroplets className="text-blue-600" />{data.humidity}%</span>
                            <span className="flex items-center gap-1"><LuWind className="text-blue-600" />{data.wind}m/s</span>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default WeatherForecastCard