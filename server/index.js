require('dotenv').config();
const express           = require('express');
const app               = express();
const mysql             = require('mysql');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const bcrypt            = require('bcrypt');
const saltRounds        = 10;
const cookieParser      = require('cookie-parser');
const expressSession    = require('express-session');
const jwt               = require('jsonwebtoken'); // Whenerv user logged in we want to create token

app.listen(3001, () => {
    console.log("Running on port 3001");
});

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'neprealestate'
});

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials:true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
    key:"userId",
    secret:"cryptography",
    resave:true,
    saveuninitialized:false,
    cookie:{
        expires:60*60*24,
    },
}));
app.post('/api/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const mobileNumber = req.body.mobileNumber;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err);
        }else{
            db.query("INSERT INTO users (name, email, password, mobile_number) VALUES (?, ?, ?, ?)", [name, email, hash, mobileNumber], (err, result) => {
               if(err){
                   res.send({success:false, message:err});
               }else{
                    res.send({success:true, message:result});
                    console.log("RAHUL MORE YOGESH MORE");
               }
            });
        }
    });
});
app.post('/api/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const sqlGet = "SELECT * FROM users WHERE email = ?";
    
    db.query(sqlGet, email, (err, result) => {
        if(err){
            res.send({error:err});
        }else{
            console.log(result);
        }
        if(result && result.length > 0){
            bcrypt.compare(password, result[0].password, (err, response) => {
                if(response){
                    const id = result[0].id;
                    const userEmail = result[0].email;
                    const user = {id:id, userEmail:userEmail};

                    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    // req.session.user = result;
                    res.json({auth:true, token:token});
                }else{
                    res.json({auth:false, message:"Wrong username & password Combination!"});
                }
            });
        }else{
            res.json({auth:false, message:"User doesn't exist!"});
        }
    });
});
app.post('/api/updateProfile', authenticateToken, (req, res) => {
    console.log(authenticateToken);

    var fullName = req.body.fullName;
    var userName = req.body.userName;
    var email = req.body.email;
    var phoneNumber = req.body.phoneNumber;
    var addressOne = req.body.addressOne;
    var addressTwo = req.body.addressTwo;
    var aboutMe = req.body.aboutMe;
    
     if (fullName === '' || userName === '' || email === '' || phoneNumber === '' || addressOne === '' || addressTwo === '' || aboutMe === ''){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userID = decode.id;
        
        var updateProfileSql = "UPDATE users SET  `name` = ?, `username` = ?, `email` = ?, `mobile_number` = ?, `address_one` = ?, `address_two` = ?, `about_me` = ? WHERE id = ? ";
    
        db.query(updateProfileSql, [fullName, userName, email, phoneNumber, addressOne, addressTwo, aboutMe, userID], (err, result) => {
            if(err) return res.send({success:false, message:err});
    
            return res.send({success:true, message:"Profile has been Saved successfully!"});
        });
    }else{
        return res.send({success:false, message:"All feilds are required!"});
    }

});
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    
    if(token === null) return res.send({success: false, message: "You are Unauthorized to access this page!"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.send({success: false, message: "Please login again!"});
        req.user = user;
        next();
    });
}