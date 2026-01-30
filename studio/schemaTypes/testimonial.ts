
// testimonial.ts
// - name (string)
// - role (string)
// - content (text)
// - rating (number)
export default {
    name: 'testimonial',
    title: 'Testimonial',
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
            name: 'content',
            title: 'Content',
            type: 'text',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'rating',
            title: 'Rating (1-5)',
            type: 'number',
            validation: (Rule: any) => Rule.min(1).max(5)
        }
    ]
}
