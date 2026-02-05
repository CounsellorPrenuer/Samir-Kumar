import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface PaymentRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    planId: string | null;
    planName: string;
    amount: string; // Add amount to props to display or pass to payment
    onSuccess: (planId: string, leadData: RegistrationFormData) => void;
}

const registrationSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    phone: z.string().min(10, "Valid phone number is required"), // Assuming mostly Indian numbers based on context
    email: z.string().email("Valid email is required"),
    background: z.string().min(1, "Please select your background")
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function PaymentRegistrationModal({
    isOpen,
    onClose,
    planId,
    planName,
    amount,
    onSuccess
}: PaymentRegistrationModalProps) {

    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            background: ""
        }
    });

    const leadMutation = useMutation({
        mutationFn: async (data: RegistrationFormData) => {
            // We will re-use the submit-lead endpoint but format the data to match expected schema
            // Or we can just pass this data to the parent to handle the actual payment/lead sequence
            // For now, let's just simulate the API call or send to existing lead capture if needed.
            // But based on the request "click on buy now will show me information page... and then razorypay payment",
            // we probably want to capture the lead FIRST, then payment.

            const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://samir-kumar-backend.garyphadale.workers.dev";
            const leadPayload = {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                category: data.background,
                message: `Started registration for plan: ${planName} (ID: ${planId})`
            };

            const response = await fetch(`${baseUrl}/submit-lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadPayload),
            });

            if (!response.ok) {
                // Even if lead capture fails, we might still want to proceed to payment? 
                // Or fail hard? Let's assume we want to capture lead successfully first.
                console.warn("Lead capture warning", await response.text());
                // For this modal flow, we might strictly require it, or just log different errors.
            }
            return leadPayload;
        },
        onSuccess: (_, variables) => {
            if (planId) {
                onSuccess(planId, variables);
            }
        }
    });

    const onSubmit = (data: RegistrationFormData) => {
        leadMutation.mutate(data);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-white p-0 overflow-hidden gap-0">
                <DialogHeader className="bg-[#000080] text-white p-6 text-center">
                    <DialogTitle className="text-2xl font-normal uppercase tracking-widest">
                        REGISTER
                    </DialogTitle>
                </DialogHeader>

                <div className="p-8 bg-[#000080] pt-0">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="First Name"
                                                    {...field}
                                                    className="h-12 bg-white text-black border-none rounded placeholder:text-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Last Name"
                                                    {...field}
                                                    className="h-12 bg-white text-black border-none rounded placeholder:text-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-[100px_1fr] gap-4">
                                <div className="bg-white rounded h-12 flex items-center justify-between px-3 text-black">
                                    <span>+91</span>
                                    <span className="text-gray-400 text-xs">▼</span>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    placeholder="Phone No."
                                                    {...field}
                                                    className="h-12 bg-white text-black border-none rounded placeholder:text-gray-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Email Address"
                                                {...field}
                                                className="h-12 bg-white text-black border-none rounded placeholder:text-gray-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="background"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-12 bg-white text-black border-none rounded data-[placeholder]:text-gray-500">
                                                    <SelectValue placeholder="Background" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="student">Student</SelectItem>
                                                <SelectItem value="graduate">Graduate</SelectItem>
                                                <SelectItem value="professional">Professional</SelectItem>
                                                <SelectItem value="parent">Parent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-center pt-4">
                                <Button
                                    type="submit"
                                    className="bg-[#4154F1] hover:bg-[#3242c1] text-white px-12 py-6 text-lg font-bold rounded-full w-full sm:w-auto uppercase tracking-wide"
                                    disabled={leadMutation.isPending}
                                >
                                    {leadMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Registering...
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                            </div>

                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
