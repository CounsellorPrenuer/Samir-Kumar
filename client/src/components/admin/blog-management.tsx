import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { Plus, Edit, Trash2, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  content?: string;
  imageUrl?: string;
  published: string;
  createdAt: string;
}

const categoryOptions = [
  { value: "students", label: "Students" },
  { value: "graduates", label: "Graduates" },
  { value: "professionals", label: "Professionals" },
  { value: "career-tips", label: "Career Tips" },
  { value: "industry-insights", label: "Industry Insights" },
];

export default function BlogManagement() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/admin/blog-articles");
      const data = await response.json();
      if (data.success) {
        setArticles(data.data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog articles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData: Partial<BlogArticle>) => {
    try {
      const response = await fetch("/api/blog-articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Blog article created successfully",
        });
        fetchArticles();
        setShowCreateModal(false);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog article",
        variant: "destructive"
      });
    }
  };

  const updateArticle = async (id: string, articleData: Partial<BlogArticle>) => {
    try {
      const response = await fetch(`/api/admin/blog-articles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleData),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Blog article updated successfully",
        });
        fetchArticles();
        setEditingArticle(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blog article",
        variant: "destructive"
      });
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const response = await fetch(`/api/admin/blog-articles/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "Blog article deleted successfully",
        });
        fetchArticles();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog article",
        variant: "destructive"
      });
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryLabel = categoryOptions.find(opt => opt.value === category)?.label || category;
    return <Badge variant="outline">{categoryLabel}</Badge>;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading blog articles...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Manage blog articles and content</p>
        </div>
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-article">
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Article</DialogTitle>
            </DialogHeader>
            <BlogForm onSubmit={createArticle} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {articles.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No blog articles found</p>
            </CardContent>
          </Card>
        ) : (
          articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {article.imageUrl && (
                    <div className="w-32 h-32 flex-shrink-0">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-lg">{article.title}</h3>
                      {getCategoryBadge(article.category)}
                      <Badge variant="secondary">{article.readTime}</Badge>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Published: {new Date(article.published).toLocaleDateString()}
                      </div>
                      <div>
                        Created: {new Date(article.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingArticle(article)}
                          data-testid={`button-edit-${article.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Blog Article</DialogTitle>
                        </DialogHeader>
                        {editingArticle && (
                          <BlogForm 
                            article={editingArticle}
                            onSubmit={(data) => updateArticle(editingArticle.id, data)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteArticle(article.id)}
                      data-testid={`button-delete-${article.id}`}
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

function BlogForm({ 
  article, 
  onSubmit 
}: { 
  article?: BlogArticle; 
  onSubmit: (data: Partial<BlogArticle>) => void; 
}) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    description: article?.description || "",
    category: article?.category || "students",
    readTime: article?.readTime || "",
    content: article?.content || "",
    imageUrl: article?.imageUrl || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
          data-testid="input-title"
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
        <div>
          <Label htmlFor="read-time">Read Time</Label>
          <Input
            id="read-time"
            value={formData.readTime}
            onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
            placeholder="e.g., 5 min read"
            required
            data-testid="input-read-time"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="image-url">Featured Image URL (Optional)</Label>
        <Input
          id="image-url"
          value={formData.imageUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          placeholder="e.g., /@fs/home/runner/workspace/attached_assets/stock_images/..."
          data-testid="input-image-url"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Upload images to attached_assets folder and use path: /@fs/home/runner/workspace/attached_assets/...
        </p>
        {formData.imageUrl && (
          <div className="mt-2">
            <img 
              src={formData.imageUrl} 
              alt="Preview" 
              className="w-full max-w-md h-48 object-cover rounded-lg border"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EImage not found%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="content">Content (Optional)</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows={10}
          placeholder="Full article content..."
          data-testid="textarea-content"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" data-testid="button-submit">
          {article ? "Update" : "Create"} Article
        </Button>
      </div>
    </form>
  );
}