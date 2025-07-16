import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
  name: "album",
  initialState: {
    albums: [],
    album: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchAlbumsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAlbumsSuccess(state, action) {
      state.loading = false;
      state.albums = action.payload;
    },
    fetchAlbumsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch Album by ID
    fetchAlbumByIdStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAlbumByIdSuccess(state, action) {
      state.loading = false;
      state.album = action.payload;
    },
    fetchAlbumByIdFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Fetch artist albums
    fetchArtistAlbumsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchArtistAlbumsSuccess(state, action) {
      state.loading = false;
      state.albums = action.payload;
    },
    fetchArtistAlbumsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Create Album
    createAlbumStart(state) {
      state.loading = true;
      state.error = null;
    },
    createAlbumSuccess(state, action) {
      state.loading = false;
      state.albums.push(action.payload);
    },
    createAlbumFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Album
    updateAlbumStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateAlbumSuccess(state, action) {
      state.loading = false;
      const index = state.albums.findIndex(
        (album) => album.id === action.payload.id
      );
      if (index !== -1) {
        state.albums[index] = action.payload;
      }
    },
    updateAlbumFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete Album
    deleteAlbumStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteAlbumSuccess(state, action) {
      state.loading = false;
      state.albums = state.albums.filter(
        (album) => album.id !== action.payload.id
      );
    },
    deleteAlbumFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAlbumsStart,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,

  fetchAlbumByIdStart,
  fetchAlbumByIdSuccess,
  fetchAlbumByIdFailure,

  fetchArtistAlbumsStart,
  fetchArtistAlbumsSuccess,
  fetchArtistAlbumsFailure,

  createAlbumStart,
  createAlbumSuccess,
  createAlbumFailure,

  updateAlbumStart,
  updateAlbumSuccess,
  updateAlbumFailure,

  deleteAlbumStart,
  deleteAlbumSuccess,
  deleteAlbumFailure,
} = albumSlice.actions;

export default albumSlice.reducer;
