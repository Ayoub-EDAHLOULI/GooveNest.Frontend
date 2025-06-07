import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  paginatedUsers: [],
  loading: false,
  error: null,
  totalUsers: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Fetch All Users
    fetchAllUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllUsersSuccess(state, action) {
      state.allUsers = action.payload.userData || [];
      state.loading = false;
      state.error = null;
    },
    fetchAllUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Fetch Paginated Users
    fetchPaginatedUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPaginatedUsersSuccess(state, action) {
      state.paginatedUsers = action.payload.userData || [];
      state.totalUsers = action.payload.total || 0;
      state.loading = false;
      state.error = null;
    },
    fetchPaginatedUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Create User
    createUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess(state, action) {
      state.allUsers = [...state.allUsers, action.payload];
      state.paginatedUsers = [...state.paginatedUsers, action.payload];
      state.loading = false;
      state.error = null;
      state.totalUsers += 1;
    },
    createUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Update User
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action) {
      const updatedUser = action.payload;
      state.allUsers = state.allUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.paginatedUsers = state.paginatedUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.loading = false;
      state.error = null;
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Delete User
    deleteUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state, action) {
      const userIdToDelete = action.payload.id;
      state.allUsers = state.allUsers.filter(
        (user) => user.id !== userIdToDelete
      );
      state.paginatedUsers = state.paginatedUsers.filter(
        (user) => user.id !== userIdToDelete
      );
      state.loading = false;
      state.error = null;
      state.totalUsers -= 1;
    },
    deleteUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
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
} = userSlice.actions;

export default userSlice.reducer;
