import React, { PropsWithChildren } from 'react'
import { Header } from './header'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export const Layout:React.FC<PropsWithChildren> = ({children}) => {       // propswithChildren is much cleaner, in case of single prop, otherwise reactNode in a separate interface when there are multiple children
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
        <Header/>

        <main className='min-h-screen w-full container mx-auto py-4 px-8 md:px-16'>{children}</main>

        <footer >
            <div className='text-center text-sm flex items-center justify-center gap-8 text-gray-500 p-4 mx-auto container backdrop:blur supports-[backdrop-filter]:bg-background/30 '>
                Made with ❤️ & learnings by Nihal Bhardwaj.
                <a href='https://github.com/bhardwajNihal/SkySense' className='text-lg'><FaGithub/></a>
            <a href='https://x.com/bhardwajnihal21' className='text-lg'><FaXTwitter/></a>
            </div>
        </footer>
    </div>
  )
}

// container class automatically sets the divs max width a/c to the viewport