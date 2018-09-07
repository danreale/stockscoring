const nodemailer = require("nodemailer");
const config = require("../config.json");

export async function sendEmail(symbol: string, body: any){
const transporter = nodemailer.createTransport({
    auth: {
        pass: config.emailPassword,
        user: config.emailAddress,
    },
    service: "gmail",
});
const mailOptions = {
    from: config.emailAddress,
    subject: `IPO Info for ${symbol}`,
    text: body,
    to: config.emailTo,
};
await transporter.sendMail(mailOptions, function(error: any, info: any){
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent: " + info.response);
    }
});

}

export function sendNewsEmail(symbol: string, body: any){
    const transporter = nodemailer.createTransport({
        auth: {
            pass: config.emailPassword,
            user: config.emailAddress,
        },
        service: "gmail",
    });
    const mailOptions = {
        from: config.emailAddress,
        subject: `${symbol} News`,
        text: body,
        to: config.emailTo,
    };
    transporter.sendMail(mailOptions, function(error: any, info: any){
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}
