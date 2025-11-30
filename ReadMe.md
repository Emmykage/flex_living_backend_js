# Flex Living Reviews Dashboard - Backend

## 1. Project Overview

The backend provides an **API to fetch, normalize, and serve reviews** for the frontend dashboard. It integrates with Hostaway's sandbox API (mocked) and ensures all review data is structured for easy consumption.

## 2. Tech Stack

- **Node.js & Express.js** (API server)
- **dotenv** (environment variables)
- **CORS** (cross-origin requests)
- **Fetch API / Axios** (external API calls)

## 3. Features

- **GET /api/reviews/hostaway**

  - Fetches reviews from Hostaway (mocked or sandbox)
  - Normalizes data by:
    - `listingId` and `listingName`
    - Review type (`host-to-guest`, `guest-to-host`)
    - Review categories (Cleanliness, Communication, House Rules)
    - Review date, rating, and status
  - Returns structured JSON suitable for frontend consumption

- **Normalization Example**

```json
{
  "listingId": "2B N1 A",
  "listingName": "2B N1 A - 29 Shoreditch Heights",
  "reviews": [
    {
      "id": 7453,
      "type": "host-to-guest",
      "status": "published",
      "rating": 10,
      "reviewer": "Shane Finkelstein",
      "categories": {
        "cleanliness": 10,
        "communication": 10,
        "respect_house_rules": 10
      },
      "review": "Shane and family are wonderful! Would definitely host again :)",
      "submittedAt": "2020-08-21T22:45:14.000Z"
    }
  ],
  "image_urls": [...],
  "amenities": [...],
  "policies": {...}
}

## 4. Folder Structure
/backend
 ├─src
    ├─ index.js
    ├─ routes/
    │   └─ reviews.js
    ├─ controllers/
    │   └─ reviewController.js
    ├─ services/
    │   └─ reviewService.js
    ├─ mockdata/
    │   └─ reviews.json.js
    └─ .env

## 5. Setup Instructions


    ### Clone the repository:

    git clone `https://github.com/Emmykage/flex_living_backend_js.git`
    cd backend

    ### Install dependencies:
        - npm install

    Create .env file:
    HOSTAWAY_ACCOUNT_ID=<your_account_id>
    HOSTAWAY_API_KEY=<your_api_key>
    PORT=5000

    ### Start the server:
        npm run dev
        API endpoint:
        GET http://localhost:5000/api/reviews/hostaway

    ## Server endPoint

    GET https://flexliving-b11f9136ef82.herokuapp.com/api/reviews/hostaway

## 6. Design & Logic Decisions

Normalized reviews simplify frontend filtering and sorting

Listing-based structure allows easy aggregation per property

Redux-ready response for direct consumption by frontend

Error handling returns clear status and messages for debugging

Supports future Google Reviews integration

## 7. Notes

Hostaway sandbox API authentication may fail with provided credention or   may return empty data; mock data is provided

All API responses are JSON and structured consistently
```
