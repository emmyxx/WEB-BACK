const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
    const foods = await Food.findAll();
    res.json(foods);
};

exports.getFoodById = async (req, res) => {
    const food = await Food.findByPk(req.params.id);

    if (food) {
        res.json(food);
    } else {
        res.status(404).json({ message: 'Food not found' });
    }
};

exports.createFood = async (req, res) => {
    const { name, price } = req.body;

    try {
        const newFood = await Food.create({ name, price });
        res.status(201).json(newFood);
    } catch (error) {
        res.status(400).json({ message: 'Error creating food', error });
    }
};

exports.updateFood = async (req, res) => {
    const { name, price} = req.body;
    const foodId = req.params.id;

    try {
        const [updatedRows] = await Book.update({ name, price }, { where: { id: foodId } });

        if (updatedRows > 0) {
            res.status(200).json({ message: 'Food updated successfully' });
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating food', error });
    }
};

exports.deleteFood = async (req, res) => {
    const foodId = req.params.id;

    try {
        const deletedRows = await Food.destroy({ where: { id: foodId } });

        if (deletedRows > 0) {
            res.status(200).json({ message: 'Food deleted successfully' });
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting food', error });
    }
};




