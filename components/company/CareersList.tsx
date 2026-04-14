import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, Briefcase, Star } from "lucide-react";
import { Card } from "../ui/card";

export default function CareersList({ careers }: any) {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <>
      {(careers ?? []).map((job: any) => (
        <div key={job._id}
          onClick={() => {
            setSelectedJob(job)
            setSubmitted(false)
            setForm({ name: "", email: "", phone: "" })
          }}
         className="group block cursor-pointer">
          <Card className="flex flex-row justify-between items-center p-4">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">
                {job.title}
              </h4>
              <div className="mt-1 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" /> <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" /> <span>{job.level}</span>
                </div>
              </div>
            </div>
            <div className="size-8 rounded-full flex justify-center items-center bg-gray-100">
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </Card>
        </div>
      ))}

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-150! md:w-150 w-[95%] p-0 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 space-y-3 border-r">
              <h2 className="text-xl font-semibold">{selectedJob?.title}</h2>
              <p className="text-sm text-gray-500">
                {selectedJob?.location} • {selectedJob?.type} •{" "}
                {selectedJob?.level}
              </p>
              <p className="text-sm text-gray-600 mt-4">
                This is a great opportunity to work with our team. We are
                looking for passionate candidates who can grow with us.
              </p>
            </div>

            <div className="p-6">
              {submitted ? (
                <div className="text-center space-y-2 h-full flex flex-col justify-center items-center">
                  <h3 className="text-lg font-semibold text-green-600">
                    Successfully submitted 🎉
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our team will contact you soon.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Input
                    placeholder="Name *"
                    className="px-4 py-3 outline-none! h-12!"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}

                  <Input
                    placeholder="Email *"
                    className="px-4 py-3 outline-none! h-12!"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}

                  <Input
                    placeholder="Phone (optional)"
                    className="px-4 py-3 outline-none! h-12!"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />

                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-[#E7000B] px-4 py-3 outline-none! h-12!"
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
