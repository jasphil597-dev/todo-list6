const Todo = require('../models/Todo');
const mongoose = require('mongoose');

// GET: To-Do List Page
exports.getTodos = async (req, res) => {
	if (!req.session.user._id) {
		return res.redirect('/login');
	}

	try {
		const todos = await Todo.find({ userId: req.session.user._id });
		res.render('index', { todos });
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
};

// POST: Add New Todo
exports.addTodo = async (req, res) => {
	if (!req.session.user._id) {
		return res.redirect('/login');
	}

	const todo = req.body.todo;
	try {
		const newTodo = new Todo({ todo, userId: req.session.user._id });
		await newTodo.save();
		res.redirect('/todo');
	} catch (err) {
		console.error(err);
		res.status(500).send('Error saving todo.');
	}
};

// POST: Delete Todo
exports.deleteTodo = async (req, res) => {
	if (!req.session.user._id) {
		return res.redirect('/login');
	}

	try {
		await Todo.findByIdAndDelete(req.params.id);
		res.redirect('/todo');
	} catch (err) {
		console.error(err);
		res.status(500).send('Internal Server Error');
	}
};

// GET: Edit Task
exports.getEditTodo = async (req, res) => {
	try {
		const todoId = req.params.id;

		// Check if the taskId is valid before querying
		if (!mongoose.Types.ObjectId.isValid(todoId)) {
			return res.status(400).send('Invalid Todo ID.');
		}

		const todo = await Todo.findById(todoId);

		if (!todo) {
			return res.status(404).send('Todo not found.');
		}

		// Using the callback version of findById
		// Tod o.findById(todoId, (err, todo) => {
		// 	console.log(err, todo);

		// If no errors, render the edit page
		res.render('edit', { todo });
	} catch (err) {
		console.error('Error finding todo:', err);
		res.status(500).send('Error finding todo.');
	}
};

// POST: Update Task
exports.editTodo = async (req, res) => {
	if (!req.session.user._id) {
		return res.redirect('/login');
	}
	await Todo.findByIdAndUpdate(req.params.id, { todo: req.body.todo });
	res.redirect('/todo');
};
