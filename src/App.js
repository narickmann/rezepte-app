import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './views/Home/Home.js';
import RecipeDetail from './views/RecipeDetail/RecipeDetail.js';
import SearchResults from './views/SearchResults/SearchResults.js';
import NewRecipe from './views/NewRecipe/NewRecipe.js';
import EditRecipe from './views/EditRecipe/EditRecipe.js';
import Login from './views/Login/Login.js';
import UserArea from './views/UserArea/UserArea.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/login" element={<Login />} />

          <Route path="/add-recipe" element={<ProtectedRoute><NewRecipe /></ProtectedRoute>} />
          <Route path="/edit-recipe/:id" element={<ProtectedRoute><EditRecipe /></ProtectedRoute>} />
          <Route path="/user-area" element={<ProtectedRoute><UserArea /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
