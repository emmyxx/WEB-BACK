const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// CREATE

exports.createMeal = async (req, res) => {
    try {
      const { name, description, price, image } = req.body;
      const meal = await Meal.create({ name, description, price, image });
      res.status(201).json(meal);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue lors de la création du meal.' });
    }
  };

// READ

exports.getAllMeals = async (req, res) => {
  try {
    const Meals = await Meal.findAll();
    res.status(200).json(Meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMealById = async (req, res) => {
  try {
    const Meal = await Meal.findByPk(req.params.id);
    if (Meal) {
      res.status(200).json(Meal);
    } else {
      res.status(404).json({ message: 'Ingrédient non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE

exports.updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description,price, image } = req.body;
    const Meal = await Meal.findByPk(id);
    if (!Meal) {
      return res.status(404).json({ error: 'Ingrédient non trouvé.' });
    }
    Meal.name = name;
    Meal.description = description;
    Meal.price = price;
    Meal.image = image;
    await Meal.save();
    res.json(Meal);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'ingrédient.' });
  }
};

// DELETE

exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const Meal = await Meal.findByPk(id);
    if (!Meal) {
      return res.status(404).json({ error: 'Ingrédient non trouvé.' });
    }
    await Meal.destroy();
    res.json({ message: 'Ingrédient supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'ingrédient.' });
  }
};

