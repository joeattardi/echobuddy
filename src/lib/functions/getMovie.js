import { TMDB_API_KEY } from '$env/static/private';
import { getImageUrl } from './tmdb';

export const schema = {
  type: 'function',
  function: {
    name: 'getMovie',
    description: 'Gets information about a movie including its synopsis and cast.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the movie to search for.'
        }
      },
      required: ['name']
    }
  }
};

export async function getMovie({ name }) {
  const url = new URL('https://api.themoviedb.org/3/search/movie');
  url.searchParams.append('query', name);

  const response = await fetch(url.href, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`
    }
  });
  const data = await response.json();
  const movie = data.results[0];

  const castUrl = new URL(`https://api.themoviedb.org/3/movie/${movie.id}/credits`);
  const castResponse = await fetch(castUrl.href, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`
    }
  });
  const castData = await castResponse.json();
  const cast = castData.cast.slice(0, 4);

  const reply = {
    title: movie.title,
    overview: movie.overview,
    released: movie.release_date,
    cast: cast.map(person => person.name)
  };

  const widgetData = {
    title: movie.title,
    overview: movie.overview,
    released: movie.release_date,
    poster: getImageUrl(movie.poster_path),
    cast: cast.map(person => ({
      name: person.name,
      character: person.character,
      photo: getImageUrl(person.profile_path)
    }))
  };

  return {
    reply,
    widgetData
  };
}
