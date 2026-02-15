import React, { useEffect, useState } from "react";
import { Star, Send, AlertCircle, Check, Loader2 } from "lucide-react";

const API_BASE =
  (import.meta as any).env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000/api";

type Trainer = { id: string | number; name: string; email?: string };

function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

const PersonalTrainerReview: React.FC = () => {
  const [courseName, setCourseName] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");

  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [studentInfo, setStudentInfo] = useState<{ id: string | number; name: string; email: string } | null>(null);

  useEffect(() => {
    const user = safeJsonParse<any>(localStorage.getItem("user"), null);
    if (user) {
      setStudentInfo({
        id: user.id || user.uid || "unknown",
        name: user.username || user.name || user.displayName || "Anonymous",
        email: user.email || "No email",
      });
    }
  }, []);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const res = await fetch(`${API_BASE}/trainers/`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        // expected [{id,name}]
        setTrainers(Array.isArray(data) ? data : []);
      } catch {
        // fallback list
        setTrainers([
          { id: 1, name: "John Smith" },
          { id: 2, name: "Maria Rodriguez" },
          { id: 3, name: "David Johnson" },
          { id: 4, name: "Sarah Wong" },
        ]);
      }
    };
    loadTrainers();
  }, []);

  const isFormValid = selectedTrainerId && courseName && rating > 0 && comment.length > 0;

  const handleSubmit = async () => {
    if (!studentInfo) {
      alert("Please log in to submit a review");
      return;
    }
    if (!isFormValid) {
      alert("Please fill in all fields");
      return;
    }

    const token = localStorage.getItem("access_token");

    try {
      setLoading(true);

      const payload = {
        trainer: selectedTrainerId,
        course_name: courseName,
        rating,
        comment,
        student: studentInfo.id,
      };

      const res = await fetch(`${API_BASE}/trainer-reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Failed to submit review";
        try {
          const err = await res.json();
          msg = typeof err === "string" ? err : JSON.stringify(err);
        } catch {}
        alert(msg);
        return;
      }

      setCourseName("");
      setRating(0);
      setComment("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!studentInfo) {
    return (
      <div className="max-w-4xl mx-auto p-6 my-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100">
          <AlertCircle className="mx-auto h-12 w-12 text-emerald-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to submit trainer reviews.</p>
          <a
            href="/login"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 my-12 p-4">
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-white text-emerald-800 px-6 py-3 rounded-lg shadow-lg z-50 border-t-2 border-emerald-500 flex items-center gap-2 animate-slide-in">
          <Check className="h-5 w-5 text-emerald-600" />
          <span className="font-medium">Review submitted successfully!</span>
        </div>
      )}

      <div className="bg-emerald-600 rounded-t-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Share Your Experience</h1>
        <p className="text-emerald-100 opacity-90">Help us improve by sharing feedback</p>
      </div>

      <div className="bg-white rounded-b-xl shadow-md p-6 md:p-8 border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Trainer</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-800"
                value={selectedTrainerId}
                onChange={(e) => setSelectedTrainerId(e.target.value)}
              >
                <option value="">Select a trainer</option>
                {trainers.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Course/Program</label>
              <input
                type="text"
                placeholder="Enter course name"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-3">Your Rating</label>
              <div className="flex justify-center gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star size={32} className={s <= rating ? "text-yellow-500 fill-yellow-400" : "text-gray-300"} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Detailed Feedback</label>
            <textarea
              placeholder="Share your experience..."
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800"
              rows={8}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500 mt-1">{comment.length}/500</div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => {
              setSelectedTrainerId("");
              setCourseName("");
              setRating(0);
              setComment("");
            }}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
            className={`px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
              !isFormValid || loading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          0% { opacity: 0; transform: translateX(20px); }
          20% { opacity: 1; transform: translateX(0); }
          80% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(20px); }
        }
        .animate-slide-in { animation: slide-in 3s ease-in-out forwards; }
      `}</style>
    </div>
  );
};

export default PersonalTrainerReview;
