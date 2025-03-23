import { useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Button } from "../ui/button"
import { Loader, Search, SearchIcon } from "lucide-react"
import { useGetLocationData } from "@/customHooks/useWeather"
import { useNavigate } from "react-router-dom"

const CitySearch = () => {

    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const { data: locationData, isLoading } = useGetLocationData(search);
    // console.log(locationData);

    const navigate = useNavigate();

// inbuild handler provided by the shadcn component
    function handleSelect(inputValue:string){     //commandItem's value will be passed as parameter

        const extractCityData = inputValue.split("|");
        // console.log(extractCityData);
        //navigating to the cities page with info as query params
        navigate(`/city/${extractCityData[2]}?lat=${extractCityData[0]}&lon=${extractCityData[1]}`) // extracted data is array, thus accessed via index
        setOpen(false)
    }

    

    return (
        <div>
            <Button
                variant={"outline"}
                className="sm:w-64 text-muted-foreground flex justify-start cursor-pointer text-sm"
                onClick={() => setOpen(true)}><Search />Search Cities...</Button>

            <div>
                <CommandDialog open={open} onOpenChange={setOpen}>
                    <CommandInput
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Search cities..." />
                    <CommandList>
                        {search.length >= 2 && !isLoading && 
                        <CommandEmpty className="text-muted-foreground text-center m-4">No cities found!</CommandEmpty>}

                        {locationData && locationData.length>0 && 
                        <CommandGroup heading="suggestions">
                            {isLoading && <Loader className=" h-4 w-4 animate-spin"/>}
                            {locationData.map((item) => 
                            <CommandItem
                            key={`${item.lat}-${item.lon}`}
                            value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                            onSelect={handleSelect}
                            className="flex mb-1 text-sm"
                            >
                            <SearchIcon/>
                            <span>{item.name} . </span>
                            {item.state && <span className="text-muted-foreground">{item.state} . </span>}
                            <span className="text-muted-foreground">{item.country}</span>
                            </CommandItem>)}
                        </CommandGroup>}

                    </CommandList>
                </CommandDialog>
            </div>
        </div>
    )
}

export default CitySearch