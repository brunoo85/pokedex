import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { ProfilePage } from '../pages/Profile'

export const Router = () => {
// const pokemonData 

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>
     </Routes>
    </BrowserRouter>
  )
}
