const jwt = require("jsonwebtoken");

// file to check if user is authenticated or not
module.exports = (req, res, next) => {
    try {
        // check header for the token because token is stored in header
        const token = req.headers.authorization.split(" ")[1];
        req.userData = jwt.verify(token, process.env.JWT_KEY);
        // call next if successfully authenticated
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication failed"
        });
    }
};