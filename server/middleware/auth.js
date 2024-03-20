const auth = async(req, res, next) => {
    if (!req.session.user) return res.status(401).send()
    
    next();
}

module.exports = auth