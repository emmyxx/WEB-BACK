const { Command, User, Meal } = require('../models/Command');

// CREATE
exports.createCommand = async (req, res) => {
    try {
        const command = await Command.create(req.body);
        await command.setMeals(req.body.mealIds);
        res.status(201).json(command);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ
exports.getAllCommands = async (req, res) => {
    try {
        const commands = await Command.findAll({
            include: [User, Meal]
        });
        res.status(200).json(commands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCommandById = async (req, res) => {
    try {
        const command = await Command.findByPk(req.params.id, {
            include: [User, Meal]
        });
        if (command) {
            res.status(200).json(command);
        } else {
            res.status(404).json({ message: 'Command not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
exports.updateCommand = async (req, res) => {
    try {
        const command = await Command.findByPk(req.params.id);
        if (command) {
            await command.update(req.body);
            if (req.body.mealIds) {
                await command.setMeals(req.body.mealIds);
            }
            res.status(200).json(command);
        } else {
            res.status(404).json({ message: 'Command not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
exports.deleteCommand = async (req, res) => {
    try {
        const command = await Command.findByPk(req.params.id);
        if (command) {
            await command.destroy();
            res.status(200).json({ message: 'Command deleted' });
        } else {
            res.status(404).json({ message: 'Command not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
