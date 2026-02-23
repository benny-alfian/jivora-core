"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const report_service_1 = require("../services/report.service");
class ReportController {
    static async daily(req, res) {
        const result = await report_service_1.ReportService.dailySummary();
        res.json(result);
    }
    static async lowStock(req, res) {
        const threshold = Number(req.query.threshold) || 5;
        const result = await report_service_1.ReportService.lowStock(threshold);
        res.json(result);
    }
}
exports.ReportController = ReportController;
