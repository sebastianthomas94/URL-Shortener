const authorization = (req, res, next) => {
    if (!req.session.auth)
        return res.status(401).json({ message: "unauthorized access" });
    next();
};

export { authorization };