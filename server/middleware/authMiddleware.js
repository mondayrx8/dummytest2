const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Get the token from the header
    const token = req.header('auth-token');

    // 2. Check if token exists
    if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

    try {
        // 3. Verify the token
        const verified = jwt.verify(token, "MY_SUPER_SECRET_KEY");
        req.user = verified; // Add the user data to the request
        next(); // Allow the request to continue
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};