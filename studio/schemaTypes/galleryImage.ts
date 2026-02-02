
// galleryImage.ts
export default {
    name: 'galleryImage',
    title: 'Photo Gallery',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'altText',
            title: 'Alt Text',
            type: 'string'
        }
    ]
}
