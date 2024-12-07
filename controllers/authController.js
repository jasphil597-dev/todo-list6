const User = require('../models/User');
const bcrypt = require('bcrypt');

// POST: Handle Sign Up
exports.signup = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		// Check if the username is already taken
		const userInDatabase = await User.findOne({ username });
		if (userInDatabase) {
			return res.status(400).send('Username already taken.');
		}

		//	Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		res.redirect('/login');
	} catch (error) {
		console.error('Signup error:', error);
		res.status(500).send('Internal server error');
	}
};

// POST: Handle Login
exports.login = async (req, res) => {
	try {
		// First, get the user from the database
		const userInDatabase = await User.findOne({ username: req.body.username });
		if (!userInDatabase) {
			return res.send('Login failed. Please try again.');
		}

		// Check if there is a user
		const validPassword = bcrypt.compare(
			req.body.password,
			userInDatabase.password
		);
		if (!validPassword) {
			return res.send('Login failed. Please try again.');
		}

		req.session.user = {
			username: userInDatabase.username,
			_id: userInDatabase._id,
		};

		res.redirect('/todo');
	} catch (error) {
		console.log(error);
		res.redirect('/');
	}
};

// GET: Logout
exports.logout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
};
