import { Request, Response } from "express";
import * as usersService from "./users.service";

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const user = await usersService.getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User fetched",
      data: user,
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};