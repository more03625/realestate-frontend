require('dotenv').config();
const express           = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const app               = express();
const mysql             = require('mysql');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const bcrypt            = require('bcrypt');
const saltRounds        = 10;
const cookieParser      = require('cookie-parser');
const expressSession    = require('express-session');
const jwt               = require('jsonwebtoken'); // Whenerv user logged in we want to create token
const multer = require('multer');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// const multert.diskStorage({
//     destination:(req,res,cb) => {
//         cb(null, './assets/images')
//     },
//     fileName
// });

// const upload = multer({storage:storage})
app.listen(3001, () => {
    console.log("Running on port 3001");
});

app.use(fileUpload({
    createParentPath:true
}));
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

// app.use(expressSession({
//     key:"userId",
//     secret:"cryptography",
//     resave:true,
//     saveuninitialized:false,
//     cookie:{
//         expires:60*60*24,
//     },
// }));
app.post('/api/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const mobileNumber = req.body.mobileNumber;
    const mailVerificationKey = crypto.randomUUID();

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err);
        }else{
            db.query("INSERT INTO users (name, email, password, mobile_number, mail_verification_key) VALUES (?, ?, ?, ?, ?)", [name, email, hash, mobileNumber, mailVerificationKey], (err, result) => {
               if(err){
                   res.send({success:false, message:err});
               }else{
                    res.send({success:true, message:"Registration has been completed!"});
                    mailVerification(email, mailVerificationKey);
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
                    const user = {id:id};

                    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    // req.session.user = result;
                    res.json({auth:true, token:token});
                }else{
                    res.json({auth:false, message:"Wrong username & password Combination!"});
                }
            });
        }else{
            res.json({auth:false, message:"Invalid username or password!"});
        }
    });
});
app.post('/api/updateProfile', authenticateToken, (req, res) => {

    var fullName = req.body.fullName;
    var userName = req.body.userName;
    var email = req.body.email;
    var phoneNumber = req.body.phoneNumber;
    var addressOne = req.body.addressOne;
    var addressTwo = req.body.addressTwo;
    var aboutMe = req.body.aboutMe;

    // console.log(req.body);
    
    //  if (fullName === '' || userName === '' || email === '' || phoneNumber === '' || addressOne === '' || addressTwo === '' || aboutMe === ''){

        if(!req.files){
            return res.send({
                status:false,
                message:"No files"
            });
        }else{
            const {picture} = req.files.img;
            console.log(picture);
            // picture.mv("./uploads" + picture.name);

            return res.send({
                status:false,
                message:"File has been uploaded!"
            });
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userID = decode.id;
        
        var updateProfileSql = "UPDATE users SET  `name` = ?, `username` = ?, `email` = ?, `mobile_number` = ?, `address_one` = ?, `address_two` = ?, `about_me` = ? WHERE id = ? ";
    
        db.query(updateProfileSql, [fullName, userName, email, phoneNumber, addressOne, addressTwo, aboutMe, userID], (err, result) => {
            if(err) return res.send({success:false, message:err});
    
            return res.send({success:true, message:"Profile has been Saved successfully!"});
        });
    // }
    // else{
    //     return res.send({success:false, message:"All feilds are required!"});
    // }

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

function mailVerification(toMail, mailVerificationKey){
    var transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        port:process.env.MAIL_PORT,
        secure:false,
        requireTLS:process.env.requireTLS,
        auth:{
            user:process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD
        }
    });
    
    var mailOptions = {
        from:process.env.MAIL_USERNAME,
        to:toMail,
        subject:"Please verify your email!",
        text:"This is for email verification! Please click on this link",
        html:`<p>Please Click on <a href=${process.env.BASE_URL+ "email-verification/" +mailVerificationKey}>this link</a> to verify your email!</p>`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error) return console.log(error);
    
        console.log("email has been sent successfully" + info.response);
    });
}