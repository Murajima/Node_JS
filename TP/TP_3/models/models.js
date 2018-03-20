const db = require('../db')
const Sequelize = require('sequelize')

const Todo = db.define('todos', {
    Message: {
        type: Sequelize.STRING
    },
    Completion: {
        type: Sequelize.BOOLEAN
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

Todo.sync()

module.exports = {Todo}