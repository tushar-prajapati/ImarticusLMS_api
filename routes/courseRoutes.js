import express from 'express';
import { getCourseDetails, createCourse } from '../controllers/courseController.js';

const router = express.Router();

router.route('/:courseId').get(getCourseDetails);
router.route('/create').post(createCourse);

export default router;