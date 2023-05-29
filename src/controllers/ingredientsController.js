const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// CREATE

exports.createIngredient = async (req, res) => {
    try {
      const { name, description, image } = req.body;
      const ingredient = await Ingredient.create({ name, description, image });
      res.status(201).json(ingredient);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'ingrédient.' });
    }
  };
  

// READ

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (ingredient) {
      res.status(200).json(ingredient);
    } else {
      res.status(404).json({ message: 'Ingrédient non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE

exports.updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingrédient non trouvé.' });
    }
    ingredient.name = name;
    ingredient.description = description;
    ingredient.image = image;
    await ingredient.save();
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'ingrédient.' });
  }
};

// DELETE

exports.deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingrédient non trouvé.' });
    }
    await ingredient.destroy();
    res.json({ message: 'Ingrédient supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'ingrédient.' });
  }
};

