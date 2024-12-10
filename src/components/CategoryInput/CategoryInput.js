import styles from './CategoryInput.module.css';

import { useState } from 'react';

const CategoryInput = ({ categories = [], onCategoriesChange }) => {
  const [inputValue, setInputValue] = useState(categories.join(', '));

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const categoryArray = value.split(',').map((category) => category.trim());
    onCategoriesChange(categoryArray);
  };

  return (
    <div className={styles.categories_container}>
      <label htmlFor="categories">Kategorien:</label>
      <input
        type="text"
        id="categories"
        value={inputValue}
        onChange={handleChange}
        placeholder="z. B. Vegan, Vegetarisch, Schnell"
      />
    </div>
  );
};

export default CategoryInput;