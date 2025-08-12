import express from "express";
import { paymentOrder, verifyOrder } from "../controllers/paymentController.js";


const router = express.Router();



router.post("/order", paymentOrder);


router.post("/verify", verifyOrder);
  

export default router;
