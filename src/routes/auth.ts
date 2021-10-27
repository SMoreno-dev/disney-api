import express from "express";
import validAuthInfo from "../middleware/validAuthInfo";
import Auth from "../controllers/auth";

const router = express.Router()

//Register
router.post('/register', validAuthInfo, Auth.register);

//Login
router.post('/login', validAuthInfo, Auth.login);

export default router;