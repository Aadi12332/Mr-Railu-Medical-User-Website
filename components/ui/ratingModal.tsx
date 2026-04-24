import * as React from "react";
import { Video, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function RatingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = () => {
    if (!rating) {
      setError("Please select rating");
      return;
    }
    if (!description.trim()) {
      setError("Please enter description");
      return;
    }

    setError("");
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setRating(0);
      setDescription("");
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl p-6">
        <DialogHeader>
          <DialogTitle>Rate this session</DialogTitle>
        </DialogHeader>

        {success ? (
          <p className="text-green-600 text-center py-10">
            Rating submitted successfully
          </p>
        ) : (
          <div className="">
            <div className="flex justify-center gap-2 text-2xl mb-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(0)}
                  className={`cursor-pointer ${
                    i <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full border rounded-lg p-3 text-sm outline-none"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              className="w-full h-11 rounded-lg text-white bg-emerald-600 mt-5"
            >
              Submit
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default RatingModal;