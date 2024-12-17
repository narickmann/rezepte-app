'use strict';

import { connection, userDB, recipeDB } from '../db/database.js';

const addNewUser = (request, response) => {
  let db = connection.use(userDB);

  const user = request.body;
  const username = request.body.username;

  if (!user || !username) {
    return response.status(400).json({ error: 'Bitte einen Benutzernamen angeben' });
  }

  db.find({
    selector: { username: { $eq: username } }
  })
    .then(result => {
      if (result.docs.length > 0) {
        return response.status(400).json({ error: 'Benutzername bereits vergeben.' });
      }

      db.insert(user)
        .then(() => response.status(200).json(`Nutzer erfolgreich hinzugefügt`))
        .catch((error) => {
          console.error('Fehler beim Hinzufügen des Nutzers:', error);
          response.status(500).json({ error: 'Fehler beim Hinzufügen des Nutzers' });
        });
    })
    .catch((error) => {
      console.error('Fehler bei der Benutzersuche:', error);
      response.status(500).json({ error: 'Fehler bei der Benutzersuche' });
    });
}

const getUser = (request, response) => {
  let db = connection.use(userDB);
  const user = request.query.username;

  if (!user) {
    return response.status(400).json({ error: 'Beutzername fehlt' });
  }

  db.find({ selector: { username: { $eq: user } } })
    .then(res => {
      if (res.docs.length === 0) {
        return response.status(404).json({ error: 'Benutzername nicht gefunden' });
      }
      return response.json(res.docs[0]);
    })
    .catch(error => {
      return response.status(500).send(`Fehler bei der Suche: ${error}`);
    })
}

const getAllFavorites = (request, response) => {
  let userDb = connection.use(userDB);
  let recipeDb = connection.use(recipeDB);

  const { username } = request.params;

  if (!username) {
    return response.status(400).json({ error: 'Benutzername fehlt' });
  }

  userDb.find({ selector: { username: username } })
    .then(userResult => {
      if (userResult.docs.length === 0) {
        return response.status(404).json({ error: 'Benutzer nicht gefunden' });
      }

      const user = userResult.docs[0];
      const favoriteIds = user.favorites;

      if (favoriteIds.length === 0) {
        return response.status(200).json({ recipes: [] });
      }

      recipeDb.find({ selector: { _id: { $in: favoriteIds } } })
        .then(recipeResult => {
          response.status(200).json({ recipes: recipeResult.docs });
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Rezepte:', error);
          response.status(500).json({ error: 'Fehler beim Abrufen der Rezepte' });
        });
    })
    .catch(error => {
      console.error('Fehler bei der Benutzersuche:', error);
      response.status(500).json({ error: 'Fehler beim Abrufen der Favoriten' });
    });
}

const addToFavorites = (request, response) => {
  let db = connection.use(userDB);
  const { username, recipeId } = request.body;

  if (!username || !recipeId) {
    return response.status(400).json({ error: 'Benutzername oder Rezept-ID fehlt' });
  }

  db.find({ selector: { username: username } })
    .then(result => {
      if (result.docs.length === 0) {
        return response.status(404).json({ error: 'Benutzer nicht gefunden' });
      }

      const user = result.docs[0];

      if (user.favorites.includes(recipeId)) {
        return response.status(400).json({ error: 'Rezept ist bereits in den Favoriten' });
      }

      user.favorites.push(recipeId);

      db.insert(user)
        .then(() => response.status(200).json({ success: true, message: 'Rezept zu den Favoriten hinzugefügt' }))
        .catch(error => {
          console.error('Fehler beim Aktualisieren der Benutzer-Daten:', error);
          response.status(500).json({ error: 'Fehler beim Hinzufügen des Rezepts zu den Favoriten' });
        });
    })
    .catch(error => {
      console.error('Fehler bei der Benutzersuche:', error);
      response.status(500).json({ error: 'Fehler bei der Benutzersuche' });
    });
}

const removeFromFavorites = (request, response) => {
  let db = connection.use(userDB);
  const { username, recipeId } = request.body;

  if (!username || !recipeId) {
    return response.status(400).json({ error: 'Benutzername oder Rezept-ID fehlt' });
  }

  db.find({ selector: { username } })
    .then(result => {
      if (result.docs.length === 0) {
        return response.status(404).json({ error: 'Benutzer nicht gefunden' });
      }

      const user = result.docs[0];

      const updatedFavorites = user.favorites.filter(fav => fav !== recipeId);
      user.favorites = updatedFavorites;

      db.insert(user)
        .then(() => response.status(200).json({ success: true, message: 'Rezept aus den Favoriten entfernt' }))
        .catch(error => {
          console.error('Fehler beim Aktualisieren der Benutzer-Daten:', error);
          response.status(500).json({ error: 'Fehler beim Entfernen des Rezepts aus den Favoriten' });
        });
    })
    .catch(error => {
      console.error('Fehler bei der Benutzersuche:', error);
      response.status(500).json({ error: 'Fehler bei der Benutzersuche' });
    });
}

export { addNewUser, getUser, addToFavorites, getAllFavorites, removeFromFavorites };