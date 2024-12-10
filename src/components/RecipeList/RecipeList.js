import styles from  './RecipeList.module.css';

import { useEffect, useState } from 'react';

import RecipePreview from '../RecipePreview/RecipePreview.js';

const RecipeList = () => {

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/recipes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Rezepte');
        }
        return response.json();
      })
      .then(data => setRecipes(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    console.log('error: ', error)
    return <p>Fehler: {error}</p>;
  }

  if (recipes.length === 0) {
    return <p>Keine Rezepte gefunden.</p>;
  }

  const renderRecipePreview = () => {
    return recipes.map((recipe, index) => {
      return <RecipePreview key={index}
        title={recipe.title}
        image={recipe.image}
        description={recipe.description}
        cooking_time={recipe.cooking_time}
        difficulty={recipe.difficulty}
        id={recipe._id} />
    })
  }

  return (
    <>
      <div className={styles.recipe_list}>
        <h1>Rezepte Übersicht</h1>
        <div className={styles.recipe_preview}>{renderRecipePreview()}</div>
      </div>
    </>
  )

}

export default RecipeList;