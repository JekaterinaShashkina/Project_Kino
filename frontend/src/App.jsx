import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { SearchResults } from './components/SearchResults';
import ShowTimePage from './pages/ShowTimePage';
import './App.css'
import FilmDetailPage from './pages/FilmDetailPage';
import SessionDetailsPage from './pages/SessionDetailsPage'
import AddSessionPage from './pages/AddSessionPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/auth' element={<AuthPage/>}/>
      <Route path='/films/:id' element={<FilmDetailPage/>}/>
      <Route path="/search-results" element={<SearchResults />} />
      <Route path='/showtime' element={<ShowTimePage/>}/>
      <Route path="/session/:id" element={<SessionDetailsPage />} />
      <Route path="/admin/sessions/new" element={<AddSessionPage />} />
    </Routes>
  )
}

export default App
