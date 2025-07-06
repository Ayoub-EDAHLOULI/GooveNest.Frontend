import {
  fetchAllArtistsStart,
  fetchAllArtistsSuccess,
  fetchAllArtistsFailure,
  fetchPaginatedArtistsStart,
  fetchPaginatedArtistsSuccess,
  fetchPaginatedArtistsFailure,
  fetchArtistByIdStart,
  fetchArtistByIdSuccess,
  fetchArtistByIdFailure,
  updateArtistApplicationStart,
  updateArtistApplicationSuccess,
  updateArtistApplicationFailure,
  deleteArtistApplicationStart,
  deleteArtistApplicationSuccess,
  deleteArtistApplicationFailure,
} from "../Slices/artistSlice";

import { API_BASE_URL } from "../../config";

export const fetchAllArtists = () => async (dispatch) => {
  dispatch(fetchAllArtistsStart());
  try {
    const response = await fetch(`${API_BASE_URL}artist/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchAllArtistsFailure({
          error: errorData.message || "Failed to fetch artists.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching artists"
      );
    }

    const data = await response.json();
    dispatch(fetchAllArtistsSuccess(data.data));
  } catch (error) {
    dispatch(
      fetchAllArtistsFailure({
        error: error.message || "An error occurred while fetching artists",
      })
    );
  }
};

export const fetchPaginatedArtists =
  (page = 1, pageSize = 10, searchQuery = "") =>
  async (dispatch) => {
    dispatch(fetchPaginatedArtistsStart());
    try {
      const response = await fetch(
        `${API_BASE_URL}artist?page=${page}&pageSize=${pageSize}&search=${searchQuery}`,
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
          fetchPaginatedArtistsFailure({
            error: errorData.message || "Failed to fetch paginated artists.",
          })
        );
        throw new Error(
          errorData.message ||
            "An error occurred while fetching paginated artists"
        );
      }

      const data = await response.json();
      dispatch(
        fetchPaginatedArtistsSuccess({
          artistData: data.data.paginatedArtists,
          total: data.data.totalArtists,
        })
      );
    } catch (error) {
      dispatch(
        fetchPaginatedArtistsFailure({
          error: error.message || "An error occurred while fetching artists",
        })
      );
      throw error;
    }
  };

export const fetchArtistById = (artistId) => async (dispatch) => {
  dispatch(fetchArtistByIdStart());
  try {
    const response = await fetch(`${API_BASE_URL}artist/${artistId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchArtistByIdFailure({
          error: errorData.message || "Failed to fetch artist.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching artist"
      );
    }

    const data = await response.json();
    dispatch(fetchArtistByIdSuccess(data.data));
    return data.data;
  } catch (error) {
    dispatch(
      fetchArtistByIdFailure({
        error: error.message || "An error occurred while fetching artist",
      })
    );
    throw error;
  }
};

export const updateArtist = (artistId, artistData) => async (dispatch) => {
  dispatch(updateArtistApplicationStart());

  try {
    // Créer un FormData
    const formData = new FormData();
    formData.append("name", artistData.name);
    formData.append("bio", artistData.bio);

    // Vérifie si un fichier est présent
    if (artistData.avatar instanceof File) {
      formData.append("avatar", artistData.avatar);
    }

    const response = await fetch(`${API_BASE_URL}artist/${artistId}`, {
      method: "PUT",
      credentials: "include",
      body: formData, // Ne pas définir 'Content-Type' manuellement !
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        updateArtistApplicationFailure({
          error: errorData.message || "Failed to update artist.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while updating artist"
      );
    }

    const updatedArtist = await response.json();
    dispatch(updateArtistApplicationSuccess(updatedArtist.data));
    return updatedArtist.data;
  } catch (error) {
    dispatch(
      updateArtistApplicationFailure({
        error: error.message || "An error occurred while updating artist",
      })
    );
    throw error;
  }
};

export const deleteArtist = (artistId) => async (dispatch) => {
  dispatch(deleteArtistApplicationStart());
  try {
    const response = await fetch(`${API_BASE_URL}artist/${artistId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        deleteArtistApplicationFailure({
          error: errorData.message || "Failed to delete artist.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while deleting artist"
      );
    }

    dispatch(deleteArtistApplicationSuccess(artistId));
  } catch (error) {
    dispatch(
      deleteArtistApplicationFailure({
        error: error.message || "An error occurred while deleting artist",
      })
    );
    throw error;
  }
};
