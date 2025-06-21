import {
  fetchAllUsersStart,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  fetchPaginatedUsersStart,
  fetchPaginatedUsersSuccess,
  fetchPaginatedUsersFailure,
  fetchUserByIdStart,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
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
        `${API_BASE_URL}user?page=${page}&pageSize=${pageSize}&search=${searchQuery}`,
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
      dispatch(
        fetchPaginatedUsersSuccess({
          userData: data.data.paginatedUsers,
          total: data.data.totalUsers,
        })
      );
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

export const fetchUserById = (userId) => async (dispatch) => {
  dispatch(fetchUserByIdStart());
  try {
    const response = await fetch(`${API_BASE_URL}user/details/${userId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        fetchUserByIdFailure({
          error: errorData.message || "Failed to fetch user.",
        })
      );
      throw new Error(errorData.message || "An error occurred");
    }

    const data = await response.json();
    dispatch(fetchUserByIdSuccess(data.data));
    return data.data;
  } catch (error) {
    dispatch(
      fetchUserByIdFailure({
        error: error.message || "An error occurred while fetching user",
      })
    );
    throw error;
  }
};

// Create user
export const createUser = (userData) => async (dispatch) => {
  dispatch(createUserStart());
  try {
    const response = await fetch(`${API_BASE_URL}user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        createUserFailure({
          error: errorData.message || "Failed to create user.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while creating user"
      );
    }

    const newUser = await response.json();
    dispatch(createUserSuccess(newUser.data));
  } catch (error) {
    dispatch(
      createUserFailure({
        error: error.message || "An error occurred while creating user",
      })
    );

    throw new Error(error.message || "An error occurred while creating user");
  }
};

// Update user
export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch(updateUserStart());
  try {
    const response = await fetch(`${API_BASE_URL}user/${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        updateUserFailure({
          error: errorData.message || "Failed to update user.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while updating user"
      );
    }

    const updatedUser = await response.json();
    dispatch(updateUserSuccess(updatedUser.data));
    return updatedUser.data;
  } catch (error) {
    dispatch(
      updateUserFailure({
        error: error.message || "An error occurred while updating user",
      })
    );

    throw new Error(error.message || "An error occurred while updating user");
  }
};

// Delete user
export const deleteUser = (userId) => async (dispatch) => {
  dispatch(deleteUserStart());
  try {
    const response = await fetch(`${API_BASE_URL}user/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      dispatch(
        deleteUserFailure({
          error: errorData.message || "Failed to delete user.",
        })
      );
      throw new Error(
        errorData.message || "An error occurred while deleting user"
      );
    }
    dispatch(deleteUserSuccess(userId));
  } catch (error) {
    dispatch(
      deleteUserFailure({
        error: error.message || "An error occurred while deleting user",
      })
    );

    throw new Error(error.message || "An error occurred while deleting user");
  }
};
