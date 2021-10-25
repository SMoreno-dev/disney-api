import express from "express";
import Auth from "../controllers/auth";

const router = express.Router()

//Register
router.post('/register', Auth.register);

//Login
router.post('/login');

export default router;