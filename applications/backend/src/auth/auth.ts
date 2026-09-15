import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET ?? "dev-secret", { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET ?? "dev-secret");
}

export function getGoogleClient() {
  return new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
}
