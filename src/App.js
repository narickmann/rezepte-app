import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './views/Home/Home.js';
import RecipeDetail from './views/RecipeDetail/RecipeDetail.js';
import SearchResults from './views/SearchResults/SearchResults.js';
import NewRecipe from './views/NewRecipe/NewRecipe.js';
import EditRecipe from './views/EditRecipe/EditRecipe.js';
import Login from './views/Login/Login.js';
import UserArea from './views/UserArea/UserArea.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />

          <Route path="/add-recipe" element={<NewRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />

          <Route path="/login" element={<Login />} />

          <Route path="/user-area" element={<UserArea />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
