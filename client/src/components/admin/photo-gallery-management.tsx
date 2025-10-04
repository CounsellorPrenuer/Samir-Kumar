import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Image as ImageIcon, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoGalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default function PhotoGalleryManagement() {
  const [photos, setPhotos] = useState<PhotoGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch("/api/admin/photo-gallery");
      const data = await response.json();
      if (data.success) {
        setPhotos(data.data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch photos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      
      setUploadedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPhoto = async () => {
    const finalImageUrl = uploadPreview || imageUrl.trim();
    
    if (!finalImageUrl) {
      toast({
        title: "Error",
        description: "Please enter an image URL or upload a file",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch("/api/admin/photo-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: finalImageUrl,
          caption: caption.trim() || undefined,
          displayOrder,
          isActive: true
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Photo added successfully",
        });
        fetchPhotos();
        setShowAddModal(false);
        setImageUrl("");
        setUploadedFile(null);
        setUploadPreview("");
        setCaption("");
        setDisplayOrder(0);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add photo",
        variant: "destructive"
      });
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;

    try {
      const response = await fetch(`/api/admin/photo-gallery/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Photo deleted successfully",
        });
        fetchPhotos();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading photos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Photo Gallery Management</h2>
          <p className="text-muted-foreground">Manage photos displayed in the gallery section</p>
        </div>
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-photo">
              <Plus className="h-4 w-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url">Image URL</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                </TabsList>
                <TabsContent value="url" className="space-y-4">
                  <div>
                    <Label htmlFor="imageUrl">Image URL *</Label>
                    <Input
                      id="imageUrl"
                      data-testid="input-image-url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Paste the URL of the image you want to add
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="upload" className="space-y-4">
                  <div>
                    <Label htmlFor="fileUpload">Upload Image *</Label>
                    <div className="mt-2">
                      <Input
                        id="fileUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        data-testid="input-file-upload"
                        className="cursor-pointer"
                      />
                    </div>
                    {uploadPreview && (
                      <div className="mt-3 aspect-video relative overflow-hidden rounded-md bg-muted">
                        <img 
                          src={uploadPreview} 
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      Select an image file from your device
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div>
                <Label htmlFor="caption">Caption (Optional)</Label>
                <Input
                  id="caption"
                  data-testid="input-caption"
                  placeholder="Photo caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  data-testid="input-display-order"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Lower numbers appear first (0 = first)
                </p>
              </div>
              <Button 
                onClick={addPhoto} 
                className="w-full"
                data-testid="button-submit-photo"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {photos.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-8 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No photos found</p>
            </CardContent>
          </Card>
        ) : (
          photos.map((photo) => (
            <Card key={photo.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-video relative mb-3 overflow-hidden rounded-md bg-muted">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.caption || "Gallery photo"}
                    className="w-full h-full object-cover"
                    data-testid={`img-photo-${photo.id}`}
                  />
                </div>
                <div className="space-y-2">
                  {photo.caption && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {photo.caption}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Order: {photo.displayOrder}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePhoto(photo.id)}
                      data-testid={`button-delete-${photo.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
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
