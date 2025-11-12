-- Fix Production Testimonial Images
-- Run this on your PRODUCTION database
-- All 8 unique images have been uploaded to object storage

UPDATE testimonials SET image_url = '/public-objects/public/testimonials/professional_busines_21e83427.jpg' WHERE name = 'Priya Verma';
UPDATE testimonials SET image_url = '/public-objects/public/testimonials/professional_busines_03b735cf.jpg' WHERE name = 'Amit Kumar';
UPDATE testimonials SET image_url = '/public-objects/public/testimonials/professional_busines_9c2a9400.jpg' WHERE name = 'Sneha Kapoor';
UPDATE testimonials SET image_url = '/public-objects/public/testimonials/young_professional_s_6c8146cb.jpg' WHERE name = 'Vikram Singh';
UPDATE testimonials SET image_url = '/public-objects/public/testimonials/young_professional_s_d5c140f5.jpg' WHERE name = 'Neha Agarwal';
UPDATE testimonials SET image_url = '/public-objects/public/testimonials/professional_busines_2ee7751f.jpg' WHERE name = 'Rahul Patel';
UPDATE testimonials SET image_url = '/public-objects/public/testimonials/professional_busines_b44588be.jpg' WHERE name = 'Ananya Sharma';
UPDATE testimonials SET image_url = '/public-objects/public/testimonials/professional_busines_3c128897.jpg' WHERE name = 'Rajiv Mishra';

-- Verify the updates
SELECT name, image_url FROM testimonials ORDER BY name;
