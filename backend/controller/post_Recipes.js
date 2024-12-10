'use strict';

import fs from 'fs';
import path from 'path';

import { connection, recipeDB } from '../db/database.js';

const parseFormData = (data) => {
  for (const key in data) {
    if (data[key] === '') {
      continue;
    }
    if (!isNaN(data[key])) {
      data[key] = parseFloat(data[key]);
    }
    else if (typeof data[key] === 'string' && data[key].startsWith('[') && data[key].endsWith(']')) {
      try {
        data[key] = JSON.parse(data[key]);
      } catch (e) {
        console.log(`Fehler beim Parsen von ${key}: `, e);
      }
    }
  }
  return data;
};

const addNewRecipe = (request, response) => {

  let db = connection.use(recipeDB);
  const recipe = request.body;

  if (!recipe) {
    return response.status(400).json({ error: 'Bitte ein Rezept angeben' });
  }

  const parsedRecipe = parseFormData(recipe);

  const imageUrl = request.file ? request.file.path : null;
  parsedRecipe.image = imageUrl ? imageUrl.replace(/\\/g, '/') : null;

  const crDate = new Date().toLocaleDateString();
  parsedRecipe.creationDate = crDate;

  db.insert(parsedRecipe)
    .then(() => response.status(200).send(`Rezept erfolgreich hinzugefügt`))
    .catch((error) => {
      console.error('Fehler beim Hinzufügen des Rezepts:', error);
      response.status(500).json({ error: 'Fehler beim Hinzufügen des Rezepts' });
    });
}

const deleteRecipe = (request, response) => {
  let db = connection.use(recipeDB);
  const recipeId = request.params.id;

  if (!recipeId) {
    return response.status(400).json({ error: 'Rezept nicht gefunden, ID erforderlich' });
  }

  db.get(recipeId)
    .then(doc => {
      const imagePath = doc.image;
      return db.destroy(doc._id, doc._rev).then(() => {
        if (imagePath) {
          const absolutePath = path.join(process.cwd(), imagePath);
          fs.unlink(absolutePath, error => console.error(`Fehler beim Löschen des Bildes (${imagePath}):`, error));
        }
      });
    })
    .then(() => response.status(200).send(`Rezept mit ID ${recipeId} erfolgreich gelöscht`))
    .catch(error => {
      console.error('Fehler beim Löschen:', error);
      response.status(500).send(`Fehler beim Löschen: ${error.message}`);
    });
}

const updateRecipe = (request, response) => {
  let db = connection.use(recipeDB);

  const recipeId = request.params.id;
  let updatedData = request.body;

  if (!recipeId) {
    return response.status(400).json({ error: 'Rezept-ID fehlt' });
  }

  if (!updatedData) {
    return response.status(400).json({ error: 'Es wurden keine Daten zum Aktualisieren bereitgestellt' });
  }

  updatedData = parseFormData(updatedData);

  if (request.file) {
    const imageUrl = request.file.path;
    updatedData.image = imageUrl ? imageUrl.replace(/\\/g, '/') : null;
  }

  db.get(recipeId)
    .then(doc => {
      const updatedDoc = { ...doc, ...updatedData };
      updatedDoc._id = doc._id;
      updatedDoc._rev = doc._rev;
      return db.insert(updatedDoc);
    })
    .then(() => response.status(200).send(`Rezept mit ID ${recipeId} erfolgreich aktualisiert`))
    .catch(error => {
      console.error('Fehler beim Aktualisieren:', error);
      response.status(500).send(`Fehler beim Aktualisieren: ${error.message}`);
    });
}

export { addNewRecipe, deleteRecipe, updateRecipe };