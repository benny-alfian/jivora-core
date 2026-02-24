import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { tenantName, name, email, password } = req.body;

      if (!tenantName || !name || !email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      const result = await AuthService.register({
        tenantName,
        name,
        email,
        password,
      });

      return res.status(201).json({
        message: "Tenant registered successfully",
        data: result,
      });
    } catch (error: any) {
      console.error("Register Error:", error);
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const result = await AuthService.login({
        email,
        password,
      });

      return res.status(200).json({
        message: "Login successful",
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Invalid credentials",
      });
    }
  }
}