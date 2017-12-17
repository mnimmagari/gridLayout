'use strict';

var Q               = require('q');
var _ 				= require('underscore');
//var model           = require('../../model/user');

// Service method definition -- Begin
// var service = {};
//
// service.getAll = getAll;
// service.create = create;
//
// service.getOneById = getOneById;
// service.updateById = updateById;
// service.deleteById = deleteById;


module.exports = function(model){
var module={};
module.getAll = function(page,perPage,query){

    console.log("--------- in getAll of service  page,perPage,sort,query,fields = ", page,perPage,query)
    var deferred = Q.defer();
    var header = [];
    header.push({
        'start' : page,
        'size' : perPage,
        'filter' : query
    })

    model.count(query,function(err, count){
      console.log(count);
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

// // var module = {}
// function getAll(page,perPage,query){
//     var deferred = Q.defer();
//     var header = [];
//     header.push({
//         'start' : page,
//         'size' : perPage,
//         'filter' : query
//         // 'sort' : sort,
//         // 'fields' : fields
//     })
//     model
//     .find(query)
//     .limit(perPage)
//     .skip(perPage*page)
//     .sort(sort)
//     .select(fields)
//     .exec(function(err, list){
//         if(err) {
//             console.log(err);
//             deferred.reject(err);
//         }
//         else
//             deferred.resolve(
//                 {
//                     'list':list,
//                     'header':header
//                 });
//     });
//
//     return deferred.promise;
// } // getAll method ends

function getOneById(id){
    var deferred = Q.defer();

    model
        .findOne({ _id: id })
        .exec(function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else
                deferred.resolve(item);
        });

    return deferred.promise;
} // gentOneById method ends

function create(data) {
    var deferred = Q.defer();

    console.log("Saving Group........");
    console.log(data);
    model.create(data, function (err, doc) {
        if (err) {
            console.log("err- " + err);
            deferred.reject(err);
        }
        else
        {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function updateById(id, data) {
    var deferred = Q.defer();

    model.findByIdAndUpdate(id, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else
            deferred.resolve(doc);
    });

    return deferred.promise;
}

function deleteById(id) {
    var deferred = Q.defer();

    model.findByIdAndRemove(id, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else{
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}
return module;
}
