import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search, Package, FileText, MessageSquare, Image, TrendingUp } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PackageItem {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

interface PhotoGallery {
  id: string;
  caption?: string;
  imageUrl: string;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all content for search
  const { data: packages = [] } = useQuery<PackageItem[]>({
    queryKey: ['/api/packages'],
    enabled: open,
  });

  const { data: articles = [] } = useQuery<BlogArticle[]>({
    queryKey: ['/api/blog-articles'],
    enabled: open,
  });

  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    enabled: open,
  });

  const { data: photos = [] } = useQuery<PhotoGallery[]>({
    queryKey: ['/api/photo-gallery'],
    enabled: open,
  });

  // Filter content based on search query with safe optional chaining
  const filteredPackages = packages.filter(pkg =>
    pkg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter(article =>
    article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.quote?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPhotos = photos.filter(photo =>
    photo.caption?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (type: string, id: string) => {
    // Scroll to the appropriate section
    let sectionId = '';
    switch (type) {
      case 'package':
        sectionId = '#packages';
        break;
      case 'article':
        sectionId = '#blog';
        break;
      case 'testimonial':
        sectionId = '#testimonials';
        break;
      case 'photo':
        sectionId = '#gallery';
        break;
    }

    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    onOpenChange(false);
    setSearchQuery("");
  };

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const hasResults = filteredPackages.length > 0 || 
                     filteredArticles.length > 0 || 
                     filteredTestimonials.length > 0 || 
                     filteredPhotos.length > 0;

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search packages, articles, testimonials..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
        data-testid="input-search"
      />
      <CommandList>
        <CommandEmpty>
          <div className="py-6 text-center text-sm">
            <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No results found.</p>
          </div>
        </CommandEmpty>

        {filteredPackages.length > 0 && (
          <CommandGroup heading="Packages & Solutions">
            {filteredPackages.map((pkg) => (
              <CommandItem
                key={pkg.id}
                value={pkg.name}
                onSelect={() => handleSelect('package', pkg.id)}
                data-testid={`search-result-package-${pkg.id}`}
              >
                <Package className="mr-2 h-4 w-4 text-blue-600" />
                <div className="flex flex-col">
                  <span className="font-medium">{pkg.name}</span>
                  {pkg.description && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {pkg.description}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredArticles.length > 0 && (
          <CommandGroup heading="Blog Articles">
            {filteredArticles.map((article) => (
              <CommandItem
                key={article.id}
                value={article.title}
                onSelect={() => handleSelect('article', article.id)}
                data-testid={`search-result-article-${article.id}`}
              >
                <FileText className="mr-2 h-4 w-4 text-green-600" />
                <div className="flex flex-col">
                  <span className="font-medium">{article.title}</span>
                  {article.excerpt && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {article.excerpt}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredTestimonials.length > 0 && (
          <CommandGroup heading="Testimonials">
            {filteredTestimonials.map((testimonial) => (
              <CommandItem
                key={testimonial.id}
                value={testimonial.name}
                onSelect={() => handleSelect('testimonial', testimonial.id)}
                data-testid={`search-result-testimonial-${testimonial.id}`}
              >
                <MessageSquare className="mr-2 h-4 w-4 text-purple-600" />
                <div className="flex flex-col">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="text-xs text-muted-foreground">{testimonial.role}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredPhotos.length > 0 && (
          <CommandGroup heading="Gallery">
            {filteredPhotos.map((photo) => (
              <CommandItem
                key={photo.id}
                value={photo.caption || 'Photo'}
                onSelect={() => handleSelect('photo', photo.id)}
                data-testid={`search-result-photo-${photo.id}`}
              >
                <Image className="mr-2 h-4 w-4 text-orange-600" />
                <span className="font-medium">{photo.caption || 'Gallery Photo'}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Show quick actions when no search query */}
        {!searchQuery && (
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => handleSelect('package', '')} data-testid="quick-action-packages">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Browse All Packages</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('article', '')} data-testid="quick-action-blog">
              <FileText className="mr-2 h-4 w-4" />
              <span>Read Latest Articles</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('testimonial', '')} data-testid="quick-action-testimonials">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>View Testimonials</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect('photo', '')} data-testid="quick-action-gallery">
              <Image className="mr-2 h-4 w-4" />
              <span>Explore Gallery</span>
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>

      {/* Keyboard hint */}
      <div className="border-t px-4 py-2 text-xs text-muted-foreground">
        <span className="hidden sm:inline">Press </span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
        <span className="hidden sm:inline"> to toggle search</span>
      </div>
    </CommandDialog>
  );
}
