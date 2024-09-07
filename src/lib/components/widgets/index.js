import Weather from './Weather.svelte';
import News from './News.svelte';

const widgets = {
  getWeather: Weather,
  getNews: News
}

export function getWidget(name) {
  return widgets[name];
}
