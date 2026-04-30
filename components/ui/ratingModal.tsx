import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { patientApi } from "@/api/patient.api";
import { toast } from "react-toastify";

function RatingModal({
  open,
  onClose,
  providerId,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  providerId: string;
  onSuccess?: () => void;
}) {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    if (!rating) return toast.error("Please select rating");
    if (!description.trim()) return toast.error("Please enter description");

    try {
      setLoading(true);

      const payload = {
        rating,
        description,
      };

      const res: any = await patientApi.rateProvider(providerId, payload);

      toast.success(res?.message || "Rating submitted successfully");

      setRating(0);
      setDescription("");
      onClose();
      onSuccess?.();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to submit rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-xl p-6">
        <DialogHeader>
          <DialogTitle>Rate this session</DialogTitle>
        </DialogHeader>

        <div>
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

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 rounded-lg text-white bg-emerald-600 mt-5 disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RatingModal;