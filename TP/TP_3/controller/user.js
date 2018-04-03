const Models = require('../models/models.js')
const db = require('../models/db.js')


function insertIntoUsers (login, password) {
    return new Promise((resolve,reject) => {
        Models.Todo.create({
            Name: login,
            password: password,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }).then(() => {
            resolve("data saved")
        })
    })
}

function getUsers () {
    return new Promise((resolve, reject) =>{
        db.query("SELECT * FROM `users`", { type: db.QueryTypes.SELECT}).then((users) => {
            resolve(users)
        })
    })
}


function deleteUserById(Id) {
    return new Promise((resolve,reject) => {
        Models.Users.destroy({
            where: {
                id: parseInt(Id)
            }
        }).then(() => {
            resolve("data deleted")
        })
    })
}

module.exports = {insertIntoUsers, deleteUserById, getUsers}