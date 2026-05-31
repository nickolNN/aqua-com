import { createSlice } from '@reduxjs/toolkit';
import type { Contact } from '@/types/entities';

export interface ContactsState {
  contacts: Contact[];
  selected: Contact | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  selected: null,
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: { type: string; payload: Contact[] }) => {
      state.contacts = action.payload;
    },
    setSelectedContact: (state, action: { type: string; payload: Contact | null }) => {
      state.selected = action.payload;
    },
    setContactsLoading: (state, action) => { state.isLoading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const { setContacts, setSelectedContact, setContactsLoading } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
