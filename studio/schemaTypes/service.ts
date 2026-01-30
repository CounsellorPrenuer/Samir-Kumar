
// service.ts
// - title (string)
// - description (text)
// - features (array of strings)
// - icon (string)
export default {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Service Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'icon',
            title: 'Icon Name (Lucide React)',
            type: 'string',
            description: 'e.g. "Brain", "Users", "Briefcase"'
        }
    ]
}
