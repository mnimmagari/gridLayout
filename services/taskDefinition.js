var Q = require('q');
var _ = require('underscore');
var bcrypt = require('bcryptjs');
var model                   = require('../model/taskDefinition')

// Service method definition -- Begin
var service = {};

service.getAll = getAll;

module.exports = service;


function getAll(page,perPage,query){
    var deferred = Q.defer();
    var header = [];
    header.push({
        'start' : page,
        'size' : perPage,
        'filter' : query
    })
    model.count(query,function(err, count){
    model.find(query)
    .limit(perPage)
    .skip(perPage*page)
    .exec(function(err, list){
        if(err) {
            console.log(err);
            deferred.reject(err);
        }
        else{
            deferred.resolve({totalCount:count,data:list});
        }
    })
    });

    return deferred.promise;
}

