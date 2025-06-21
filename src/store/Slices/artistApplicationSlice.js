import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paginatedArtistApplications: [],
  userApplication: [],
  loading: false,
  error: null,
  totalApplications: 0,
};

const artistApplicationSlice = createSlice({
  name: "artistApplication",
  initialState,
  reducers: {
    fetchArtistApplicationsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArtistApplicationsSuccess(state, action) {
      state.paginatedArtistApplications = action.payload.applications;
      state.totalApplications = action.payload.total;
      state.loading = false;
    },
    fetchArtistApplicationsFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Fecth artist applications for a specific user
    fetchArtistApplicationsForUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArtistApplicationsForUserSuccess(state, action) {
      state.userApplication = action.payload;
      state.loading = false;
    },
    fetchArtistApplicationsForUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Create artist application
    createArtistApplicationStart(state) {
      state.loading = true;
      state.error = null;
    },
    createArtistApplicationSuccess(state, action) {
      state.paginatedArtistApplications.push(action.payload);
      state.loading = false;
      state.totalApplications += 1; // Increment total applications count
    },
    createArtistApplicationFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Update artist application
    updateArtistApplicationStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateArtistApplicationSuccess(state, action) {
      const index = state.paginatedArtistApplications.findIndex(
        (app) => app.id === action.payload.id
      );
      if (index !== -1) {
        state.paginatedArtistApplications[index] = action.payload;
      }
      state.loading = false;
    },
    updateArtistApplicationFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Delete artist application
    deleteArtistApplicationStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteArtistApplicationSuccess(state, action) {
      state.paginatedArtistApplications =
        state.paginatedArtistApplications.filter(
          (app) => app.id !== action.payload.id
        );
      state.loading = false;
    },
    deleteArtistApplicationFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  fetchArtistApplicationsStart,
  fetchArtistApplicationsSuccess,
  fetchArtistApplicationsFailure,
  fetchArtistApplicationsForUserStart,
  fetchArtistApplicationsForUserSuccess,
  fetchArtistApplicationsForUserFailure,
  createArtistApplicationStart,
  createArtistApplicationSuccess,
  createArtistApplicationFailure,
  updateArtistApplicationStart,
  updateArtistApplicationSuccess,
  updateArtistApplicationFailure,
  deleteArtistApplicationStart,
  deleteArtistApplicationSuccess,
  deleteArtistApplicationFailure,
} = artistApplicationSlice.actions;

export default artistApplicationSlice.reducer;
