import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card group"
    >
      <Link to={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3]">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
          >
            {favorite ? (
              <HeartIconSolid className="w-6 h-6 text-primary" />
            ) : (
              <HeartIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}; 