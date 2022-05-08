import { MailAdapter, SendMailData } from "../mail-adapteres";
import nodemailer from 'nodemailer';

    
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d94c04f9cee718",
      pass: "3f7ba1493c2a7f"
    }
});


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from:'Equipe Feedget <oi@feedget.com>',
            to:'Lendro Araujo <leandroaraujo5511@gmail.com>',
            subject,
            html: body,
        })
    }
    
}