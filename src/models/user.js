const connection = require('../configs/db')

module.exports = {
  getUsers: (callback) => {
    connection.query(`SELECT * FROM users`, (err, result) => {
      if (err) console.log(err)

      callback(err, result)
    })
  },

  userDetail: (userid) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE id_user = ?', userid, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ?', data, (err, result) => {
        if (!err) {
          connection.query('INSERT INTO scores SET ?',{id_user : result.insertId, score : 0})
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id_user, email, fullname, role, created_at, updated_at, salt, password FROM users WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}