// A custom hook to fetch the current location of the user

import { coordinatesType } from "@/API/types";
import { useEffect, useState } from "react";

interface currentLocationProps{
    coordinates : coordinatesType | null;
    isLoading : boolean;
    error : string | null;
}

export function useCurrentLocation(){

    const [currentLocation, setCurrentLocation] = useState<currentLocationProps>({
        coordinates : null,
        isLoading : true,
        error : null
    });

    function getCurrentLocation(){

        // everytime the function is called -> spread the state, set loading to be true and error to be null
        setCurrentLocation(prevData => ({...prevData, isloading:true, error:null }))

        // If current location is not supported by the browser
        if(!navigator.geolocation){         // inbuilt js object to provide user location
            setCurrentLocation({
                coordinates:null,
                isLoading:false,
                error : "GeoLocation not supported by the browser!"
            })
            return;
        }

        // if location is fetched, simply set the coordinates to the state
        navigator.geolocation.getCurrentPosition((position) => (
            setCurrentLocation({
                coordinates : {
                    lat : position.coords.latitude,
                    lon : position.coords.longitude
                },
                isLoading : false,
                error : null
            })
        ),(error)=>{                    // also takes a callback to handle error
            let errorMessage: string;
            // There are various inbuild error handlers to the navigator method
            if(error.PERMISSION_DENIED) errorMessage="Location Permission Denied! Please turn on the location access.";
            else if(error.POSITION_UNAVAILABLE) errorMessage = "Location Info Unavailable!";
            else if(error.TIMEOUT) errorMessage = "Location Request Timed Out!";
            else errorMessage = "An unknown Error Occured!"; 

            setCurrentLocation({
                coordinates : null,
                isLoading : false,
                error : errorMessage
               })
        },{
        // some extra options are also provided
        enableHighAccuracy: true,
        timeout : 5000,
        maximumAge: 0
        })

    }

    useEffect(()=>{
        getCurrentLocation()
    },[])

    return { ...currentLocation, getCurrentLocation}

}