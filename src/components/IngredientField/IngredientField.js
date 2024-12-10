import styles from './IngredientField.module.css';

import { useEffect, useState } from 'react';

const IngredientField = ({ ingredients, onIngredientsChange, required }) => {

  const [ingredientList, setIngredientList] = useState(ingredients.length > 0 ? ingredients : [{ amount: '', unit: '', name: '' }]);

  useEffect(() => {
    setIngredientList(ingredients.length > 0 ? ingredients : [{ amount: '', unit: '', name: '' }]);
  }, [ingredients]);

  const addIngredient = () => {
    const newIngredient = { amount: '', unit: '', name: '' };
    const updatedIngredientList = [...ingredientList, newIngredient];
    setIngredientList(updatedIngredientList);

    if (onIngredientsChange) {
      onIngredientsChange(updatedIngredientList);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...ingredientList];
    updatedIngredients[index][field] = value;
    setIngredientList(updatedIngredients);

    if (onIngredientsChange) {
      onIngredientsChange(updatedIngredients);
    }
  };

  return (
    <div>
      <table className="ingredient-table">
        <thead>
          <tr>
            <th>Menge</th>
            <th>Einheit</th>
            <th>Zutat</th>
          </tr>
        </thead>
        <tbody id={styles.ingredient_field} >
          {ingredientList.map((ingredient, index) => (
            <tr key={index}>
              <td>
                <input
                  required={required}
                  type="text"
                  value={ingredient.amount}
                  onChange={(event) => handleInputChange(index, 'amount', event.target.value)}
                  placeholder="z.B. 200"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(event) => handleInputChange(index, 'unit', event.target.value)}
                  placeholder="z.B. ml"
                />
              </td>
              <td>
                <input
                  required={required}
                  type="text"
                  value={ingredient.name}
                  onChange={(event) => handleInputChange(index, 'name', event.target.value)}
                  placeholder="z.B. Milch"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={addIngredient} className={styles.ingredient_btn}>
        Weitere Zutat
      </button>
    </div>
  );
};

export default IngredientField;
