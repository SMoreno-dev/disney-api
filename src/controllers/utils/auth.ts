import jwt from "jsonwebtoken";
const secret: any = process.env.SECRET;

export default class AuthUtil {
  static async signToken(userUUID: string) {
    //Sign user uuid
    const token = jwt.sign({ userUUID }, secret);
    return token;
  }

  static verifyToken(bearerHeader: string) {
    //Split bearer header
    const bearer = bearerHeader.split(" ");
    //Select token
    const bearerToken = bearer[1];
    //Verify token
    return jwt.verify(
      bearerToken,
      secret,
      (err: any, authData: any) => authData
    );
  }
}
