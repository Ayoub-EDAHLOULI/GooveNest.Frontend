import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allGenres: [],
  loading: false,
  error: null,
};

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {
    // Fetch All Genres
    fetchAllGenresStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllGenresSuccess(state, action) {
      state.allGenres = action.payload || [];
      state.loading = false;
      state.error = null;
    },
    fetchAllGenresFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    // Create Genre
    createGenreStart(state) {
      state.loading = true;
      state.error = null;
    },
    createGenreSuccess(state, action) {
      state.allGenres.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createGenreFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Update Genre
    updateGenreStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateGenreSuccess(state, action) {
      const updatedGenre = action.payload;
      state.allGenres = state.allGenres.map((genre) =>
        genre.id === updatedGenre.id ? updatedGenre : genre
      );
      state.loading = false;
      state.error = null;
    },
    updateGenreFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // Delete Genre
    deleteGenreStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteGenreSuccess(state, action) {
      const deletedGenreId = action.payload.id;
      state.allGenres = state.allGenres.filter(
        (genre) => genre.id !== deletedGenreId
      );
      state.loading = false;
      state.error = null;
    },
    deleteGenreFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  fetchAllGenresStart,
  fetchAllGenresSuccess,
  fetchAllGenresFailure,
  createGenreStart,
  createGenreSuccess,
  createGenreFailure,
  updateGenreStart,
  updateGenreSuccess,
  updateGenreFailure,
  deleteGenreStart,
  deleteGenreSuccess,
  deleteGenreFailure,
} = genreSlice.actions;

export default genreSlice.reducer;
