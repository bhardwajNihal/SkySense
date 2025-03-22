// Defining types for the api responses, to standardize and for better code suggestion, error handling.

export interface coordinatesType {
  lat: number;
  lon: number;
}

// for cityname and location query
export interface geocodingResponseType {
  name: string;
  local_names?: Record<string, string>; // will be a list of key value pairs
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface weatherConditionType {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface weatherDataType {            // type for response from weather api
  coord: coordinatesType;
  weather: weatherConditionType[];          // array of weather conditions
  main: {                                   
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  name: string;
  dt: number;
}

export interface forecastDataType {         // type for response from the forcast api data
  list: Array<{                             // list is an array of specified attributes
    dt: number;     
    main: weatherDataType["main"];          // of type of "main" object from weatherDataType
    weather: weatherDataType["weather"];    // of type of "weather" object from weatherDataType
    wind: weatherDataType["wind"];          // of type of "wind" object from weatherDataType
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

// NOT ALL DATA FROM THE RESPONSE INCLUDED IN THE TYPE DEFINITIONS
// ONLY THE ONES WE WANT TO INCLUDE, REST ATTRIBUTES WILL BE IGNORED BY THE TYPESCRIPT
// ONLY TO THROW ERROR IF WE TRY TO CONSUME THAT DATA WHOSE TYPE IS NOT DEFINED.