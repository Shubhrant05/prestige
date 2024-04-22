import User from '../models/user-models.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const signupController = async (req, res) => {
    let userData = req.body;
    console.debug("User data on Signup : ", userData);

    if (userData.password === '' || userData.email === '' || userData.name === '') {
        return res.status(400).json('Please fill up the details');
    }
    if (userData.email.includes('@') === false) {
        return res.status(400).json('Please enter a valid email');
    }
    if (userData.password !== userData.confirmPassword) {
        return res.status(400).json('Confirm password and password are not matching');
    }
    if (userData.password.length < 6) {
        return res.status(400).json('Password should be atleast 6 characters long');
    }

    let hashedPassword = await bcryptjs.hash(userData.password, 10);
    let newUser = new User({
        name: userData.name,
        email: userData.email.toLowerCase(),
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

export const signinController = async (req, res) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) 
        return res.status(404).json('User not found!');

      const validPassword = bcryptjs.compareSync(password, validUser.password);

      if (!validPassword) 
        return res.status(401).json('Wrong Credentials!')

      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      res.status(500).json("[SERVER ERROR]"+error);
    }
  };