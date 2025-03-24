import { useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command"
import { Button } from "../ui/button"
import { Clock, Delete, Loader, Search, SearchIcon } from "lucide-react"
import { useGetLocationData } from "@/customHooks/useWeather"
import { useNavigate } from "react-router-dom"

interface historyArrayType {
    lat: string;
    lon: string;
    city: string;
    country: string;
    state?: string;
    searchedAt: number
}

const CitySearch = () => {

    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")
    const { data: locationData, isLoading } = useGetLocationData(search);
    // console.log(locationData);

    // setting up state for search history 
    const [searchHistory, setSearchHistory] = useState<historyArrayType[]>(() => {
        const storedHistory = localStorage.getItem("search-history");
        return (storedHistory ? JSON.parse(storedHistory) : [])
    })

    const navigate = useNavigate();

    // inbuilt handler provided by the shadcn component, when an item is selected
    function handleSelect(inputValue: string) {     //commandItem's value will be passed as parameter

        const extractCityData = inputValue.split("|");  //value provided by the commandInput
        // console.log(extractCityData);

        // Create new search entry
        const newSearch = {
            lat: extractCityData[0],
            lon: extractCityData[1],
            city: extractCityData[2],
            country: extractCityData[3],
            state: extractCityData[4],
            searchedAt: Date.now(),  // Add timestamp for tracking
        };

        // Remove duplicates (if same lat & lon exist)
        let updatedHistory = searchHistory.filter((item) => !(newSearch.lat === item.lat && newSearch.lon === item.lon));

        // Add new search at the beginning & limit to 10 recent searches
        updatedHistory.unshift(newSearch);      // last added entry to be 1st element 
        updatedHistory = updatedHistory.slice(0, 10) // to take atmost 10 items from the array

        // update the seachHistory state to handle renders
        setSearchHistory(updatedHistory);

        // set the updatedHistory back to localStorage
        localStorage.setItem("search-history", JSON.stringify(updatedHistory))


        //navigating to the cities page with info as query params
        setOpen(false)
        navigate(`/city/${extractCityData[2]}?lat=${extractCityData[0]}&lon=${extractCityData[1]}`) // extracted data is array, thus accessed via index
    }

    function clearHistory() {
        setSearchHistory([])
        localStorage.removeItem('search-history')
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

                        {/*group of suggestions based on search Query */}
                        {locationData && locationData.length > 0 &&
                            <CommandGroup heading="suggestions">
                                {isLoading && <Loader className=" h-4 w-4 animate-spin" />}
                                {locationData.map((item) =>
                                    <CommandItem
                                        key={`${item.lat}-${item.lon}-${Date.now()}`}
                                        value={`${item.lat}|${item.lon}|${item.name}|${item.country}|${item.state}`}
                                        onSelect={handleSelect}
                                        className="flex mb-1 text-sm"
                                    >
                                        <SearchIcon />
                                        <span>{item.name} . </span>
                                        {item.state && <span className="text-muted-foreground">{item.state} . </span>}
                                        <span className="text-muted-foreground">{item.country}</span>
                                    </CommandItem>)}
                            </CommandGroup>}

                        <CommandSeparator />
                        {/* Group containing search history */}
                        <CommandGroup heading="Recent Searches">
                            {searchHistory.length > 0
                                ? <div onClick={clearHistory} className="text-end mt-[-25px] mb-1 text-muted-foreground"><Button size={"sm"} variant={"outline"}><Delete />Clear history</Button></div>
                                : <div className="text-center my-4 text-muted-foreground">No recent searches!</div>}
                            {searchHistory.map(item =>
                                <CommandItem key={item.searchedAt}>
                                    <Clock />
                                    <span>{item.city}</span>
                                    <span className="text-muted-foreground">. {item.state && item.state}</span>
                                    <span className="text-muted-foreground">. {item.country}</span>
                                </CommandItem>)}
                        </CommandGroup>

                    </CommandList>
                </CommandDialog>
            </div>
        </div>
    )
}

export default CitySearch