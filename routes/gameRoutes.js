const express = require('express')
const router = express.Router();
const Game = require('../models/Game')

const gameController = require ('../controllers/gameControllers')

//middleware goes between path and gamecontroller
router.get('/', gameController.getAllGames );
router.get('/:id', gameController.getSingleGame);
router.post('/create', gameController.createGame);
router.put('/update/:id', gameController.updateGame);
router.delete('/delete', gameController.delete);

module.exports = router;