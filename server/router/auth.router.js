const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const router = express.Router();
const { successRequest, badRequest } = require('../services/request.service');
const { userRegister, userLogin, userLogout } = require('../services/user.service');


class AuthRouterClass {
    constructor(){

    }

    routes(){
        router.post('/login', (req, res)=>{
            userLogin(req, res)
        })
        router.post('/register', (req, res)=>{
            userRegister(req, res)
        })
        router.get('/logout', (req, res)=>{
            userLogout(req, res)
        })
    }

    init(){
        this.routes()
        return router
    }
}

module.exports = AuthRouterClass