import './EditRecipe.css';

import Footer from '../../components/Footer/Footer.js';
import Header from '../../components/Header/Header.js';
import UpdateRecipe from '../../components/UpdateRecipe/UpdateRecipe.js';

const EditRecipe = () => {
  return (
    <>
      <Header />
      <UpdateRecipe mode='edit'/>
      <Footer />
    </>
  )
}

export default EditRecipe;