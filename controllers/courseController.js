import Course from "../ models/courseModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { GoogleGenAI } from "@google/genai";

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

const summarizePdf = asyncHandler(async(req,res)=>{
        try {
            const {pdfUrl} = req.body;
            // if(!pdfUrl){
            //     throw new ApiError(402, "No PDF Found!")
            // }
            // const pdf = await fetch(pdfUrl);
            // console.log(pdf);

            // if (!pdf.ok) {
            //     throw new ApiError(402, "Unable to fetch PDF");
            // }

            // const pdfBuffer = await pdf.arrayBuffer();
            // const pdfData = await PdfParse(Buffer.from(pdfBuffer));
            // const extractedText = pdfData.text;
            // if (!extractedText.trim()) {
            //      throw new ApiError(402, "No text found in PDF") ;
            // }
            // const prompt = `Summarize the following text in a concise paragraph:\n\n${extractedText}`;
            // res.status(200).send(prompt);
            
            


            const ai = new GoogleGenAI({});
            
            // const response = await ai.models.generateContent({
            //     model: "gemini-2.5-flash",
            //     contents: "Explain how AI works in a few words",
            //   });
            //   res.status(200).json({res: response.text});

        } catch (error) {
            throw new ApiError(403, error)
        }
})

export {getCourseDetails, createCourse, summarizePdf}