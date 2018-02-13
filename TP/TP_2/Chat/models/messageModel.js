const db = require('../db')
const Sequelize = require('sequelize')

const Message = db.define('message', {
	User: {
		type: Sequelize.STRING
	},
	Message: {
		type: Sequelize.STRING
	}

})

Message.sync()

module.exports = Message