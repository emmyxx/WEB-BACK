const express = require('express');
const foodsController = require('../controllers/foodsController');

const router = express.Router();

router.get('/', foodsController.getAllFoods);
router.get('/:id', foodsController.getFoodById);
router.post('/', foodsController.createFood);
router.put('/:id', foodsController.updateFood);
router.delete('/:id', foodsController.deleteFood);

module.exports = router;
