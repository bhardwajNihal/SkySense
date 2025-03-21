
import { Route, Routes} from 'react-router-dom'
import { Dashboard } from './pages/dashboard'
import { CityPage } from './pages/city-page'


function App() {

  return (
    <>
    

        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/city/:cityName' element={<CityPage/>}/>
        </Routes>
      

     
    </>
  )
}

export default App
