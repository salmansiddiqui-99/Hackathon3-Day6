import { useState } from "react";
import { Star, StarHalf, Star as StarOutline } from "lucide-react"; // Import modern icons

interface Review {
  productId: string;
  user: string;
  rating: number;
  comment: string;
}

const Reviews: React.FC<{ productId: string }> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: "", rating: 5, comment: "" });
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleReviewSubmit = () => {
    if (!newReview.user || !newReview.comment) {
      alert("Please fill in all fields.");
      return;
    }

    const review: Review = {
      productId,
      user: newReview.user,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    setReviews([...reviews, review]);
    setNewReview({ user: "", rating: 5, comment: "" });
  };

  return (
    <div className="mt-6 p-5 border border-gray-200 rounded-xl bg-white shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h3>

      {/* Review Form */}
      <div className="mb-4 border-b pb-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition mb-3"
          value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
        />

        {/* Interactive Star Rating */}
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="text-yellow-400 hover:scale-110 transition-transform"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => setNewReview({ ...newReview, rating: star })}
            >
              {hoverRating !== null ? (
                star <= hoverRating ? (
                  <Star className="fill-yellow-400 stroke-none" size={24} />
                ) : (
                  <StarOutline className="stroke-yellow-400" size={24} />
                )
              ) : star <= newReview.rating ? (
                <Star className="fill-yellow-400 stroke-none" size={24} />
              ) : (
                <StarOutline className="stroke-yellow-400" size={24} />
              )}
            </button>
          ))}
        </div>

        <textarea
          placeholder="Your Review"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition mb-3"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        />

        <button
          onClick={handleReviewSubmit}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews */}
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review, index) => (
            <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              <p className="font-semibold text-gray-900">{review.user}</p>
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  i < review.rating ? (
                    <Star key={i} className="fill-yellow-400 stroke-none" size={20} />
                  ) : (
                    <StarOutline key={i} className="stroke-yellow-400" size={20} />
                  )
                ))}
              </div>
              <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-500 text-center">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
};

export default Reviews;
