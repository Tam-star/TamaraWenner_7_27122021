const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    skipSuccessfulRequests : true,
    message:
        "Le nombre de tentative est limitée à 3, veuillez ré-essayez dans 30 minutes"
});

module.exports = loginLimiter;