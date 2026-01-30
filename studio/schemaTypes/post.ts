
// post.ts
// - title (string)
// - slug (slug from title)
// - publishedAt (datetime)
// - body (portable text)
export default {
    name: 'post',
    title: 'Blog Post',
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
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: (new Date()).toISOString()
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image', options: { hotspot: true } }
            ]
        }
    ]
}
