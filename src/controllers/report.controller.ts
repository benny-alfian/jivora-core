import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ReportService } from "../services/report.service";

export class ReportController {
  static async daily(req: AuthRequest, res: Response) {
    const result = await ReportService.dailySummary();
    res.json(result);
  }

  static async lowStock(req: AuthRequest, res: Response) {
    const threshold = Number(req.query.threshold) || 5;
    const result = await ReportService.lowStock(threshold);
    res.json(result);
  }
}