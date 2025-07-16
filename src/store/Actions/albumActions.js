import {
  fetchAlbumsStart,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  fetchAlbumByIdStart,
  fetchAlbumByIdSuccess,
  fetchAlbumByIdFailure,
  fetchArtistAlbumsStart,
  fetchArtistAlbumsSuccess,
  fetchArtistAlbumsFailure,
  createAlbumStart,
  createAlbumSuccess,
  createAlbumFailure,
  updateAlbumStart,
  updateAlbumSuccess,
  updateAlbumFailure,
  deleteAlbumStart,
  deleteAlbumSuccess,
  deleteAlbumFailure,
} from "../Slices/albumSlice";
import { API_BASE_URL } from "../../config";

// Fetch all albums
export const fetchAllAlbums = () => async (dispatch) => {
  dispatch(fetchAlbumsStart());
  try {
    const response = await fetch(`${API_BASE_URL}albums/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchAlbumsFailure({
          error: errorData.message || "Failed to fetch albums.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching albums"
      );
    }

    const data = await response.json();
    dispatch(fetchAlbumsSuccess(data.data));
  } catch (error) {
    dispatch(
      fetchAlbumsFailure({
        error: error.message || "An error occurred while fetching albums",
      })
    );
  }
};

// Fetch album by ID
export const fetchAlbumById = (albumId) => async (dispatch) => {
  dispatch(fetchAlbumByIdStart());
  try {
    const response = await fetch(`${API_BASE_URL}album/${albumId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchAlbumByIdFailure({
          error: errorData.message || "Failed to fetch album.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching album"
      );
    }

    const data = await response.json();
    dispatch(fetchAlbumByIdSuccess(data.data));
  } catch (error) {
    dispatch(
      fetchAlbumByIdFailure({
        error: error.message || "An error occurred while fetching album",
      })
    );
  }
};

// Fetch albums by artist ID
export const fetchArtistAlbums = (artistId) => async (dispatch) => {
  dispatch(fetchArtistAlbumsStart());
  try {
    const response = await fetch(`${API_BASE_URL}artist/${artistId}/albums`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchArtistAlbumsFailure({
          error: errorData.message || "Failed to fetch artist albums.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching artist albums"
      );
    }

    const data = await response.json();
    dispatch(fetchArtistAlbumsSuccess(data.data));
  } catch (error) {
    dispatch(
      fetchArtistAlbumsFailure({
        error:
          error.message || "An error occurred while fetching artist albums",
      })
    );
  }
};

// Create a new album
export const createAlbum = (albumData) => async (dispatch) => {
  dispatch(createAlbumStart());
  try {
    const response = await fetch(`${API_BASE_URL}album`, {
      method: "POST",
      credentials: "include",
      body: albumData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        createAlbumFailure({
          error: errorData.message || "Failed to create album.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while creating album"
      );
    }

    const data = await response.json();
    dispatch(createAlbumSuccess(data.data));
  } catch (error) {
    dispatch(
      createAlbumFailure({
        error: error.message || "An error occurred while creating album",
      })
    );
  }
};

// Update an existing album
export const updateAlbum = (albumData) => async (dispatch) => {
  dispatch(updateAlbumStart());
  try {
    const response = await fetch(`${API_BASE_URL}album/${albumData.id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        updateAlbumFailure({
          error: errorData.message || "Failed to update album.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while updating album"
      );
    }

    const data = await response.json();
    dispatch(updateAlbumSuccess(data.data));
  } catch (error) {
    dispatch(
      updateAlbumFailure({
        error: error.message || "An error occurred while updating album",
      })
    );
  }
};

// Delete an album
export const deleteAlbum = (albumId) => async (dispatch) => {
  dispatch(deleteAlbumStart());
  try {
    const response = await fetch(`${API_BASE_URL}album/${albumId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        deleteAlbumFailure({
          error: errorData.message || "Failed to delete album.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while deleting album"
      );
    }

    const data = await response.json();
    dispatch(deleteAlbumSuccess(data.data));
  } catch (error) {
    dispatch(
      deleteAlbumFailure({
        error: error.message || "An error occurred while deleting album",
      })
    );
  }
};
