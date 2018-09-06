var nodemailer = require('nodemailer');
var config = require('../config.json');

export async function sendEmail(symbol: string, body: any){

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
    subject: `IPO Info for ${symbol}`,
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


export function sendNewsEmail(symbol: string, body: any){

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
        subject: `${symbol} News`,
        text: body,
    };
    
    transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });    
}
