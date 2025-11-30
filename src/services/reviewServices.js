import dotenv from "dotenv"
import morckReviews from "../mockData/reviews.json" assert { type: "json" };
dotenv.config()

class ReviewService {

  static HOSTAWAY_ACCOUNT_ID = process.env.HOSTAWAY_ACCOUNT_ID;
  static HOSTAWAY_API_KEY = process.env.HOSTAWAY_API_KEY; 



  static getReviews = async () => {
    try {
    

const tokenResponse = await fetch("https://api.hostaway.com/v1/accessTokens", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", 
    "Cache-control": "no-cache",
  },
  body:  new URLSearchParams({
    'grant_type': 'client_credentials',
    'client_id': ReviewService.HOSTAWAY_ACCOUNT_ID, 
    'client_secret': ReviewService.HOSTAWAY_API_KEY
  })
});

const tokenData = await tokenResponse.json();
const accessToken = tokenData.access_token;


const reviewResponse = await fetch("https://api.hostaway.com/v1/accessTokens", {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", 
   "Authorization": `Bearer ${accessToken}`,
       "Cache-control": "no-cache",

  }
});

const reviewResult = await reviewResponse.json();
let reviewList = reviewResult.result;



      console.log(reviewList,tokenResponse, "'''''''''========================>",  ReviewService.HOSTAWAY_ACCOUNT_ID,  ReviewService.HOSTAWAY_API_KEY)


      if(!tokenResponse.ok){
        reviewList = morckReviews


      }

  const normalized = reviewList.map((review) => {
  const submittedAt = review.submittedAt ? new Date(review.submittedAt) : null;
  return {
    id: review.id,
    type: review.type || "guest-to-host",
    channel: review.channel || "hostaway",
    listingName: review.listingName,
    listingId: review.listingName?.split(" - ")[0] || null,
    rating: review.rating ?? null,
    categories: review.reviewCategory
      ? Object.fromEntries(
          review.reviewCategory.map((cat) => [cat.category, cat.rating])
        )
      : {},

    review: review.publicReview,
    reviewer: review.guestName,
    submittedAt: submittedAt ? submittedAt.toISOString() : null,
    date: submittedAt ? submittedAt.toISOString().split("T")[0] : null,

    status: "published",


    propertyDetails: review.propertyDetails,
    image_urls: review.image_urls ?? [],
    amenities: review.amenities,
    policies: review.policies ?? {},
    cancellationPolicy: review.cancellationPolicy ?? []

  };
});


      return normalized;
    } catch (error) {
    console.log("first", error)
      throw error;
    }
  };

}

export default ReviewService;
