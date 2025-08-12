import express from 'express'
import { createUser, loginUser, logoutUser, updateOnCoursePurchase } from '../controllers/userController.js';

const router = express.Router();

router.route('/login').post(loginUser)
router.route('/signup').post(createUser)
router.route('/logout').post(logoutUser)
router.route('/updateOnCoursePurchase').post(updateOnCoursePurchase)



export default router;