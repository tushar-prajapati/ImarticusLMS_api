import jwt from "jsonwebtoken";
import User from "../ models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";



const authenticate = asyncHandler( async (req,res,next)=>{
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password")
            next();
            
        } catch (error) {
            throw new ApiError(401, "Not Authorized, Please Login Again")
        }
    } else{
        throw new ApiError(401, "Not Authorized, Please Login Again")
    }

})



export {authenticate}