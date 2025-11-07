import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Calendar, Mail, Phone, School, User, Users, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface WorkshopBooking {
  id: string;
  schoolName: string;
  principalName: string;
  email: string;
  phone: string;
  numberOfStudents: number | null;
  preferredDate: string | null;
  message: string | null;
  status: string;
  adminNotes: string | null;
  createdAt: string;
}

export default function WorkshopBookingsManagement() {
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<WorkshopBooking | null>(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: bookings = [], isLoading } = useQuery<WorkshopBooking[]>({
    queryKey: ["/api/workshop-bookings"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: string; status: string; adminNotes?: string }) => {
      return await apiRequest(`/api/workshop-bookings/${id}/status`, "PATCH", { status, adminNotes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshop-bookings"] });
      toast({
        title: "Status Updated",
        description: "Workshop booking status has been updated successfully.",
      });
      setIsEditDialogOpen(false);
      setSelectedBooking(null);
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/workshop-bookings/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workshop-bookings"] });
      toast({
        title: "Booking Deleted",
        description: "Workshop booking has been deleted successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete booking.",
        variant: "destructive",
      });
    },
  });

  const openEditDialog = (booking: WorkshopBooking) => {
    setSelectedBooking(booking);
    setEditStatus(booking.status);
    setEditNotes(booking.adminNotes || "");
    setIsEditDialogOpen(true);
  };

  const handleUpdateStatus = () => {
    if (selectedBooking) {
      updateStatusMutation.mutate({
        id: selectedBooking.id,
        status: editStatus,
        adminNotes: editNotes,
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "contacted":
        return "default";
      case "confirmed":
        return "default";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workshop Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading workshop bookings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Workshop Bookings Management</CardTitle>
          <CardDescription>
            Manage AI Career Navigator Workshop booking requests from schools
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No workshop bookings yet
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <School className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-lg">{booking.schoolName}</h3>
                          </div>
                          <Badge variant={getStatusBadgeVariant(booking.status)}>
                            {booking.status.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span className="font-medium">Principal:</span>
                            <span>{booking.principalName}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">
                              {booking.email}
                            </a>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${booking.phone}`} className="text-blue-600 hover:underline">
                              {booking.phone}
                            </a>
                          </div>

                          {booking.numberOfStudents && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{booking.numberOfStudents} students (approx.)</span>
                            </div>
                          )}

                          {booking.preferredDate && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Preferred: {format(new Date(booking.preferredDate), "MMM dd, yyyy")}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Submitted: {format(new Date(booking.createdAt), "MMM dd, yyyy")}</span>
                          </div>
                        </div>

                        {booking.message && (
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                            <div className="flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium mb-1">Additional Information:</p>
                                <p className="text-sm text-muted-foreground">{booking.message}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {booking.adminNotes && (
                          <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1 text-blue-900 dark:text-blue-100">Admin Notes:</p>
                            <p className="text-sm text-blue-800 dark:text-blue-200">{booking.adminNotes}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(booking)}
                          className="flex-1 lg:flex-none"
                          data-testid={`button-edit-${booking.id}`}
                        >
                          Update Status
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this workshop booking?")) {
                              deleteMutation.mutate(booking.id);
                            }
                          }}
                          disabled={deleteMutation.isPending}
                          className="flex-1 lg:flex-none"
                          data-testid={`button-delete-${booking.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Workshop Booking Status</DialogTitle>
            <DialogDescription>
              Update the status and add notes for {selectedBooking?.schoolName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger data-testid="select-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Notes</label>
              <Textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Add internal notes about this booking..."
                rows={4}
                data-testid="textarea-admin-notes"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStatus}
              disabled={updateStatusMutation.isPending}
              data-testid="button-save-status"
            >
              {updateStatusMutation.isPending ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
