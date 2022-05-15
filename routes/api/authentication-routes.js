const passport = require('passport')
const bcrypt = require('bcrypt')
const router = require('express').Router();

//http://localhost:3001/api/users/login
router.post('/',
    passport.authenticate('local'), (req,res) => { 
        let validation_message = req['authInfo'].message; 
          switch(validation_message){
              case "USER_NOT_FOUND": 
                res.json("No User found with provided user name");
                break;
              case "WRONG_CREDS" :
                res.json("Credentials mismatch");
                break;
              case "SUCCESS":
                  res.json(req['user']);
          }
        }
   );

   module.exports = router;
  