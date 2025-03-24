import React, { PropsWithChildren } from 'react'
import { Header } from './header'

export const Layout:React.FC<PropsWithChildren> = ({children}) => {       // propswithChildren is much cleaner, in case of single prop, otherwise reactNode in a separate interface when there are multiple children
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
        <Header/>

        <main className='min-h-screen w-full container mx-auto py-4 px-8 md:px-16'>{children}</main>

        <footer>
            <p className='text-center text-sm text-gray-500 p-4 mx-auto container backdrop:blur supports-[backdrop-filter]:bg-background/30 '>
                Made with hardwork & learnings by Nihal Bhardwaj
            </p>
        </footer>
    </div>
  )
}

// container class automatically sets the divs max width a/c to the viewport