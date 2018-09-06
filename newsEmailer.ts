var nodemailer = require('nodemailer');
var config = require('./config.json');

export async function sendNewsEmail(news: string, body: any){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.emailAddress,
            pass: config.emailPassword
        }
    });
    
    var mailOptions = {
        from: config.emailAddress,
        to: config.emailTo,
        subject: `${news} News`,
        text: body,
    };
    
    await transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });    
}
