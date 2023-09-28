import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from '../middleware/validateToken.js';
import { registerOrganization, loginOrganization, logoutOrganization, profileOrganization } from "../controllers/org.contoller.js"; // Import organization controller functions

const router = Router();

// User Routes
router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/logout', logout);
router.get('/user/profile', authRequired, profile);

// Organization Routes
router.post('/organization/register', registerOrganization);
router.post('/organization/login', loginOrganization);
router.post('/organization/logout', logoutOrganization);
router.get('/organization/profile', authRequired, profileOrganization);

export default router;
