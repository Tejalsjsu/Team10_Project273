let express = require('express');
let router = express.Router();
let mysql = require('./mysql');
let bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(10);
let multer = require('multer');
let passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
let fname = "";


passport.serializeUser(function(user, done) {
    console.log("In serialize print id" +user.id);
    console.log("In serialize print userid" +user.userId);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        console.log("In deserialize");
        done(err, user);
    });
});


passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("username " +username+ " Pass " +password);
        let getUser = "select userId, userType, email, password from Users where email='"+username+"'";


        mysql.fetchData(function (err, results) {
            if (err) {
                errors = "Unable to find user";
                return done(null, false, { message: 'Incorrect username.', isCorrect : 'false' });
            } else {
                try{
                    if(results.length > 0) {
                        if (bcrypt.compareSync(password, results[0].password)) {
                            //if (reqPassword == results[0].password) {
                            console.log("session Initialized in passport");
                            console.log("Login successful");
                            return done(null, {"email": results[0].email,"userId" : results[0].userId, isCorrect: 'true'})
                        }
                        else {
                            console.log("Invalid Password");
                            return done(null, false, { message: 'Incorrect password.', isCorrect : 'false' });
                        }
                    } else {
                        console.log("Invalid UserName or Password! Please try again");
                        return done(null, {message: "Login failed", status: '401'});
                    }
                }catch(error){
                    console.log("Exception occured" + error.toString());
                }
            }
        }, getUser);
    }
));

// router.get('/verifyLogin', function(req, res, next) {
//     let reqUserEmail = req.query.email;
//     let reqPassword = req.query.password;
//
//     let getUser = "select userId, userType, email, password from Users where email='"+reqUserEmail+"'";
//     let errors = '';
//
//     passport.authenticate('local', function(err, user) {
//         console.log("In authenticate");
//         if(err) {
//             console.log("In err main" +err);
//             res.status(401).json({message: "Invalid Password or UserName", status: '401'});
//         } else {
//             if(user.isCorrect == 'false'){
//                 console.log("No matching username from db");
//                 return res.status(401).send({
//                     message: user.message,
//                     status: '401'
//                 });
//             }else{
//                 req.session.userId = user.userId;
//                 console.log("Success" +req.session.email);
//                 console.log(req.session.userId);
//                 console.log("session initilized");
//                 return res.status(201).send({
//                     message: "Login successful",
//                     status: '201',
//                     email: user.email,
//                     userId: req.session.userId
//                 });
//             }
//         }
//     })(req, res);
// });

 router.get('/verifyLogin', function(req, res, next) {
     let reqUserEmail = req.query.email;
     let reqPassword = req.query.password;

     let getUser = "select userId, userType, email, password from Users where email='"+reqUserEmail+"'";
     let errors = '';

     mysql.fetchData(function (err, results) {
         if (err) {
             errors = "Unable to find user";
             res.status(401).json(errors);
         } else {
             try{
                 if(results.length > 0) {
                     if (bcrypt.compareSync(reqPassword, results[0].password)) {
                     //if (reqPassword == results[0].password) {
                         req.session.userId = results[0].userId;
                         console.log("session Initialized ");
                         console.log("Login successful " +results[0].userId);
                         res.send({
                             message: "Login successful",
                             status: '201',
                             userId: results[0].userId,
                             isAdmin: results[0].userType,
                             token: req.session.id
                         })
                     }
                     else {
                         console.log("Invalid Password");
                         res.send({message: "Invalid Password or UserName", status: '401'});
                     }
                 } else {
                     console.log("Invalid UserName or Password! Please try again");
                     res.send({message: "Login failed", status: '401'});
                 }
             }catch(error){
                 console.log("Exception occured" + error.toString());
           }
         }
     }, getUser);
 });


router.get('/signup', function (req, res, next) {
    console.log(req.query.firstName);
    try{
        let reqUsername = req.query.firstName;
        let reqPassword = req.query.password;
        let reqEmail =  req.query.email;

        let hash = bcrypt.hashSync(reqPassword, salt);

        let putUser = "insert into Users (`firstName`,`password`, `email`) values " +
            "('"+reqUsername+"','" +hash+"','" +reqEmail+"')";

        console.log("Query is:"+putUser);

        mysql.fetchData(function(err,results){
            if(err){
                throw err;
            }
            else
            {
                if(results.affectedRows > 0){
                    console.log("valid Signup");
                    res.send({message: "Signup successful", status: '201'});
                }
                else {
                    console.log("Invalid Sign up");
                    res.send({message: "Could Not Signup", status: '401'});
                }
            }
        },putUser);
    }catch (error){
        console.log("Exception occured" + error.toString());
    }
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const username ="./public/profile/";
        cb(null,username);
    },
    filename: function (req, file, cb) {
        fname = req.session.email+file.originalname;
        cb(null,fname);
    }
});

let upload = multer({storage:storage});

router.post('/upload', upload.single('mypic'),function (req, res) {
    console.log("inside the upload folder");
    res.send({"status":201 , "data": "User file updated" ,"filename":fname});
})

router.get('/UpdateProfile', function (req, res, next) {
    console.log("In Post profile");
    let JSONReq = JSON.parse(req.query.userdata);
    let userId = req.session.userId;
    let reqFirstName = JSONReq.firstName;
    let reqEmail = JSONReq.email;
    let reqLastName = JSONReq.lastName;
    let reqAddress =  JSONReq.address;
    let reqPhone = JSONReq.phonenumber;
    let reqCity = JSONReq.city;
    let reqState = JSONReq.state;
    let reqZip = JSONReq.zipcode;
    let reqprofileImageURL = JSONReq.imgurl;
    let reqUserType = 0;
    console.log(JSONReq.email);
    let reqDate = Date.now();

    //let updateUsers = "update Users set firstName = ? , lastName = ?, address = ?,city= ?, state= ?, zipcode = ?, phoneNumber = ?, email = ?, profileImageUrl = ?  where userId = ?";
    let updateUsers = "update Users set firstName = '"+reqFirstName +"', lastName = '"+reqLastName +"', address = '"+ reqAddress+"',city= '"+reqCity +"', " +
        "state= '"+reqState +"',zipcode = '"+reqZip +"', phoneNumber = '"+reqPhone+"', email = '"+ reqEmail+"', profileImageUrl = '"+reqprofileImageURL +"'" +
        " where userId = "+userId;

    let params = [reqFirstName, reqLastName, reqAddress,reqCity, reqState, reqZip,reqPhone, reqEmail, reqprofileImageURL, userId  ];

    console.log("Query is: "+updateUsers);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else
        {
            if(results.affectedRows > 0){
                console.log("Records Updated");
                res.status(201).json({ status: '201', message: 'successfully Updated'});
            }
            else {
                console.log("Invalid Sign up");
                res.status(401).json({ status: '401'});
            }
        }
    },updateUsers);
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    console.log('Session destroyed');
    res.json({message: "Logout Success", status: '201'});
})

router.get('/fetchUserDetails', function(req, res, next) {
    let userId = req.session.userId;

    let getUser = "select userType, email, address, state, city, profileImageUrl, zipcode, firstName, lastName from Users where userId='"+userId+"'";
    let errors = '';

    mysql.fetchData(function (err, results) {
        if (err) {
            errors = "Unable to find user";
            res.status(401).json(errors);
        } else {
            try{
                if(results.length > 0) {
                        console.log("fetch successful " +results[0].userId);
                        res.send({
                            status: '201',
                            userId: results[0].userId,
                            isAdmin: results[0].userType,
                            firstName: results[0].firstName,
                            lastName: results[0].lastName,
                            email: results[0].email,
                            zipcode: results[0].zipcode,
                            address: results[0].address,
                            city: results[0].city,
                            state: results[0].state,
                            phonenumber: results[0].phoneNumber,
                            imgurl:results[0].profileImageUrl
                        });
                } else {
                    console.log("Invalid UserName or Password! Please try again");
                    res.send({message: "Login failed", status: '401'});
                }
            }catch(error){
                console.log("Exception occured" + error.toString());
            }
        }
    }, getUser);
});

router.post('/searchUser', function(req, res){
    console.log("Inside search User");
    console.log("request :: ",req.param("searchStr"));

    var searchUser="select * fandango.Users u where email = "+"'"+req.param("searchStr")+"'";
    console.log("search Query is:  "+searchUser);
    mysql.fetchData(function (error,results) {
        if(error){
            errors="Unable to find a user."
            res.status(400).json({error});
        }
        else{
            if(results.length > 0){
                var userData = {
                    userType : results[0].userType,
                    fName : results[0].firstName,
                    lName : results[0].lastName,
                    address : results[0].address,
                    city : results[0].city,
                    state : results[0].state,
                    zipcode : results[0].zipcode,
                    phoneNumber : results[0].phoneNumber,
                    email : results[0].email
                };
                // console.log("hall Data",hallData);
                console.log("movie id after if",results[0].hallId);
                console.log("movie hallName after if",results[0].hallName);
                console.log("movie movie_times after if",results[0].movie_times);

                //res.status(200).json({status:"OK"});
                res.send(hallData);
            }
        }
    },searchMvHall);
});


module.exports = router;
