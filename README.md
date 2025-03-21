
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
