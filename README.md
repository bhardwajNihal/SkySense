
# A fancy weather app - using React, Typescript, tailwind and Shadcn components

# Setup
    - set up vite project
    - install tailwind
    - install shadcn, it components
    - install react-router-dom
    - Define a layout for the app 
        - header, main, footer
    - wrap the layout inside the browserrouter
    - Add the light/dark theme provider from shadcn
    - Add routes

# Will use open weather api

# API setup, to fetch weather data
    1. Setup environment variables --> "VITE_" prefix is mandatory in the variable name 
        - imported using >> import.meta.env.VITE_VAR_NAME
    2. Create a API folder 
        - Add config.ts --> add baseUrl, api key, default parameters
        - add types.ts --> define strict types for the Api responses
        - weatherResponse.ts --> defined class to handle all the api requests 
    - collectively standardized whole api related tasks, for better modularity and reusability

# Functionalities 
    1. Fetch the current location of the user, and display the respective curent user data
    2. Add skeleton for the loading state
    3. Alert in case of location access not provided
    
    4. Difine custom hooks to fetch data
    5. completed the dashboard 
        - added current location weather data 
        - added charts for todays temperature with 3 hr gap
        - add weather details card
        - add next 5 day forcast card

    6. added search city functionality, command dialog box from shadcn
        - add search history functions, storing last 10 searches to localstorage
        - added suggestions based on keywords
    7. Added city page, with all the weather details for that corresponding city
    8. added add to favourites features, adding again to local storage to persist data
        - basic weather details to the favourites card
        - remove favourites functionality
        - navigate to city page to see the details of the favourite city.

## Learnt 
    - Shadcn
    - Recharts
    - tanstack query
    - strict type interfaces for the props and components
    - separate class to handle all the api related request
        - added modularity by defining methods like: 
            - create url
            - fetchData given that url
            - fetch weather data
            - fetch city names given latitude and longitude
            - fetch lat and lon given the city name
        - All these in a single class "weatherAPI"
    - Being somewhat familiar to good coding practices
