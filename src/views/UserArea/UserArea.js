import './UserArea.css'

import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import UserFavorites from '../../components/UserFavorites/UserFavorites.js';
import UserRecipes from '../../components/UserRecipes/UserRecipes.js';

const UserArea = () => {

  return (
    <>
      <Header />

      <UserFavorites />
      <UserRecipes />

      <Footer />
    </>
  )

}

export default UserArea;