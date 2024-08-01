export const schema = {
  type: 'function',
  function: {
    name: 'getJoke',
    description: 'Tells a funny joke'
  }
};

export async function getJoke() {
  console.log('Requesting a joke from icanhazdadjoke.com');
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json'
    }
  });

  const data = await response.json();

  return {
    reply: {
      joke: data.joke
    }
  };
}
