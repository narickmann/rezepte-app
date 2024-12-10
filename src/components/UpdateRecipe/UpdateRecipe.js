import './UpdateRecipe.module.css';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import RecipeForm from '../RecipeForm/RecipeForm.js';

const UpdateRecipe = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Rezept konnte nicht geladen werden.');
        }
        return response.json();
      })
      .then((data) => setRecipe(data))
      .catch((error) => {
        setError(error.message);
        setTimeout(() => navigate('/'), 2000);
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Lade Rezept...</p>;
  }

  return (
    <div>
      <h1>Rezept bearbeiten</h1>
      <RecipeForm initialRecipe={recipe} mode={ mode } />
    </div>
  );
};

export default UpdateRecipe;