import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/Theme-provider.tsx'
import { Layout } from './components/layout.tsx'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime : 5*60*1000,   //the time after which data will be considered absolete, and required to be refetched
      gcTime : 5*50*1000,     // the time for which data remains cached
      retry : false,            // retry again if fetch fails
      refetchOnWindowFocus : false  // whether to refetch if window is changed and reopened in the browser
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark'>
          <Layout>
            <App />
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>,
)
