
// leadershipProfile.ts
export default {
    name: 'leadershipProfile',
    title: 'Leadership @ CareerSkope',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'designation',
            title: 'Designation',
            type: 'string'
        },
        {
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'bio',
            title: 'Bio (Full Text)',
            type: 'text'
        }
    ]
}
