const requestIssues = require('./request.service');
const Bookmark = require('../models/bookmark.model');

exports.getBookmarks = (req, res) => {
    Bookmark.findOne( {user: req.user._id}, (err, data) => {
        if(err){
            return requestIssues.badRequest(res, err, err);
        } else {
            return requestIssues.successRequest(res, data, data);
        }
    })
}

exports.addBookmark = (req, res) => {
    if (!req.body.user || !req.body.title || !req.body.subContent || !req.body.mainContent || !req.body.image || !req.body.source || !req.body.date) {
        requestIssues.badRequest(res, 'Merci de renseigner tous les champs', 'Merci de renseigner tous les champs');
    } else {
        let newBookmarkData = {
            user: req.user._id,
            title: req.body.title,
            subContent: req.body.subContent,
            mainContent: req.body.mainContent,
            image: req.body.image,
            source: req.body.source,
            date: req.body.date
        }
        let newBookmark = new Bookmark(newBookmarkData);
        newBookmark.save((err, data)=>{
          if(err) {
            requestIssues.badRequest(res, err, 'Le favori n\'a pas pu être ajouté.');    
          } else {
            requestIssues.successRequest(res, data, 'Le favori a été ajouté');       
          }    
        }) 
    }
}

exports.deleteBookmark = (req, res) => {
    if (!req.params.id || req.params.id === null) {
        requestIssues.badRequest(res, 'Merci de renseigner tous les champs', 'Merci de renseigner tous les champs');
    } else {
        Bookmark.findOneAndDelete( {_id: req.params.id}, (err, data) => {
            if(err) {
                requestIssues.badRequest(res, err, 'Le favori n\a pas pu être supprimé.');    
            } else {
                requestIssues.successRequest(res, data, 'Le favori est supprimé.');       
            }   
        })
    }
}

