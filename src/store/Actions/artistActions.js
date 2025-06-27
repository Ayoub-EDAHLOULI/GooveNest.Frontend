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
