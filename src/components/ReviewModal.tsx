import { useState } from "react";
import { Star, X } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { name: string; city: string; rating: number; text: string }) => void;
}

export function ReviewModal({ isOpen, onClose, onSubmit }: ReviewModalProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">كتابة تقييم جديد</h3>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ name, city, rating, text });
            setName("");
            setCity("");
            setRating(5);
            setText("");
            onClose();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">الاسم</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors"
              placeholder="اكتب اسمك"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">المدينة</label>
            <input
              required
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors"
              placeholder="مثال: الرياض"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">التقييم</label>
            <div className="flex gap-2 justify-center my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">رأيك يهمنا</label>
            <textarea
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors min-h-[100px] resize-none"
              placeholder="اكتب تجربتك مع المنتج..."
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-2 hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
          >
            نشر التقييم
          </button>
        </form>
      </div>
    </div>
  );
}
