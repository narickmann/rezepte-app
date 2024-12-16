import styles from './UserFavorites.module.css'

import { useEffect, useState } from 'react';

import RecipePreview from '../RecipePreview/RecipePreview.js';
import Toast from '../Toast/Toast.js';

const UserFavorites = () => {

  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);

  const username = localStorage.getItem('username');

  useEffect(() => {
    fetch(`/user/favorites/${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Rezepte');
        }
        return response.json();
      })
      .then(data => setFavorites(data.recipes))
      .catch(err => setError(err.message));
  }, [username]);

  if (error) {
    console.log('error: ', error)
    return <p>Fehler: {error}</p>;
  }

  const handleRemoveFavorite = (recipeId) => {
    fetch(`/user/remove-favorite`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        recipeId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Entfernen des Rezepts aus den Favoriten');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          setError(null);
          setToast({ message: 'Rezept aus den Favoriten entfernt!', type: 'success' });
          setTimeout(() => { setToast(null) }, 2000);
          setFavorites(prevFavorites => prevFavorites.filter(fav => fav._id !== recipeId));
        } else {
          throw new Error(data.error || 'Unbekannter Fehler');
        }
      })
      .catch(error => {
        setError(error.message);
        setToast({ message: error.message, type: 'error' });
        setTimeout(() => setToast(null), 2000);
      });
  };

  const renderFavorites = () => {
    if (favorites.length === 0) {
      return <p>Noch keine Favoriten hinzugefügt.</p>;
    }
    return favorites.map((recipe, index) => {
      return (
        <div key={index}>
          <RecipePreview
            title={recipe.title}
            image={recipe.image}
            description={recipe.description}
            cooking_time={recipe.cooking_time}
            difficulty={recipe.difficulty}
            id={recipe._id} />
          <button onClick={() => handleRemoveFavorite(recipe._id)} className={styles.remove_favorite}>
            <img src='/images/icons/favorite_icon.svg' alt='Favorit entfernen'/>
          </button>
        </div>
      )
    })
  }

  return (
    <>
      <div className={styles.favorite_list}>
        <h1>Deine Favoriten</h1>
        <div className={styles.recipe_preview}>{renderFavorites()}</div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

    </>
  )

}

export default UserFavorites;