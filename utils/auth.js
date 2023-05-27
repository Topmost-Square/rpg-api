const jwt = require('jsonwebtoken');
const authorize = () => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({error: 'Unauthorized'});
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res
                .status(401)
                .json({ error: 'Unauthorized' });
        }

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res
                .status(401)
                .json({ error: 'Unauthorized' });
        }

        req.user = payload;

        next();
    }
}

module.exports = {
    authorize
};