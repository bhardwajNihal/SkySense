
import { Button } from '@/components/ui/button'
import { SlRefresh } from "react-icons/sl";
import { useCurrentLocation } from '@/customHooks/useCurrentLocation';
import { LoadingSkeleton } from '@/components/loadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IoAlertCircleOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";


export const Dashboard = () => {

  const { coordinates, isLoading, error, getCurrentLocation } = useCurrentLocation();

  function handleRefresh() {
    getCurrentLocation();
    //refetch the weather data
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) return (
    <div>
      <Alert>
        <IoAlertCircleOutline />
        <AlertTitle className='mb-4'>Location Error!</AlertTitle>
        <AlertDescription>
          {error}
          <Button onClick={getCurrentLocation} variant={"outline"} className='mt-4'>
            <CiLocationOn />
            <span>Turn On Location</span>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  )

  // an edge case - if coordinates are not provided
  if (!coordinates) {
    return <div>
      <Alert>
        <IoAlertCircleOutline />
        <AlertTitle className='mb-4'>Location Required!</AlertTitle>
        <AlertDescription>
          <p>Please Enable Location to see you Current Weather!</p>
          <Button onClick={getCurrentLocation} variant={"outline"} className='mt-4'>
            <CiLocationOn />
            <span>Turn On Location</span>
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  }

  return (
    <div>

      <div className="favourites bg-blue-950 h-16 w-full">

      </div>


      <div className="current-location">

        <div className="topbar flex justify-between items center">

          <h2 className='text-lg'>My Location</h2>
          <Button
            className='cursor-pointer'
            variant={"outline"}
            size={'sm'}
            onClick={handleRefresh}
          ><SlRefresh /></Button>
        </div>

      </div>

    </div>
  )
}
