const express = require("express");
const router = express.Router();
const User = require("../models/AppUser");
const jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize");
const SECRET_KEY = "your-secret-key";

// Afficher tous les utilisateurs
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un utilisateur
module.exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé" });
    }

    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// S'inscrire
module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Se connecter
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && user.password === password) {
      const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Connexion réussie", token: token });
    } else {
      res.status(401).json({ error: "Identifiants invalides" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
