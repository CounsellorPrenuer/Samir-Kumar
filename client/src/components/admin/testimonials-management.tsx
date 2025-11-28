import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import { Plus, Edit, Trash2, Users, Star, Upload, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  initial: string;
  gradient: string;
  imageUrl?: string;
  isActive: boolean;
  featured?: string;
  createdAt: string;
}

const gradientOptions = [
  { value: "bg-gradient-to-br from-blue-500 to-purple-600", label: "Blue to Purple" },
  { value: "bg-gradient-to-br from-green-500 to-blue-600", label: "Green to Blue" },
  { value: "bg-gradient-to-br from-red-500 to-pink-600", label: "Red to Pink" },
  { value: "bg-gradient-to-br from-yellow-500 to-orange-600", label: "Yellow to Orange" },
  { value: "bg-gradient-to-br from-purple-500 to-red-600", label: "Purple to Red" },
  { value: "bg-gradient-to-br from-indigo-500 to-purple-600", label: "Indigo to Purple" },
];

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async (testimonialData: Partial<Testimonial>) => {
    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialData),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Testimonial created successfully",
        });
        fetchTestimonials();
        setShowCreateModal(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create testimonial",
        variant: "destructive"
      });
    }
  };

  const updateTestimonial = async (id: string, testimonialData: Partial<Testimonial>) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialData),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        });
        fetchTestimonials();
        setEditingTestimonial(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive"
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Testimonial deleted successfully",
        });
        fetchTestimonials();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Testimonials Management</h2>
          <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-testimonial">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Testimonial</DialogTitle>
            </DialogHeader>
            <TestimonialForm onSubmit={createTestimonial} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No testimonials found</p>
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-full ${testimonial.gradient} flex items-center justify-center text-white font-bold text-lg`}>
                        {testimonial.initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          {!testimonial.isActive && <Badge variant="secondary">Inactive</Badge>}
                          {testimonial.featured && <Badge variant="default"><Star className="h-3 w-3 mr-1" />Featured</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4 pl-4 border-l-4 border-gray-200 dark:border-gray-700">
                      "{testimonial.quote}"
                    </blockquote>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(testimonial.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingTestimonial(testimonial)}
                          data-testid={`button-edit-${testimonial.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Testimonial</DialogTitle>
                        </DialogHeader>
                        {editingTestimonial && (
                          <TestimonialForm 
                            testimonial={editingTestimonial}
                            onSubmit={(data) => updateTestimonial(editingTestimonial.id, data)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteTestimonial(testimonial.id)}
                      data-testid={`button-delete-${testimonial.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
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

function TestimonialForm({ 
  testimonial, 
  onSubmit 
}: { 
  testimonial?: Testimonial; 
  onSubmit: (data: Partial<Testimonial>) => void; 
}) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    quote: testimonial?.quote || "",
    initial: testimonial?.initial || "",
    gradient: testimonial?.gradient || gradientOptions[0].value,
    imageUrl: testimonial?.imageUrl || "",
    isActive: testimonial?.isActive ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      initial: name.charAt(0).toUpperCase()
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      formDataUpload.append('type', 'testimonial');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        toast({
          title: "Image uploaded",
          description: "Profile photo uploaded successfully",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            data-testid="input-name"
          />
        </div>
        <div>
          <Label htmlFor="role">Role/Position</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            required
            data-testid="input-role"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="quote">Testimonial Quote</Label>
        <Textarea
          id="quote"
          value={formData.quote}
          onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
          required
          rows={4}
          data-testid="textarea-quote"
        />
      </div>

      <div>
        <Label>Profile Photo</Label>
        <div className="mt-2 space-y-3">
          {formData.imageUrl ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={formData.imageUrl} 
                  alt="Profile preview" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {formData.imageUrl}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image className="h-4 w-4" />
              <span>No image uploaded</span>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileUpload}
              className="hidden"
              data-testid="input-file-upload"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              data-testid="button-upload-image"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </>
              )}
            </Button>
            <span className="text-xs text-muted-foreground">
              JPG, PNG, WebP (max 5MB)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Or enter URL:</span>
            <Input
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="https://..."
              className="flex-1 text-sm"
              data-testid="input-image-url"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="initial">Initial</Label>
          <Input
            id="initial"
            value={formData.initial}
            onChange={(e) => setFormData(prev => ({ ...prev, initial: e.target.value.charAt(0).toUpperCase() }))}
            maxLength={1}
            required
            data-testid="input-initial"
          />
        </div>
        <div>
          <Label htmlFor="gradient">Avatar Gradient (fallback)</Label>
          <Select 
            value={formData.gradient} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, gradient: value }))}
          >
            <SelectTrigger data-testid="select-gradient">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {gradientOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${option.value}`}></div>
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is-active"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
          data-testid="switch-active"
        />
        <Label htmlFor="is-active">Active (visible on website)</Label>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={uploading} data-testid="button-submit">
          {testimonial ? "Update" : "Create"} Testimonial
        </Button>
      </div>
    </form>
  );
}