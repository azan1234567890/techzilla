import { createAsyncThunk } from "@reduxjs/toolkit";

const dummyTickets = [
  {
    _id: '1',
    id: 'T1',
    title: 'Dummy Ticket 1',
    client: 'Client A',
    assigned: 'User X',
    create: '01 Jan, 2024',
    due: '10 Jan, 2024',
    status: 'Open',
    priority: 'High'
  },
  {
    _id: '2',
    id: 'T2',
    title: 'Dummy Ticket 2',
    client: 'Client B',
    assigned: 'User Y',
    create: '02 Jan, 2024',
    due: '12 Jan, 2024',
    status: 'Inprogress',
    priority: 'Medium'
  }
];

export const getTicketsList = createAsyncThunk(
  'tickets/getTicketsList',
  async () => {
    // Directly return dummy data
    return { data: dummyTickets };
  }
);

export const addNewTicket = createAsyncThunk(
  'tickets/addNewTicket',
  async (ticketData) => {
    // Simulate adding the ticket by returning it
    return { data: ticketData };
  }
);

export const updateTicket = createAsyncThunk(
  'tickets/updateTicket',
  async (ticketData) => {
    // Simulate updating the ticket by returning updated data
    return { data: ticketData };
  }
);

export const deleteTicket = createAsyncThunk(
  'tickets/deleteTicket',
  async (ticketId) => {
    // Simulate deleting the ticket by returning the ID
    return { ticket: ticketId };
  }
);

































// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Include Helper Files with needed methods
// import {
//     getTicketsList as getTicketsListApi,
//     addNewTicket as addNewTicketApi,
//     updateTicket as updateTicketApi,
//     deleteTicket as deleteTicketApi
// } from "../../helpers/fakebackend_helper";

// export const getTicketsList = createAsyncThunk("tickets/getTicketsList", async () => {
//     try {
//         const response = await getTicketsListApi();
//         return response;
//     } catch (error) {
//         return error;
//     }
// });

// export const addNewTicket = createAsyncThunk("tickets/addNewTicket", async (ticket) => {
//     try {
//         const response = await addNewTicketApi(ticket);
//         toast.success("Ticket Added Successfully", { autoClose: 3000 });
//         return response;
//     } catch (error) {
//         toast.error("Ticket Addition Failed", { autoClose: 3000 });
//         return error;
//     }
// });

// export const updateTicket = createAsyncThunk("tickets/updateTicket", async (ticket) => {
//     try {
//         const response = await updateTicketApi(ticket);
//         toast.success("Ticket Updated Successfully", { autoClose: 3000 });
//         return response;
//     } catch (error) {
//         toast.error("Ticket Update Failed", { autoClose: 3000 });
//         return error;
//     }
// });

// export const deleteTicket = createAsyncThunk("tickets/deleteTicket", async (ticket) => {
//     try {
//         const response = await deleteTicketApi(ticket);
//         toast.success("Ticket Deleted Successfully", { autoClose: 3000 });
//         return { ticket, ...response };
//     } catch (error) {
//         toast.error("Ticket Deletion Failed", { autoClose: 3000 });
//         return error;
//     }
// });


// export const toggleTicketModal = createAsyncThunk("tickets/toggleTicketModal", async (isOpen) => {
//     return isOpen;
// });