export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends Movie {
  genres: {
    id: number;
    name: string;
  }[];
  runtime: number;
  status: string;
  tagline: string;
  videos: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
} 