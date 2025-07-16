import {
  fetchAlbumsStart,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  fetchAlbumByIdStart,
  fetchAlbumByIdSuccess,
  fetchAlbumByIdFailure,
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

// Create a new album
export const createAlbum = (albumData) => async (dispatch) => {
  dispatch(createAlbumStart());
  try {
    const response = await fetch(`${API_BASE_URL}album/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(albumData),
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
