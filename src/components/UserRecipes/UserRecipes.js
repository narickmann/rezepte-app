import styles from './UserRecipes.module.css'

import { useEffect, useState } from 'react';

import RecipePreview from '../RecipePreview/RecipePreview.js';

const UserRecipes = () => {

  const [userRecipes, setUserRecipes] = useState([]);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username');

  useEffect(() => {
    fetch(`/recipes/user-recipes/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der eigenen Rezepte');
        }
        return response.json();
      })
      .then(data => setUserRecipes(data.recipes))
      .catch(err => setError(err.message));
  }, [username]);

  const renderUserRecipes = () => {
    if (userRecipes.length === 0) {
      return <p>Noch keine eigenen Rezepte erstellt.</p>;
    }

    return userRecipes.map((recipe, index) => {
      return <RecipePreview
        key={index}
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
      <div className={styles.user_recipes}>
        <h1>Deine Rezepte</h1>
        <div className='recipe_preview'>{renderUserRecipes()}</div>
      </div>
    </>
  )

}

export default UserRecipes;