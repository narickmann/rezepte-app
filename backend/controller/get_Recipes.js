'use strict';

import { connection, recipeDB } from '../db/database.js';

const getAllRecipes = (request, response) => {

  let db = connection.use(recipeDB);

  db.list({
    include_docs: true
  }).then(
    res => res.rows.map(row => row.doc)
  ).then(
    res => response.status(200).json(res)
  ).catch(
    console.warn
  )

}

const getRecipesByName = (request, response) => {
  let db = connection.use(recipeDB);

  const recipeName = request.query.name;

  if (!recipeName) {
    return response.status(400).json({ error: 'Bitte einen Rezeptnamen angeben' });
  }

  db.find({ selector: { title: { $regex: `(?i).*${recipeName}.*` } } })
    .then(
      res => response.json(res.docs)
    ).catch(
      error => response.status(500).send(`Fehler bei der Suche ${error}`)
    )

}

const getRecipeById = (request, response) => {
  let db = connection.use(recipeDB);
  const recipeId = request.params.id;

  if (!recipeId) {
    return response.status(400).json({ error: 'Rezept nicht gefunden' });
  }

  db.get(recipeId)
    .then(res => response.json(res))
    .catch(error => response.status(500).send(`Fehler bei der Suche ${error}`));

}

const getRecipesByIngredients = (request, response) => {
  let db = connection.use(recipeDB);

  const ingredientsQuery = request.query.ingredients;

  if (!ingredientsQuery) {
    return response.status(400).json({ error: 'Bitte Zutaten angeben (Komma-getrennt)' });
  }

  const ingredientsList = ingredientsQuery.split(',').map(ing => ing.trim());

  console.log('ingredientsList', ingredientsList)

  db.find({
    selector: {
      ingredients: {
        $elemMatch: {
          name: {
            $regex: ingredientsList.map(ing => `(?i).*${ing}.*`).join('|')
          }
        }
      }
    }
  }).then(
    res => response.json(res.docs)
  ).catch(
    error => response.status(500).send(`Fehler bei der Suche ${error}`)
  )

}

const getRecipesByCategory = (request, response) => {
  let db = connection.use(recipeDB);

  const categoryQuery = request.query.category;

  if (!categoryQuery) {
    return response.status(400).json({ error: 'Bitte eine Kategorie angeben' });
  }

  const categoriesList = categoryQuery.split(',').map(cat => cat.trim());

  console.log('categoriesList', categoriesList);

  db.find({
    selector: {
      categories: {
        $elemMatch: {
          $in: categoriesList
        }
      }
    }
  }).then(
    res => response.json(res.docs)
  ).catch(
    error => response.status(500).send(`Fehler bei der Suche ${error}`)
  )
}

const getUserRecipes = (request, response) => {
  let db = connection.use(recipeDB);
  const { username } = request.params;

  db.find({ selector: { from_user: username } })
    .then(result => {
      if (result.docs.length === 0) {
        return response.status(404).json({ recipes: [] });
      }
      response.status(200).json({ recipes: result.docs });
    })
    .catch(error => {
      console.error('Fehler beim Abrufen der Rezepte:', error);
      response.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
    });
}

export {
  getAllRecipes,
  getRecipesByName,
  getRecipesByIngredients,
  getRecipesByCategory,
  getRecipeById,
  getUserRecipes
};