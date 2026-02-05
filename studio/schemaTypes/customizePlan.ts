export default {
    name: 'customizePlan',
    title: 'Customize Plan Item',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3
        },
        {
            name: 'displayPrice',
            title: 'Display Price',
            type: 'string',
            description: 'e.g. "₹ 1,500" or "₹ 100 / month"'
        },
        {
            name: 'amount',
            title: 'Amount (INR)',
            type: 'number',
            description: 'Actual amount to charge (e.g. 1500). Required for payment.'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        }
    ]
}
