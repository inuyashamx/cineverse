import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            MovieApp
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor:
                  location.pathname === '/' ? 'rgba(229, 9, 20, 0.1)' : 'transparent',
              }}
            >
              {location.pathname === '/' ? (
                <HomeIconSolid className="w-5 h-5 text-primary" />
              ) : (
                <HomeIcon className="w-5 h-5" />
              )}
              <span
                className={
                  location.pathname === '/' ? 'text-primary' : 'text-gray-300'
                }
              >
                Inicio
              </span>
            </Link>

            <Link
              to="/favorites"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor:
                  location.pathname === '/favorites'
                    ? 'rgba(229, 9, 20, 0.1)'
                    : 'transparent',
              }}
            >
              {location.pathname === '/favorites' ? (
                <HeartIconSolid className="w-5 h-5 text-primary" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span
                className={
                  location.pathname === '/favorites'
                    ? 'text-primary'
                    : 'text-gray-300'
                }
              >
                Favoritos
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 