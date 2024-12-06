const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	todo: { type: String, required: true },
	userId: { type: String, required: true }, // To link the task to a user
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
