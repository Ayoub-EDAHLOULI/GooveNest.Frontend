import {
  fetchArtistApplicationStart,
  fetchArtistApplicationSuccess,
  fetchArtistApplicationFailure,
  createArtistApplicationStart,
  createArtistApplicationSuccess,
  createArtistApplicationFailure,
  updateArtistApplicationStart,
  updateArtistApplicationSuccess,
  updateArtistApplicationFailure,
  deleteArtistApplicationStart,
  deleteArtistApplicationSuccess,
  deleteArtistApplicationFailure,
} from "../Slices/artistApplicationSlice";
import { API_BASE_URL } from "../../config";

export const fetchArtistApplication =
  (page = 1, pageSize = 10) =>
  async (dispatch) => {
    dispatch(fetchArtistApplicationStart());
    try {
      const response = await fetch(
        `${API_BASE_URL}artistapplication?page=${page}&pageSize=${pageSize}`,
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
          fetchArtistApplicationFailure({
            error: errorData.message || "Failed to fetch artist application.",
          })
        );
        throw new Error(
          errorData.message ||
            "An error occurred while fetching artist application"
        );
      }

      const data = await response.json();
      dispatch(fetchArtistApplicationSuccess(data.data));
    } catch (error) {
      dispatch(
        fetchArtistApplicationFailure({
          error:
            error.message ||
            "An error occurred while fetching artist application",
        })
      );
      throw new Error(
        error.message || "An error occurred while fetching artist application"
      );
    }
  };

export const createArtistApplication =
  (applicationData) => async (dispatch) => {
    dispatch(createArtistApplicationStart());
    try {
      const response = await fetch(`${API_BASE_URL}artistapplication`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(
          createArtistApplicationFailure({
            error: errorData.message || "Failed to create artist application.",
          })
        );
        throw new Error(
          errorData.message ||
            "An error occurred while creating artist application"
        );
      }

      const data = await response.json();
      dispatch(createArtistApplicationSuccess(data.data));
    } catch (error) {
      dispatch(
        createArtistApplicationFailure({
          error:
            error.message ||
            "An error occurred while creating artist application",
        })
      );
      throw new Error(
        error.message || "An error occurred while creating artist application"
      );
    }
  };

export const updateArtistApplication =
  (applicationData) => async (dispatch) => {
    dispatch(updateArtistApplicationStart());
    try {
      const response = await fetch(
        `${API_BASE_URL}artistapplication/${applicationData.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applicationData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(
          updateArtistApplicationFailure({
            error: errorData.message || "Failed to update artist application.",
          })
        );
        throw new Error(
          errorData.message ||
            "An error occurred while updating artist application"
        );
      }

      const data = await response.json();
      dispatch(updateArtistApplicationSuccess(data.data));
    } catch (error) {
      dispatch(
        updateArtistApplicationFailure({
          error:
            error.message ||
            "An error occurred while updating artist application",
        })
      );
      throw new Error(
        error.message || "An error occurred while updating artist application"
      );
    }
  };

export const deleteArtistApplication = (applicationId) => async (dispatch) => {
  dispatch(deleteArtistApplicationStart());
  try {
    const response = await fetch(
      `${API_BASE_URL}artistapplication/${applicationId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        deleteArtistApplicationFailure({
          error: errorData.message || "Failed to delete artist application.",
        })
      );
      throw new Error(
        errorData.message ||
          "An error occurred while deleting artist application"
      );
    }

    const data = await response.json();
    dispatch(deleteArtistApplicationSuccess({ id: data.data.id }));
  } catch (error) {
    dispatch(
      deleteArtistApplicationFailure({
        error:
          error.message ||
          "An error occurred while deleting artist application",
      })
    );
    throw new Error(
      error.message || "An error occurred while deleting artist application"
    );
  }
};
