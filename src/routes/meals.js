const express = require('express');
const {getAllMeals,getMealById,createMeal,updateMeal,deleteMeal} = require('../controllers/mealsController');

const router = express.Router();

router.get('/', getAllMeals);
router.get('/:id', getMealById);
router.post('/', createMeal);
router.put('/:id', updateMeal);
router.delete('/:id', deleteMeal);

module.exports = router;
