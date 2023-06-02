const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

const foodsRoutes = require('./routes/foods');
const commandsRoutes = require('./routes/commands.js');
const usersRoutes = require('./routes/appUsers');
const ingredientsRoutes = require('./routes/ingredients');
const mealsRoutes = require('./routes/meals');

const notFoundErrorHandler = require('./middlewares/notFoundErrorHandler');
const genericErrorHandler = require('./middlewares/genericErrorHandler');
const authenticate = require('./middlewares/authenticate');

const    app = express();

app.use(cors(
//     {
//     origin: 'http://127.0.0.1:5500'
// }
));

app.use(helmet());
// Exlication du fonction de .json() et .urlencoded() : https://stackoverflow.com/a/51844327
app.use(express.json()); // Transforme les requêtes entrantes JSON en objet JS 
app.use(express.urlencoded({ extended: true })); // Permet de lire les données des strings dans les requêtes entrantes 

// Middlewares personnalisés
// app.use(customMiddleware);

// // Routes
app.use('/foods', foodsRoutes);
// // Routes pour les commandes
app.use('/commands', commandsRoutes);
// // // Routes pour les utilisateurs
app.use('/appUsers', usersRoutes);
// // Routes pour les ingrédients
app.use('/ingredients', ingredientsRoutes);
// // // Routes pour les repas
app.use('/meals', mealsRoutes);

// Middlewares de gestion des erreurs
app.use(notFoundErrorHandler);
app.use(genericErrorHandler);
app.use(authenticate);

// Exporte le module app pour l'utiliser dans d'autres fichiers (index.js)
module.exports = app;
