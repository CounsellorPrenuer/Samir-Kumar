import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Eye, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle, 
  Archive,
  MessageSquare 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  status: 'pending' | 'responded' | 'archived';
  createdAt: string;
  respondedAt?: string;
  respondedBy?: string;
  adminNotes?: string;
}

export default function ContactsManagement() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact-submissions");
      const data = await response.json();
      setContacts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch contacts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id: string, status: string, adminNotes?: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, adminNotes }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success",
          description: "Contact status updated successfully",
        });
        fetchContacts();
        setSelectedContact(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="destructive"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'responded':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Responded</Badge>;
      case 'archived':
        return <Badge variant="secondary"><Archive className="h-3 w-3 mr-1" />Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredContacts = contacts.filter(contact => 
    statusFilter === "all" || contact.status === statusFilter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Contact Management</h2>
          <p className="text-muted-foreground">Manage customer inquiries and responses</p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Contacts</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredContacts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No contacts found</p>
            </CardContent>
          </Card>
        ) : (
          filteredContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      {getStatusBadge(contact.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {contact.phone}
                      </div>
                      <Badge variant="outline">{contact.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                      {contact.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {formatDate(contact.createdAt)}
                      {contact.respondedAt && (
                        <> • Responded: {formatDate(contact.respondedAt)} by {contact.respondedBy}</>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                          data-testid={`button-view-${contact.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Contact Details</DialogTitle>
                        </DialogHeader>
                        {selectedContact && (
                          <ContactDetailModal 
                            contact={selectedContact} 
                            onUpdateStatus={updateContactStatus}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function ContactDetailModal({ 
  contact, 
  onUpdateStatus 
}: { 
  contact: Contact; 
  onUpdateStatus: (id: string, status: string, notes?: string) => void; 
}) {
  const [status, setStatus] = useState<'pending' | 'responded' | 'archived'>(contact.status);
  const [adminNotes, setAdminNotes] = useState(contact.adminNotes || "");

  const handleSubmit = () => {
    onUpdateStatus(contact.id, status, adminNotes);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Name</Label>
          <p className="text-sm">{contact.name}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Email</Label>
          <p className="text-sm">{contact.email}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Phone</Label>
          <p className="text-sm">{contact.phone}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Category</Label>
          <p className="text-sm">{contact.category}</p>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Message</Label>
        <p className="text-sm bg-muted p-3 rounded-lg mt-1">{contact.message}</p>
      </div>

      <div>
        <Label className="text-sm font-medium">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="responded">Responded</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="admin-notes" className="text-sm font-medium">Admin Notes</Label>
        <Textarea
          id="admin-notes"
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          placeholder="Add internal notes about this contact..."
          className="mt-1"
          data-testid="textarea-admin-notes"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={handleSubmit} data-testid="button-update-status">
          Update Status
        </Button>
      </div>
    </div>
  );
}