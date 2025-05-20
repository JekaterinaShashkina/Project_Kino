import axios from "axios"
import { API_URL, VITE_TMDB_KEY, TMDB_API } from "../../constants/env"


export const fetchAllFilms = async () => {
    const response = await axios.get(`${API_URL}/movies`)
    return response.data
}

export const fetchPoster = async (title) => {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${VITE_TMDB_KEY}&query=${encodeURIComponent(title)}`);
  const data = await res.json();
  return data.results[0]?.poster_path
    ? `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
    : null;
};

export const fetchFilmById = async (id) => {
    const response = await axios.get(`${API_URL}/movies/${id}`)
    return response.data
}

export const fetchFilmExtraDetails = async (title) => {
  try {
    // Поиск по названию
    const searchRes = await axios.get(`${TMDB_API}/search/movie`, {
      params: {
        api_key: VITE_TMDB_KEY,
        query: title,
      },
    });

    const movie = searchRes.data.results[0];
    if (!movie) return null;

    const movieId = movie.id;

    // Получение подробностей + видео
    const [detailsRes, videosRes] = await Promise.all([
      axios.get(`${TMDB_API}/movie/${movieId}`, {
        params: { api_key: VITE_TMDB_KEY },
      }),
      axios.get(`${TMDB_API}/movie/${movieId}/videos`, {
        params: { api_key: VITE_TMDB_KEY },
      }),
    ]);

    const trailer = videosRes.data.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );

    return {
      overview: detailsRes.data.overview,
      runtime: detailsRes.data.runtime,
      posterPath: movie.poster_path,
      trailerKey: trailer?.key || null,
    };
  } catch (error) {
    console.error('Error fetching TMDB extra details:', error);
    return null;
  }
};