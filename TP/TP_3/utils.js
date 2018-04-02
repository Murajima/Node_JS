const Models = require('./models/models.js')
const db = require('./db.js')

function insertIntoTodo (message) {
    return new Promise((resolve,reject) => {
        Models.Todo.create({
            Message: message,
            Completion: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            userId: 1
        }).then(() => {
            resolve("data saved")
        })
    })
}

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

function getTodos () {
    return new Promise((resolve, reject) =>{
        db.query("SELECT * FROM `todos`", { type: db.QueryTypes.SELECT}).then((todos) => {
            resolve(todos)
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

function getTodosOffset(Offset, Limit) {
	return new Promise((resolve, reject) => {
		Models.Todo.findAll({ offset: parseInt(Offset), limit: parseInt(Limit) }).then((todos) => {
			resolve(todos)
		})
	})
}

function deleteTodoById(Id) {
    return new Promise((resolve,reject) => {
        Models.Todo.destroy({
            where: {
            	id: parseInt(Id)
            }
        }).then(() => {
            resolve("data deleted")
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

function patchTodoById(Id) {
	return new Promise((resolve, reject) => {
		Models.Todo.update({
			Completion: true,
			updatedAt: Date.now()
		}, {
		  where: {
		    id: parseInt(Id)
		  }
		}).then(() => {
            resolve("DONE")
        })
	})
}

module.exports = {insertIntoTodo, getTodos, getTodosOffset, deleteTodoById, patchTodoById, insertIntoUsers, deleteUserById, getUsers}