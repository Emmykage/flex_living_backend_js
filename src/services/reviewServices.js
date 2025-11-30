import dotenv from "dotenv";
import { mockReviews } from "../mockData/reviewData.js";
// import morckReviews from "../mockData/reviews.json" assert { type: "json" };

dotenv.config();

class ReviewService {
  static HOSTAWAY_ACCOUNT_ID = process.env.HOSTAWAY_ACCOUNT_ID;
  static HOSTAWAY_API_KEY = process.env.HOSTAWAY_API_KEY;


  static getReviews = async () => {
    try {
      // Step 1: Request access token
      const tokenResponse = await fetch("https://api.hostaway.com/v1/accessTokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: ReviewService.HOSTAWAY_ACCOUNT_ID,
          client_secret: ReviewService.HOSTAWAY_API_KEY,
        }),
      });

      if (!tokenResponse.ok) {
        console.warn("Hostaway token request failed, using mock data.");
        return ReviewService.normalizeReviews(mockReviews);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Step 2: Fetch reviews using the access token
      const reviewResponse = await fetch("https://api.hostaway.com/v1/reviews", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache",
        },
      });

      let reviewList = mockReviews; // default fallback
      if (reviewResponse.ok) {
        const reviewResult = await reviewResponse.json();
        reviewList = reviewResult.result || mockReviews;
      } else {
        console.warn("Fetching reviews failed, using mock data.");
      }

      return ReviewService.normalizeReviews(reviewList);
    } catch (error) {
      console.error("Error fetching reviews:", error);

      return ReviewService.normalizeReviews(mockReviews);
    }
  };


  static normalizeReviews = (reviews) => {
    return reviews.map((review) => {
      const submittedAt = review.submittedAt ? new Date(review.submittedAt) : null;

      return {
        id: review.id,
        type: review.type || "guest-to-host",
        channel: review.channel || "hostaway",
        listingName: review.listingName,
        listingId: review.listingName?.split(" - ")[0] || null,
        rating: review.rating ?? null,
        categories: review.reviewCategory
          ? Object.fromEntries(review.reviewCategory.map((cat) => [cat.category, cat.rating]))
          : {},
        review: review.publicReview,
        reviewer: review.guestName,
        submittedAt: submittedAt?.toISOString() ?? null,
        date: submittedAt?.toISOString().split("T")[0] ?? null,
        status: "published",
        propertyDetails: review.propertyDetails,
        image_urls: review.image_urls ?? [],
        amenities: review.amenities ?? [],
        policies: review.policies ?? {},
        cancellationPolicy: review.cancellationPolicy ?? [],
      };
    });
  };
}

export default ReviewService;
