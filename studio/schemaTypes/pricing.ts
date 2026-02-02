
// pricing.ts
// - title (string)
// - planId (string, MUST match frontend plan IDs exactly)
// - displayPrice (string only)
// - features (array of strings)
// - category (string)
export default {
    name: 'pricing',
    title: 'Pricing Plan',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Plan Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'planId',
            title: 'Plan ID (Must match frontend exactly)',
            type: 'string',
            description: 'The unique ID used in code (e.g. "discover", "achieve-plus")',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'displayPrice',
            title: 'Display Price',
            type: 'string',
            description: 'e.g. "₹ 5,500" or "Free"'
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: '8-9 Students', value: '8-9-students' },
                    { title: '10-12 Students', value: '10-12-students' },
                    { title: 'College Graduates', value: 'college-graduates' },
                    { title: 'Working Professionals', value: 'working-professionals' }
                ]
            }
        },
        {
            name: 'isPremium',
            title: 'Is Premium?',
            type: 'boolean',
            description: 'Check this to show the Premium badge.',
            initialValue: false
        },
        {
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which the package appears (1, 2, 3...)',
            initialValue: 0
        }
    ]
}
