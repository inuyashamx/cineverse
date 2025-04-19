import axios from 'axios';
import { MovieResponse, MovieDetails } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'es-ES',
  },
});

export const getPopularMovies = async (page = 1): Promise<MovieResponse> => {
  const { data } = await api.get('/movie/popular', {
    params: { page },
  });
  return data;
};

export const searchMovies = async (query: string, page = 1): Promise<MovieResponse> => {
  const { data } = await api.get('/search/movie', {
    params: { query, page },
  });
  return data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const { data } = await api.get(`/movie/${id}`, {
    params: { append_to_response: 'videos' },
  });
  return data;
};

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
}; 