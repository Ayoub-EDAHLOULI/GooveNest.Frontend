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

// Fetch paginated users
export const fetchPaginatedUsers =
  (page = 1, pageSize = 10, searchQuery = "") =>
  async (dispatch) => {
    dispatch(fetchPaginatedUsersStart());
    try {
      const response = await fetch(
        `${API_BASE_URL}user/paginated?page=${page}&pageSize=${pageSize}&search=${searchQuery}`,
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
          fetchPaginatedUsersFailure({
            error: errorData.message || "Failed to fetch paginated users.",
          })
        );
        throw new Error(
          errorData.message ||
            "An error occurred while fetching paginated users"
        );
      }

      const data = await response.json();
      dispatch(fetchPaginatedUsersSuccess(data));
    } catch (error) {
      dispatch(
        fetchPaginatedUsersFailure({
          error:
            error.message || "An error occurred while fetching paginated users",
        })
      );

      throw new Error(
        error.message || "An error occurred while fetching paginated users"
      );
    }
  };
