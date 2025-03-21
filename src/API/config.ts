// separating all the config variables for better code organisation and reusability

export const API_CONFIGS = {
    BASE_URL : "https://api.openweathermap.org/data/2.5",   //for weather data
    GEO : "http://api.openweathermap.org/geo/1.0",         //get latitude and longitude based on cityname, helps segregate cities with same name
    API_KEY : import.meta.env.VITE_OPENWEATHER_API_KEY,
    DEFAULT_PARAMS : {                                     //params to used in each url during fetch call
        units : "metric",                                  // metric for degree C, imperial for deg F
        appid : import.meta.env.VITE_OPENWEATHER_API_KEY,
    }
}