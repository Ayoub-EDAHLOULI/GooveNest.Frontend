import {
  fetchAllGenresStart,
  fetchAllGenresSuccess,
  fetchAllGenresFailure,
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
    const response = await fetch(`${API_BASE_URL}genre`, {
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

// Create genre
export const createGenre = (genreData) => async (dispatch) => {
  dispatch(createGenreStart());
  try {
    const response = await fetch(`${API_BASE_URL}genre`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(genreData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        createGenreFailure({
          error: errorData.message || "Failed to create genre.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while creating genre"
      );
    }

    const newGenre = await response.json();
    dispatch(createGenreSuccess(newGenre.data));
  } catch (error) {
    dispatch(
      createGenreFailure({
        error: error.message || "An error occurred while creating genre",
      })
    );
  }
};

// Update genre
export const updateGenre = (genreData) => async (dispatch) => {
  dispatch(updateGenreStart());
  try {
    const response = await fetch(`${API_BASE_URL}genre/${genreData.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(genreData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        updateGenreFailure({
          error: errorData.message || "Failed to update genre.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while updating genre"
      );
    }

    const updatedGenre = await response.json();
    dispatch(updateGenreSuccess(updatedGenre.data));
  } catch (error) {
    dispatch(
      updateGenreFailure({
        error: error.message || "An error occurred while updating genre",
      })
    );
  }
};

// Delete genre
export const deleteGenre = (genreId) => async (dispatch) => {
  dispatch(deleteGenreStart());
  try {
    const response = await fetch(`${API_BASE_URL}genre/${genreId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        deleteGenreFailure({
          error: errorData.message || "Failed to delete genre.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while deleting genre"
      );
    }

    dispatch(deleteGenreSuccess({ id: genreId }));
  } catch (error) {
    dispatch(
      deleteGenreFailure({
        error: error.message || "An error occurred while deleting genre",
      })
    );
  }
};
