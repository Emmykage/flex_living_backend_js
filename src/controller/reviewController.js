import { StatusCodes } from 'http-status-codes';
import ReviewService from '../services/reviewServices.js';

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await ReviewService.getReviews();
        // console.log(reviews)

    res.status(200).json({ data: reviews, message: 'fetched Reviews' });

  } catch (error) {
    next(error);
  }
};
