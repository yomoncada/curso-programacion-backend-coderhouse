const isLoggedIn = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        return next(error);
    }
}

const canBeHere = (req, res, next)  => {
    try {
        if (req.isAuthenticated()) {
            next()
        } else {
            res.redirect('/unathorized')
        }
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    isLoggedIn,
    canBeHere
}