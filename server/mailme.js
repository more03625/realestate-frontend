const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"developer03625@gmail.com",
        pass:"70391924"
    }
});

var mailOptions = {
    from:"developer03625@gmail.com",
    to:"more03625@gmail.com",
    subject:"Neprealestate",
    text:"Hello Software developer"
}

transporter.sendMail(mailOptions, function(error, info){
    if(error) return console.log(error);

    console.log("email has been sent successfully" + info.response);
});