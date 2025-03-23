import { Compass, Sunrise, Sunset } from "lucide-react"
import { useTheme } from "../Theme-provider"
import { SlSpeedometer } from "react-icons/sl"
import { weatherDataType } from "@/API/types"
import {format} from 'date-fns'

interface weatherDetailProps{
    weatherData : weatherDataType
}

const WeatherDetails = ({weatherData}:weatherDetailProps) => {

    const { theme } = useTheme()

    // const {main, wind, sys} = weatherData

    // console.log(main, wind, sys);
    
// using inbuild format method from date-fns library, to format raw number time to readable
    function formatTime(timeStamp:number){
        return format(new Date(timeStamp * 1000), "h:mm a")
    }

    function findDirection(){
        const deg = weatherData.wind.deg;

        if(deg>=337.5 || deg<22.5) return "N";
        else if(deg>=22.5 && deg<67.5) return "NE";
        else if(deg>=67.5 && deg<112.5) return "E";
        else if(deg>=112.5 && deg<157.5) return "SE";
        else if(deg>=157.5 && deg<202.5) return "S";
        else if(deg>=202.5 && deg<247.5) return "SW";
        else if(deg>=247.5 && deg<292.5) return "W";
        else return "NW";

    }

    return (
        <div
            className={`h-fit w-full flex flex-col gap-2 p-4 lg:w-1/2 mb-4 ${theme === 'light' ? "border border-gray-300" : ""} bg-background rounded-lg`}>
            <h2>Weather Details</h2>
            <div className="sm:flex gap-2">
                <div className={`sunrise border ${theme === "dark" ? "border-gray-700" : "border-gray-300"} flex items-center justify-start gap-3 pl-3 rounded-lg h-18 w-full sm:w-1/2 mb-2 sm:mb-0 `}>
                    <Sunrise className="text-yellow-600"/>
                    <div className="text-sm">
                        <h3>Sunrise</h3>
                        <h4 className="text-muted-foreground">{weatherData.sys && formatTime(weatherData.sys.sunrise)}</h4>
                    </div>
                </div>
                <div className={`sunset border ${theme === "dark" ? "border-gray-700" : "border-gray-300"} flex items-center justify-start gap-3 pl-3 rounded-lg h-18 w-full sm:w-1/2`}>
                <Sunset className="text-blue-600"/>
                    <div className="text-sm">
                        <h3>Sunset</h3>
                        <h4 className="text-muted-foreground">{weatherData.sys && formatTime(weatherData.sys.sunset)}</h4>
                    </div>  
                </div>
            </div>
            <div className="sm:flex gap-2">
                <div className={`wind-direction border ${theme === "dark" ? "border-gray-700" : "border-gray-300"} flex items-center justify-start gap-3 pl-3 rounded-lg h-18 w-full sm:w-1/2 mb-2 sm:mb-0`}>
                <Compass className="text-green-700"/>
                    <div className="text-sm">
                        <h3>Wind Direction</h3>
                        <h4 className="text-muted-foreground">{findDirection()}({weatherData.wind && weatherData.wind.deg}°)</h4>
                    </div>
                </div>
                <div className={`pressure border ${theme === "dark" ? "border-gray-700" : "border-gray-300"} flex items-center justify-start gap-3 pl-3 rounded-lg h-18 w-full sm:w-1/2`}>
                <SlSpeedometer className="text-purple-700 text-2xl"/>
                    <div className="text-sm">
                        <h3>Presure</h3>
                        <h4 className="text-muted-foreground">({weatherData.main && weatherData.main.pressure} hpa)</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WeatherDetails