import { TMDB_API_KEY } from '$env/static/private';
import { getImageUrl } from './tmdb';

export const schema = {
  type: 'function',
  function: {
    name: 'getNowPlaying',
    description: 'Gets a list of movies currently playing in theaters.'
  }
};

export async function getNowPlaying() {
  const response = await fetch('https://api.themoviedb.org/3/movie/now_playing', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_KEY}`
    }
  });

  const data = await response.json();
  const movies = data.results.slice(0, 5).map(result => ({
    title: result.title
  }));

  const widgetData = data.results.slice(0, 5).map(result => ({
    title: result.title,
    poster: getImageUrl(result.poster_path)
  }));

  return {
    reply: movies,
    widgetData
  };
}
