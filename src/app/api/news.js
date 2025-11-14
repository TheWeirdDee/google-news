const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const endpoints = {
  topHeadlines: `${BASE_URL}/top-headlines?country=ng&apiKey=${API_KEY}`,
  category: (cat) =>
    `${BASE_URL}/top-headlines?country=ng&category=${cat}&apiKey=${API_KEY}`,
  search: (query) =>
    `${BASE_URL}/everything?q=${query}&sortBy=publishedAt&apiKey=${API_KEY}`,
};
