import { redirect } from 'next/navigation'
import { generateClient } from 'aws-amplify/api';
import { createTest, updateTest, deleteTest } from '../graphql/mutations';
import { listTests } from '../graphql/queries';

async function test() {
  const client = generateClient();

  await client.graphql({
    query: createTest,
    variables: {
      input: {
        name: 'My first todo!'
      }
    }
  });
  const result = await client.graphql({query: listTests});
  console.log(result);
}
export default function Home() {
  test()

  // If authenticated, redirect to the User discover page
  // Otherwise, redirect to the Guest discover page

  // redirect('discover')
}
