import styles from './RecipeForm.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CategoryInput from '../CategoryInput/CategoryInput.js';
import IngredientField from '../IngredientField/IngredientField.js';
import InstructionField from '../InstructionField/InstructionField.js';
import Toast from '../Toast/Toast.js';

const RecipeForm = ({ initialRecipe = {}, mode = 'create' }) => {

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    portions: '',
    difficulty: 'n/A',
    ingredients: [],
    preparation_time: 0,
    cooking_time: 0,
    preparations: '',
    instructions: [],
    categories: [],
    tips: '',
    source: '',
    image: null,
    from_user: localStorage.getItem('username'),
    ...initialRecipe,
  });

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setRecipe((prev) => ({ ...prev, image: files[0] }));
    } else {
      setRecipe((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const url = mode === 'edit' ? `/recipes/update-recipe/${recipe._id}` : '/recipes/new-recipe';
    const method = mode === 'edit' ? 'PUT' : 'POST';

    const formData = new FormData();

    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('portions', recipe.portions);
    formData.append('difficulty', recipe.difficulty);
    formData.append('preparation_time', recipe.preparation_time);
    formData.append('cooking_time', recipe.cooking_time);
    formData.append('preparations', recipe.preparations);
    formData.append('tips', recipe.tips);
    formData.append('source', recipe.source);
    formData.append('source_link', recipe.source_link);
    formData.append('from_user', recipe.from_user);

    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('categories', JSON.stringify(recipe.categories));
    formData.append('instructions', JSON.stringify(recipe.instructions));

    if (recipe.image) {
      formData.append('image', recipe.image);
    }

    fetch(url, {
      method: method,
      body: formData,
    }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(
          mode === 'edit' ? 'Fehler beim Aktualisieren des Rezepts' : 'Fehler beim Erstellen des Rezepts');
      }
      return response.text();
    }
    ).then((message) => {
      setIsSuccess(true);
      setError(null);
      setToast({ message, type: 'success' });
      setTimeout(() => { setToast(null); navigate('/') }, 2000);
    }
    ).catch((error) => {
      setIsSuccess(false);
      setError(error.message);
      setToast({ message: error.message, type: 'error' });
      setTimeout(() => setToast(null), 2000);
    }
    ).finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleCancel = () => {
    if (mode === 'edit') {
      navigate(`/recipe/${recipe._id}`);
    } else if (mode === 'create') {
      navigate('/');
    }
  };

  return (
    <>
      <form className={styles.recipe_form} onSubmit={handleSubmit}>

        <fieldset>
          <legend>Rezeptangaben</legend>

          <label htmlFor='recipe-title'>Rezeptname</label>
          <input required
            id='recipe-title'
            type='text'
            name='title'
            value={recipe.title}
            placeholder='z.B. Currywursteintopf'
            onChange={handleChange} />

          <label htmlFor='recipe-description'>Eine kurze Beschreibung zum Rezept</label>
          <textarea
            id='recipe-description'
            name='description'
            value={recipe.description}
            placeholder='z.B. Eine sehr leckere Currywurst-Alternative.'
            onChange={handleChange}
          />

          <div className={styles.inner_row}>
            <label htmlFor='recipe-portions'>Das Rezept ist ausgelegt für</label>
            <input required
              id='recipe-portions'
              type='text'
              name='portions'
              value={recipe.portions}
              placeholder='0'
              pattern='^[0-9]{1,}$'
              onChange={handleChange} />
            <small>Portionen/Personen</small>
          </div>

          <div className={styles.row}>
            <label htmlFor='recipe-difficulty'>Schwierigkeitsgrad</label>
            <select
              id='recipe-difficulty'
              name='difficulty'
              value={recipe.difficulty}
              onChange={handleChange}
            >
              <option value=''>--Bitte wählen--</option>
              <option value='Einfach'>Einfach</option>
              <option value='Normal'>Normal</option>
              <option value='Schwer'>Schwer</option>
            </select>
          </div>
        </fieldset>

        <fieldset>
          <legend>Bild hochladen</legend>
          <label htmlFor="recipe-image">Rezeptbild</label>
          <input
            type="file"
            id="recipe-image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <legend>Zutaten und Mengenangaben</legend>
          <IngredientField
            required={true}
            ingredients={recipe.ingredients || []}
            onIngredientsChange={(updatedIngredients) =>
              setRecipe((prev) => ({ ...prev, ingredients: updatedIngredients }))
            }
          />
        </fieldset>

        <fieldset>
          <legend>Zubereitungsangaben</legend>
          <div className={styles.row}>

            <div className={styles.inner_row}>
              <label htmlFor='recipe-preparation-time'>Arbeitszeit</label>
              <input
                id='recipe-preparation-time'
                type='text'
                name='preparation_time'
                value={recipe.preparation_time}
                placeholder='15'
                onChange={handleChange} />
              <small>Min</small>
            </div>

            <div className={styles.inner_row}>
              <label htmlFor='recipe-cooking-time'>Koch-/Backzeit</label>
              <input
                className={styles.time}
                id='recipe-cooking-time'
                type='text'
                name='cooking_time'
                value={recipe.cooking_time}
                placeholder='45'
                onChange={handleChange} />
              <small>Min</small>
            </div>
          </div>

          <label htmlFor='recipe-preparation'>Vorbereitungen</label>
          <textarea
            id='recipe-preparation'
            name='preparations'
            value={recipe.preparations}
            placeholder='z.B. Ofen vorheizen, Form einfetten ...'
            onChange={handleChange}
          />

          <InstructionField
            required={true}
            instructions={recipe.instructions}
            onInstructionsChange={(updatedInstructions) =>
              setRecipe((prev) => ({ ...prev, instructions: updatedInstructions }))
            }
          />
        </fieldset>

        <fieldset>
          <legend>weitere Infos</legend>
          <CategoryInput
            categories={recipe.categories}
            onCategoriesChange={(updatedCategories) =>
              setRecipe((prev) => ({ ...prev, categories: updatedCategories }))
            }
          />

          <label htmlFor='recipe-tips'>Tipps</label>
          <textarea
            id='recipe-tips'
            name='tips'
            value={recipe.tips}
            placeholder='z.B. Beim Servieren die Portion mit Currypulver bestäuben.'
            onChange={handleChange}
          />

          <small>Quelle (falls nicht das eigene Rezept)</small>
          <div className={styles.row}>
            <label htmlFor='recipe-source'>Seite</label>
            <input
              id='recipe-source'
              type='text'
              name='source'
              value={recipe.source}
              placeholder='z.B. Chefkoch.de'
              onChange={handleChange} />
          </div>
          <div className={styles.row}>
            <label htmlFor='recipe-link'>Link</label>
            <input
              id='recipe-link'
              type='text'
              name='source_link'
              value={recipe.source_link}
              placeholder='z.B. Chefkoch.de'
              onChange={handleChange} />
          </div>
        </fieldset>

        <div className={styles.row}>
          <button className={styles.submit_btn} type='submit' disabled={isSubmitting}>
            {mode === 'edit' ? 'Rezept aktualisieren' : 'Rezept erstellen'}
          </button>

          <button className={styles.cancel_btn} type="button" onClick={handleCancel}>
            Abbrechen
          </button>
        </div>
      </form>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  )
}
export default RecipeForm;