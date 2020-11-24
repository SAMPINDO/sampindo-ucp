const express = require('express');
const User = require('../core/user');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();
router.get('/register', (req, res, next) => {
    res.render('register', {layout:false});
})

// Get the index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
    if(user) {
        res.render('index', {opp:req.session.opp, username:user.fullname});
        return;
    }
    // IF not we just send the index page.
    res.render('login', {layout:false});
})
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    if(req.body.username == '' || req.body.username == undefined || req.body.password == undefined || req.body.password == '') 
	return res.render('login', {err2:true, layout:false});
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/');
        }else {
            // if the login function returns null send this error message back to the user.
            res.render('login', {err1:true, layout:false});
        }
    })

});


// Post register data
router.post('/register', (req, res, next) => {
    // prepare an object containing all user inputs.
        if(req.body.username == '' || req.body.username == undefined || req.body.password == undefined || req.body.password == '') 
	return res.render('register', {err2:true, layout:false});
    console.log(req.body.username);
    let userInput = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    try {
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/');
            });

        }else {
            res.render('register', {err1:true, layout:false});
        }
    });
    } catch(err) {console.log(err)}
});


// Get loggout page
router.post('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});


module.exports = router;