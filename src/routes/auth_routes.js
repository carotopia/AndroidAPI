import { Router } from "express";
import { login, register, logout, profile, getAllUsers, addFavorite, getFavorites} from "../controllers/auth.controller.js";
import { authRequired } from '../middleware/validateToken.js';

import { registerOrganization, loginOrganization, logoutOrganization, profileOrganization, getAllOrganizations, findOrganizationsByName, findOrganizationsByTags, getAllTags } from "../controllers/org.contoller.js"; // Import organization controller functions
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/posts.controller.js";
import { newEmail } from "../controllers/allowed.controller.js";


const router = Router();

// User Routes
router.post('/user/register', register);
router.post('/user/login', login);
router.post('/user/logout', logout);
router.get('/user/profile', authRequired, profile);
router.get('/user/all', getAllUsers);
router.post('/user/favorite', addFavorite);
router.get('/user/favorites/:userId', getFavorites);





// Organization Routes
router.post('/organization/register', registerOrganization);
router.post('/organization/login', loginOrganization);
router.post('/organization/logout', logoutOrganization);
router.get('/organization/profile', authRequired, profileOrganization);
router.get('/organizations/all', getAllOrganizations);
router.get('/organizations/name', findOrganizationsByName);
router.post('/organizations/findTags', findOrganizationsByTags);
router.get('/organizations/tags/all', getAllTags);


router.post('/posting', createPost);
router.get('/posts/all', getPosts);
router.get('/posts/:id', getPost);
router.delete('/posts/:id', authRequired, deletePost);
router.put('/posts/:id', authRequired, updatePost);



// Allowed emails 
router.post('/allowed', newEmail);

export default router;
