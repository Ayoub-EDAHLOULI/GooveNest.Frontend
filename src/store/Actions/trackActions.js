import {
  fetchAllTracksStart,
  fetchAllTracksSuccess,
  fetchAllTracksFailure,
  fetchPaginatedTracksStart,
  fetchPaginatedTracksSuccess,
  fetchPaginatedTracksFailure,
  fetchTrackByIdStart,
  fetchTrackByIdSuccess,
  fetchTrackByIdFailure,
  createTrackStart,
  createTrackSuccess,
  createTrackFailure,
  updateTrackStart,
  updateTrackSuccess,
  updateTrackFailure,
  deleteTrackStart,
  deleteTrackSuccess,
  deleteTrackFailure,
} from "../Slices/trackSlice";
import { API_BASE_URL } from "../../config";

export const fetchAllGenres = () => async (dispatch) => {
  dispatch(fetchAllTracksStart());
  try {
    const response = await fetch(`${API_BASE_URL}track/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchAllTracksSuccess({
          error: errorData.message || "Failed to fetch tracks.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching tracks"
      );
    }

    const data = await response.json();
    dispatch(fetchAllTracksFailure(data.data));
  } catch (error) {
    dispatch(
      fetchAllTracksFailure({
        error: error.message || "An error occurred while fetching tracks",
      })
    );
  }
};
