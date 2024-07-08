const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(200).json({
                message: "User not logged in",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            console.log("Decoded", decoded);
            req.userId = decoded._id; // Set userId as a string
            next();
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
