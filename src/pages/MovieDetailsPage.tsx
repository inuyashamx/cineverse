import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { getMovieDetails, getImageUrl } from '../services/api';
import { MovieDetails } from '../types/movie';
import { useFavorites } from '../context/FavoritesContext';

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(Number(id));
        setMovie(data);
      } catch (err) {
        setError('Error al cargar los detalles de la película');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || 'Película no encontrada'}</p>
      </div>
    );
  }

  const trailer = movie.videos.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  const favorite = isFavorite(movie.id);

  return (
    <div className="min-h-screen">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-lg text-gray-300 mb-4">{movie.tagline}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    favorite ? removeFavorite(movie.id) : addFavorite(movie)
                  }
                  className="btn btn-primary flex items-center gap-2"
                >
                  {favorite ? (
                    <HeartIconSolid className="w-5 h-5" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  {favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                </button>
                <Link to="/" className="btn bg-gray-800 hover:bg-gray-700">
                  Volver
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Sinopsis</h2>
            <p className="text-gray-300 mb-8">{movie.overview}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Fecha de estreno</h3>
                <p className="text-gray-300">
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Duración</h3>
                <p className="text-gray-300">{movie.runtime} minutos</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Calificación</h3>
                <p className="text-gray-300">
                  {movie.vote_average.toFixed(1)} / 10
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Estado</h3>
                <p className="text-gray-300">{movie.status}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {trailer && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Tráiler</h2>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 