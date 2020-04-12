const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { getBookmarks, addBookmark, deleteBookmark } = require('../services/bookmark.service');
const passport = require('passport');

class ApiRouterClass {
    constructor(){

    }

    routes(){
        router.post('/bookmark', passport.authenticate('jwt', { session: false }), (req, res)=>{
            addBookmark(req, res)
        })
        router.get('/bookmark', passport.authenticate('jwt', { session: false }), (req, res)=>{
            getBookmarks(req, res)
        })
        router.delete('/bookmark/:id', (req, res)=>{
            deleteBookmark(req, res)
        })
    }

    init(){
        this.routes()
        return router
    }
}

module.exports = ApiRouterClass;