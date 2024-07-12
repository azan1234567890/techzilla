import { createSlice } from '@reduxjs/toolkit';
import { fetchCallLogs, createTicket } from './thunk';

export const callLogsSlice = createSlice({
  name: 'callLogs',
  initialState: {
    logs: [],
    selectedLog: null,
    searchTerm: '',
    loading: false, 
    error: null,
    tickets: [],
  },
  reducers: {
    setSelectedLog: (state, action) => {
      state.selectedLog = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    selectLog: (state, action) => {
      state.selectedLog = state.logs.find(log => log.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCallLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCallLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
        if (action.payload.length > 0) {
          state.selectedLog = action.payload[0];
        }
      })
      .addCase(fetchCallLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      });
  },
});

export const { setSelectedLog, setSearchTerm, selectLog } = callLogsSlice.actions;

export const selectLogs = (state) => state.callLogs.logs;
export const selectSelectedLog = (state) => state.callLogs.selectedLog;
export const selectSearchTerm = (state) => state.callLogs.searchTerm;
export const selectLoading = (state) => state.callLogs.loading;
export const selectError = (state) => state.callLogs.error;

export default callLogsSlice.reducer;
