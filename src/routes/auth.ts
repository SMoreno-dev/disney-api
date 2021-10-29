import express from "express";
import Validator from "../middleware/validator";
import Auth from "../controllers/auth";

const router = express.Router();

//Register
router.post("/register", Validator.auth, Auth.register);

//Login
router.post("/login", Validator.auth, Auth.login);

export default router;
