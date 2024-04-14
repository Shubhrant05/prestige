import User from '../models/user-models.js';
import bcrypt from 'bcryptjs';

export const signupController = async (req, res) => {
    let userData = req.body;
    console.debug("User data on Signup : ", userData);

    let exisitingUser = User.findOne({ email: userData.email });
    console.debug("Existing User : ", exisitingUser)

    if ( userData.password === '' || userData.email === '' || userData.name === '') {
        return res.status(400).json('Please fill up the details');
    }
    if (userData.email.includes('@') === false) {
        return res.status(400).json('Please enter a valid email');
    }
    if (userData.password !== userData.confirmPassword) {
        return res.status(400).json('Confirm password and password are not matching');
    }
    if(userData.password.length < 6) {
        return res.status(400).json('Password should be atleast 6 characters long');
    }

    let hashedPassword = await bcrypt.hash(userData.password, 10);
    let newUser = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword
    });

    await newUser.save().then(() => {
        console.log('User created');
        res.status(200).json('Signup Successfull');
    }).catch((err) => {
        console.log('Error while creating user', err);
        res.status(500).json('[SERVER ERROR] Error while creating user:' + err);
    });

}