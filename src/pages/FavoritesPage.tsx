import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { useFavorites } from '../context/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mis Películas Favoritas</h1>
        <Link to="/" className="btn bg-gray-800 hover:bg-gray-700">
          Volver al inicio
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">
            No tienes películas favoritas aún
          </p>
          <Link to="/" className="btn btn-primary">
            Explorar películas
          </Link>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </motion.div>
      )}
    </div>
  );
}; 