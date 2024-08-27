import { OPENWEATHER_API_KEY } from '$env/static/private';

export const schema = {
  type: 'function',
  function: {
    name: 'getWeather',
    description: 'Gets the weather conditions for a given location.',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The location to get the weather for.'
        }
      },
      required: ['location']
    }
  }
};

export async function getWeather({ location }) {
  const geocodeUrl = new URL('https://api.openweathermap.org/geo/1.0/direct');
  geocodeUrl.searchParams.append('q', location);
  geocodeUrl.searchParams.append('limit', '1');
  geocodeUrl.searchParams.append('appid', OPENWEATHER_API_KEY);
  const geocodeResponse = await fetch(geocodeUrl);
  const geocodeData = await geocodeResponse.json();
  const { lat, lon } = geocodeData[0];

  const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
  weatherUrl.searchParams.append('lat', lat);
  weatherUrl.searchParams.append('lon', lon);
  weatherUrl.searchParams.append('units', 'imperial');
  weatherUrl.searchParams.append('appid', OPENWEATHER_API_KEY);

  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  return {
    reply: {
      location: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      conditions: weatherData.weather[0].main
    },
    widgetData: {
      location: weatherData.name,
      temperature: Math.round(weatherData.main.temp),
      conditions: weatherData.weather[0].main,
      icon: weatherData.weather[0].icon
    }
  };
}
