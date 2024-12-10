'use strict';

import express from 'express';

import { addNewUser, getUser, addToFavorites, getAllFavorites, removeFromFavorites } from '../controller/user.js';

const router = express();

router.get('/', getUser);
router.post('/new-user', addNewUser);
router.patch('/add-favorite', addToFavorites);
router.get('/favorites/:username', getAllFavorites);
router.patch('/remove-favorite', removeFromFavorites);


export default router;