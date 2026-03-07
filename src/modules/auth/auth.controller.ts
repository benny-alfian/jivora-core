import { Request, Response } from "express";
import { loginUser } from "./auth.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({
      email,
      password,
    });

    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Login failed",
    });
  }
};