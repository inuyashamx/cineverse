import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MovieCard } from '../components/MovieCard';
import { SearchBar } from '../components/SearchBar';
import { getPopularMovies, searchMovies } from '../services/api';
import { Movie } from '../types/movie';
import { useDebounce } from '../hooks/useDebounce';

export const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = debouncedSearch
          ? await searchMovies(debouncedSearch)
          : await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        setError('Error al cargar las películas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedSearch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <SearchBar onSearch={setSearchQuery} />
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.div>
      {movies.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          No se encontraron películas
        </p>
      )}
    </div>
  );
}; 