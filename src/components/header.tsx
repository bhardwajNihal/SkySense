import { useTheme } from './Theme-provider';
import { FaCloudSunRain } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import CitySearch from './city-search-modal/citySearch';
import { useNavigate } from 'react-router-dom';



export const Header = () => {

    const { theme, setTheme } = useTheme()        // hook provided by theme-provider, to set theme

    function toggleTheme() {
        if (theme === "dark") {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    const navigate = useNavigate()

    return (
        <header className='sticky top-0 z-50 h-16 w-full bg-background/70 backdrop-blur'>

            <div className='h-full mx-auto px-8 md:px-16 container flex justify-between items-center'>

                <div
                onClick={()=>navigate("/")}
                    className={`logo text-3xl flex items-center ${(theme === 'dark') ? "text-[#2BC4D8]" : "text-[#216DC2]"} cursor-pointer`}>
                    <FaCloudSunRain />
                    <span className='text-lg font-semibold tracking-tighter'>SkySense</span>
                </div>

                {/* city search button */}
                <div className='flex justify-center items-center gap-4'>
                    <CitySearch />

                    <div className={`toggle-theme w-fit text-xl cursor-pointer transition-transform duration-500
                ${(theme === 'dark' ? "rotate-180" : "rotate-0")}`}
                        onClick={toggleTheme}
                    >
                        {(theme === "dark"
                            ? <div className='text-yellow-400'><IoSunnyOutline /></div>
                            : <div className='text-[#216DC2]'><IoMoonOutline /></div>)}
                    </div>
                </div>

            </div>

        </header>
    )
}
