import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
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
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      const index = state.contacts.findIndex((c) => c.id === action.payload);
      if (index !== -1) {
        state.contacts.splice(index, 1);
      }
    },
    setSelectedContact: (state, action: PayloadAction<Contact | null>) => {
      state.selected = action.payload;
    },
    setContactsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setContacts,
  addContact,
  updateContact,
  deleteContact,
  setSelectedContact,
  setContactsLoading,
  setError,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
