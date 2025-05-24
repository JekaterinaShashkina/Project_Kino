import { fetchPoster } from "../services/filmService";

export const enhanceWithPosters = async (films) => {
  return await Promise.all(
    films.map(async (film) => {
      const imageUrl = await fetchPoster(film.title);
      return { ...film, imageUrl };
    })
  );
};