import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTracks: [],
  paginatedTracks: [],
  singleTrack: null,
  loading: false,
  error: null,
  totalTracks: 0,
};

const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    // Fetch All Tracks
    fetchAllTracksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllTracksSuccess(state, action) {
      state.allTracks = action.payload.trackData || [];
      state.loading = false;
      state.error = null;
    },
    fetchAllTracksFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Fetch Paginated Tracks
    fetchPaginatedTracksStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPaginatedTracksSuccess(state, action) {
      state.paginatedTracks = action.payload.trackData || [];
      state.totalTracks = action.payload.total || 0;
      state.loading = false;
      state.error = null;
    },
    fetchPaginatedTracksFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Fetch Single Track
    fetchTrackByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTrackByIdSuccess(state, action) {
      state.singleTrack = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTrackByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Create Track
    createSliceStart(state) {
      state.loading = true;
      state.error = null;
    },
    createTrackSuccess(state, action) {
      state.allTracks.push(action.payload);
      state.paginatedTracks.push(action.payload);
      state.totalTracks += 1; // Increment total tracks count
      state.loading = false;
      state.error = null;
    },
    createTrackFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Update Track
    updateTrackStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateTrackSuccess(state, action) {
      const updatedTrackIndex = state.allTracks.findIndex(
        (track) => track.id === action.payload.id
      );
      if (updatedTrackIndex !== -1) {
        state.allTracks[updatedTrackIndex] = action.payload;
        if (state.singleTrack?.id === action.payload.id) {
          state.singleTrack = action.payload; // Update single track if it matches
        }
      }
      state.loading = false;
      state.error = null;
    },
    updateTrackFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Delete Track
    deleteTrackStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteTrackSuccess(state, action) {
      const deletedTrackId = action.payload.id;
      state.allTracks = state.allTracks.filter(
        (track) => track.id !== deletedTrackId
      );
      state.paginatedTracks = state.paginatedTracks.filter(
        (track) => track.id !== deletedTrackId
      );
      if (state.singleTrack?.id === deletedTrackId) {
        state.singleTrack = null; // Clear single track if it was deleted
      }
      state.loading = false;
      state.error = null;
    },
    deleteTrackFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
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
} = trackSlice.actions;

export default trackSlice.reducer;
