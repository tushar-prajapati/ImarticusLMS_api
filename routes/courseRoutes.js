import express from 'express';
import { getCourseDetails, createCourse, summarizePdf } from '../controllers/courseController.js';

const router = express.Router();

router.route('/:courseId').get(getCourseDetails);
router.route('/create').post(createCourse);
router.route('/summarize').post(summarizePdf);
export default router;