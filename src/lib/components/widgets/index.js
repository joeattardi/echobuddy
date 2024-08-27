import Weather from './Weather.svelte';

const widgets = {
  getWeather: Weather,
}

export function getWidget(name) {
  return widgets[name];
}
