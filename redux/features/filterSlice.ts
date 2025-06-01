// redux/features/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  searchQuery: string;
  genre: string[];
  year: string;
  season: string;
  format: string[];
  status: string;
}

const initialState: FilterState = {
  searchQuery: '',
  genre: ['Any'],
  year: 'Any',
  season: 'Any',
  format: ['Any'],
  status: 'Any',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setGenre: (state, action: PayloadAction<string[]>) => {
      state.genre = action.payload.length ? action.payload : ['Any'];
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload || 'Any';
    },
    setSeason: (state, action: PayloadAction<string>) => {
      state.season = action.payload || 'Any';
    },
    setFormat: (state, action: PayloadAction<string[]>) => {
      state.format = action.payload.length ? action.payload : ['Any'];
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload || 'Any';
    },
    clearAllFilters: (state) => {
      state.genre = ['Any'];
      state.year = 'Any';
      state.season = 'Any';
      state.format = ['Any'];
      state.status = 'Any';
      state.searchQuery = '';
    },
  },
});

export const {
  setSearchQuery,
  setGenre,
  setYear,
  setSeason,
  setFormat,
  setStatus,
  clearAllFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
