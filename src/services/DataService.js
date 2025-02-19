import { ApiService } from './ApiService';

export const DataService = {
  async fetchItems(items, fetchFunction) {
    const result = [];
    for (const item of items) {
      const match = item.resourceURI.match(/\d+$/);
      if (match) {
        const numbers = match[0];
        const data = await fetchFunction(numbers);
        result.push(data[0]);
      }
    }
    return result;
  },

  async fetchComics(comicsItems) {
    return this.fetchItems(comicsItems, ApiService.getComicsById);
  },

  async fetchSeries(seriesItems) {
    return this.fetchItems(seriesItems, ApiService.getSeriesById);
  },

  async fetchCharacters(charactersItems) {
    return this.fetchItems(charactersItems, ApiService.getCharacterById);
  },
};