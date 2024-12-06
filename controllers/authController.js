const User = require('../models/User');
const bcrypt = require('bcrypt');

// POST: Handle Sign Up
exports.signup = async (req, res) => {
	console.log('2222222');
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

// 	const { username, email, password } = req.body;

// 	try {
// 		// Hash the password
// 		const hashedPassword = await bcrypt.hash(password, 10);

// 		// Create a new user
// 		const newUser = new User({
// 			username: username.toLowerCase(), // Convert to lowercase before saving
// 			email,
// 			password: hashedPassword, // Save the hashed password
// 		});

// 		await newUser.save(); // Save the user to the database

// 		// Set session to log in user immediately
// 		req.session.user = newUser;

// 		// Redirect to the to-do page
// 		res.redirect('/todo');
// 	} catch (err) {
// 		console.error('Error signing up:', err);
// 		res.status(500).send('Error signing up');
// 	}
// };

// POST: Handle Login
exports.login = async (req, res) => {
	console.log('111111');
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

		// There is a user AND they had the correct password. Time to make a session!
		// Avoid storing the password, even in hashed format, in the session
		// If there is other data you want to save to `req.session.user`, do so here!
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

// 	const { username, password } = req.body;

// 	try {
// 		// const user = await User.findOne({ username: username.toLowerCase() }); // Query in lowercase

// 		const user = await User.findOne({ username });
// 		if (!user) {
// 			return res.status(401).json({ message: 'User not found' });
// 		}

// 		if (user.password !== password) {
// 			return res.status(401).json({ message: 'Incorrect password' });
// 		}

// 		req.session.user = user;
// 		res.redirect('/todo'); // Redirect to to-do page
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({ message: 'Something went wrong' });
// 	}
// };

// GET: Logout
exports.logout = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/');
	});
};
