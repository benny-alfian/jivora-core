import { Router } from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware";
import { ReportController } from "../controllers/report.controller";

const router = Router();

router.use(authMiddleware);
router.use(authorizeRoles("OWNER"));

router.get("/daily", ReportController.daily);
router.get("/low-stock", ReportController.lowStock);

export default router;