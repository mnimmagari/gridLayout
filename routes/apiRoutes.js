var express 					= require('express');
var router 						= express.Router();
var users					= require('../controllers/api/users');
var tasks					= require('../controllers/api/taskDefinition');

// function requireRole (role) {
//     return function (req, res, next) {
//         if (req.session.user && req.session.user.role === role) {
//             next();
//         } else {
//             res.send(403);
//         }
//     }
// }
//
// // All bars are protected
// app.all("/api/bar", requireRole("admin"));
//
// // All paths starting with "/foo/bar/" are protected
// app.all("/foo/bar/*", requireRole("user"));

router.get('/api/users', users.getAll);
router.get('/api/tasks', tasks.getAll);

module.exports = router;
