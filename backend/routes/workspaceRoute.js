import { Router } from "express";
import WorkspaceController from "../controllers/workspaceController.js";
import WorkspaceService from "../service/workspaceService.js";

const workspaceRouter = Router();
const workspaceService = new WorkspaceService();
const workspaceController = new WorkspaceController(workspaceService);

workspaceRouter.post("/", (req, res) => workspaceController.createWorkspace(req, res));

export default workspaceRouter;
