const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET;
const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, secret);
            req.body._id = decoded?.userId;
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { authMiddleWare };