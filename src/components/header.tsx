import { useTheme } from './Theme-provider';
import React from 'react'
import { FaCloudSunRain } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";



export const Header = () => {

    const { theme, setTheme } = useTheme()        // hook provided by theme-provider, to set theme

    function toggleTheme() {
        if (theme === "dark") {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    return (
        <header className='sticky top-0 z-50 h-16 w-full bg-background/70 backdrop-blur'>

            <div className='h-full mx-auto px-8 md:px-16 container flex justify-between items-center'>

                <div
                    className={`logo text-3xl flex items-center ${(theme === 'dark') ? "text-[#2BC4D8]" : "text-[#216DC2]"}`}>
                    <FaCloudSunRain />
                    <span className='text-lg font-semibold tracking-tighter'>SkySense</span>
                </div>

                <div className={`toggle-theme w-fit text-xl cursor-pointer transition-transform duration-500
                                ${(theme === 'dark' ? "rotate-180" : "rotate-0")}`}
                    onClick={toggleTheme}
                >
                    {(theme === "dark"
                        ? <div className='text-yellow-400'><IoSunnyOutline /></div>
                        : <div className='text-[#216DC2]'><IoMoonOutline /></div>)}
                </div>

            </div>

        </header>
    )
}
