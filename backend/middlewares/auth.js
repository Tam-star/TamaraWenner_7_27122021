const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if(!req.cookies['groupomania-jwt']){
            const message = 'Vous n\'êtes pas autorisé à effectuer cette action'
            return res.status(401).json({ message })
        }
        //On récupère le token dans le cookie 
        const token = req.cookies['groupomania-jwt']
        const decodedToken = jwt.verify(token, 'GROUPOMANIA_SECRET_TOKEN');
        const userId = decodedToken.userId;
        req.auth = { userId: userId };
        if (req.body.userId && req.body.userId !== userId) {
            console.log('Invalid user ID')
            throw new Error('Invalid user ID');

        } else {
            next();
        }
    } catch (error){
        res.status(401).json({ message : error.message })
    }
};

