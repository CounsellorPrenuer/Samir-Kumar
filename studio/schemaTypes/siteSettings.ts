
// siteSettings.ts
// - siteTitle
// - description
export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Site Description',
            type: 'text'
        }
    ]
}
