import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

const from: any = process.env.EMAIL;
const sendgridAPI: any = process.env.SG_API_KEY;
const secret: any = process.env.SECRET;

export default class AuthUtil {
  static signToken(userUUID: string) {
    //Sign user uuid
    const token = jwt.sign({ userUUID }, secret);
    return token;
  }

  static async sendEmail(to: any) {
    //Sendgrid API setup
    sgMail.setApiKey(sendgridAPI);

    //Email message
    const msg = {
      to,
      from,
      subject: "Welcome to the Disney API",
      html: "<h3>Thank you for joining the Disney API! Feel free to explore our characters and movies!</h3><br><h1>The Walt Disney Company</h1>",
    };

    //Send Email
    try {
      sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
