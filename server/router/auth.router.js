const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const router = express.Router();
const { successRequest, badRequest } = require('../services/request.service');


class AuthRouterClass {
    constructor(){

    }

    routes(){
        router.get('/me', (req, res)=>{
            successRequest(res, {method: req.method, url: req.originalUrl}, 'ok me')
        })
        router.post('/login', (req, res)=>{
            successRequest(res, {method: req.method, url: req.originalUrl}, 'ok login')
        })
        router.post('/logout', (req, res)=>{
            successRequest(res, {method: req.method, url: req.originalUrl}, 'ok logout')      
        })
    }

    init(){
        this.routes()
        return router
    }
}

module.exports = AuthRouterClass