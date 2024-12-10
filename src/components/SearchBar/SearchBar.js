import styles from  './SearchBar.module.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchBar = ({ onSearch }) => {

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [searchCategory, setSearchCategory] = useState('rezept'); // Standard = rezept

  const handleSearch = (event) => {
    event.preventDefault();

    onSearch(searchValue, searchCategory);

    navigate('/search-results');
  };

  return (
    <>
      <form onSubmit={handleSearch} className={styles.search_bar}>

        <select onChange={(e) => setSearchCategory(e.target.value)} value={searchCategory}>
          <option value="rezept">Rezept</option>
          <option value="zutat">Zutat</option>
          <option value="kategorie">Kategorie</option>
        </select>

        <input
          type="text"
          placeholder="Wonach suchst du heute?"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button type="submit">Suchen</button>

      </form>
    </>
  )
}

export default SearchBar;