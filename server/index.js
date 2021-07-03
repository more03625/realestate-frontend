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

app.post('/api/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const userType = req.body.userType;
    const password = req.body.password;
    const mobileNumber = req.body.mobileNumber;
    const mailOTP = Math.floor(100000 + Math.random() * 900000);
    const phoneOTP = Math.floor(100000 + Math.random() * 900000);

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err);
        }else{
            db.query("INSERT INTO users (name, email, user_type, password, mobile_number, phone_otp, mail_otp) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, email, userType, hash, mobileNumber, phoneOTP, mailOTP], (err, result) => {
               if(err){
                   res.send({success:false, message:err});
               }else{
                    res.send({success:true, message:"Registration has been completed!"});
                    mailVerification(email, mailOTP);
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
                    res.json({auth:true, token:token, result:result});
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

    var fullName    = req.body.fullName;
    var email       = req.body.email;
    var phoneNumber = req.body.phoneNumber;
    var aboutMe     = req.body.aboutMe;

    
    //  if (fullName === '' || userName === '' || email === '' || phoneNumber === '' || addressOne === '' || addressTwo === '' || aboutMe === ''){

        if(!req.files){
            return res.send({
                status:false,
                message:"No files"
            });
        }else{
            // console.log(req.files.img);
            // const picture = req.files.img;

            // console.log(picture.name);
            // picture.mv("./uploads" + picture.name);//

            return res.send({
                status:false,
                message:"File has been uploaded!"
            });
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
    
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userID = decode.id;
        
        var updateProfileSql = "UPDATE users SET  `name` = ?, `email` = ?, `mobile_number` = ?, `about_me` = ? WHERE id = ? ";
    
        db.query(updateProfileSql, [fullName, email, phoneNumber, aboutMe, userID], (err, result) => {
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

function mailVerification(toMail, mailOTP){
    console.log("env start");

    console.log(process.env.MAIL_HOST);
    console.log(process.env.MAIL_PORT);
    console.log(process.env.MAIL_USERNAME);
    console.log(process.env.MAIL_PASSWORD);
    console.log("env end");
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
        html:`<h3>Your OTP is: ${mailOTP}</h3>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error) return console.log(error + "Mail error");
    
        console.log("email has been sent successfully" + info.response);
    });
}