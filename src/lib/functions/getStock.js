import { POLYGONIO_API_KEY } from '$env/static/private';

export const schema = {
  type: 'function',
  function: {
    name: 'getStock',
    description: 'Gets the stock price for a company',
    parameters: {
      type: 'object',
      properties: {
        company: {
          type: 'string',
          description: 'The name of the company to get the stock price for.'
        }
      },
      required: ['company']
    }
  }
}

export async function getStock({ company }) {
  const tickerUrl = new URL('https://api.polygon.io/v3/reference/tickers');
  tickerUrl.searchParams.append('apiKey', POLYGONIO_API_KEY);
  tickerUrl.searchParams.append('search', company);
  tickerUrl.searchParams.append('market', 'stocks');
  tickerUrl.searchParams.append('type', 'CS');
  tickerUrl.searchParams.append('limit', 1);

  const tickerResponse = await fetch(tickerUrl);
  const tickerData = await tickerResponse.json();

  if (tickerData.results.length === 0) {
    return {
      reply: 'Sorry, I could not find that company.'
    };
  }

  const ticker = tickerData.results[0].ticker;
  const companyName = tickerData.results[0].name;

  const url = new URL(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev`)
  url.searchParams.append('apiKey', POLYGONIO_API_KEY);
  const response = await fetch(url);
  const data = await response.json();

  const stockData = data.results[0];

  return {
    reply: {
      company: companyName,
      price: stockData.c,
      time: stockData.t
    },
    widgetData: {
      company: companyName,
      ticker,
      price: stockData.c,
      open: stockData.o,
      time: stockData.t
    }
  };
}
