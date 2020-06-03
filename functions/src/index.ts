const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'website.smartstarinvestment@gmail.com',
        pass: 'qwerty@123'
    }
});

exports.sendMail = functions.https.onRequest((req:any, res:any) => {
    cors(req, res, () => {
        // getting dest email by body string
        const dest = req.body.dest;
        const from = req.body.from;
        const subject = req.body.subject;
        const html = req.body.html;
        const mailOptions = {
            from: from, // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: subject, // email subject
            html: html // email content in HTML
       




	   };
        // returning result
        return transporter.sendMail(mailOptions, (erro:any, info:any) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });    
});
