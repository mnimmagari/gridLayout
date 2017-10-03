var express 					= require('express');
var router 						= express.Router();
var users					= require('../controllers/api/users');


router.get('/api/users', users.getAll);


module.exports = router;