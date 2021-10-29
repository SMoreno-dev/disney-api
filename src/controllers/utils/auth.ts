import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

const sendgridAPI: any = process.env.SG_API_KEY;
const secret: any = process.env.SECRET;

export default class AuthUtil {
  static async signToken(userUUID: string) {
    //Sign user uuid
    const token = jwt.sign({ userUUID }, secret);
    return token;
  }

  static async sendEmail(email: any) {
    console.log("AAAAAAAAAAAAAAAAAAAAA", sendgridAPI);
    //Sendgrid API setup
    sgMail.setApiKey(sendgridAPI);

    //Email message
    const msg = {
      to: email,
      from: "disneyapisender@gmail.com",
      subject: "Welcome to the Disney API",
      html: "<h3>Thank you for joining the Disney API! Feel free to explore our characters and movies!</h3><br><h1>The Walt Disney Company</h1>",
    };

    //Send Email
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
