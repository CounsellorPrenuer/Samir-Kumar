
// successStory.ts
export default {
    name: 'successStory',
    title: 'Success Stories',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'role',
            title: 'Role',
            type: 'string'
        },
        {
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'testimonial',
            title: 'Testimonial',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        // Optional: Keep these for UI consistency if needed, or remove if strictly following prompt
        // The prompt only listed name, role, photo, testimonial.
        // But the UI uses 'initial' and 'gradient'. I will omitting them unless essential.
        // UI fallback handles missing image with initials.
    ]
}
