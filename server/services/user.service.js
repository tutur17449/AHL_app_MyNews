const requestIssues = require('./request.service');
const Users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretJwt = process.env.JWT_SECRET;

exports.userRegister = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.pseudo) {
        requestIssues.badRequest(res, 'Merci de renseigner tous les champs', 'Merci de renseigner tous les champs');
    } else {
        user = new Users({
            email: req.body.email,
            password: req.body.password,
            pseudo: req.body.pseudo
        })
        user.save((err, user) => {
            if (err) {
                requestIssues.badRequest(res, err, 'L\'utilisateur existe déjà')
            } else {
                requestIssues.successRequest(res, user, 'utilisateur créé')
            }
        })
    }
}

exports.userLogin = (req, res) => {
    Users.findOne({ email: req.body.email }, (err, data) => {
        if (err || data === null) {
            requestIssues.badRequest(res, err, 'cannot auth')
        } else {
            console.log(data)
            let user = {
                id: data._id,
                email: data.email,
            }
            const validPwd = bcrypt.compareSync(req.body.password, data.password);

            if (!validPwd) {
                requestIssues.badRequest(res, validPwd, 'password not verified')
            } else {
                let cookieName = process.env.COOKIE_NAME;
                let token = jwt.sign(
                    user,
                    secretJwt,
                    { expiresIn: "1h" }
                )

                res.cookie(
                    cookieName,
                    token,
                    { htttpOnly: true }
                )

                requestIssues.successRequest(res, 'user log', 'user log')
            }
        }
    })
}


exports.userLogout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
}