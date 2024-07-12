import { createSlice } from '@reduxjs/toolkit';
import { fetchApiKeys } from './thunk';

const APIKeySlice = createSlice({
  name: 'apiKeys',
  initialState: {
    keys: [],
    loading: false,
    error: null,
  },
  reducers: {
    addApiKey: (state, action) => {
      state.keys.unshift(action.payload);
    },
    deleteApiKey: (state, action) => {
      state.keys = state.keys.filter(apiKey => apiKey.id !== action.payload);
    },
    renameApiKey: (state, action) => {
      const { id, newName } = action.payload;
      const apiKey = state.keys.find(apiKey => apiKey.id === id);
      if (apiKey) {
        apiKey.name = newName;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKeys.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApiKeys.fulfilled, (state, action) => {
        state.loading = false;
        state.keys = action.payload;
      })
      .addCase(fetchApiKeys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addApiKey, deleteApiKey, renameApiKey } = APIKeySlice.actions;
export default APIKeySlice.reducer;




































// import { createSlice } from "@reduxjs/toolkit";
// import { getAPIKey } from './thunk';

// export const initialState = {
//     apiKey: [],
//     error: {},
// };

// const APIKeyslice = createSlice({
//     name: 'APIKey',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getAPIKey.fulfilled, (state, action) => {
//             state.apiKey = action.payload;
//         });
//         builder.addCase(getAPIKey.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//         });
//     }
// });

// export default APIKeyslice.reducer;