async function getPokemon() {
  let res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/`
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return res.json();
}

async function Pokemon() {
  let { results } = await getPokemon();
  return (
    <div>
      <h3>some pokemon:</h3>
      <br />
      <ul>
        {
          results.map((result: any) => (
            <li key={result.name}>{result.name}</li>
          ))
        }
      </ul>
    </div>
  );
}
export default function Page() {
  return (
    <main>
      <h1>This is a page to test the 'loading.tsx' functionality!!!!!!</h1>
      <br />
      <br />
      <Pokemon />
    </main>
  );
}
