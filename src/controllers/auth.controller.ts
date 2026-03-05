import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      message: "Register successful",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);

    return res.json({
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};