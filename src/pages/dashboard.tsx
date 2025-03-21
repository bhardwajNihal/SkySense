
import { Button } from '@/components/ui/button'
import { SlRefresh } from "react-icons/sl";
import { useCurrentLocation } from '@/customHooks/useCurrentLocation';
import { LoadingSkeleton } from '@/components/loadingSkeleton';


export const Dashboard = () => {

  const {coordinates, isLoading, error, getCurrentLocation} = useCurrentLocation();

  console.log(coordinates); 
  
  function handleRefresh(){
    getCurrentLocation();
    //refetch the weather data
  }

  if(isLoading) return <LoadingSkeleton/>

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
