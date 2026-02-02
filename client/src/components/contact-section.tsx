import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, Calendar, GraduationCap } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import WorkshopBookingModal from "./workshop-booking-modal";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy to continue"
  })
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      message: "",
      privacyConsent: false
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://samir-kumar-backend.garyphadale.workers.dev";
      const response = await fetch(`${baseUrl}/submit-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      return await response.json();
    },
    onSuccess: (_, data) => {
      toast({
        title: "Success!",
        description: "Thank you for your interest! We will contact you soon.",
      });

      // Create mailto link with prefilled values
      const receiverEmail = "samir.kumar@gnosiscs.com";
      const subject = `New Contact Form Submission from ${data.name}`;
      const categoryLabels: Record<string, string> = {
        student: "School Student",
        graduate: "College Graduate",
        professional: "Working Professional",
        parent: "Parent",
        corporate: "Corporate"
      };

      const body = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Category: ${categoryLabels[data.category] || data.category}
${data.message ? `\nMessage:\n${data.message}` : ''}
      `.trim();

      const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(receiverEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open Gmail in new tab
      window.open(mailtoLink, '_blank');

      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const benefits = [
    "Personalized career assessment",
    "Industry insights and trends",
    "Tailored guidance strategy",
    "No obligations"
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-12 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Ready to transform your career? Let's start with a conversation.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Contact Form */}
          <div className="w-full lg:flex-1 bg-card p-8 rounded-xl shadow-lg flex flex-col">
            <h3 className="text-xl sm:text-2xl font-semibold mb-6">Book Your Call</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-grow flex flex-col">
                <div className="space-y-6 flex-grow">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your phone number"
                            {...field}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue placeholder="Select your category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="student">School Student</SelectItem>
                            <SelectItem value="graduate">College Graduate</SelectItem>
                            <SelectItem value="professional">Working Professional</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Tell us about your career goals..."
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacyConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="checkbox-privacy-consent"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            I agree to receive information on various programs, events, offers and I understand that my data will only be used as per the{" "}
                            <a
                              href="/privacy-policy"
                              target="_blank"
                              className="text-blue-600 hover:underline"
                            >
                              privacy policy
                            </a>{" "}
                            of the website.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 mt-auto"
                  disabled={contactMutation.isPending}
                  data-testid="button-submit-contact"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {contactMutation.isPending ? "Submitting..." : "Book My Call"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information & Workshop */}
          <div className="w-full lg:flex-1 flex flex-col gap-8 h-full">
            <div className="bg-card p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <a
                      href="tel:+919810424972"
                      className="text-muted-foreground hover:text-blue-600 hover:underline transition-colors"
                      data-testid="link-phone"
                    >
                      +91 9810 424 972
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <a
                      href="mailto:samir.kumar@gnosiscs.com"
                      className="text-muted-foreground hover:text-green-600 hover:underline transition-colors"
                      data-testid="link-email"
                    >
                      samir.kumar@gnosiscs.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl text-white shadow-xl flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold leading-tight">AI CAREER NAVIGATOR WORKSHOP</h4>
                    <p className="text-sm text-white/90">For Class 9-12 Students & Parents</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold mb-2">KIND ATTENTION: SCHOOL PRINCIPAL / HEAD OF SCHOOL MANAGEMENT</p>
                  <p className="text-white/90 leading-relaxed">
                    Book an AI CAREER NAVIGATOR WORKSHOP for class 9-12 students and parents. The workshop can help transform how students plan for future and choose careers with clarity.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setShowWorkshopModal(true)}
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-auto"
                data-testid="button-book-workshop"
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>
      </div>

      <WorkshopBookingModal
        isOpen={showWorkshopModal}
        onClose={() => setShowWorkshopModal(false)}
      />
    </section>
  );
}
