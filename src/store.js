import { createSlice, configureStore } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'counter',
  initialState: {
    contacts: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchContactsLoading: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchContactsError: (state, action) => {
      state.loading = false;
      state.error = true; 
    },
  },
});

export const { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } = contactsSlice.actions;
const Store = configureStore({ reducer: contactsSlice.reducer });

export default Store; 
