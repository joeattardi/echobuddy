import { OPENWEATHER_API_KEY } from '$env/static/private';

export const schema = {
  type: 'function',
  function: {
    name: 'getWeather',
    description: 'Gets the weather conditions for a given location.'
  }
};

export async function getWeather() {
  const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
  weatherUrl.searchParams.append('lat', 42.3601);
  weatherUrl.searchParams.append('lon', -71.0589);
  weatherUrl.searchParams.append('units', 'imperial');
  weatherUrl.searchParams.append('appid', OPENWEATHER_API_KEY);

  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  return {
    reply: {
      location: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      conditions: weatherData.weather[0].main
    }
  };
}
