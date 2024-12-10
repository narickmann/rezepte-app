import './NewRecipe.css';

import Footer from '../../components/Footer/Footer.js';
import Header from '../../components/Header/Header.js';
import RecipeForm from '../../components/RecipeForm/RecipeForm.js';


const NewRecipe = () => {
  return (
    <>
      <Header />
      <RecipeForm />
      <Footer />
    </>
  )
}

export default NewRecipe;