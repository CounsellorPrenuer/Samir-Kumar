const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: '0qfs08ee',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03'
});
client.fetch('*[_type == "pricing" && !(_id in path("drafts.**")) && defined(title)]').then(res => console.log("PRICING:", res.map(r => r.title)));
client.fetch('*[_type == "customizePlan" && !(_id in path("drafts.**"))]').then(res => console.log("CUSTOM:", res.map(r => ({id: r._id, title: r.title, amount: r.amount, displayPrice: r.displayPrice}))));
