const connection = require("../configs/db");

module.exports = {
  getAllScores: () => {
    let sql = `select scores.*, users.fullname from scores inner join users on users.id_user = scores.id_user order by scores.score desc`;
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
          if (!err) {
              resolve(result)
          } else {
              reject(err)
          }
      })
    });
  },
  highScore: (data, id_user) => {
    let sql = `update scores set ? where id_user = ? AND scores.score < ?`;
    return new Promise((resolve, reject) => {
        connection.query(sql, [data,id_user,data.score], (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
  }
};
