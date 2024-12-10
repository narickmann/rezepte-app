'use strict';

import express from 'express';
import multer from 'multer';
import path from 'path';

import { getAllRecipes, getRecipesByName, getRecipesByIngredients, getRecipesByCategory, getRecipeById, getUserRecipes } from '../controller/get_Recipes.js';
import { addNewRecipe, deleteRecipe, updateRecipe } from '../controller/post_Recipes.js';

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (request, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const router = express();

router.get('/', getAllRecipes);
router.get('/search', getRecipesByName);
router.get('/ingredients', getRecipesByIngredients);
router.get('/category', getRecipesByCategory);
router.get('/:id', getRecipeById);
router.get('/user-recipes/:username', getUserRecipes);

router.post('/new-recipe', upload.single('image'), addNewRecipe);
router.put('/update-recipe/:id', upload.single('image'), updateRecipe);
router.delete('/delete-recipe/:id', deleteRecipe);

export default router;