import { ApiService } from './ApiService';

interface Item {
    resourceURI: string
}

interface Comics {
	id: number
	title: string
	thumbnail: {
		path: string
		extension: string
	}
}
interface Series {
	id: number
	title: string
	thumbnail: {
		path: string
		extension: string
	}
}
interface Characters {
	id: number
	name: string
	thumbnail: {
		path: string
		extension: string
	}
}

type fetchFunction<T> = (id: number) => Promise<T[]>

export const DataService = {
  async fetchItems<T>(items: Item[], fetchFunction: fetchFunction<T>): Promise<T[]> {
    const result: T[] = [];
    for (const item of items) {
      const match = item.resourceURI.match(/\d+$/);
      if (match) {
        const numbers = parseInt(match[0]);
        const data = await fetchFunction(numbers);
        result.push(data[0]);
      }
    }
    return result;
  },

  async fetchComics(comicsItems: Item[]): Promise<Comics[]> {
    return this.fetchItems(comicsItems, ApiService.getComicsById);
  },

  async fetchSeries(seriesItems: Item[]): Promise<Series[]> {
    return this.fetchItems(seriesItems, ApiService.getSeriesById);
  },

  async fetchCharacters(charactersItems: Item[]): Promise<Characters[]> {
    return this.fetchItems(charactersItems, ApiService.getCharacterById);
  },
};