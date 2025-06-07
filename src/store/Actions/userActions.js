import {
  fetchAllUsersStart,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  fetchPaginatedUsersStart,
  fetchPaginatedUsersSuccess,
  fetchPaginatedUsersFailure,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../Slices/userSlice";
import { API_BASE_URL } from "../../config";

// Fetch all users
export const fetchAllUsers = () => async (dispatch) => {
  dispatch(fetchAllUsersStart());
  try {
    const response = await fetch(`${API_BASE_URL}user/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchAllUsersFailure({
          error: errorData.message || "Failed to fetch users.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while fetching users"
      );
    }

    const data = await response.json();
    dispatch(fetchAllUsersSuccess(data.data));
  } catch (error) {
    dispatch(
      fetchAllUsersFailure({
        error: error.message || "An error occurred while fetching users",
      })
    );
  }
};
