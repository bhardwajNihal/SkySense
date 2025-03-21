// Define the weatherAPI class to manage all of the api endpoints 
    // creating full url given a baseUrl and some params
    // fetching weather data, with strictly types response
    // fetching forcast data
    // for reverse geocoding - to get the city name given lat and lon
    // for searching location - to get lat and lon given a city name

import {API_CONFIGS} from './config';
import { coordinatesType, weatherDataType,geocodingResponseType,forecastDataType } from './types'

class WeatherAPI{

// method to create a full url given a base url and some params
// createUrl("/weather", { lat: 40.7128, lon: -74.0060, units: "metric" }) ==> "/weather?appid=API_KEY&lat=40.7128&lon=-74.0060&units=metric"
    private createUrl(endpoint:string, params:Record<string, string|number>){

        const searchParams = new URLSearchParams({      // inbuilt js method - takes key value pairs and creates a query string dynamically
            appid : API_CONFIGS.API_KEY,                // to be present in each url by default
            ...params                                   // spreads the params, extract each pair and adds it to the query string
        })
        return `${endpoint}?${searchParams.toString()}`     //finally returns a full fledged url ready to be fetched
    }


// method to fetch the url dynamically created
    private async fetchData<T>(url : string) : Promise<T> {     // takes a string url, returns a promise of generic type
        const response = await fetch(url);
        if(!response.ok) throw new Error(`ERROR Fetching Weather Data! :  ${response.statusText}`)
        
        return response.json();
    }


//method to fetch the weather data, by the dynamically create url
    async getCurrentWeatherData({lat,lon}:coordinatesType) : Promise<weatherDataType> {
        //first create a full url given the baseurl, and some parameter
        const url = this.createUrl(`${API_CONFIGS.BASE_URL}/weather`, {
            lat : lat.toString(),
            lon : lon.toString(),
            units : "metric"               //metric is for degree in Celsius 
        })
        return this.fetchData<weatherDataType>(url);
    }


    async getWeatherForecastData({lat,lon}:coordinatesType) : Promise<forecastDataType> {

        const url = this.createUrl(`${API_CONFIGS.BASE_URL}/forecast`,{
            lat : lat.toString(),
            lon : lon.toString(),
            units : "metric"
        })
        return this.fetchData<forecastDataType>(url);
    }

    
// method to fetch city name given its latitude and longitudes
    async getCityName({lat,lon}:coordinatesType) : Promise<geocodingResponseType> {

        const url = this.createUrl(`${API_CONFIGS.GEO}/reverse`,{
            lat :lat.toString(),
            lon : lon.toString(),
            limit : "1"                   // to return only 1st data, in case of overlapping cities
        })
        return this.fetchData<geocodingResponseType>(url);
    }


// method to fetch latitudes and longitudes, given a city name
    async getLocation(cityName:string) : Promise<geocodingResponseType> {

        const url = this.createUrl(`${API_CONFIGS.GEO}/direct`,{
            q : cityName,
            limit : "5"
        });
        return this.fetchData<geocodingResponseType>(url)
    }
}

// instantiating and exporting  a class based object, ready to be used after importing. Otherwise, needs to be instantiated wherever imported
export const weatherAPI = new WeatherAPI()


// URLSearchParams works in a way : 
    // const params = new URLSearchParams({ name: "John", age: "25" });
    // console.log(params.toString());
    // Output: "name=John&age=25"