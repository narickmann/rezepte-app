export const searchRecipes = (searchValue, searchCategory) => {
  let searchUrl = '';

  if (searchCategory === 'rezept') {
    searchUrl = `http://localhost:5000/recipes/search?name=${searchValue}`;
  } else if (searchCategory === 'zutat') {
    searchUrl = `http://localhost:5000/recipes/ingredients?ingredients=${searchValue}`;
  } else if (searchCategory === 'kategorie') {
    searchUrl = `http://localhost:5000/recipes/category?category=${searchValue}`;
  }

  return fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht okay');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Fehler bei der Suche:', error);
      throw error;
    });
};