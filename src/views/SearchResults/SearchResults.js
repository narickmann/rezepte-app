import './SearchResults.css';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import RecipePreview from '../../components/RecipePreview/RecipePreview.js';
import Header from '../../components/Header/Header.js';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import { searchRecipes } from '../../services/recipeService.js';
import Footer from '../../components/Footer/Footer.js';

const SearchResults = () => {

  const location = useLocation();
  const recipes = location.state?.recipes || [];
  const searchTerm = location.state?.searchTerm || '';

  const [newRecipes, setNewRecipes] = useState([]);

  const handleSearch = (searchValue, searchCategory) => {
    searchRecipes(searchValue, searchCategory)
      .then((result) => {
        setNewRecipes(result);
      })
      .catch((error) => {
        console.error('Fehler bei der Suche:', error);
      });
  };

  const renderRecipePreview = () => {
    const recipesToDisplay = newRecipes.length > 0 ? newRecipes : recipes;
    return recipesToDisplay.map((recipe, index) => (
      <RecipePreview
        key={index}
        title={recipe.title}
        description={recipe.description}
        time={recipe.cooking_time}
        difficulty={recipe.difficulty}
        id={recipe._id}
      />
    ));
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      <h1>Rezeptergebnisse für: {searchTerm}</h1>
      <div className='recipe_preview'>
        {recipes.length > 0 || newRecipes.length > 0
          ? renderRecipePreview()
          : <p>Keine passenden Rezepte gefunden.</p>
        }
      </div>

      <Footer />
    </>
  )

}

export default SearchResults;