import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from '../middleware/validateToken.js';
import { registerOrganization, loginOrganization, logoutOrganization, profileOrganization, getAllOrganizations, findOrganizationsByName, findOrganizationsByTags } from "../controllers/org.contoller.js"; // Import organization controller functions

import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/posts.controller.js";

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
router.get('/organizations/all', getAllOrganizations);
router.get('/organizations/name', findOrganizationsByName);
router.get('/organizations/tags', findOrganizationsByTags);


router.post('/posting', authRequired, createPost);
router.get('/posts/all', getPosts);
router.get('/posts/:id', getPost);
router.delete('/posts/:id', authRequired, deletePost);
router.put('/posts/:id', authRequired, updatePost);

export default router;
