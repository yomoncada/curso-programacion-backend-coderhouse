const isLoggedIn = (req, res, next) => {
    if (req.session?.name) {
        next()
    } else {
        res.redirect('/app/auth/login')
    }
}

const canBeHere = (req, res, next)  => {
    if (req.session?.name) {
        next()
    } else {
        res.redirect('/app/auth/unathorized')
    }
}

module.exports = {
    isLoggedIn,
    canBeHere
}