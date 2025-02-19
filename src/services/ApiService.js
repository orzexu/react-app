/* eslint-disable no-useless-catch */
import axios from 'axios';

const apiKey = '0a167095bb5456f5b8c9b9873dab411c';
const hash = 'a2a0daab3b70a8b5470de102dd38ff8b';

export const ApiService = {
  // Метод для получения данных о персонаже по ID
  getCharacterById: async (id) => {
    try {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}`, {
        params: {
          ts: '1',
          apikey: apiKey,
          hash: hash,
        },
      });
      return response.data.data.results; // Возвращаем результаты
    } catch (error) {
      throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
    }
  },

  getComicsById: async (id) => {
    try {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/comics/${id}`, {
        params: {
          ts: '1',
          apikey: apiKey,
          hash: hash,
        },
      });
      return response.data.data.results; // Возвращаем результаты
    } catch (error) {
      throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
    }
  },

  getSeriesById: async (id) => {
    try {
      const response = await axios.get(`https://gateway.marvel.com/v1/public/series/${id}`, {
        params: {
          ts: '1',
          apikey: apiKey,
          hash: hash,
        },
      });
      return response.data.data.results; // Возвращаем результаты
    } catch (error) {
      throw error; // Пробрасываем ошибку, чтобы обработать её в компоненте
    }
  },

  // Другие методы для работы с API (например, получение списка персонажей)
  getCharacters: async (offset = 0) => {
    try {
      const response = await axios.get('https://gateway.marvel.com/v1/public/characters', {
        params: {
          ts: '1',
          apikey: apiKey,
          hash: hash,
          offset: offset,
        },
      });
      return response.data.data.results;
    } catch (error) {
      throw error;
    }
  },
  getComics: async (offset = 0) => {
    try {
      const response = await axios.get('https://gateway.marvel.com/v1/public/comics', {
        params: {
          ts: '1',
          apikey: apiKey,
          hash: hash,
          offset: offset,
        },
      });
      return response.data.data.results;
    } catch (error) {
      throw error;
    }
  },

  getSeries: async (offset = 0) => {
    try {
      const response = await axios.get('https://gateway.marvel.com/v1/public/series', {
        params: {
          ts: '1',
          apikey: apiKey,
          hash: hash,
          offset: offset,
        },
      });
      return response.data.data.results;
    } catch (error) {
      throw error;
    }
  },
};