import { TMDB_API_KEY } from '$env/static/private';
import { getImageUrl } from './tmdb';

export const schema = {
  type: 'function',
  function: {
    name: 'getActor',
    description: 'Gets information about an actor along with a list of some of their movies.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the actor to look up.'
        }
      },
      required: ['name']
    }
  }
};

export async function getActor({ name }) {
  const url = new URL('https://api.themoviedb.org/3/search/person');
  url.searchParams.append('query', name);

  const response = await fetch(url.href, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`
    }
  });
  const data = await response.json();
  const actor = data.results[0];
  const movies = actor.known_for.map(movie => movie.title);

  const widgetData = {
    name: actor.name,
    photo: getImageUrl(actor.profile_path),
    movies: actor.known_for.map(movie => ({
      title: movie.title,
      poster: getImageUrl(movie.poster_path)
    }))
  };

  return {
    reply: movies,
    widgetData
  };
}
