import {
  fetchAllGenresStart,
  fetchAllGenresSuccess,
  fetchAllGenresFailure,
  fetchPaginatedGenresStart,
  fetchPaginatedGenresSuccess,
  fetchPaginatedGenresFailure,
  createGenreStart,
  createGenreSuccess,
  createGenreFailure,
  updateGenreStart,
  updateGenreSuccess,
  updateGenreFailure,
  deleteGenreStart,
  deleteGenreSuccess,
  deleteGenreFailure,
} from "../Slices/genreSlice";
import { API_BASE_URL } from "../../config";

// Fetch all genres
export const fetchAllGenres = () => async (dispatch) => {
  dispatch(fetchAllGenresStart());
  try {
    const response = await fetch(`${API_BASE_URL}genres`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchAllGenresFailure({
          error: errorData.message || "Failed to fetch genres.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching genres"
      );
    }

    const data = await response.json();
    dispatch(fetchAllGenresSuccess(data.data));
  } catch (error) {
    dispatch(
      fetchAllGenresFailure({
        error: error.message || "An error occurred while fetching genres",
      })
    );
  }
};
