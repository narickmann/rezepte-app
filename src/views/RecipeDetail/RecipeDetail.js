import './RecipeDetail.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/Header/Header.js';
import Recipe from '../../components/Recipe/Recipe.js';
import Footer from '../../components/Footer/Footer.js';

const RecipeDetail = () => {

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) => console.error('Fehler beim Abrufen des Rezepts:', error));
  }, [id]);

  if (!recipe) {
    return <p>Rezept wird geladen...</p>;
  }

  return (
    <>
      <Header />
      <Recipe {...recipe} />

      <Footer />
    </>
  )
}

export default RecipeDetail;