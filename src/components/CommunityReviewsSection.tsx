import { FormEvent, useEffect, useState } from "react";
import { MessageSquarePlus, Star } from "lucide-react";
import type { CommunityReview } from "../types/network";

export function CommunityReviewsSection() {
  const [reviews, setReviews] = useState<CommunityReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/reviews", { cache: "no-store" });
        if (res.ok) {
          const data = (await res.json()) as { reviews?: CommunityReview[] };
          if (active && Array.isArray(data.reviews)) {
            setReviews(data.reviews);
          }
        }
      } catch {
        // Keep empty state gracefully
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedName = name.trim();
    const trimmedComment = comment.trim();

    if (trimmedName.length < 2) {
      setFeedback({
        type: "error",
        text: "Please enter your name or in-game username (at least 2 characters).",
      });
      return;
    }
    if (trimmedComment.length < 5) {
      setFeedback({
        type: "error",
        text: "Please write a short review comment (at least 5 characters).",
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          comment: trimmedComment,
          rating,
        }),
      });
      const data = (await res.json()) as {
        review?: CommunityReview;
        error?: string;
      };
      if (!res.ok || !data.review) {
        setFeedback({
          type: "error",
          text: data.error || "Unable to submit review right now.",
        });
        return;
      }

      setReviews((prev) => [data.review!, ...prev]);
      setName("");
      setComment("");
      setRating(5);
      setFeedback({
        type: "success",
        text: "Thank you! Your review has been published.",
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Network error while submitting your review.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const activeStars = hoverRating ?? rating;

  return (
    <section id="reviews" className="py-16 lg:py-24 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-sm font-semibold text-[#FACC15]">
            Player Feedback
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight text-balance">
            ⭐ Community Reviews
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
            Played on KSHyPixel Network? Share your genuine experience with the
            community below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-5 rounded-2xl bg-[#12151C] border border-white/10 p-6 sm:p-8 space-y-5"
          >
            <h3 className="font-display font-bold text-xl text-white">
              Write a Review
            </h3>

            <div className="space-y-1.5">
              <label
                htmlFor="review-name"
                className="block text-sm font-medium text-[#CBD5E1]"
              >
                Name / In-Game Username
              </label>
              <input
                id="review-name"
                type="text"
                maxLength={40}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0A0C10] border border-white/15 focus:border-[#F59E0B] focus:outline-none text-sm text-white placeholder-[#64748B]"
              />
            </div>

            <div className="space-y-1.5">
              <span className="block text-sm font-medium text-[#CBD5E1]">
                Rating
              </span>
              <div
                className="flex items-center gap-1.5"
                role="radiogroup"
                aria-label="Star rating"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(null)}
                    aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                    aria-checked={rating === value}
                    role="radio"
                    className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 transition-colors ${
                        value <= activeStars
                          ? "text-[#FACC15] fill-[#FACC15]"
                          : "text-[#475569]"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 font-mono text-xs text-[#94A3B8] tabular-nums">
                  {rating}/5
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="review-comment"
                className="block text-sm font-medium text-[#CBD5E1]"
              >
                Comment
              </label>
              <textarea
                id="review-comment"
                rows={4}
                maxLength={500}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share what you enjoy about Survival, SkyBlock, PvP, or the community..."
                className="w-full px-4 py-3 rounded-xl bg-[#0A0C10] border border-white/15 focus:border-[#F59E0B] focus:outline-none text-sm text-white placeholder-[#64748B] resize-y"
              />
            </div>

            {feedback && (
              <div
                role="status"
                className={`rounded-xl px-4 py-3 text-sm font-medium border ${
                  feedback.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                }`}
              >
                {feedback.text}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#FACC15] text-[#0A0C10] font-bold text-sm transition-colors disabled:opacity-60 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{submitting ? "Submitting..." : "Submit Review"}</span>
            </button>
          </form>

          {/* Visitor Reviews Feed */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <div className="rounded-2xl bg-[#12151C] border border-white/10 p-10 text-center text-[#94A3B8]">
                Loading community reviews...
              </div>
            ) : reviews.length === 0 ? (
              <div className="rounded-2xl bg-[#12151C] border border-white/10 p-10 text-center space-y-2">
                <p className="font-display font-bold text-lg text-white">
                  No visitor reviews yet
                </p>
                <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
                  Only authentic reviews submitted by real KSHyPixel Network
                  visitors appear here. Be the first player to share your
                  thoughts!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {reviews.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl bg-[#12151C] border border-white/10 p-5 sm:p-6 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= item.rating
                                  ? "text-[#FACC15] fill-[#FACC15]"
                                  : "text-[#334155]"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-xs text-[#64748B] tabular-nums">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <p className="text-sm text-[#E2E8F0] leading-relaxed break-words">
                        {item.comment}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 text-sm font-semibold text-[#FACC15] truncate">
                      {item.name}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
