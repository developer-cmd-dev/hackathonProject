import { User } from "../models/userModel.ts";
import { generateToken, getGoogleClient } from "../auth/auth.ts";

function publicUser(user: InstanceType<typeof User>) {
  const result = user.toJSON();
  return result;
}

export async function authenticateGoogleUser(idToken: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || clientId.includes("your_google_client_id")) {
    throw new Error("Google authentication is not configured");
  }

  const ticket = await getGoogleClient().verifyIdToken({
    idToken,
    audience: clientId,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new Error("Google authentication failed: missing email in token payload");
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = await User.create({
      name: payload.name ?? payload.email.split("@")[0],
      email: payload.email,
      avatar: payload.picture,
      googleId: payload.sub,
      provider: "google",
    });
  } else {
    user.googleId = payload.sub;
    user.provider = "google";
    user.avatar = payload.picture ?? user.avatar;
    await user.save();
  }

  return {
    user: publicUser(user),
    token: generateToken(String(user._id)),
  };
}
