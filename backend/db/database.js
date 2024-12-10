'use strict';

import nano from 'nano';

import credentials from '../data/credentials.json' with { type: 'json' };

const connection = nano(`http://${credentials.user}:${credentials.password}@${credentials.url}`).db;

const recipeDB = 'rezepte';
const userDB = 'user';

const initDB = () => {
  connection.list()
    .then(res => {
      if (!res.includes(recipeDB)) {
        return connection.create(recipeDB);
      }
      if (!res.includes(userDB)) {
        return connection.create(userDB);
      }
      return 'Datenbank mit dem Namen existiert bereits';
    }).then(
      console.log
    ).catch(
      console.warn
    );
}

export { initDB, connection, recipeDB, userDB };