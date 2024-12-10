'use strict';

import cors from 'cors';
import express from 'express';

import { initDB } from './db/database.js';
import recipeRoutes from './routes/recipes.js';
import userRoutes from './routes/users.js';

const server = express();

server.use(express.static('public', {
  extensions: ['html']
}));

server.use('/uploads', express.static('uploads'));

server.use(cors());
server.use(express.json());

server.use('/recipes', recipeRoutes);
server.use('/user', userRoutes);

const init = () => {
  initDB();
  server.listen(5000, err => console.log(err || 'Server läuft'));
}

init();