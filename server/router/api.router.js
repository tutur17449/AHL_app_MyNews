const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const router = express.Router();
const { successRequest, badRequest } = require('../services/request.service');


class ApiRouterClass {
    constructor(){

    }

    routes(){
        router.get('/:endpoint', (req, res)=>{
            successRequest(res, req.params.endpoint, 'ok')
        })
    }

    init(){
        this.routes()
        return router
    }
}

module.exports = ApiRouterClass;