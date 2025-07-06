import {
  fetchAllTracksStart,
  fetchAllTracksSuccess,
  fetchAllTracksFailure,
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

export const fetchTrackById = (trackId) => async (dispatch) => {
  dispatch(fetchTrackByIdStart());
  try {
    const response = await fetch(`${API_BASE_URL}track/${trackId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchTrackByIdFailure({
          error: errorData.message || "Failed to fetch track.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching track"
      );
    }

    const data = await response.json();
    dispatch(fetchTrackByIdSuccess(data.data));
  } catch (error) {
    dispatch(
      fetchTrackByIdFailure({
        error: error.message || "An error occurred while fetching track",
      })
    );
  }
};

export const createTrack = (trackData) => async (dispatch) => {
  dispatch(createTrackStart());
  try {
    const response = await fetch(`${API_BASE_URL}track`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        createTrackFailure({
          error: errorData.message || "Failed to create track.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while creating track"
      );
    }

    const data = await response.json();
    dispatch(createTrackSuccess(data.data));
  } catch (error) {
    dispatch(
      createTrackFailure({
        error: error.message || "An error occurred while creating track",
      })
    );

    throw error;
  }
};
