const db = require('../db')
const Message = db.define('message', {
	User: {
		type: Sequelize.STRING
	},
	Message: {
		type: Sequelize.STRING
	}

})

module.exports = Message