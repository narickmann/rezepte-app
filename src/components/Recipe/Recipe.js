import styles from './Recipe.module.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InfoBadge from '../InfoBadge/InfoBadge.js';
import Toast from '../Toast/Toast.js';

const Recipe = (recipe) => {

  const navigate = useNavigate();

  const [toast, setToast] = useState(null);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [username]);

  const handleAddFavorite = () => {

    fetch(`/user/add-favorite`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        recipeId: recipe._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setError(null);
          setToast({ message: 'Rezept zu den Favoriten hinzugefügt!', type: 'success' });
          setTimeout(() => { setToast(null) }, 2000);
        } else {
          throw new Error(data.error || 'Unbekannter Fehler');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Hinzufügen des Rezepts zu den Favoriten:', error);

        setError(error.message);
        setToast({ message: error.message, type: 'error' });
        setTimeout(() => setToast(null), 2000);
      });
  }

  const handleEditClick = () => {
    navigate(`/edit-recipe/${recipe._id}`);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Möchtest du dieses Rezept wirklich löschen?');
    if (confirmDelete) {
      fetch(`/recipes/delete-recipe/${recipe._id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            navigate('/');
          } else {
            alert('Fehler beim Löschen des Rezepts');
          }
        })
        .catch((error) => {
          console.error('Fehler beim Löschen:', error);
          alert('Fehler beim Löschen des Rezepts');
        });
    }
  }

  const renderIngredients = () => {
    return recipe.ingredients.map((ingredient, index) => {
      return (
        <div key={index} className={styles.recipe_ingredients}>
          <span>{ingredient.amount}</span>
          <span> {ingredient.unit}</span>
          <span>{ingredient.name}</span>
        </div>
      )
    })
  }

  // TODO: evtl als InfoBadge?
  const renderCookingTimeInfo = () => {
    return (
      <div>
        <div className={styles.cooking_info}>
          <img src='/images/icons/duration_icon.svg' alt='Arbeitszeit' className={styles.icon} />
          <p>{`${recipe.preparation_time} Min Vorbereitung`}</p>
        </div>
        <div className={styles.cooking_info}>
          <img src='/images/icons/duration_icon.svg' alt='Arbeitszeit' className={styles.icon} />
          <p>{`${recipe.cooking_time} Min Koch-/Backzeit`}</p>
        </div>
        <div className={styles.cooking_info}>
          <img src='/images/icons/duration_icon.svg' alt='Arbeitszeit' className={styles.icon} />
          <p>{`${recipe.preparation_time + recipe.cooking_time} Min Gesamt`}</p>
        </div>
      </div>
    )
  }

  const renderInstructions = () => {
    return recipe.instructions.map((step, index) => {
      return (
        <div key={index}>
          <p className={styles.instruction_step}>{step}</p>
        </div>
      )
    })
  }

  const renderCategories = () => {
    return recipe.categories.map((category, index) => {
      return (
        <InfoBadge key={index} info={category} for={'category'} />
      )
    })
  }

  const renderLink = () => {
    if (!recipe.source || !recipe.source_link) return null;

    return (
      <p className={styles.recipe_source}>Rezept gefunden auf: <a href={recipe.source_link} target='_blank' rel='noreferrer'>{recipe.source}</a></p>
    );
  };

  const renderTips = () => {
    if (!recipe.tips || recipe.tips.trim() === '') return null;

    return (
      <p>{recipe.tips}</p>
    )
  };

  return (
    <>
      <div className={styles.recipe}>

        <h1>{recipe.title}</h1>
        <img
          src={recipe.image ? `http://localhost:5000/${recipe.image}` : '/images/Platzhalter.webp'}
          alt={`Bild: ${recipe.title}`}
          className={styles.recipe_img}
        />

        <div className={styles.short_infos}>
          <InfoBadge info={recipe.cooking_time} for={'cooking_time'} />
          <InfoBadge info={recipe.difficulty} for={'difficulty'} />
          <InfoBadge info={recipe.creationDate} for={'creationDate'} />
          <InfoBadge info={recipe.from_user} for={'from_user'} />

          {isLoggedIn && (
            <button className={styles.favorite_btn} onClick={handleAddFavorite}>Zu Favoriten hinzufügen</button>
          )}
        </div>

        <small>{recipe.description}</small>
        <hr></hr>

        <h2>{`Zutaten für ${recipe.portions} Portionen`}</h2>
        <div className={styles.ingredients_container}>{renderIngredients()}</div>
        <hr></hr>

        {recipe.preparations.length > 0 && (
          <>
            <h2>Vorbereitungen</h2>
            <p>{recipe.preparations}</p>
          </>
        )}
        <h2>Zubereitung</h2>
        <div>{renderCookingTimeInfo()}</div>
        <div>{renderInstructions()}</div>

        <div className={styles.categories}>{renderCategories()}</div>

        {recipe.tips.length > 0 && (
          <>
            <h2>Tipps</h2>
            {renderTips()}
          </>
        )}

        <div>{renderLink()}</div>

        {isLoggedIn && recipe.from_user === localStorage.getItem('username') && (
          <>
            <div className={styles.row}>
              <button className={styles.edit_btn} onClick={handleEditClick}>
                Rezept bearbeiten
              </button>
              <button className={styles.delete_btn} onClick={handleDeleteClick}>
                Rezept löschen
              </button>
            </div>
          </>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </>
  );
};

export default Recipe;