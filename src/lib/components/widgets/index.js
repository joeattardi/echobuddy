import Weather from './Weather.svelte';
import News from './News.svelte';
import Stock from './Stock.svelte';

const widgets = {
  getWeather: Weather,
  getNews: News,
  getStock: Stock
}

export function getWidget(name) {
  return widgets[name];
}
