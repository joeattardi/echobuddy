import Weather from './Weather.svelte';
import News from './News.svelte';
import Stock from './Stock.svelte';
import NowPlaying from './NowPlaying.svelte';
import Actor from './Actor.svelte';

const widgets = {
  getWeather: Weather,
  getNews: News,
  getStock: Stock,
  getNowPlaying: NowPlaying,
  getActor: Actor
}

export function getWidget(name) {
  return widgets[name];
}
