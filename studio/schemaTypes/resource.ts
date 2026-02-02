
// resource.ts
export default {
    name: 'resource',
    title: 'Resources / Blog',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' }
            ]
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime'
        },
        // Adding category to support UI filtering (Students, Graduates, Professionals)
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Students', value: 'students' },
                    { title: 'Graduates', value: 'graduates' },
                    { title: 'Professionals', value: 'professionals' }
                ]
            }
        },
        {
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
            description: 'e.g., "5 min read"'
        }
    ]
}
