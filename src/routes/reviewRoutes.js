import express from 'express';

import { getReviews } from '../controller/reviewController.js';

const router = express.Router();

router.get('/hostaway', getReviews);


export default router;
