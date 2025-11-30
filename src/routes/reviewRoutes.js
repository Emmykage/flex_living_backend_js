import express from 'express';

import { getReviews } from '../controller/reviewController.js';

const router = express.Router();

router.get('/', getReviews);
// router.get('/:id', getReview);


export default router;
