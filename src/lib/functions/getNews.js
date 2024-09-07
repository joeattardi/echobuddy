import * as htmlparser2 from 'htmlparser2';

export const schema = {
  type: 'function',
  function: {
    name: 'getNews',
    description: 'Gets the latest news headlines from NPR.'
  }
};

export async function getNews() {
  const response = await fetch('https://feeds.npr.org/1002/rss.xml');
  const data = await response.text();
  const feed = htmlparser2.parseFeed(data);
  const stories = feed.items.slice(0, 3).map(item => ({
    link: item.link,
    title: item.title
  }));

  return {
    reply: stories.map(story => story.title),
    widgetData: stories
  };
}
