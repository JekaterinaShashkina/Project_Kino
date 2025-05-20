import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';

import './App.css'
import FilmDetailPage from './pages/FilmDetailPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path='/films/:id' element={<FilmDetailPage/>}/>
    </Routes>
  )
}

export default App
