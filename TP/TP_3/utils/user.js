const Models = require('../models/models.js')
const db = require('../models/db.js')
const bcrypt = require('bcrypt-nodejs')


function insertIntoUsers (login, password) {
    return new Promise((resolve,reject) => {
        Models.Users.create({
            Name: login,
            password: generateHash(password),
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

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

module.exports = {insertIntoUsers, deleteUserById, getUsers}