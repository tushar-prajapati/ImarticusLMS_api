import express from 'express';
import { getCourseDetails, createCourse, summarizePdf } from '../controllers/courseController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/:courseId').get(authenticate, getCourseDetails);
router.route('/create').post(authenticate, createCourse);
router.route('/summarize').post(authenticate, summarizePdf);
export default router;