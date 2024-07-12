import { createSlice } from "@reduxjs/toolkit";
import { getTicketsList, addNewTicket, updateTicket, deleteTicket } from "./thunk";

const initialState = {
  ticketsList: [],
  isTicketSuccess: false,
  error: null
};

const ticketsSlice = createSlice({
  name: 'Tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsList.fulfilled, (state, action) => {
        state.ticketsList = action.payload.data;
        state.isTicketSuccess = true;
      })
      .addCase(addNewTicket.fulfilled, (state, action) => {
        state.ticketsList.push(action.payload.data);
        state.isTicketSuccess = true;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.ticketsList.findIndex(ticket => ticket._id === action.payload.data._id);
        if (index !== -1) {
          state.ticketsList[index] = action.payload.data;
        }
        state.isTicketSuccess = true;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.ticketsList = state.ticketsList.filter(ticket => ticket._id !== action.payload.ticket);
        state.isTicketSuccess = true;
      })
      .addCase(getTicketsList.rejected, (state, action) => {
        state.error = action.error.message;
        state.isTicketSuccess = false;
      })
      .addCase(addNewTicket.rejected, (state, action) => {
        state.error = action.error.message;
        state.isTicketSuccess = false;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.error = action.error.message;
        state.isTicketSuccess = false;
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.error = action.error.message;
        state.isTicketSuccess = false;
      });
  }
});

export default ticketsSlice.reducer;


























// import { createSlice } from "@reduxjs/toolkit";
// import { getTicketsList, addNewTicket, updateTicket, deleteTicket } from './thunk';

// export const initialState = {
//     ticketsList: [],
//     error: null,
//     isTicketCreated: false,
//     isTicketSuccess: false,
//     isTicketAdd: false,
//     isTicketAddFail: false,
//     isTicketUpdate: false,
//     isTicketUpdateFail: false,
//     isTicketDelete: false,
//     isTicketDeleteFail: false,
// };

// const ticketsSlice = createSlice({
//     name: 'ticketsSlice',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(getTicketsList.fulfilled, (state, action) => {
//             state.ticketsList = action.payload.data;
//             state.isTicketCreated = false;
//             state.isTicketSuccess = true;
//         });
//         builder.addCase(getTicketsList.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//             state.isTicketCreated = false;
//             state.isTicketSuccess = false;
//         });
//         builder.addCase(addNewTicket.fulfilled, (state, action) => {
//             state.ticketsList.push(action.payload.data);
//             state.isTicketCreated = true;
//             state.isTicketAdd = true;
//             state.isTicketAddFail = false;
//         });
//         builder.addCase(addNewTicket.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//             state.isTicketAdd = false;
//             state.isTicketAddFail = true;
//         });
//         builder.addCase(updateTicket.fulfilled, (state, action) => {
//             state.ticketsList = state.ticketsList.map(ticket =>
//                 ticket._id.toString() === action.payload.data._id.toString()
//                     ? { ...ticket, ...action.payload.data }
//                     : ticket
//             );
//             state.isTicketUpdate = true;
//             state.isTicketUpdateFail = false;
//         });
//         builder.addCase(updateTicket.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//             state.isTicketUpdate = false;
//             state.isTicketUpdateFail = true;
//         });
//         builder.addCase(deleteTicket.fulfilled, (state, action) => {
//             state.ticketsList = state.ticketsList.filter(
//                 ticket => ticket._id.toString() !== action.payload.ticket.toString()
//             );
//             state.isTicketDelete = true;
//             state.isTicketDeleteFail = false;
//         });
//         builder.addCase(deleteTicket.rejected, (state, action) => {
//             state.error = action.payload.error || null;
//             state.isTicketDelete = false;
//             state.isTicketDeleteFail = true;
//         });
//     }
// });

// export default ticketsSlice.reducer;
