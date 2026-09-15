import type { Request, Response } from "express";

import { authenticateGoogleUser } from "../services/auth.ts";

export async function loginWithGoogle(req: Request, res: Response) {
  const { idToken } = req.body ?? {};

  if (!idToken || typeof idToken !== "string") {
    return res.status(400).json({ message: "idToken is required" });
  }

  try {
    const result = await authenticateGoogleUser(idToken);

    return res.status(200).json({
      message: "Google login successful",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    const message = error instanceof Error ? error.message : "Google authentication failed";
    return res.status(401).json({ message });
  }
}

export function getAuthenticatedUser(req: Request, res: Response) {
  return res.status(200).json({ user: req.user ?? null });
}
