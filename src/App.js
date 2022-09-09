import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import UserFavorites from './pages/UserFavorites';
import Ranking from './pages/Ranking';
import Create from './pages/Create';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" replace />}
        />
        <Route path="home" element={<Home />} />
        <Route path="favorites" element={<UserFavorites />} />
        <Route path="create" element={<Create />} />
        <Route path="movie/details/:id" element={<MovieDetail />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
