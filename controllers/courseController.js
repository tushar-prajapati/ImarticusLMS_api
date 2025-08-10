import Course from "../ models/courseModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const getCourseDetails = asyncHandler(async(req,res)=>{
    try {
        const {courseId} = req.params;
        if(!courseId){
           throw new ApiError(402, "CourseId not present") 
        }
        else{
            const course = await Course.findById(courseId);
            if(!course){
                throw new ApiError(402, "Course is not present")
            }
            res.status(200).json(course)
        }
    } catch (error) {
        throw new ApiError(403, error)
    }
})

const createCourse = asyncHandler(async(req,res)=>{
    const {title, batch, sections} = req.body;
    if(!title|| !batch|| !sections){
        throw new ApiError(402, "All fields are required")
    }
    try {
        const course = new Course({title, batch, sections});
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        throw new ApiError(403, error)
    }
});

export {getCourseDetails, createCourse}