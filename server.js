const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const methodOverride = require('method-override');
const authController = require('./controllers/authController');
const todoController = require('./controllers/todoController');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
// Session Configuration
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
	console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
mongoose.connection.on('error', (error) => {
	console.error('MongoDB connection error:', error);
});

// Routes
app.get('/', (req, res) => {
	if (req.session.userId) {
		res.redirect('/todo');
	} else {
		res.render('welcome');
	}
});

app.get('/signup', (req, res) => res.render('signup'));
app.post('/signup', authController.signup);
app.get('/login', (req, res) => res.render('login'));
app.post('/login', authController.login);
app.get('/logout', authController.logout);

app.get('/todo', todoController.getTodos);
app.post('/todo', todoController.addTodo);
app.post('/delete/:id', todoController.deleteTodo);
app.get('/todo/:id', todoController.getEditTodo);
app.put('/todo/:id', todoController.editTodo);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
	console.log(`The server is running on ${PORT}`);
});
