const express = require("express");
const Route = express.Router();

const scoreController = require("../controllers/score");
const Auth = require("../helpers/auth");

Route
    .get('/', scoreController.getAllScores)
    .patch('/:id_user', scoreController.highScore)

module.exports = Route