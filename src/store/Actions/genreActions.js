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

// Fetch paginated genres
export const fetchPaginatedGenres =
  (page = 1, pageSize = 10, searchQuery = "") =>
  async (dispatch) => {
    dispatch(fetchPaginatedGenresStart());
    try {
      const response = await fetch(
        `${API_BASE_URL}genre?page=${page}&pageSize=${pageSize}&search=${searchQuery}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(
          fetchPaginatedGenresFailure({
            error: errorData.message || "Failed to fetch paginated genres.",
          })
        );
        throw new Error(
          errorData.message ||
            "An error occurred while fetching paginated genres"
        );
      }

      const data = await response.json();
      dispatch(
        fetchPaginatedGenresSuccess({
          genreData: data.data.paginatedGenres,
          total: data.data.total || 0,
        })
      );
    } catch (error) {
      dispatch(
        fetchPaginatedGenresFailure({
          error:
            error.message ||
            "An error occurred while fetching paginated genres",
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
