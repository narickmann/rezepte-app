import './Home.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header.js';
import RecipeList from '../../components/RecipeList/RecipeList.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import { searchRecipes } from '../../services/recipeService.js';
import Footer from '../../components/Footer/Footer.js';

const Home = () => {

  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);

  const handleSearch = (searchValue, searchCategory) => {
    searchRecipes(searchValue, searchCategory)
      .then((result) => {
        setRecipes(result);
        navigate('/search-results', { state: { recipes: result, searchTerm: searchValue } });
      })
      .catch((error) => {
        console.error('Fehler bei der Suche:', error);
      });
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />

      <RecipeList />
      <Footer />
    </>
  )
}

export default Home;