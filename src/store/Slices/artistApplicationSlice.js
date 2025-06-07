import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artistApplication: null,
  loading: false,
  error: null,
};

const artistApplicationSlice = createSlice({
  name: "artistApplication",
  initialState,
  reducers: {
    // Fetch Artist Application
    fetchArtistApplicationStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArtistApplicationSuccess(state, action) {
      state.artistApplication = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchArtistApplicationFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Create Artist Application
    createArtistApplicationStart(state) {
      state.loading = true;
      state.error = null;
    },
    createArtistApplicationSuccess(state, action) {
      state.artistApplication = action.payload;
      state.loading = false;
      state.error = null;
    },
    createArtistApplicationFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Update Artist Application
    updateArtistApplicationStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateArtistApplicationSuccess(state, action) {
      state.artistApplication = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateArtistApplicationFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Delete Artist Application
    deleteArtistApplicationStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteArtistApplicationSuccess(state, action) {
      state.artistApplication = state.artistApplication.filter(
        (application) => application.id !== action.payload.id
      );
      state.loading = false;
      state.error = null;
    },
    deleteArtistApplicationFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
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
} = artistApplicationSlice.actions;

export default artistApplicationSlice.reducer;
