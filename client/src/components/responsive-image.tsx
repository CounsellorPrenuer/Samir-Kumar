import { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  srcSet?: string;
  aspectRatio?: string;
  fixed?: boolean; // For icons/logos that need fixed sizing
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  width,
  height,
  srcSet,
  aspectRatio,
  fixed = false,
  ...props
}: ResponsiveImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Calculate aspect ratio for layout stability
  const aspectRatioStyle = aspectRatio || (width && height ? `${width}/${height}` : undefined);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fixed ? { 
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
          aspectRatio: aspectRatioStyle
        } : {
          aspectRatio: aspectRatioStyle
        }}
      >
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div 
      className="relative"
      style={fixed ? {
        aspectRatio: aspectRatioStyle,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined
      } : {
        aspectRatio: aspectRatioStyle,
        width: '100%'
      }}
    >
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{
            aspectRatio: aspectRatioStyle
          }}
        />
      )}
      <img
        src={src}
        srcSet={srcSet} // Only use srcSet if explicitly provided
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={priority ? 'eager' : loading}
        sizes={srcSet ? sizes : undefined}
        width={width}
        height={height}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}