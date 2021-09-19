import { useState, useEffect } from "react";
import API from "../API";

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

    
  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);
      // Get directos only
      const directors = credits.crew.filter(
        (memebr) => memebr.job === "Director"
      );

      setState({
        ...movie,
        actors: credits.cast,
        directors,
      });

      setLoading(false);
    } catch (error) {
      setError(true);
    }
  };
    
  useEffect(() => {
    

    fetchMovie();
  }, [movieId,]);

  return { state, loading, error };
};
