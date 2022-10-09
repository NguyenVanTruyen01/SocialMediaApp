const { StatusCodes } = require('http-status-codes')
const Users = require('../Models/userModel');

const registerUser = async (req, res) => {

    const newUser = new Users({ ...req.body });

    try {
        const user = await Users.create(newUser);
        const token = user.createJWT();
        return res.status(StatusCodes.CREATED).json({ user: user.hiddenPassword(), token });
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(
            {
                message: error.message.startsWith('E11000 duplicate key error collection:')
                    ? "Email already exists" : error.message
            });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email: email });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email invalid. Please enter email again" })
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Password incorrect. Please enter pasword again" })
        }

        return res.status(StatusCodes.OK).json({ user: user.hiddenPassword(), token: user.createJWT() })

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }

}

module.exports = { registerUser, login }
