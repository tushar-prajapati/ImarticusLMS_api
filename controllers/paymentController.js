import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from 'dotenv'
import User from "../ models/userModel.js";
dotenv.config();




const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });


let userIdGlob, courseIdGlob;


const paymentOrder = async(req,res)=>{
    try {
        const { amount, userId, courseId } = req.body;
        userIdGlob = userId;
        courseIdGlob = courseId;

        const options = {
          amount: amount*100 ,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        };
    
        const order = await razorpay.orders.create(options);
        res.json(order);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error creating order");
      }
}

const verifyOrder = async(req,res)=>{

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        const userId = userIdGlob;
        const courseId = courseIdGlob;
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
          .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
          .update(sign.toString())
          .digest("hex");
    
        if (razorpay_signature === expectedSign) {
          const user = await User.findById(userId)
          user.enrolled.push(courseId);
          await user.save();

          res.json({ success: true, message: "Payment verified successfully" });
        } else {
          res.status(400).json({ success: false, message: "Invalid signature" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Verification error");
      }

}

export {paymentOrder, verifyOrder}

