export const schema = {
  type: 'function',
  function: {
    name: 'getWeather',
    description: 'Gets the weather conditions for a given location.'
  }
};

export function getWeather() {
  return {
    reply: {
      weather: {
        temperature: 72,
        conditions: 'cloudy'
      }
    }
  };
}
