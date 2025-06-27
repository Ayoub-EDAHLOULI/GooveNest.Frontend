import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allArtists: [],
  paginatedArtists: [],
  singleArtist: null,
  loading: false,
  error: null,
  totalArtists: 0,
};

const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    // Fetch All Artists
    fetchAllArtistsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllArtistsSuccess(state, action) {
      state.allArtists = action.payload.artistData || [];
      state.loading = false;
      state.error = null;
    },
    fetchAllArtistsFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Fetch Paginated Artists
    fetchPaginatedArtistsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPaginatedArtistsSuccess(state, action) {
      state.paginatedArtists = action.payload.artistData || [];
      state.totalArtists = action.payload.total || 0;
      state.loading = false;
      state.error = null;
    },
    fetchPaginatedArtistsFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Fetch Artist by ID
    fetchArtistByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArtistByIdSuccess(state, action) {
      state.singleArtist = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchArtistByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Update Artist Application
    updateArtistApplicationStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateArtistApplicationSuccess(state, action) {
      const updatedArtist = action.payload;
      const index = state.allArtists.findIndex(
        (artist) => artist.id === updatedArtist.id
      );
      if (index !== -1) {
        state.allArtists[index] = updatedArtist;
      }
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
      const deletedArtistId = action.payload.id;
      state.allArtists = state.allArtists.filter(
        (artist) => artist.id !== deletedArtistId
      );
      state.paginatedArtists = state.paginatedArtists.filter(
        (artist) => artist.id !== deletedArtistId
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
} = artistSlice.actions;

export default artistSlice.reducer;
