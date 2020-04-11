const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const router = express.Router();
const { successRequest, badRequest } = require('../services/request.service');


class AuthRouterClass {
    constructor(){

    }

    routes(){
        router.get('/login', (req, res)=>{
            successRequest(res, req.body ,'ok login')
        })
        router.post('/register', (req, res)=>{
            console.log(req.body)
            successRequest(res, req.body ,'ok register')
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