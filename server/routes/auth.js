const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');
const app=require('../app')

const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      console.log('req.login ')
      console.log(user)

      
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}


// SIGNUP
router.post('/signup', (req, res, next) => {

  const {username, password} = req.body;

  

  // Check for non empty user or password
  if (!username || !password){
    next(new Error('You must provide valid credentials'));
  }

  // Check if user exists in DB
  User.findOne({ username })
  .then( foundUser => {
    if (foundUser) throw new Error('Username already exists');

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    return new User({
      username,
      password: hashPass
    }).save();
  })
  .then( savedUser => login(req, savedUser)) // Login the user using passport
  .then( user => res.json({status: 'signup & login successfully', user})) // Answer JSON
  .catch(e => next(e));
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    
    // Check for errors
    if (err) next(new Error('Something went wrong')); 
    if (!theUser) next(failureDetails)

    // Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));

  })(req, res, next);
});


router.get('/currentuser', (req,res,next) => {
  if(req.user){
    res.status(200).json(req.user);
  }else{
    next(new Error('Not logged in'))
  }
})


router.get('/logout', (req,res) => {
  req.logout();
  res.status(200).json({message:'logged out'})
});


router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
})





//GOOGLE
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const fs = require('fs');
const { google } = require('googleapis')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3010/api/auth/google/callback"
},
  function (req, accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id })
      .then(foundUser => {
        if (foundUser) {
          
          return done(null,foundUser)
        } else {
          User.create({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value
          })
            .then(savedUser => done(null, savedUser)) // Login the user using passport
            .catch(e => console.log(e));
        }
      })
  }))

    



router.get('/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/calendar.events',
    ]
  }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('http://localhost:3000/Home');
  });



  // router.get('/calendar',(req,res)=>{
  //   function listEvents(auth) {
  //     const calendar = google.calendar({ version: 'v3', auth });
  //     calendar.events.list({
  //       calendarId: 'primary',
  //       timeMin: (new Date()).toISOString(),
  //       maxResults: 10,
  //       singleEvents: true,
  //       orderBy: 'startTime',
  //     }, (err, res) => {
  //       if (err) return console.log('The API returned an error: ' + err);
  //       const events = res.data.items;
  //       if (events.length) {
  //         console.log('Upcoming 10 events:');
  //         events.map((event, i) => {
  //           const start = event.start.dateTime || event.start.date;
  //           console.log(`${start} - ${event.summary}`);
  //         });
  //       } else {
  //         console.log('No upcoming events found.');
  //       }
  //     });
  //   }
  // })






module.exports = router;
