'use strict';

var dataService     = require('../../services/user');

var controller = {}

controller.getAll     = getAll;

module.exports = controller;

function getAll(req,res){
  var perPage = 'itemsPerPage';
  var page = 'pagenumber';
  var name = req.param('query');
  var query = {
     $or: [
     { 'name.first' : new RegExp(name, 'i') },
     { 'name.last' : new RegExp(name, 'i') },
     { 'email' : new RegExp(name, 'i') }
     ]
    }
  if(req.param('pagenumber')!==undefined)
  {
    var page = Math.max(0, req.param('pagenumber'));
  }
  if(req.param('itemsPerPage')!==undefined)
  {
    var perPage = Math.min(25,req.param('itemsPerPage'));
  }
    
  dataService.getAll(page,perPage,query)
    .then(function(userList){
        if (userList){
            res.send(userList);
        }else {
            res.sendStatus(404);
        }
    })
    .catch(function (err){
        console.log("exception" + err);
        res.status(500).send(err);
    });
}

