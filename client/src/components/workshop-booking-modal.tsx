import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface WorkshopBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkshopBookingModal({ isOpen, onClose }: WorkshopBookingModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    schoolName: "",
    principalName: "",
    email: "",
    phone: "",
    numberOfStudents: "",
    preferredDate: "",
    message: "",
  });

  const bookingMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("/api/workshop-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          numberOfStudents: data.numberOfStudents ? parseInt(data.numberOfStudents) : null,
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Workshop Booking Submitted",
        description: "Thank you! We will contact you shortly to confirm your workshop booking.",
      });
      setFormData({
        schoolName: "",
        principalName: "",
        email: "",
        phone: "",
        numberOfStudents: "",
        preferredDate: "",
        message: "",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Book AI Career Navigator Workshop</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2 transition-colors"
            data-testid="button-close-workshop-modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="schoolName" className="block text-sm font-medium mb-1">
              School Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              placeholder="Enter school name"
              data-testid="input-school-name"
            />
          </div>

          <div>
            <label htmlFor="principalName" className="block text-sm font-medium mb-1">
              Principal / Head of School Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="principalName"
              name="principalName"
              value={formData.principalName}
              onChange={handleChange}
              required
              placeholder="Enter principal/head name"
              data-testid="input-principal-name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="email@school.com"
                data-testid="input-email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 XXXXXXXXXX"
                data-testid="input-phone"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="numberOfStudents" className="block text-sm font-medium mb-1">
                Estimated Number of Students
              </label>
              <Input
                id="numberOfStudents"
                name="numberOfStudents"
                type="number"
                value={formData.numberOfStudents}
                onChange={handleChange}
                placeholder="Approx. number of class 9-12 students"
                data-testid="input-number-students"
              />
            </div>

            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium mb-1">
                Preferred Date
              </label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
                data-testid="input-preferred-date"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Additional Information
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any specific requirements or questions about the workshop..."
              rows={4}
              data-testid="textarea-message"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={bookingMutation.isPending}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              data-testid="button-submit-booking"
            >
              {bookingMutation.isPending ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
