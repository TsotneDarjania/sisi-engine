import { Router } from "express";
import { authController } from "../controllers/authController";

const apiRouter = Router();

apiRouter.post("/auth/register", authController.register);
apiRouter.post("/auth/login", authController.login);
apiRouter.post("/auth/logout", authController.logout);

export default apiRouter;
