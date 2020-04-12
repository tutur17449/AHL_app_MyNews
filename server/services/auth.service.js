var JwtStrategy = require('passport-jwt').Strategy;
var Users = require('../models/user.model');
const cookieName = process.env.COOKIE_NAME;

// JWT extract from cookie
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies){
      token = req.cookies[cookieName];
  }
  return token;
};


// JWT authentification
exports.authJWT = (passport) => {
  let opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Users.findOne({ _id: jwt_payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }))
}

exports.tokenExtractor = (req) => {
  let token = null;
  if (req && req.cookies){
      token = req.cookies[cookieName];
      passport.authenticate('jwt', (req,res)=>{
        console.log(req)
      })
      
      console.log(decryptToken)
  }
  return token;
};