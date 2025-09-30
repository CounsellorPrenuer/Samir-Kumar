import { useState, useEffect } from "react";
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
import { Plus, Edit, Trash2, Package, DollarSign, Star, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PackageType {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  category: string;
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
}

const categoryOptions = [
  { value: "students", label: "Students" },
  { value: "graduates", label: "Graduates" },
  { value: "professionals", label: "Professionals" },
];

export default function PackagesManagement() {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageType | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/admin/packages");
      const data = await response.json();
      if (data.success) {
        setPackages(data.data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch packages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createPackage = async (packageData: Partial<PackageType>) => {
    try {
      const response = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Package created successfully",
        });
        fetchPackages();
        setShowCreateModal(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create package",
        variant: "destructive"
      });
    }
  };

  const updatePackage = async (id: string, packageData: Partial<PackageType>) => {
    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Package updated successfully",
        });
        fetchPackages();
        setEditingPackage(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update package",
        variant: "destructive"
      });
    }
  };

  const deletePackage = async (id: string) => {
    if (!confirm("Are you sure you want to archive this package? It will be hidden from customers but retained in the system.")) return;

    try {
      const response = await fetch(`/api/admin/packages/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: data.message || "Package archived successfully",
        });
        fetchPackages();
      } else if (response.status === 409) {
        // Package has payments - show informative message
        toast({
          title: "Package Archived",
          description: data.message || "Package has existing payments and has been archived instead of deleted.",
        });
        fetchPackages();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive package",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(parseFloat(price));
  };

  const getCategoryBadge = (category: string) => {
    const categoryLabel = categoryOptions.find(opt => opt.value === category)?.label || category;
    return <Badge variant="outline">{categoryLabel}</Badge>;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading packages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Packages Management</h2>
          <p className="text-muted-foreground">Manage service packages and pricing</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-package">
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Package</DialogTitle>
            </DialogHeader>
            <PackageForm onSubmit={createPackage} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {packages.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No packages found</p>
            </CardContent>
          </Card>
        ) : (
          packages.map((pkg) => (
            <Card key={pkg.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-xl">{pkg.name}</h3>
                      {getCategoryBadge(pkg.category)}
                      {pkg.isPopular && (
                        <Badge variant="default" className="bg-yellow-500">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {!pkg.isActive && <Badge variant="secondary">Archived</Badge>}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {pkg.description}
                    </p>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Features:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(pkg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingPackage(pkg)}
                          data-testid={`button-edit-${pkg.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Package</DialogTitle>
                        </DialogHeader>
                        {editingPackage && (
                          <PackageForm 
                            package={editingPackage}
                            onSubmit={(data) => updatePackage(editingPackage.id, data)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deletePackage(pkg.id)}
                      data-testid={`button-delete-${pkg.id}`}
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

function PackageForm({ 
  package: pkg, 
  onSubmit 
}: { 
  package?: PackageType; 
  onSubmit: (data: Partial<PackageType>) => void; 
}) {
  const [formData, setFormData] = useState({
    name: pkg?.name || "",
    description: pkg?.description || "",
    price: pkg?.price || "",
    category: pkg?.category || "students",
    isPopular: pkg?.isPopular || false,
    isActive: pkg?.isActive ?? true,
    features: pkg?.features || [""],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredFeatures = formData.features.filter(feature => feature.trim() !== "");
    onSubmit({ ...formData, features: filteredFeatures });
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Package Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          data-testid="input-name"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
          rows={3}
          data-testid="textarea-description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price (INR)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            required
            data-testid="input-price"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger data-testid="select-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Features</Label>
        <div className="space-y-2 mt-2">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder="Enter a feature..."
                data-testid={`input-feature-${index}`}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeFeature(index)}
                disabled={formData.features.length === 1}
                data-testid={`button-remove-feature-${index}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            data-testid="button-add-feature"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="is-popular"
            checked={formData.isPopular}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked }))}
            data-testid="switch-popular"
          />
          <Label htmlFor="is-popular">Mark as Popular</Label>
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
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" data-testid="button-submit">
          {pkg ? "Update" : "Create"} Package
        </Button>
      </div>
    </form>
  );
}