// Defining custom hooks to fetch data

import { coordinatesType } from "@/API/types";
import { weatherAPI } from "@/API/weatherResponse";
import { useQuery } from "@tanstack/react-query";


// hook to get weather data
export function useWeatherQuery(coords:coordinatesType|null){

    return useQuery({
        queryKey : ["weather",coords],          // query key takes array of dependencies as an input, provide a unique key to each coordinate's weather data
        queryFn : () => 
            coords ? weatherAPI.getCurrentWeatherData(coords) : null,   // only to call func if coordinates are present
        enabled : !!coords,     //Ensures the query runs only when coordinates exist, !! -> converts any value to boolean value
    })
}


// hook to get forecast data 
export function useForeCastQuery(coords:coordinatesType|null){

    return useQuery({
        queryKey : ["forecast",coords],   
        queryFn : () => 
            coords ? weatherAPI.getWeatherForecastData(coords) : null,   
        enabled : !!coords,     
    })
}


// hook to get cityName given the coordinates 
export function useGetCitynameQuery(coords : coordinatesType | null) {

    return useQuery({
        queryKey : ["city",coords],
        queryFn : () =>
            coords ? weatherAPI.getCityName(coords) : null,
        enabled : !!coords,
    })
}


// hook to get coordinates given a city name
export function useGetCoordinatesQuery(cityName: string){

    return useQuery({
        queryKey : ['coordinates', cityName],
        queryFn : () => 
            cityName ? weatherAPI.getCoordinates(cityName) : null,
        enabled : cityName.length >=3
    })
}