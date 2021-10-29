import jwt from "jsonwebtoken";
const secret: any = process.env.SECRET;

export default class AuthUtil {
  static async signToken(userUUID: string) {
    //Sign user uuid
    const token = jwt.sign({ userUUID }, secret);
    return token;
  }
}
