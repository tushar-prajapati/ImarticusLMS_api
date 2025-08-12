import User from "../ models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Course from "../ models/courseModel.js";


const createUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        
        throw new ApiError(400, "All fields are required.");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
       throw new ApiError(500, "User already Exists")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    

    const newUser = new User({
        fullName, email, password: hashedPassword
    });

    try {

        await newUser.save()

        generateToken(res, newUser._id)

        res.status(201).json(newUser)
    } catch (error) {

        throw new ApiError(400, "Invalid User Data")
    }



})

const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(403, "All fields are required!")
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new ApiError(401, "User not found!")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        throw new ApiError(401, "Incorrect Password")
    }

    generateToken(res, user._id);
    res.status(200).json(user);
    return;

})

const logoutUser = asyncHandler(async (req, res)=>{
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "Logout Successfully"})
})

const updateOnCoursePurchase = asyncHandler(async(req,res)=>{
    try {
        const {userId, mobile, experience, location} = req.body;
        const user = await User.findById(userId);

        user.mobile = mobile;
        user.experience = experience;
        user.location = location;
        await user.save();
        res.status(200).json({user, success: true})
        
    } catch (error) {
        throw new ApiError(500, "Server Error");
    }
    
})


export {loginUser, createUser, logoutUser, updateOnCoursePurchase}