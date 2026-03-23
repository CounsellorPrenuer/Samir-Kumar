const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: '0qfs08ee',
  dataset: 'production',
  token: 'sks9EdfDXDcx4yrwVWfiphPMJlTMjIIm4b9eEYxwpbgSQUnXzUm5T4jGqgIt5zFhDiEYIdhugJDGkKT0ZkAUyl86nXJ49XziEAP3v1eUSpcByQzlvcncxbe8tIosgpCfiqYBfp587EEOpcoEfImcFxqsbQncIfKi0aAsAS1V0ycGae7g7wbB',
  useCdn: false,
  apiVersion: '2023-05-03'
});

async function run() {
  const plans = await client.fetch('*[_type == "pricing" && !(_id in path("drafts.**"))]');
  for (const plan of plans) {
    let newTitle = plan.title;
    if (plan.title === 'Achieve') {
      newTitle = 'Achieve Online';
    } else if (plan.title === 'Discover plus+') {
      newTitle = 'Discover Plus+';
    } else if (plan.title === 'Discover') {
      // already fine
    }
    
    if (newTitle !== plan.title) {
        console.log(`Updating ${plan.title} -> ${newTitle}`);
        await client.patch(plan._id).set({ title: newTitle }).commit();
    }
  }
  console.log("Done");
}
run().catch(console.error);
