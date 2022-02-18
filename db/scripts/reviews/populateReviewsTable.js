import query from "../../connection.js";
import { reviews } from "../../data/reviewsData.js";

async function populateReviewsTable() {
  reviews.forEach((review) => {
    const response = await query(
      `INSERT INTO reviews (job_id, review, rating, catergory) VALUES ($1, $2, $3,$4 ) `,
      [review.job_id, review.review, review.rating, review.category]
    );
    console.log(response.rows);
  });
}

populateReviewsTable();
