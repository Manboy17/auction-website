export const veryIfAdmin = (req, res, next) => {
    if(!req.user.isAdmin) {
        return res.sendStatus(403); // forbidden
    }

    next();
};