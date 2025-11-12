# Video Embedding Guide for Careerskope

This guide explains how to embed videos in your blog articles and other content on the Careerskope website.

## Method 1: YouTube Video Embedding (Recommended)

### For Blog Articles

When creating or editing a blog article in the admin dashboard, you can embed YouTube videos using the video URL field:

1. Go to **Admin Dashboard** > **Blog** tab
2. Click **Add New Article** or edit an existing article
3. In the **Video URL** field, paste your YouTube video URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
4. The video will automatically be embedded in the blog article

**Supported YouTube URL formats:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

### Manual HTML Embedding

If you need to embed a YouTube video directly in HTML content, use this code:

```html
<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://www.youtube.com/embed/VIDEO_ID" 
    title="Video title"
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
```

Replace `VIDEO_ID` with your actual YouTube video ID.

**Example:**
- YouTube URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`
- Embed URL: `https://www.youtube.com/embed/dQw4w9WgXcQ`

## Method 2: Vimeo Video Embedding

For Vimeo videos, use this code:

```html
<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 20px 0;">
  <iframe 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    src="https://player.vimeo.com/video/VIDEO_ID" 
    title="Video title"
    frameborder="0" 
    allow="autoplay; fullscreen; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
```

## Method 3: Local Video Files

If you have video files stored on your server, use the HTML5 video tag:

```html
<video controls style="width: 100%; max-width: 800px; margin: 20px 0;">
  <source src="/path/to/video.mp4" type="video/mp4">
  <source src="/path/to/video.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
```

## Best Practices

1. **Use YouTube for large videos**: YouTube handles video hosting, streaming, and bandwidth efficiently
2. **Responsive design**: The code examples above use responsive containers that work on all devices
3. **Video optimization**: Keep videos under 5 minutes for better engagement
4. **Add captions**: Include video descriptions for accessibility
5. **Thumbnail images**: Use custom thumbnails for better visual appeal

## Adding Videos to Different Sections

### Blog Articles
- Use the Video URL field in the blog article form
- The system will automatically create a responsive video player

### Custom HTML Content
- Use the HTML embedding methods above
- Paste the code in any HTML editor or content field

### Contact or Info Sections
- Contact your developer to add video sections
- Provide the video URL and placement details

## Troubleshooting

**Video not showing?**
1. Check if the video URL is correct
2. Ensure the video is set to "Public" on YouTube/Vimeo
3. Clear your browser cache
4. Check browser console for errors

**Video not responsive?**
- Make sure you're using the responsive container code above
- Test on different screen sizes

**Video quality issues?**
- Upload high-quality videos (1080p recommended)
- Check your internet connection
- Try adjusting YouTube quality settings

## Need Help?

If you need assistance with video embedding:
1. Check that your video URL is correct
2. Verify the video is publicly accessible
3. Contact your technical support team with the specific video URL and location

---

**Your YouTube Channel**: [@careerskope](https://www.youtube.com/@careerskope)
**Facebook**: [Careerskope](https://www.facebook.com/Careerskop/)
