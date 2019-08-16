const scoreModels = require("../models/score");
const MiscHelper = require("../helpers/helpers");

const jwt = require("jsonwebtoken");

module.exports = {
  getAllScores: (req, res) => {
    scoreModels
      .getAllScores()
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log(err);
      });
  },

  highScore: (req, res) => {
    const data = {
      score: req.body.score
    };

    const id_user = req.params.id_user;
    scoreModels
      .highScore(data, id_user)
      .then(result => {
        if (result.affectedRows == 0) {
          res.json({
            message: `previous score is higher than ${req.body.score} or equal`
          });
        } else {
          res.json(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
